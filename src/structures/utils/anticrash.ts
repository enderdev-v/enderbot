import { LoggerColor } from "#enderbot/types";
import chalk from "chalk";
import { client } from "../../index.js";
import { inspect } from "node:util";
import { WebhookClient, EmbedBuilder } from "discord.js";

function MemoryUsage() {
    const memory: NodeJS.MemoryUsage = process.memoryUsage();
    const gigaBytes = memory.rss / 1024 ** 3;
    if (gigaBytes >= 1) return chalk.bold(`[RAM: ${gigaBytes.toFixed(3)} GB]`);

    const megaBytes = memory.rss / 1024 ** 2;
    if (megaBytes >= 1) return chalk.bold(`[RAM: ${megaBytes.toFixed(2)} MB]`);

    const kiloBytes = memory.rss / 1024;
    if (kiloBytes >= 1) return chalk.bold(`[RAM: ${kiloBytes.toFixed(2)} KB]`);

    return chalk.bold(`[RAM: ${memory.rss.toFixed(2)} B]`);
}

const webhookUrl = "https://discord.com/api/webhooks/1282858862252392570/TIXXaKPW5xZb_ftkMogB1zsFtcv2NWB78p2YSES7SmC0J4DuCuFMwHX0m6pQI4muWbtw";
if (!webhookUrl) {
    throw new Error("Webhook URL is required.");
}
const webhook = new WebhookClient({ url: webhookUrl });

// unhandledRejection

process.on("unhandledRejection", (e) => {
    const embed = new EmbedBuilder()
        .setTitle("enderbot Rejection")
        .setColor(client.config.errorColor)
        .addFields(
            { name: "Reason", value: `\`\`\`${inspect(e, { depth: 0 }).slice(0, 1000)}\`\`\`` },
        )
        .setTimestamp();

    console.error(chalk.bold.red("[ AntiCrash System ]:"), e);
    return webhook.send({ embeds: [embed] });
});

// uncaught exceptions

process.on("uncaughtException", (e, origin) => {

    const embed = new EmbedBuilder()
        .setTitle("enderbot error Exception/Catch")
        .setColor(client.config.errorColor)
        .addFields(
            { name: "Error", value: `\`\`\`${inspect(e, { depth: 0 }).slice(0, 1000)}\`\`\`` },
            { name: "Origin", value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` }
        )
        .setTimestamp();

    console.error(chalk.bold.yellow("[ AntiCrash System ]:"));
    console.log(e, origin);
    return webhook.send({ embeds: [embed] });
});

// uncaught exceptions monitor

process.on("uncaughtExceptionMonitor", (e, origin) => {

    const embed = new EmbedBuilder()
        .setTitle("error Exception Monitor")
        .setColor(client.config.errorColor)
        .setURL("https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor")
        .addFields(
            { name: "Error", value: `\`\`\`${inspect(e, { depth: 0 }).slice(0, 1000)}\`\`\`` },
            { name: "Origin", value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` }
        )
        .setTimestamp();


    console.error(chalk.bold.red("[ AntiCrash System ]:"));
    console.error(e, origin);
    return webhook.send({ embeds: [embed] });
});

process.on("warning", (warn) => {
    const embed = new EmbedBuilder()
        .setTitle("enderbot Exception Monitor Warn")
        .setColor(client.config.errorColor)
        .setURL("https://nodejs.org/api/process.html#event-warning")
        .addFields(
            { name: "Warning", value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\`` }
        )
        .setTimestamp();

    console.error(chalk.bold.yellow("[ AntiCrash WarnSystem ]:"));
    console.error(warn);
    return webhook.send({ embeds: [embed] });
});

process.on("multipleResolved", () => { });
console.log(MemoryUsage(), chalk.bold.hex(LoggerColor.checkLogger)("[ CHECK ]") + " " + "Anticrash cargado");