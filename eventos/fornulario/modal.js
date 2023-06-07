module.exports = {
	name: `interactionCreate`,
	async run(client, int) {
		if (int.isModalSubmit()) {
			if (int.customId === `apply`) {
				let A = int.fields.getTextInputValue(`A`)
				let B = int.fields.getTextInputValue(`B`)
				int.reply(`Hola tu apply fue enviada`)
				client.channels.cache.get(`964015365472518185`).send(`apply hecha por ${int.user.tag} \n Madurez: ${A} Por que: ${B}`)
			}
		}
	}
}