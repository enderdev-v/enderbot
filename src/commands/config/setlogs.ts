import { Command, CommandContext, createChannelOption,  Declare, Options } from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";
import ms from "ms"
import LogsSchema from "#enderbot/Schemas/LogsSchema.js";

const options = {
    channel: createChannelOption({
        description: "Un canal donde quieras recibir logs canales"
    })
};

@Declare({
    name: "setlogs",
    description: "Configura el sistema de logs del server xd",
    integrationTypes: ["GuildInstall"],
})
@Options(options)
export default class SetlogsCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    public override async run(ctx: CommandContext<typeof options>) {
        const channel = ctx.options.channel;
        if (!channel) return ctx.write({ content: 'no hay texto'});

        await LogsSchema.findOneAndUpdate(
			{ guild: ctx.guildId },
			{ guild: ctx.guildId, channelId: channel.id },
			{ new: true, upsert: true }
		);
		ctx.write({ embeds: [{ title: "Canal establecido", description: `<:check:963554878200901692> Canal ${channel} establecido correctamente`, color: ctx.client?.config.checkColor }] });

    }
}