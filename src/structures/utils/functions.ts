import chalk from "chalk";

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