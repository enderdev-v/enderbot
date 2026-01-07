import { Declare, SubCommand, type CommandContext, Middlewares, createChannelOption, Options } from "seyfert";
const options = {
    option: createChannelOption({
        description: "Channel Options",
        required: true,
    }),
};
@Declare({
    name: "crosspost",
    description: "configuracion de auto crosspost",
    integrationTypes: ["GuildInstall"]
})
@Middlewares(["CheckBots"])
@Options(options)
export default class GuildCommand extends SubCommand {
    override async run(ctx: CommandContext<typeof options>) {
        if (!ctx.guildId) return;
        const option = ctx.options.option;
        await ctx.client.db.prisma.messageCrossPost.upsert({ where: { guildId: ctx.guildId }, update: { channelId: option.id }, create: { guildId: ctx.guildId, channelId: option.id } });
        return ctx.write({ content: `Configuracion de <#${option.id}> creada, ahora cada mensaje sera publicado automaticamente` });

    }
}