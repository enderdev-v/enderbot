import { BaseGuildChannel, CommandContext, } from 'seyfert';
import { Declare, SubCommand } from 'seyfert/lib/commands';
import { ChannelType, RESTPostAPIGuildChannelJSONBody } from 'seyfert/lib/types';

@Declare({
    name: 'nuke',
    description: 'Nukes the canal'
})
export default class NukeCommand extends SubCommand {

    async run(ctx: CommandContext) {

        const canal = await ctx.guild()?.channels.fetch(ctx.channelId)
        if (canal instanceof BaseGuildChannel) {
            const position = canal.position;
            
            const tipo = canal.isTextGuild() ? ChannelType.GuildText : canal.isNews() ? ChannelType.GuildAnnouncement : canal.isVoice() ? ChannelType.GuildVoice : ChannelType.GuildStageVoice
            const options: RESTPostAPIGuildChannelJSONBody = {
                name: canal.name,
                type: tipo,
                nsfw: canal.nsfw,
                position: canal.position,
            };
            
            await ctx.guild()?.channels.create(options).then(c => {
                if (!(c instanceof BaseGuildChannel)) return;
                c.setPosition(position)
            })
            canal.delete()

            await ctx.write({ content: "Canal nuked" })
        } else return ctx.write({ content: "Some Error" })



    }
}