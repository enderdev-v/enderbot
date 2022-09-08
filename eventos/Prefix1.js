module.exports = {
  name: `messageCreate`,
  run(client, message) {

    function Troll() {
    
      let num = Math.floor(Math.random() * 100)
      let xd = Math.floor(Math.random() * 100)

      if (xd === num) {
        let pranks = [`el de arriba es feo`, `el de abajo no tendra novia`, `el que me uso no tendra novia \n\ me uso ${message.author.tag}`]
        let random = Math.floor(Math.random() * (pranks.length));
        return message.channel.send(pranks[random])
      }
    }

    if (message.channel.type === `dm`) return;
    if (message.author.bot) return;

    let prefix = `e!`
    let prefix2 = `e?`

    if (message.content.startsWith(prefix)) {

      let usuario = message.mentions.members.first() || message.member;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      ///////Handler///////

      let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

      

      if (cmd) {
        cmd.execute(client, message, args)
      }
      Troll()
    }
    if (message.content.startsWith(prefix2)) {


      let usuario = message.mentions.members.first() || message.member;
      const args = message.content.slice(prefix2.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      ///////Handler///////

      let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

      
      if (cmd) {
        cmd.execute(client, message, args)
      }
      Troll()
    }

  }
}