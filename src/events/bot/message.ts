import { createEvent } from "seyfert";
export default createEvent({
    data: { name: "messageCreate" },
    async run(message, client) {
        // anti spam
        const users = [
			"924525977437077515", // -> enderdev
			"282286160494067712", // -> PingCord
			"1085016217456222279", // -> Themurft
			"1270550846538780692", // -> TheMurft Bot
		];
		const channels = [
			"1216084854442295480", // -> Alliance enderdev
			"1271300670397616219", // -> ALliance dreamy pallace
			"1324784504258302099", // -> Alliance Cazadores de simps
		];
		try {
			if (users.includes(message.author.id)) return;
			if (channels.includes(message.channelId)) return;
			const link = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;
			
			if (link.test(message.content)) {
				await message.delete();
				message.write({ content: 'Hola por favor no mandes links'}).then(m => {
					setTimeout(async () => {
						await m.delete();
					}, 4000);
				});
			}
			
			if (message.content.match("discord.gg")) return (await message.delete())
			if (message.content.match('.destroy')) return (await message.guild())?.members.ban(message.author.id, { delete_message_seconds: 30000 }, "Deja de spamear");
			if (message.content.match('@everyone')) return (await message.guild())?.members.ban(message.author.id, { delete_message_seconds: 30000 }, "Deja de spamear");

		} catch (error) {
			client.logger.error(error);
		}

        // Mention message
        
        if (message.author.bot) return;

        if (message.content.match(`<@${client.me.id}>`)) {
            message.reply({ content: `hola este es mi prefix es: ${client.config.prefix.join(", ")}` });
        }
    }
})