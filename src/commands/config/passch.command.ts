import BadBots from "#enderbot/Schemas/BadBots.js";
import PassChannels from "#enderbot/Schemas/PassChannels.js";
import { type CommandContext, createChannelOption, Declare, Embed, SubCommand } from "seyfert";

const options = {
    channel: createChannelOption({
        description: "menciona a un canal"
    })
}
@Declare({
  name: "passch",
  aliases: ["addpassbots", "adp"],
  description: "añade canales a excepciones"
})
export class PassChSubCommand extends SubCommand {
  async run(ctx: CommandContext<typeof options>) {

    const channel = ctx.options.channel;
        if (!channel) return ctx.write({ content: `¿Cual bot es el que querias poner?` });

        await PassChannels.findOneAndUpdate(
            { guild: ctx.guildId },
            { guild: ctx.guildId },
            { new: true, upsert: true }
        );

        const embed = new Embed()
            .setTitle('Canal Añadido correctamente')
            .setDescription(`Has añadido una excepcion a la regla`)
            .setColor(ctx.client.config.enderbotColor);


        await BadBots.findOneAndUpdate(
            { guild: ctx.guildId },
            { $push: { channels: channel.id } },
            { new: true, upsert: true }
        );

        ctx.write({ embeds: [embed] });
  }
}