import { ConfigFlags } from "#enderbot/utils/constants/ConfigFlags.js";
import { createEvent } from "seyfert";
const links = ["https", "discord.gg", "dsc.gg", "www"];

export default createEvent({
    data: { name: "threadCreate" },
    async run(thread, client) {
        const data = await client.db.prisma.configGuild.findUnique({ where: { guildId: thread.guildId } });
        if (!data) return; if (!(data.config & ConfigFlags.ThreadLinksFilter)) return;
        // Bad Bots Logic
        // client.channels.cache.get("1049143528007159928").send(`thread creado como ${thread.name} en ${thread.guild.name}`)
        if (!links.some(link => thread.name.includes(link))) return;
        thread.delete();
        // client.channels.cache.get("1049143528007159928").send(`thread con links eliminado`)        
    }
});