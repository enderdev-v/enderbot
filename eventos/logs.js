 module.exports = {
  name: "guildMemberadd",
  async run(client, member) {
    client.channels.cache.get("901239070716473345").send(`Hola ${member}`) 
  }
}