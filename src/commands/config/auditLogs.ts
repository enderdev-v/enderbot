import { Declare, SubCommand, type CommandContext, Middlewares, createChannelOption, Options } from "seyfert";
const options = {
    channel: createChannelOption({
        description: "Channel Options",
        required: true,
    }),
};
@Declare({
    name: "auditlog",
    description: "configuracion de los auditlogs",
    integrationTypes: ["GuildInstall"]
})
@Middlewares(["CheckBots"])
@Options(options)
export default class GuildCommand extends SubCommand {
    override async run(ctx: CommandContext<typeof options>) {
        if (!ctx.guildId) return;
        const option = ctx.options.channel;
        await ctx.client.db.prisma.configGuild.upsert({ where: { guildId: ctx.guildId }, update: { channelId: option.id }, create: { guildId: ctx.guildId, channelId: option.id } });
        return ctx.write({ content: `Configuracion de <#${option.id}> creada, ahora cada mensaje sera publicado automaticamente` });

    }
}