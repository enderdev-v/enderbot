const Discord = require(`discord.js`);

module.exports = {
  name: "help",
  alias: [],

  execute (client, message, args){

    if (message.content.toLowerCase().endsWith("info"))return message.channel.send("hola los comandos de informacion son: \n\ e!info \n\ e!ender \n\ e!update \n\ e!ping \n\ e!help ")

    if (message.content.toLowerCase().endsWith("enderbot")) return message.channel.send("hola los comandos de enderbot son: \n\ e!hola  \n\ e!poke \n\ e!amigos")

    if (message.content.toLowerCase().endsWith("utilidad")) return message.channel.send("hola los comandos de utilidad son: \n\ e!revive \n\ e!music \n\ e!say \n\ e!send ")

    if (message.content.toLowerCase().endsWith("diversion")) return message.channel.send("hola los comandos de diversion son: \n\ e!prank \n\ e!8ball \n\ e!ask \n\ e!random \n\ e!ask")
    
    if(message.content.toLowerCase().endsWith("moderacion")) return message.channel.send(`los comandos de moderacion que tengo señor son: \n\ e!kick \n\ e!ban \n\ e!nuke \n\ e!mute \n\ e!unmute`)

    if(message.content.toLowerCase().endsWith("musica")) return message.channel.send(`los comandos de musica: \n\ e!play \n\ e!queue \n\ e!stop \n\ e!pause \n\ e!continue`)

    if(message.content.toLowerCase().endsWith("youtube")) {
      for(let i = 0; message.guild.id != `841476632978915328`; i++){
        return message.channel.send(`hola  estas son las categorias de mis comandos \n\ info \n\ enderbot \n\ utilidad \n\ diversion \n\ moderacion`)
      }

      return message.channel.send(`los comandos de youtube son: \n\ e!channel \n\ e!enderinfo \n\ e!team \n\ e!video`)
    }

    if(message.guild.id === `841476632978915328`) return message.channel.send(`hola  estas son las categorias de mis comandos \n\ info \n\ enderbot \n\ utilidad \n\ diversion \n\ moderacion \n\ youtube \n\ musica`)
    message.channel.send(`hola  estas son las categorias de mis comandos \n\ info \n\ enderbot \n\ utilidad \n\ diversion \n\ moderacion \n\ musica`)

  }
} 