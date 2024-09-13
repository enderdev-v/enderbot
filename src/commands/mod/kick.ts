import { type CommandContext,  createStringOption, createUserOption, Declare, Options, Command } from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";
import ms from "ms";

const options = {
  user: createUserOption({
    description: "get a user",
    required: true
  }),
  reason: createStringOption({
    description: "Especifica una razon"
  }),
}

@Declare({
  name: 'kick',
  description: 'Saca a un usuario', 
  integrationTypes: ["GuildInstall"]
})

@Options(options)
export default class KickCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
  override async run(ctx: CommandContext<typeof options>) {
    const user = ctx.options.user;
    const reason = ctx.options.reason || "undefined <:globo:1222262926694416485>";

    

    if (user.id === ctx.author.id) return ctx.write({ content: "no te puedes auto aislar" });
    const member = await ctx.guild()?.members.fetch(user.id)

    try {
      member?.kick(reason)
    } catch (e) {
      console.error(e);
    }

    ctx.write({ embeds: [
      {
        title: "Usuario Kicked",
        description: `user ${user} for the reason ${reason}`,
        color: ctx.client.config.enderbotColor
      } 
    ]});
  }
}