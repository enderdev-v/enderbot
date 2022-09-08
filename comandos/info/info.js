const Discord = require(`discord.js`);

module.exports = {
  name: "info",
  alias: [],

  execute (client, message, args){


    let embed = new Discord.MessageEmbed()
      .setTitle('Informacion de enderbot')
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(0x1afc30)
      .setDescription("```Hola buenas soy enderbot un bot multifuncion que vino a este servidor y que fue endercrack esta es mi info```")
      .addField(`Prefixs:`, `**e! y e?**`)
      .addField(`**Mi creador:**`, `endercrack#4934`)
      .addField(`**Stats**`, `Numero de comandos:  30 \n Funciones: antilinks y apply`, true)
      .setImage("https://th.bing.com/th/id/OIP.499jcnDKhHjqH7MfJrPgCQHaEK?w=295&h=180&c=7&r=0&o=5&pid=1.7")
      
   message.channel.send({ embeds: [embed] });

  

  }
  
}