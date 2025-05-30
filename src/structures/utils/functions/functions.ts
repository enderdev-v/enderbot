import chalk from "chalk";
import { UsingClient } from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types/index.js";

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

export const setActivity = (client: UsingClient, type: ActivityType | any, name: string, message?: string) => {
    void client.gateway.setPresence({
      activities: [{ name: name, type: type, state: message }],
      since: Date.now(),
      status: PresenceUpdateStatus.DoNotDisturb,
      afk: false
    });
};

export const snap = (items: string[], m: string) => {
    const d = m.toLowerCase();
    const result = items.filter(item => {
        if (!d.startsWith(item[0])) return;
        return d.split("").every(element => item.includes(element));
    });

    return result;
};