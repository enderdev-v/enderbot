import { Logger, Embed } from "seyfert";
import { enderbot } from "#enderbot/client";
import { customLog } from "#enderbot/classes/Logger.js";
import { inspect } from "node:util";
import { webhookId, webhookToken } from "#enderbot/utils/constants/Constants.js";
import chalk from "chalk";

process.loadEnvFile(".env") 


Logger.customize(customLog);
Logger.saveOnFile = "all";
Logger.dirname = "logs";

export const client = new enderbot();
await client.run()

// anticrash 


client.logger.enderbot("Starting Anticrash System");
function sendEmbed(title: string, fields: { name: string, value: string }[], url?: string) {
    const embed = new Embed()
        .setTitle(`enderbot ${title}`)
        .setColor(client.config.colors.errorColor)
        .setTimestamp();
    if (url) embed.setURL(url);
    embed.addFields(fields);
    return client.webhooks.writeMessage(webhookId, webhookToken, { body: { embeds: [embed] } });
}

function formatField(name: string, value: unknown) {
    return { name, value: `\`\`\`${inspect(value, { depth: 0 }).slice(0, 1000)}\`\`\`` };
}

process.on("unhandledRejection", (e) => {
    console.error(chalk.bold.red("[ AntiCrash System ]:"), e);
    sendEmbed("Unhandled Rejection", [formatField("Reason", e)]);
});

process.on("uncaughtException", (e, origin) => {
    console.error(chalk.bold.yellow("[ AntiCrash System ]:"));
    console.log(e, origin);
    sendEmbed("Uncaught Exception", [
        formatField("Error", e),
        formatField("Origin", origin)
    ]);
});

process.on("uncaughtExceptionMonitor", (e, origin) => {
    console.error(chalk.bold.red("[ AntiCrash System ]:"));
    console.error(e, origin);
    sendEmbed(
        "Exception Monitor",
        [formatField("Error", e), formatField("Origin", origin)],
        "https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor"
    );
});

process.on("warning", (warn) => {
    console.error(chalk.bold.yellow("[ AntiCrash WarnSystem ]:"));
    console.error(warn);
    sendEmbed(
        "Warning",
        [formatField("Warning", warn)],
        "https://nodejs.org/api/process.html#event-warning"
    );
});

process.on("multipleResolved", () => {});
