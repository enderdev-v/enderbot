import "#enderbot/utils/utils/anticrash.js";
import { Embed, Logger, } from "seyfert";
import { enderbot } from "#enderbot/client";
import { customLog } from "#enderbot/classes/Logger.js";
import { webhookId, webhookToken } from "#enderbot/utils/constants/Constants.js";
process.loadEnvFile(".env");

Logger.customize(customLog);
Logger.saveOnFile = "all";
Logger.dirname = "logs";

export const client = new enderbot();

const embed = new Embed().setTitle("enderbot is started!").setDescription("enderbot is now running smoothly.").setColor(client.config.colors.enderbotColor).setTimestamp(new Date()).setFooter({ text: "enderbot" }).setThumbnail("https://enderdev.vercel.app/enderdev.jpg");



client.webhooks.writeMessage(webhookId, webhookToken, {
    body: { embeds: [embed] },
    query: { wait: true }
}).then(async (msg) => { 
    setTimeout(() => msg?.delete(), 5e3);
});


await client.run();