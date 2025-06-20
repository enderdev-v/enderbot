import { Command, CommandContext, createStringOption, Declare, IgnoreCommand, Middlewares, Options } from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";
import ms from "ms"
import { MessageFlags } from "seyfert/lib/types/index.js";

const options = {
    text: createStringOption({
        description: "El texto que enderbot va a decir",
        required: true
    }),
};

@Declare({
    name: "say",
    description: "has que enderbot diga algo",
    integrationTypes: ["GuildInstall"],
    ignore: IgnoreCommand.Slash
})
@Options(options)
@Middlewares(["CheckBots"])
export default class SayCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    override async run(ctx: CommandContext<typeof options>) {
        const texto = ctx.options.text;

		if (texto.includes('@everyone') || texto.includes('@here')) {
			return ctx.write({ content: 'everyone Bv'});
		}
        if (ctx.interaction === undefined){

            await ctx.message?.delete("say xd")
            return ctx.write({ content: texto })
        } 
		await ctx.client.messages.write(ctx.channelId, {
            content: texto,
        });
        ctx.write({ content: "Se envio el texto", flags: MessageFlags.Ephemeral })
    }
}