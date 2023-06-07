// const links = require(`../utilidades/links.json`);

module.exports = {
	name: `messageCreate`,
	async run(client, msg) {
		try {
			if (msg.author.id === `780277567537414165`) return;
			if (msg.author.id === `862905211001503774`) return;
			if (msg.author.id === '282286160494067712') return;
			if (msg.channel.id === `955175950314799254`) return;
			if (msg.channel.id === `954735265988104193`) return;
			if (msg.channel.id === `901239098025574400`) return;
			if (msg.channel.id === `1112920459562995782`) return;
		//	if (msg.channel.id === `954417598508965969`) return;
			//  if (msg.channel.id === ) return;
			let link = new RegExp(
				/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g
			);

			let message = 'https://discord.gg/abc';

			if (msg.content.match(link)) {
				await msg.delete();
				msg.channel.send(`Hola por favor no mandes links`).then(m => {
					setTimeout(async () => {
						await m.delete();
					}, 4000);
				});
			}
			if (msg.content.match('.destroy')) return msg.author.ban();
			if (msg.content.match('@everyone')) return msg.author.ban();
		} catch (error) {
			console.log(error);
		}
	}
};
