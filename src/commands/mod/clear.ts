import ms from "ms";
import { type CommandContext, Declare, Command,Options, TextGuildChannel,createIntegerOption,Middlewares,} from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";

const options = {
    cantidad: createIntegerOption({
        description: "get a a category",
        required: true
    })
};
@Declare({
    name: "clear",
    description: "Borrar mensajes",
    defaultMemberPermissions: ["ModerateMembers"],
    botPermissions: ["ModerateMembers"],
    integrationTypes: ["GuildInstall"]
})
@Options(options)
@Middlewares(["CheckBots"])
export default class ClearCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    override async run(ctx: CommandContext<typeof options>) {
        try {
            const cantidad = ctx.options.cantidad;
            const id = ctx.channelId;
            const guild = await ctx.guild();
            const channel = await guild?.channels.fetch(id);
            if (!(channel instanceof TextGuildChannel)) return;

            if (cantidad > 99) return ctx.write({ content: "Cantidad excedida intente otra (no hay sistema pa' eso)" });
            const msglist = await channel.messages.list({
                before: ctx.message?.id || channel.lastMessageId as string,
                limit: cantidad
            });
            const msgIds = msglist.map(msg => msg.id);
            channel.messages.purge(msgIds, "Bulk Delete ");
            ctx.write({ content: "Mensajes borrados correctamente" });
        } catch (error) {
            console.error("Error al eliminar los mensajes:", error);
        }

    }
}