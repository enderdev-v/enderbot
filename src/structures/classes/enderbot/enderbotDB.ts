import { enderbot } from "#enderbot/client";
import { PrismaClient } from "#enderbot/prisma";

const prismaClient = new PrismaClient();
export class enderbotDatabase {
    /**
     * The database client instance.
     * @type {PrismaClient}
     * @readonly
     */

    readonly prisma: PrismaClient = prismaClient;
    readonly client: enderbot;

    constructor(client: any) {
        this.client = client;   
    }
     async connect() {
        try {
            await this.prisma.$connect();
            this.client.logger.check("Database connected successfully.");
        } catch (error) {
            this.client.logger.fatal("Error connecting to the database:", error);
        }
    }

    async disconnect() {
        try {
            await this.prisma.$disconnect();
            this.client.logger.check("Database disconnected successfully.");
        } catch (error) {
            this.client.logger.fatal("Error disconnecting from the database:", error);
        }
    }
    // Prefix Config
    async getPrefix(guildId: string): Promise<string> {
        const data = await this.prisma.prefix.findUnique({ where: { id: guildId } });
        return data?.prefix ?? "?";
    }
     public async setPrefix(guildId: string, prefix: string): Promise<void> {
        await this.prisma.prefix.upsert({
                where: { id: guildId },
                update: { prefix: prefix },
                create: {
                    id: guildId,
                    prefix: prefix,
                },
            })
    }
}