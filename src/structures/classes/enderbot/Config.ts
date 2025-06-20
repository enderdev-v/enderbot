import { enderbotConfigType } from '#enderbot/types';

export class enderbotConfig implements enderbotConfigType {
	colors = {
		errorColor: 0xe14e2c,
		checkColor: 0x297020,
		enderbotColor: 0xFFFDBE,
		debugColor:  0xdbd20d,
		infoColor: 0x085480,
	};
	devsId = [
		'780277567537414165', // <- endercrack/enderdev-v
	];
	ownersId = [
		'780277567537414165' // <- endercrack/enderdev-v
	];
	prefix = ["e!", "e?"];
	inviteLink = "https://discord.com/oauth2/authorize?client_id=862905211001503774&integration_type=1&scope=applications.commands"
}