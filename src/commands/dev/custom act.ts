import { setActivity, snap } from '#enderbot/functions';
import { Declare, Command, type CommandContext, createStringOption, Options, Middlewares } from 'seyfert';
import { ActivityType } from 'seyfert/lib/types/index.js';
import { match } from 'ts-pattern';
import { Watch, Yuna } from 'yunaforseyfert';
import ms from "ms"
const options = {
    type: createStringOption({
        description: "tipo de presencia", required: true
    }),
    name: createStringOption({
        description: "Nombre de la activity", required: true
    }),
    state: createStringOption({
        description: "estado del bot"
    })
}
@Declare({
  name: 'customact',
  description: 'Customizar la actividad del bot',
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
  public override async run(ctx: CommandContext<typeof options>) {
    try {
      const type = ctx.options.type
      const name = ctx.options.name
      const state = ctx.options.state
      console.log(name)
      console.log(state)
      console.log(type)

        const options = ["competing", "custom", "listening", "playing", "streaming", "watching"];
        const result = match(String(snap(options, type)))
        .with("competing", () => ActivityType.Competing)
        .with("custom", () => ActivityType.Custom)
        .with("listening", () => ActivityType.Listening)
        .with("playing", () => ActivityType.Playing)
        .with("streaming", () => ActivityType.Streaming)
        .with("watching", () => ActivityType.Watching)
        .otherwise(() => ActivityType.Custom)
        setActivity(ctx.client, result, name, state);
        ctx.write({ embeds: [{ title: "Custom activity", description: `La activity cambio esto: \n ***Type***: ${String(snap(options, type))} \n ***Name***: ${name} \n ***Message***: ${state}`}]});
    } catch (e) {
        console.error(e);
    }
    
  }
}