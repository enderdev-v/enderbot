import { type CommandContext, createUserOption, Declare, Embed, SubCommand } from "seyfert";
import BadBots  from "#enderbot/Schemas/BadBots.js";

const options = {
    user: createUserOption({
        description: "menciona al bot "
    })
}

@Declare({
  name: "badbots",
  aliases: ["addpassbots", "adp"],
  description: "Crea una excepcion donde se concentra en banearlo"
})
export class BadBotsSubCommand extends SubCommand {
  async run(ctx: CommandContext<typeof options>) {
    const user = ctx.options.user;
        if (!user) return ctx.write({ content: `¿Cual bot es el que querias poner?` });
        if (!user.bot) return ctx.write({ content: `¿Cual bot es el que querias poner?` });


        await BadBots.findOneAndUpdate(
            { guild: ctx.guildId },
            { guild: ctx.guildId },
            { new: true, upsert: true }
        );

        const embed = new Embed()
            .setTitle('Bot Añadido correctamente')
            .setDescription(`Este bot sera baneado correctamente`)
            .setColor(ctx.client.config.enderbotColor);


        await BadBots.findOneAndUpdate(
            { guild: ctx.guildId },
            { $push: { bots: user.id } },
            { new: true, upsert: true }
        );

        ctx.write({ embeds: [embed] });
  }
}