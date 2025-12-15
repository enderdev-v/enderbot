import { setActivity, snap } from "#enderbot/utils/functions/functions.js";
import { Declare, Command, type CommandContext, createStringOption, Options, Middlewares, createBooleanOption } from "seyfert";
import { ActivityType } from "seyfert/lib/types/index.js";
import { match } from "ts-pattern";
import { Watch, Yuna } from "yunaforseyfert";
import ms from "ms";
const options = {
  random: createBooleanOption({
    description: "Quieres que sea random o no?", required: true
  }),
  type: createStringOption({
    description: "tipo de presencia", required: false
  }),
  name: createStringOption({
    description: "Nombre de la activity", required: false
  }),
  state: createStringOption({
    description: "estado del bot", required: false
  })
};
@Declare({
  name: "customact",
  description: "Customizar la actividad del bot",
  aliases: ["ca", "custacty"],
})
@Options(options)
@Middlewares(["Onlydev", "CheckBots"])
export default class ActivityCommand extends Command {
  @Watch({
    idle: ms("1min"),
    beforeCreate(ctx) {
      const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
      if (!watcher) return;

      watcher.stop("Just execute");
    }
  })
  override async run(ctx: CommandContext<typeof options>) {
    try {
      const random = ctx.options.random;

      if (random) {
        if (!ctx.client.isActivityRandom) ctx.client.ChangeActivityRandom();
        return ctx.write({ embeds: [{ title: "Custom activity", description: "La activity random se activo" }] });
      }


      if (ctx.client.isActivityRandom) ctx.client.ChangeActivityRandom();
      const type = ctx.options.type;
      const name = ctx.options.name;
      const state = ctx.options.state;

      if (!type && !name && !state) {
        return ctx.write({ embeds: [{ title: "Custom activity", description: "No se ha proporcionado ningun tipo de activity" }] });
      }
      const options = ["competing", "custom", "listening", "playing", "streaming", "watching"];
      const result = match(String(snap(options, type as string))) // Esto lo planeo modificar xd
        .with("competing", () => ActivityType.Competing)
        .with("custom", () => ActivityType.Custom)
        .with("listening", () => ActivityType.Listening)
        .with("playing", () => ActivityType.Playing)
        .with("streaming", () => ActivityType.Streaming)
        .with("watching", () => ActivityType.Watching)
        .otherwise(() => ActivityType.Custom);
      setActivity(ctx.client, result, name as string, state as string);
      ctx.write({ embeds: [{ title: "Custom activity", thumbnail: { url: ctx.client.me.avatarURL({ extension: "png", forceStatic: true }) }, color: ctx.client.config.colors.enderbotColor, description: `La activity cambio esto: \n ***Type***: ${String(snap(options, type as string))} \n ***Name***: ${name} \n ***Message***: ${state}` }] });
    } catch (e) {
      console.error(e);
    }

  }
}