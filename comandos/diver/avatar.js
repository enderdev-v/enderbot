const Discord = require(`discord.js`);

module.exports = {
  name: "avatar",
  alias: [],

  execute (client, message, args){

    let usuario = message.mentions.members.first() || message.member;

    let embed = new Discord.MessageEmbed()

    .setTitle(`Avatar de **${usuario.user.username}**`)
    .setImage(usuario.user.displayAvatarURL({ size: 1024, dynamic: true, format: png }))
    .setFooter(`avatar pedido por: ${message.author.username}`);

    message.channel.send({ embeds: [embed] });

  }
  
}