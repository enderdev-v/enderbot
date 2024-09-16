import { createEvent } from "seyfert";
export default createEvent({
    data: { name: "messageCreate" },
    async run(message, client) {

        
        if (message.author.bot) return;

        if (message.content.match(`<@${client.me.id}>`)) {
            message.reply({ content: `hola este es mi prefix es: ${client.config.prefix.join(", ")}` });
        }
    }
})