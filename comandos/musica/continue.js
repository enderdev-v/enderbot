const Discord = require(`discord.js`);

module.exports = {
  name: "continue",
  alias: [],

  async execute (client, message, args){

       if(!message.member.voice.channel) return message.reply({ content: `Debes estar en un canal de voz`})
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: `Debes estar en el mismo canal de voz que yo`})

    
    const queue = client.distube.getQueue(message)

    if(!queue) return message.reply(`no hay una cancion en espera`)

    
    
    try {
      await client.distube.resume(message.member.voice.channel)
      message.reply(`La cancion ha sido resumida correctamente`)
    } catch(e) {
      console.log(e)
    }

  }
  
}