const Discord = require('discord.js');
const BadBots = require('../../Schemas/BadBots');
const array = require(`../../utilidades/Bots.json`)
module.exports = {
	name: 'channelDelete',
	async run(client, channel) {
		client.channels.cache
			.get('1049143528007159928')
			.send(`canal ${channel.name} ha sido eliminado`);

		const logs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: 'DELETE_CHANNEL'
		});

		const canal = logs.entries.first();

		const { executor, target } = canal;

		if (!canal) return;
		if (!executor.bot) return;
		if (array.includes(executor.id)) return;
		
		await channel.guild.members
			.ban(executor, { reason: 'Raid.' })
			.catch(e => {});

		let data = await BadBots.findOne({ guild: channel.guild.id });
		if (!data) {
			let newdata = new BadBots({
				Bots: [],
				guildId: channel.guild.id
			});
			return await newdata.save();
		}
		await BadBots.findOneAndUpdate(
			{ guild: channel.guild.id },
			{
				$push: {
					Bots: executor.id
				}
			}
		);
	}
};
