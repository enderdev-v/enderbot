import { ConfigFlags } from "#enderbot/utils/constants/ConfigFlags.js";
import { createEvent } from "seyfert";
const link = /(https?:\/\/)?(www|yout\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;

export default createEvent({
	data: { name: "messageCreate" },
	async run(message, client) {
		try {
			const ConfigGuildData = await client.db.prisma.configGuild.findUnique({ where: { guildId: message.guildId! } });
			if (!ConfigGuildData || !(ConfigGuildData.config & ConfigFlags.AntiLinkFilter)) return;
			
			const AntilinkData = await client.db.prisma.antilink.findUnique({ where: { guildId: message.guildId! } });
			const roles = await message.member?.roles.keys || [];
			// Check for exceptions 
			if (AntilinkData?.MembersExceptions.includes(message.author.id) || AntilinkData?.RolesExceptions.some(roleId => roles.includes(roleId))) return;
			if (!link.test(message.content) || message.content.match(".destroy") || message.content.match("@everyone")) return;
			// Delete message and notify user
			message.write({ content: "Hola por favor no mandes links" }).then(m => { setTimeout(async () => { await m.delete(); }, 4000); });
			await message.delete();
			// Catch errors
		} catch (error) { client.logger.error(error); }
	}
});