import { SeyfertVersion, typescriptVersion, PrismaVersion } from '#enderbot/utils/constants/Constants.js';
import { Declare, Command, type CommandContext,  Middlewares, Embed } from 'seyfert';

@Declare({
  name: 'botstats',
  description: 'Informacion de desarrollo de enderbot',
  aliases: ["devnnfo", "dev"],
})
@Middlewares(["Onlydev", "CheckBots"])
export default class DevInfoCommand extends Command {
  public override async run(ctx: CommandContext) {
    function memoryUsage() {
            const memory: NodeJS.MemoryUsage = process.memoryUsage();
            const gigaBytes = memory.rss / 1024 ** 3;
            if (gigaBytes >= 1) return `${gigaBytes.toFixed(3)} GB`;

            const megaBytes = memory.rss / 1024 ** 2;
            if (megaBytes >= 1) return `${megaBytes.toFixed(2)} MB`;

            const kiloBytes = memory.rss / 1024;
            if (kiloBytes >= 1) return `${kiloBytes.toFixed(2)}`;

            return `${memory.rss.toFixed(2)}`;
        }

        function cpuUsage() {
            const cpuUsage = process.cpuUsage();
            const elapsedMicros = process.uptime() * 1_000_000;

            const systemPercent = ((cpuUsage.system / elapsedMicros) * 100).toFixed(2);
            const userPercent = ((cpuUsage.user / elapsedMicros) * 100).toFixed(2);

            return [`System: ${systemPercent}%`, `User: ${userPercent}%`];
        }

        const embed = new Embed()
            .setTitle("***Informacion de enderbot***")
            .setThumbnail(ctx.client.me.avatarURL({ forceStatic: true }) as string)
            .setColor(ctx.client.config.enderbotColor as number)
            .setDescription("***Hola dev que tal como estas aqui te doy un resumen para que no entres a otros lados :D***")
            .setFields([
                 {

                    name: "Lenguaje:",
                    value: `\`\`\`ts\n \"Typescript\" ver. ${typescriptVersion} \n \`\`\``,
                    inline: false
                },
                {
                    name: "**Librerias:**",
                    value: `* Seyfert **v${SeyfertVersion}** \n* Prisma **v.${PrismaVersion}** \n* Canvas **2.10.0**`,
                    inline: true
                },
                {
                    name: "**Stats**",
                    value: `>>> **RAM Usage:** **__${memoryUsage()}__** \n **CPU Usage** **__${cpuUsage().join(" ")}__**`,
                    inline: true
                }
            ])

        await ctx.write({ embeds: [embed] });
    
  }
}