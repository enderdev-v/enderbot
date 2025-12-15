import chalk from "chalk";
import { CommandContext, UsingClient } from "seyfert";
import { ActivityType, MessageFlags, PresenceUpdateStatus } from "seyfert/lib/types/index.js";

// Function to validate hex color codes
export const HexColor = (hex: string) => typeof hex.toLowerCase() === "string" && hex.toLocaleLowerCase().length === 6 && !isNaN(Number("0x" + hex.toLowerCase()));

// Function to send messages with consideration for interaction context
export const sendMessage = async (ctx: CommandContext, content: any) => {
    if (ctx.interaction && !ctx.interaction?.authorizingIntegrationOwners["0"]) return await ctx.write({ ...content, flags: MessageFlags.Ephemeral });
    return await ctx.write(content);
}

// Function to GetCmds 
export async function getCmds(category: string, client: UsingClient) {
    const lowerCategory = category.toLowerCase();
    const arrCommands = client.commands.values.filter((command) => command.props.category?.toLowerCase() === lowerCategory).map((cmd) => `- ${cmd.name}`);
    if (arrCommands.length === 0) {
        const command = client.commands.values.find((command) => command.name.toLowerCase() === lowerCategory);
        // @ts-expect-error Needed to access options property
        const options = command?.options?.map((option) => `- ${option.name}`) || [];
        return options;
    }
    return arrCommands
}
// Function to retrieve an emoji by name from the client's application emojis
export const getEmoji = async (client: UsingClient, name: string) => {
    const emojiList = await client.applications.listEmojis()
    if (emojiList.length === 0) return "✨"
    const emojiFind = emojiList.find((x) => x.name === name)
    const emoji = !emojiFind ? `<:${emojiList[0].name}:${emojiList[0].id}>` : `<:${emojiFind.name}:${emojiFind.id}>`

    return emoji
}

// Customize the client's activity status
export const setActivity = (client: UsingClient, type: ActivityType | any, name: string, message: string) => {
    void client.gateway.setPresence({
        activities: [{ name: name, type: type, state: message }],
        since: Date.now(),
        status: PresenceUpdateStatus.DoNotDisturb,
        afk: false
    });
};

// Function to perform a fuzzy search on a list of strings
export const snap = (items: string[], m: string) => {
    const d = m.toLowerCase();
    const result = items.filter(item => {
        if (!d.startsWith(item[0])) return;
        return d.split("").every(element => item.includes(element));
    });
    
    return result;
};

// Get memory usage in a human-readable format
export function memoryUsage() {
    const memory: NodeJS.MemoryUsage = process.memoryUsage();
    const gigaBytes = memory.rss / 1024 ** 3;
    if (gigaBytes >= 1) return chalk.bold(`[RAM: ${gigaBytes.toFixed(3)} GB]`);

    const megaBytes = memory.rss / 1024 ** 2;
    if (megaBytes >= 1) return chalk.bold(`[RAM: ${megaBytes.toFixed(2)} MB]`);

    const kiloBytes = memory.rss / 1024;
    if (kiloBytes >= 1) return chalk.bold(`[RAM: ${kiloBytes.toFixed(2)} KB]`);

    return chalk.bold(`[RAM: ${memory.rss.toFixed(2)} B]`);
}