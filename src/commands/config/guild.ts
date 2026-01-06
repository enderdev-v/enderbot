import { Declare, SubCommand, type CommandContext, Middlewares } from "seyfert";
@Declare({
  name: "guild",
  description: "configuracion de guild",
  integrationTypes: ["GuildInstall"]
})
@Middlewares(["CheckBots"])
export default class GuildCommand extends SubCommand {
  override async run(ctx: CommandContext) {
    await ctx.write({content: `Pong! ${ctx.client.gateway.latency}ms`});
  }
}