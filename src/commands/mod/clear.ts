import ms from "ms";
import {
    type CommandContext,
    Declare,
    Command,
    Options,
    TextGuildChannel,
    createIntegerOption,
} from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";

const options = {
    cantidad: createIntegerOption({
        description: "get a a category",
        required: true
    })
}
@Declare({
    name: "clear",
    description: "Borrar mensajes",
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
        const cantidad = ctx.options.cantidad
        const id = ctx.channelId;
        const guild = await ctx.guild()
        const channel = await guild?.channels.fetch(id)
        if (!(channel instanceof TextGuildChannel)) return;

        try {


            for (let i = 0; i <= cantidad; i++) {
                const messageId = await channel.lastMessageId as string
                const message = await channel.messages.fetch(messageId)
                const days = Date.now() - (message.createdAt.getTime() / (1000 * 60 * 60 * 24))

                if (days > 14) return ctx.write({ content: "message Deletes :D" })

                channel.messages.delete(messageId, "bulk Delete")

            }

            ctx.write({ content: "message Deletes :D" })

            console.log('Mensajes eliminados correctamente.');
        } catch (error) {
            console.error('Error al eliminar los mensajes:', error);
        }

    }
}