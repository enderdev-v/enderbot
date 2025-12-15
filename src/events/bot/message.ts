import { createEvent } from "seyfert";
export default createEvent({
    data: { name: "messageCreate" },
    async run(message, client) {
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
			
			if (message.content.match("discord.gg")) return (await message.delete());
			if (message.content.match(".destroy")) return (await message.guild())?.members.kick(message.author.id, "Deja de spamear");
			if (message.content.match("@everyone")) return (await message.guild())?.members.kick(message.author.id, "Deja de spamear");

		} catch (error) {
			client.logger.error(error);
		}

        // Mention message
        
        if (message.author.bot) return;

        if (message.content.match(`<@${client.me.id}>`)) {
            message.reply({ content: `hola este es mi prefix es: ${client.config.prefix.join(", ")}` });
        }
    }
});