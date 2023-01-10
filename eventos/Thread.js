const Discord = require('discord.js')
const links = {
  link: [
    "https",
    "discord.gg",
    "dsc.gg",
    "www"
  ]
}
module.exports = {
  name: "threadCreate", 
  async run(client, thread) {
    client.channels.cache.get("1049143528007159928").send(`thread creado como ${thread.name}`)
    if (links.link.includes(thread.name)) {
      thread.delete();
      client.channels.cache.get("1049143528007159928").send(`thread con links eliminado`) 
      
    }
  }
}