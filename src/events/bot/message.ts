import { createEvent } from "seyfert";

export default createEvent({
	data: { name: "messageCreate" },
    async run(message, client) {
		// Mention message
		if (message.author.bot) return;
		if (message.content.match(`<@${client.me.id}>`)) return message.reply({ content: `hola este es mi prefix es: ${client.config.prefix.join(", ")}` });
		const crossPostData = await client.db.prisma.messageCrossPost.findUnique({ where: { guildId: message.guildId } });
		if (crossPostData) {
			const channel = await  message.channel();
			if ((message.channelId !== crossPostData.channelId) && !channel.isNews()) return;
			message.crosspost();
		}
		// AntiLink System
		
    }
});