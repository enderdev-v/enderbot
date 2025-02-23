import { LoggerColor } from "#enderbot/types";
import chalk from "chalk";
import { client } from "../../index.js";
import { inspect } from "node:util";
import { WebhookClient, EmbedBuilder } from "discord.js";
import { memoryUsage } from "./functions.js";

const webhookUrl = process.env.webhookURL;
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
console.log(memoryUsage(), chalk.bold.hex(LoggerColor.checkLogger)("[ CHECK ]") + " " + "Anticrash cargado");