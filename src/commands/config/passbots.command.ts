import PassBots from "#enderbot/Schemas/PassBots.js";
import { type CommandContext, createUserOption, Declare, Embed, SubCommand } from "seyfert";


const options = {
    user: createUserOption({
        description: "menciona al bot "
    })
}
@Declare({
  name: "passbots",
  aliases: ["addpassbots", "adp"],
  description: "Añade excepciones a bots que tu menciones"
})
export class PassbotsSubCommand extends SubCommand {
  async run(ctx: CommandContext<typeof options>) {
    const user = ctx.options.user;
        if (!user) return ctx.write({ content: `¿Cual bot es el que querias poner?` });
        if (!user.bot) return ctx.write({ content: `¿Cual bot es el que querias poner?` });


        await PassBots.findOneAndUpdate(
            { guild: ctx.guildId },
            { guild: ctx.guildId },
            { new: true, upsert: true }
        );

        const embed = new Embed()
            .setTitle('Bot Añadido correctamente')
            .setDescription(`Has añadido un bot que puede evadir el antiraid`)
            .setColor(ctx.client.config.enderbotColor);


        await PassBots.findOneAndUpdate(
            { guild: ctx.guildId },
            { $push: { bots: user.id } },
            { new: true, upsert: true }
        );

        ctx.write({ embeds: [embed] });
  }
}