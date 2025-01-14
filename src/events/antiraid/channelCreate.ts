import BadBots from "#enderbot/Schemas/BadBots.js";
import { createEvent, TextGuildChannel } from "seyfert";
import { APIAuditLog, APIAuditLogEntry, AuditLogEvent, } from 'discord-api-types/v10';
import LogsSchema from "#enderbot/Schemas/LogsSchema.js";
import PassBots from "#enderbot/Schemas/PassBots.js";

export default createEvent({
    data: { name: "channelCreate" },
    async run(ch, client) {
        if (!(ch instanceof TextGuildChannel)) return;
        const LogsData = await LogsSchema.findOne({ guild: ch.guildId })

        if (!LogsData) return;

        await client.messages.write(LogsData.channelId, {
            content: `canal ${ch.name} ha sido creado`,
        });
        const guild = await client.guilds.fetch(ch.guildId as string);
        const baseURL = 'https://discord.com/api/v10';

        const response = await fetch(`${baseURL}/guilds/${ch.guildId }/audit-logs`, {
            method: 'GET', 
            headers: {
                Authorization: `Bot ${process.env.token}`, // Token de autenticación del bot
                'Content-Type': 'application/json'
            },
        });

       
        if (!response.ok) {
            throw new Error(`Error al obtener los logs: ${response.statusText}`);
        }

        const auditLogs = await response.json() as APIAuditLog;

        const CreateLogs = auditLogs.audit_log_entries.filter(
            (log: APIAuditLogEntry) => log.action_type === AuditLogEvent.ChannelCreate
        );

        if (CreateLogs.length < 0) return;

        const ultimoLog = CreateLogs.sort((a, b) => {
            const diff = BigInt(b.id) - BigInt(a.id);
            return Number(diff);
        })[0];

        const bypassed = await PassBots.findOne({ guild: ch.guildId })

        

        const executor = ultimoLog.user_id as string;  
        if (bypassed) {
            if (bypassed?.bots.includes(executor) || executor === client.botId) return;
        }

       guild.members.ban(executor, { delete_message_seconds: 1000 }, "Intento de Raid!" ).catch(err => {
        client.logger.error(err);
       })
        
        
        const data = await BadBots.findOne({ guild: ch.guildId });
        if (!data) {
            const newdata = new BadBots({
                Bots: [],
                guildId: ch.guildId
            });
            return await newdata.save();
        }
        await BadBots.findOneAndUpdate(
            { guild: ch.guildId },
            {
                $push: {
                    Bots: executor
                }
            }
        );
        
    }
})