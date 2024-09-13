import { Command, CommandContext, createStringOption, Declare, IgnoreCommand, Options } from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";
import ms from "ms"

const options = {
    text: createStringOption({
        description: "El texto que enderbot va a decir",
    }),
};

@Declare({
    name: "say",
    description: "has que enderbot diga algo",
    integrationTypes: ["GuildInstall"],
    ignore: IgnoreCommand.Slash
})
@Options(options)
export default class SayCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    public override async run(ctx: CommandContext<typeof options>) {
        const texto = ctx.options.text;
        if (!texto) return ctx.write({ content: 'no hay texto'});

		if (texto.includes('@everyone') || texto.includes('@here')) {
			return ctx.write({ content: 'everyone Bv'});
		}
		
        ctx.write({ content: texto })
    }
}