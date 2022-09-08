const Discord = require(`discord.js`)
module.exports = {
  name: `interactionCreate`,
  async run(client, int) {
    if (int.isButton()) {
      if (int.customId === `Staff`) {

        let staff = new Discord.Modal()
          .setTitle(`Apply para staff`)
          .setCustomId(`apply`);

        let XD = new Discord.Invitr

        let option = new Discord.TextInputComponent()
          .setCustomId(`A`)
          .setLabel(`del 1 al 10 que tan maduro te consideras`)
          .setStyle(`PARAGRAPH`)
          .setPlaceholder(`1-10`)
          .setRequired(true)

        let option2 = new Discord.TextInputComponent()
          .setCustomId(`B`)
          .setLabel(`Por que quieres ser staff`)
          .setStyle(`PARAGRAPH`)
          .setPlaceholder(`¿Por que?`)
          .setRequired(true)

        let row = new Discord.MessageActionRow()
          .addComponents(option)

        let row2 = new Discord.MessageActionRow()
          .addComponents(option2)

        staff.addComponents(row, row2)

        await int.showModal(staff)
      }
    }



  }
}