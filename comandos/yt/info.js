const Discord = require(`discord.js`);

module.exports = {
  name: "enderinfo",
  alias: [],

  execute (client, message, args){

    let embed = new Discord.MessageEmbed()
      .setTitle('informacion de endercrack')
      .setColor(0x00a8b6)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("```hola soy enderbot un asistente de endercrack y esta es la informacion de endercrack```")
      .addField("Redes:", "> [endercrack](https://www.youtube.com/channel/UCv0PpAriU-subfVYnbfQMrg) \n > [Servidor de discord](https://discord.gg/wTeT9gc7Jk)", true)
      .addField("Creador de:", "> endkachu \n > enderbot", true)
     
    if (message.guild.id !== `841476632978915328`) return;
    message.channel.send({ embeds: [embed] })
    


  }
  
}