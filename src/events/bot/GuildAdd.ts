import { getEmoji } from "#enderbot/utils/functions/functions.js";
import { createEvent, Embed } from "seyfert";

export default createEvent({
    data: { name: "guildCreate" },
    async run(guild, client) {
        const cuteSmile = await getEmoji(client, "cuteSmile");
        const embed = new Embed()
            .setTitle(`Joined a new server! ${cuteSmile}`)
            .setThumbnail(client.me.avatarURL({ size: 1024, extension: "png" }) || "")
            .setColor(client.config.colors.enderbotColor)
            .addFields(
                {
                    name: "Server Name",
                    value: guild.name,
                },
                {
                    name: "Server ID",
                    value: guild.id,
                },
                {
                    name: "Member Count",
                    value: guild.memberCount.toString(),
                }
            )
            .setTimestamp();

        await client.messages.write("1386447116800364594", {
			embeds: [embed]
		});
    }
});