import * as pack from "../../../../package.json" with { type: "json" };
process.loadEnvFile(".env")
export const { DATABASE_URL, appID, token, webhookURL, webhookId, webhookToken } = process.env

export const version = pack.default.version;

export const PrismaVersion = pack.default.devDependencies.prisma
export const SeyfertVersion = pack.default.dependencies.seyfert;
export const typescriptVersion= pack.default.devDependencies.typescript;


export const bots = [
	'924525977437077515', // <--- endkachu 
	'710034409214181396', // <--- ticket king
	'416358583220043796' // <--- Xenon
];

export const UsualColors = {
    White: 0xf4feff,
    Color: "FFFDBE"
}

export const GithubRepo = "https://github.com/enderdev-v/enderbot"

export const EnviromentKeys = {
	DATABASE_URL,
	token,
	webhookId,
	appID,
	webhookToken,
	webhookURL
}