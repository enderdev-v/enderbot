

module.exports = {
  name: "messageCreate",
  async run (client, msg) {
    if (msg.channel.id !== "1002629398463250562") return;
    if (msg.author.id === "862905211001503774") return;
    if (msg.author.bot) return;

    if(!msg.member.roles.cache.has("901239070716473345")) {
      
      msg.reply(`Rol añadido a ${msg.author}`)

      setTimeout (async function() {
        await msg.member.roles.add("901239070716473345")
      }, 3000)
    } else {
      msg.reply("como no tienes el rol si eres staff y owner :0")
    }
  }
}