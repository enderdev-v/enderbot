const { MessageEmbed, MessageActionRow, MessageButton } = require(`discord.js`);

module.exports = {
	name: 'autoroles',
	alias: [],

	async execute(client, message, args) {
		let btns = new MessageActionRow().addComponents(
			[
				new MessageButton()
					.setStyle('SECONDARY')
					.setLabel(`Encuestas`)
					.setCustomId('encuestas')
					.setEmoji(`📊`)
			],
			[
				new MessageButton()
					.setStyle('SECONDARY')
					.setLabel(`Updates`)
					.setCustomId('updates')
					.setEmoji(`🔧`)
			],
			[
				new MessageButton()
					.setStyle('SECONDARY')
					.setLabel(`Anuncios`)
					.setCustomId('anuncios')
					.setEmoji(`📢`)
			]
		);

		const embed = {
			title: 'Autoroles',
			description:
				'llegaron los autoroles y con esto podrás darle y obtener un ping en específico',
			color: 0x00c800
		};

		message.channel.send({ embeds: [embed], components: [btns] });
	}
};
