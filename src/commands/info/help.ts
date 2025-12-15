import { getCmds } from "#enderbot/utils/functions/functions.js";
import ms from "ms";
import { type CommandContext, Declare, Command, Options, createStringOption, Middlewares } from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";

// Define options for the command

const options = { category: createStringOption({ description: "get a a category", }) };

@Declare({
    name: "help",
    description: "Mostrar comandos que tiene",
    integrationTypes: ["GuildInstall"]
})
@Options(options)
@Middlewares(["CheckBots"])
export default class HelpCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) { const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this }); if (!watcher) return; watcher.stop("Just execute"); },
    })
    override async run(ctx: CommandContext<typeof options>) {
        const categorias = ["- config", "- dev", "- info", "- mod", "- fun", "- util"];
        const categoria = ctx.options.category;
        if (!categoria) return ctx.write({ content: `# Comando help \n**hola  estas son las categorias de mis comandos** \n ${categorias.join("\n")}` });
		const cmds = await getCmds(categoria, ctx.client);
		ctx.write({ content: `# Comandos ${categoria} \n ${cmds.join("\n")}` });
    }
}