import { ConfigFlags } from "#enderbot/utils/constants/ConfigFlags.js";
import { createEvent } from "seyfert";
const link = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;

export default createEvent({
    data: { name: "threadCreate" },
    async run(thread, client) {
        const data = await client.db.prisma.configGuild.findUnique({ where: { guildId: thread.guildId } });
        if (!data || !(data.config & ConfigFlags.ThreadLinksFilter)) return; 
        if (data.channelId) await client.messages.write(data.channelId, { content: `thread creado como ${thread.name} en ${thread.guild.name}`, });
        if (!link.test(thread.name)) return;
        thread.delete();
        if (data.channelId) await client.messages.write(data.channelId, { content: `# Thread AuditLog \n Se ha eliminado un thread que contenia links en su nombre: \`${thread.name}\``, });
    }
});