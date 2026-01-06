import { ConfigFlags } from "#enderbot/utils/constants/ConfigFlags.js";
import { createEvent } from "seyfert";
const links = ["https", "discord.gg", "dsc.gg", "www"];
export default createEvent({
	data: { name: "messageCreate" },
    async run(message, client) {
		// Mention message
		if (message.author.bot) return;
		if (message.content.match(`<@${client.me.id}>`)) return message.reply({ content: `hola este es mi prefix es: ${client.config.prefix.join(", ")}` });
		// AntiLink System
		const ConfigGuildData = await client.db.prisma.configGuild.findUnique({ where: { guildId: message.guildId } });
		if (!ConfigGuildData) return; if (!(ConfigGuildData.config & ConfigFlags.AntiLinkFilter)) return; // AntiLinkFilter flag check
	
		try {
			if(message.author.username === "endercrack") return;
			const link = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;
			
			if (link.test(message.content)) {
				await message.delete();
				message.write({ content: "Hola por favor no mandes links"}).then(m => {
					setTimeout(async () => {
						await m.delete();
					}, 4000);
				});
			}
			
			if (links.some(link => message.content.includes(link)) || message.content.match(".destroy") || message.content.match("@everyone")) {
				message.write({ content: "Hola por favor no mandes links"}).then(m => {setTimeout(async () => { await m.delete();}, 4000); });
				return (await message.delete());
			}
		} catch (error) {
			client.logger.error(error);
		}  
    }
});