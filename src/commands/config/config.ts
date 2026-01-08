import { AutoLoad, Command, Declare, Middlewares,} from "seyfert";

@Declare({
    name: "config",
    description: "Categoria de comandos configuracion",
    integrationTypes: ["GuildInstall"],
})
@Middlewares(["CheckBots"])
@AutoLoad()
export default class ConfigCommand extends Command {}