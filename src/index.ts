import { Logger } from "seyfert";
import { enderbot } from "#enderbot/client";
import { customLog } from "#enderbot/classes/Logger.js";
import "dotenv/config";
import "#enderbot/utils/anticrash.js"
import "./server"

Logger.customize(customLog);
Logger.saveOnFile = "all";
Logger.dirname = "logs";

export const client = new enderbot();
client.run()
