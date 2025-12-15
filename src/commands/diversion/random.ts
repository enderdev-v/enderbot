import { Categories } from "#enderbot/types";
import { sendMessage } from "#enderbot/utils/functions/functions.js";
import { Declare, Command, type CommandContext, Middlewares } from "seyfert";

@Declare({
    name: "random",
    description: "generates random numbers 1-20",
    integrationTypes: ["GuildInstall", "UserInstall"],
    props: {
        usage: "e?random",
        category: Categories.fun
    }
})
@Middlewares(["CheckBots"])
export default class RandomCommand extends Command {
    override async run(ctx: CommandContext) {
        const Aleatorio = String(Math.floor(Math.random() * 20)); sendMessage(ctx, { content: `Tu numero aleatorio es: **${Aleatorio}**` });
    }
}