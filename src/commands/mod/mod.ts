import { AutoLoad, Command, Declare, Middlewares,} from "seyfert";

@Declare({
    name: "mods",
    description: "Categoria de comandos moderacion",
    integrationTypes: ["GuildInstall", "UserInstall"],
})
@Middlewares(["CheckBots"])
@AutoLoad()
export default class modCommand extends Command {}