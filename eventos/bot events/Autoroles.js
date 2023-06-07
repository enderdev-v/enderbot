module.exports = {
	name: 'interactionCreate',
	async run(int, client) {
		
			switch (int.customId) {
				case 'updates':
					if (!int.member.roles.cache.has('1069017934132940850')) {
						int.reply({
							content: `Rol <@&1069017934132940850> añadido`,
							ephemeral: true
						});

						setTimeout(async function() {
							await int.member.roles.add('1069017934132940850');
						}, 3000);
					} else {
						int.reply({
							content: `Rol <@&1069017934132940850> removido`,
							ephemeral: true
						});
						setTimeout(async function() {
							await int.member.roles.remove('1069017934132940850');
						}, 3000);
					}
					break;
				case 'anuncios':
					if (!int.member.roles.cache.has('1069017855254872159')) {
						int.reply({
							content: `Rol <@&1069017934132940850>`,
							ephemeral: true
						});

						setTimeout(async function() {
							await int.member.roles.add('1069017855254872159');
						}, 3000);
					} else {
						int.reply({
							content: `Rol <@&1069017934132940850> removido`,
							ephemeral: true
						});
						setTimeout(async function() {
							await int.member.roles.remove('1069017855254872159');
						}, 3000);
					}
					break;
				default:
					if (!int.member.roles.cache.has('1069017997630521477')) {
						int.reply({
							content: `Rol <@&1069017934132940850> añadido`,
							ephemeral: true
						});

						setTimeout(async function() {
							await int.member.roles.add('1069017997630521477');
						}, 3000);
					} else {
						int.reply({
							content: `Rol <@&1069017997630521477> removido`,
							ephemeral: true
						});
						setTimeout(async function() {
							await int.member.roles.remove('1069017997630521477');
						}, 3000);
					}
					break;
			}
		
	}
};
