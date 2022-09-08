const links = require(`../utilidades/links.json`)

module.exports = {
	name: `messageCreate`,
	async run(client, msg) {
		
		if (msg.author.id === `780277567537414165`) return;
		if (msg.author.bot) return;
    if (msg.channel.id === `955175950314799254` || `954735265988104193` || `901239098025574400`)
		
		for (const link of links) {
			if (msg.content.match(link)) {
				await msg.delete()
				msg.channel.send(`Hola por favor no mandes links`)
				break;
			}
		}

	}
}