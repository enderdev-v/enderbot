// @ts-check is better
import { config } from "seyfert";
import dotenv from "dotenv"
dotenv.config()

const token = process.env.token;
const applicationId = process.env.appID;
if (!token) throw new Error("No pusiste el token")
if (!token) throw new Error("No pusiste la application id")
    
const seyfert = config.bot({
    token: token,
    intents: ["Guilds", 'MessageContent', 'GuildMessages', 'GuildMembers', 'GuildWebhooks'],
    locations: {
        base: "src",
        commands: "commands",
        events: "events",
    }, 
    applicationId: applicationId
 });
export default seyfert