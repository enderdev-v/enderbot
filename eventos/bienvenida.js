const Discord = require('discord.js')

module.exports = {
  name: "guildMemberAdd",
  async run (client, member) {
    if(member.guild.id != "841476632978915328") return;
    client.channels.cache.get("1002657342128656394").send(`Hola Para verificar habla en <#1002629398463250562> manda algo y yo te verificare`)
  }
}