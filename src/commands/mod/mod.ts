import { AutoLoad, Command, Declare, Middlewares,} from "seyfert";

@Declare({
    name: "mod",
    description: "Categoria de comandos moderacion",
    integrationTypes: ["GuildInstall", "UserInstall"],
})
@Middlewares(["CheckBots"])
@AutoLoad()
export default class modCommand extends Command {}