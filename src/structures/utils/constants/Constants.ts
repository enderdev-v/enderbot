import * as pack from "../../../../package.json" with { type: "json" };


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