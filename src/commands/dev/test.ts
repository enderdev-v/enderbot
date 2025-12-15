import { Declare, Command, type CommandContext, Middlewares } from "seyfert";

@Declare({
  name: "test",
  description: "mucho ping",
  integrationTypes: ["GuildInstall", "UserInstall"]
})
@Middlewares(["CheckBots"])
export default class PingCommand extends Command {

  override async run(ctx: CommandContext) {

    const seen = new WeakSet();

    const ToJson =  JSON.stringify(ctx.message, (_key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  }, "");

    console.log(ToJson);


    await ctx.write({
      content: `Pong! ${ctx.client.gateway.latency}ms`,
    });
  }
}
