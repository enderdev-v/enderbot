// const Discord = require(`discord.js`);

module.exports = {
	name: 'clear-server',
	alias: [],

	async execute(client, message, args) {
		if (!message.member.permissions.has('ADMINISTRATOR'))
			return message.channel.send(`no tienes permisos`);

		if (!message.guild.me.permissions.has('ADMINISTRATOR'))
			return message.channel.send(`no tienes permisos`);
		message.guild.channels.cache.forEach(channel => channel.delete());
		message.guild.channels
			.create(`#Tranquis`, {
				type: 'text'
			})
			.then(channel => {
				channel.send('Server limpiado');
			});
	}
};
