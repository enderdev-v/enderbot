import { ConfigFlags } from "#enderbot/utils/constants/ConfigFlags.js";
import { createEvent } from "seyfert";
const link = /(https?:\/\/)?(www|yout\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;

export default createEvent({
	data: { name: "messageCreate" },
	async run(message, client) {
		// Mention message
		try {
			// Mention Message 
			if (message.content.startsWith(`<@${client.me.id}>`)) {
				if (message.author.bot) return 0;
				message.reply({ content: `hola este es mi prefix es: ${client.config.prefix.join(", ")}` });
			}
			const crossPostData = await client.db.prisma.messageCrossPost.findUnique({ where: { guildId: message.guildId } });
			
			// Crosspost Message
			if (crossPostData) {
				const channel = await message.channel();
				if (!(crossPostData.channelIds.includes(channel.id)) || !channel.isNews()) return;
				message.crosspost();
			}

			// Antilinks Filter
			const ConfigGuildData = await client.db.prisma.configGuild.findUnique({ where: { guildId: message.guildId! } });
			if (!ConfigGuildData || !(ConfigGuildData.config & ConfigFlags.AntiLinkFilter)) return;

			const AntilinkData = await client.db.prisma.antilink.findUnique({ where: { guildId: message.guildId! } });
			const roles = message.member?.roles.keys || [];
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