const Discord = require(`discord.js`);

module.exports = {
  name: "stop",
  alias: [`disconnect`, `parar`],

  execute (client, message, args){

    const queue = client.distube.getQueue(message)

    if(!queue) return message.reply(`no hay una cancion en espera`)

       if(!message.member.voice.channel) return message.reply({ content: `Debes estar en un canal de voz`})
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: `Debes estar en el mismo canal de voz que yo`})

         client.distube.stop(message)

    message.channel.send(`Desconectado :D`)
  }
  
}