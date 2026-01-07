import { ConfigFlags } from "#enderbot/utils/constants/ConfigFlags.js";
import { createEvent } from "seyfert";

export default createEvent({
    data: { name: "guildMemberAdd" },
    async run(member, client) {
        // Bad Bots Logic
        const guildConfig = await client.db.prisma.configGuild.findUnique({ where: { guildId: member.guildId } });
        const data = await client.db.prisma.badBots.findUnique({ where: { guildId: member.guildId } });
        if(!data) return; if(!guildConfig) return; if (!(guildConfig.config & ConfigFlags.BadBotsFilter)) return; if (!data.bots.includes(member.id)) return;
        await member.ban({ delete_message_seconds: 0 }, "Este bot está catalogado como malo o malicioso").catch(e => { client.logger.error("Error banning bad bot:", e); });
    }
});