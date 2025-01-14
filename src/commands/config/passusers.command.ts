import PassUsers from "#enderbot/Schemas/PassUsers.js";
import { type CommandContext, createUserOption, Declare, Embed, SubCommand } from "seyfert";

const options = {
    user: createUserOption({
        description: "menciona al bot "
    })
}
@Declare({
  name: "passbots",
  aliases: ["addpassbots", "adp"],
  description: "create a new something"
})
export class PassusersSubCommand extends SubCommand {
  async run(ctx: CommandContext<typeof options>) {

    const user = ctx.options.user;
        if (!user) return ctx.write({ content: `¿Cual bot es el que querias poner?` });
        if (user.bot) return ctx.write({ content: `¿Cual bot es el que querias poner?` });


        await PassUsers.findOneAndUpdate(
            { guild: ctx.guildId },
            { guild: ctx.guildId },
            { new: true, upsert: true }
        );

        const embed = new Embed()
            .setTitle('Bot Añadido correctamente')
            .setDescription(`Has añadido un usuario que evade el antiraid`)
            .setColor(ctx.client.config.enderbotColor);


        await PassUsers.findOneAndUpdate(
            { guild: ctx.guildId },
            { $push: { userss: user.id } },
            { new: true, upsert: true }
        );

        ctx.write({ embeds: [embed] });
  }
}