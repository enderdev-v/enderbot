import { ConfigFlags } from "#enderbot/utils/constants/ConfigFlags.js";
import { createEvent } from "seyfert";
const link = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;

export default createEvent({
    data: { name: "threadCreate" },
    async run(thread, client) {
        const data = await client.db.prisma.configGuild.findUnique({ where: { guildId: thread.guildId } });
        // @ts-expect-error (!data) the condition is check the data existence
        if (!data && !(data.config & ConfigFlags.ThreadLinksFilter)) return; 

        // client.channels.cache.get("1049143528007159928").send(`thread creado como ${thread.name} en ${thread.guild.name}`)
        if (!link.test(thread.name)) return;
        thread.delete();
        // client.channels.cache.get("1049143528007159928").send(`thread con links eliminado`)        
    }
});