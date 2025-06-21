import { config } from "seyfert";
process.loadEnvFile(".env") 

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
    applicationId
 });
export default seyfert