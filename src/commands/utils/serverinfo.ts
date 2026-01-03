import { Middlewares } from "seyfert";
import { Declare, Embed, } from "seyfert";
import { CommandContext, SubCommand } from "seyfert";
import ms from "ms";
import { Shortcut, Watch, Yuna } from "yunaforseyfert";
import { ChannelType, GuildVerificationLevel, MessageFlags } from "seyfert/lib/types/index.js";

@Declare({
  name: "serverinfo",
  description: "Displays information about the server",
})
@Middlewares(["CheckBots"])
@Shortcut()
export default class ServerinfoCommand extends SubCommand {
  @Watch({
    idle: ms("1min"),
    beforeCreate(ctx) { const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this }); if (!watcher) return; watcher.stop("Just execute"); },
  })
  override async run(ctx: CommandContext) {
    // Declare variables
    const guild = await ctx.guild();
    const members = await guild?.members.list();
    const channels = await guild?.channels.list();
    const nivel = { "0": "Ningúno", "1": "Bajo", "2": "Medio", "3": "Alto", "4": "Muy alto" };
    const bots = members?.filter(member => member.user.bot).length;
    const usuarios = members?.filter(member => !member.user.bot).length;
    const very = nivel[guild?.verificationLevel as GuildVerificationLevel];
    const texto = channels?.filter(channel => channel.type === ChannelType.GuildText).length;
    const voz = channels?.filter(channel => channel.type === ChannelType.GuildVoice).length;
    const cate = channels?.filter(channel => channel.type === ChannelType.GuildCategory).length;
    const stage = channels?.filter(channel => channel.type === ChannelType.GuildStageVoice).length;
    const foro = channels?.filter(channel => channel.type === ChannelType.GuildForum).length;
    // Create and send embed
    const embed = new Embed()
      .setTitle(`informacion de ${guild?.name}`)
      .setThumbnail(guild?.iconURL())
      .setColor(ctx.client.config.colors.enderbotColor)
      .addFields(
        { name: "**Owner:**", value: `__${await guild?.fetchOwner()}__`, inline: false },
        { name: "**Se creo:**", value: `${guild?.createdAt.toLocaleDateString()}`, inline: false },
        { name: "```Usuarios```", value: `> Miembros en total: **${guild?.memberCount}** \n > Usuarios: **${usuarios}** \n > Bots: ${bots}`, inline: true },
        { name: "```Stats```", value: `> Roles: ${(await guild?.roles.list())?.length} \n > Nivel Verificacion: ${very} \n > Canales de texto: ${texto} \n > Canales de voz: ${voz} \n > Canales de escenario: ${stage} \n > Categorias: ${cate} \n > Foros: ${foro}`, inline: true }
      );

    ctx.write({ embeds: [embed], flags: MessageFlags.Ephemeral });


  }
}