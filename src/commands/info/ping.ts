import { Declare, Command, type CommandContext } from 'seyfert';

@Declare({
  name: 'ping',
  description: 'mucho ping',
  integrationTypes: ["GuildInstall", "UserInstall"]
})
export default class PingCommand extends Command {

  override async run(ctx: CommandContext) {
    
    await ctx.write({
      content: `Pong! ${ctx.client.gateway.latency}ms`
    });
  }
}