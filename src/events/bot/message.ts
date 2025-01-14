import PassChannels from "#enderbot/Schemas/PassChannels.js";
import PassUsers from "#enderbot/Schemas/PassUsers.js";
import { createEvent } from "seyfert";
export default createEvent({
    data: { name: "messageCreate" },
    async run(message, client) {
        // anti spam
        const Bypass = await PassUsers.findOne({ guild: message.guildId })
        const Bypassed = await PassChannels.findOne({ guild: message.guildId })
		try {
			if (Bypass?.users.includes(message.author.id)) return;
			if (Bypassed?.channels.includes(message.channelId)) return;
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
			if (message.content.match('.destroy')) return (await message.guild())?.members.kick(message.author.id, "Deja de spamear");
			if (message.content.match('@everyone')) return (await message.guild())?.members.kick(message.author.id, "Deja de spamear");

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