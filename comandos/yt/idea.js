const Discord = require(`discord.js`);

module.exports = {
  name: "idea",
  alias: [],

  async  execute (client, message, args){

    let idea1 = args[0]
    let idea2 = args[1]
    let idea3 = args[2]
    if (!idea1) return message.reply("no pusiste una idea")
    if (!idea2) return message.reply("no pusiste una idea")
    if (!idea3) return message.reply("no pusiste una idea")

    function Idea(i1, i2, i3) {
      let array = []
      array.push(i1)
      array.push(i2)
      array.push(i3)
      let idea = Math.floor(Math.random() * (array.length))

      return array[idea]
    }
     message.channel.send(Idea(idea1, idea2, idea3))
  }
  
}