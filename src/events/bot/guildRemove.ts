import { getEmoji } from "#enderbot/utils/functions/functions.js";
import { createEvent, Embed, Guild } from "seyfert";

export default createEvent({
  data: { name: "guildDelete" },
  async run(guild, client) {
    if (guild.unavailable) return;

    const sad = await getEmoji(client, "sad");
    const embed = new Embed()
      .setTitle(`I left from other server ${sad}`)
      .setThumbnail(client.me.avatarURL({ size: 1024, extension: "png" }) || "")
      .setColor(client.config.colors.enderbotColor)
      .addFields({ name: "Server Name",  value: (guild as Guild).name, }, { name: "Server ID", value: (guild as Guild).id, })
      .setTimestamp();

    await client.messages.write("1386447116800364594", { embeds: [embed] });
  }
});