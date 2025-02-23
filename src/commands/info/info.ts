import { Declare, Command, type CommandContext, Embed, Middlewares } from 'seyfert';

@Declare({
    name: 'info',
    description: 'Informacion sobre mi',
    integrationTypes: ["GuildInstall"]
})
@Middlewares(["CheckBots"])
export default class InfoCommand extends Command {

    override async run(ctx: CommandContext) {
        const embed = new Embed()
            .setTitle('Informacion de enderbot')
            .setThumbnail(ctx.client.me?.avatarURL({ extension: 'png', forceStatic: true }) as string)
            .setColor(ctx.client.config.enderbotColor)
            .setDescription('***Hola soy enderbot, soy un bot divertido y personal. Claro tengo algunas funciones de proteccion y todo eso \n pero me concentro en pasarmela bien xd***')
            .addFields([
                {
                    name: 'Prefixes',
                    value: ctx.client.config.prefix.join(", ")
                },
                {
                    name: 'Creador',
                    value: '[endercrack](https://www.youtube.com/@endercrackyt)'
                }
            ])

        ctx.write({ embeds: [embed] });
    }
}