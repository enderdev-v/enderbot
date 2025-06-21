process.loadEnvFile(".env")
import { Logger } from "seyfert";
import { enderbot } from "#enderbot/client";
import { customLog } from "#enderbot/classes/Logger.js";
import "#enderbot/utils/utils/anticrash.js"
import { webhookId, webhookToken } from "#enderbot/utils/constants/Constants.js";


Logger.customize(customLog);
Logger.saveOnFile = "all";
Logger.dirname = "logs";

export const client = new enderbot();

client.webhooks.writeMessage(webhookId,webhookToken, {
    body: { content: "enderbot is starting..." },
    query: {wait: true}
});

await client.run()
