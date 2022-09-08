const Discord = require(`discord.js`);

module.exports = {
  name: "apply",
  alias: [],

  async  execute (client, message, args){

		let row = new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
       .setCustomId("Staff")
       .setLabel("Staff")
       .setStyle("SECONDARY")
			 .setEmoji(`963553697042944040`)
			])
		
     message.channel.send({ content: `Applys para Staff \n solo toca el boton `, components: [row] })

		
  }
  
}