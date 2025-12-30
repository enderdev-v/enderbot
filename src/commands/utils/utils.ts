import { AutoLoad, Command, Declare, Middlewares,} from "seyfert";

@Declare({
    name: "utils",
    description: "Categoria de comandos utilitarios",
    integrationTypes: ["GuildInstall", "UserInstall"],
})
@Middlewares(["CheckBots"])
@AutoLoad()
export default class UtilCommand extends Command {}