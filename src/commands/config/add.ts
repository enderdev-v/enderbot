import { Declare, Command, Options, IgnoreCommand } from "seyfert";
import { PassbotsSubCommand } from "./passbots.command.js";

@Declare({
  name: "addpass",
  description: "Añade bots, users, canales a zonas de excepciones",
  ignore: IgnoreCommand.Message
})
// Being in the same folder with @AutoLoad() you can save this step
@Options([ PassbotsSubCommand])
export default class AddCommand extends Command {}