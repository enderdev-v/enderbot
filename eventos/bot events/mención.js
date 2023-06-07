module.exports = {
	name: `messageCreate`,
	run(client, message) {
		
		if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$}`))) 

    message.reply(`hola este es mi prefix :D \n\ Prefix: e!`)

	}
}