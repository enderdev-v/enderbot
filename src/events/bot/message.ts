import { createEvent } from "seyfert";
export default createEvent({
    data: { name: "messageCreate" },
    async run(message, client) {
        // anti spam
        const users = ['955175950314799254', '780277567537414165', '862905211001503774', '282286160494067712'];
		const channels = ['954735265988104193', '901239098025574400', '1112920459562995782'];
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