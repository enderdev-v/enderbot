const Discord = require('discord.js');
const array = require(`../../utilidades/Bots.json`)

module.exports = {
	name: 'channelCreate',
	async run(client, channel) {
		client.channels.cache
			.get('1049143528007159928')
			.send(`canal ${channel.name} ha sido creado`);

		const logs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: 'CREATE_CHANNEL'
		});

		const canal = logs.entries.first();

		const { executor, target } = canal;

		if (!canal) return;
		if (!executor.bot) return;
		if (array.includes(executor.id)) return;
		
		await channel.guild.members
			.ban(executor, { reason: 'Raid.' })
			.catch(e => {});
	}
};
