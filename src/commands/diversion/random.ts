import { Declare, Command, type CommandContext } from 'seyfert';

@Declare({
    name: 'random',
    description: 'generates random numbers 1-20',
    integrationTypes: ["GuildInstall", "UserInstall"]
})
export default class PingCommand extends Command {

    override async run(ctx: CommandContext) {

        const Aleatorio = String(Math.floor(Math.random() * 20));

        ctx.write({ content: `tu numero es: ${Aleatorio}` });
    }
}