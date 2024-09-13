import ms from "ms";
import {
    type CommandContext,
    Declare,
    Command,
    Options,
    createStringOption,
} from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";
import { readdir } from "node:fs/promises";
import path from "node:path";

const options = {
    category: createStringOption({
        description: "get a a category",
    })
}
@Declare({
    name: "help",
    description: "Desmutear a un usuario",
    defaultMemberPermissions: ["ModerateMembers"],
    integrationTypes: ["GuildInstall"]
})
@Options(options)
export default class HelpCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    override async run(ctx: CommandContext<typeof options>) {
        const categoria = ctx.options.category;

		const categorias = await readdir(path.join('./src/commands'));
		if (!categoria) return ctx.write({ content: `# Comando help \nhola  estas son las categorias de mis comandos \n ${categorias.join('\n ')}` });
		
		if (!categorias.includes(categoria)) return ctx.write({ content: `No se encontro la categoria "${categoria}"` });
		const cmds = await readdir(path.join('./src/commands', categoria));
		const commands: string[] = [];
		cmds.forEach(cmd => {		
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const command = require(`../../commands/${categoria}/${cmd}`);
			commands.push(`* ${command.default.name}`);
		});	

		ctx.write({ content: `# Comandos ${categoria} \n ${commands.join('\n')}` });
    }
}