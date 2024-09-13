import BadBots from "#enderbot/Schemas/BadBots.js";
import { createEvent } from "seyfert";

export default createEvent({
    data: { name: "guildMemberAdd" },
    async run(member, ) {
        const data = await BadBots.findOne({ guild: member.guildId });

        if (!data) return;

        if (data.bots.includes(member.id)) {
            await member.ban({ delete_message_seconds: 3000 }, 'Raid.');
        }

    }
})