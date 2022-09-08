const Discord = require(`discord.js`);

module.exports = {
  name: "play",
  alias: [`p`],

  execute (client, message, args){

      let cancion = args.join(` `)
    if(!cancion) return message.reply(`debes poner una cancion`)
    if(!message.member.voice.channel) return message.reply(`Debes estar en un canal de voz`)

    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`Debes estar en el mismo canal de voz que yo`)

    message.client.distube.playVoiceChannel(
      message.member.voice.channel,
      cancion,
      {
        textChannel: message.channel,
        member: message.member
      }
    );

    message.reply(`Reproducioendo cancion...`)

  }
  
}