import { AttachmentBuilder, createUserOption, Declare, Embed, Options } from "seyfert";
import { CommandContext, Command } from "seyfert"
import ms from "ms";
import { Watch, Yuna } from "yunaforseyfert";
import { profileImage } from "discord-arts";
import { UsualColors } from "#enderbot/utils/Constants.js";
import { MessageFlags } from "seyfert/lib/types/index.js";
const options = {
    user: createUserOption({
        description: "get a user",
    }),
}

@Declare({
    name: 'userinfo',
    description: 'Información sobre un usario',
    integrationTypes: ["GuildInstall", "UserInstall"]
})
@Options(options)
export default class UserinfoCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    override async run(ctx: CommandContext<typeof options>) {
        const user = ctx.options.user || ctx.author;
        const userinfoArr = [
            {
                name: `Tag`, value: `${user.username}`, inline: true
            },
            {
                name: "Apodo", value: `${user.name || "no tiene ningun apodo"}`, inline: true
            },
            {
                name: "Id:", value: `${user.id}`, inline: false
            },
            {
                name: "Creacion de la cuenta:", value: `${user.createdAt.toLocaleDateString()}`, inline: true
            }
        ]
        const banner = user.bannerURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/attachments/1266554957788610583/1266555365105864704/OIP.fx71vhhJ-uK0KwVaKUnXZQHaEK.png?ex=66ea211a&is=66e8cf9a&hm=754bd8a3e4518be4928f0ed498eb08fc83a64d8ba5f64e8cca95748bdf686ae1&"
        const img = await profileImage(user.id, {
            customBackground: banner,
            moreBackgroundBlur: true,
            borderColor: UsualColors.Color
        })
        const attachment = new AttachmentBuilder({ filename: "userimage.png" }).setFile('buffer', img)

        const embed = new Embed()
            .setTitle(`informacion de ${user.username}`)
            .setThumbnail(user.avatarURL({ extension: `png` }))
            .setColor(ctx.client.config.enderbotColor)
            .setImage("attachment://userimage.png");

        try {
            const member = await ctx.guild()?.members.fetch(user.id)
            
            const roles = (await member?.roles.list())?.sort((a, b) => b.position - a.position).map(roles => roles.toString()).slice(0, -1) as string[];
            if (!roles) return ctx.write({ embeds: [embed.addFields(userinfoArr)], files: [attachment], flags: MessageFlags.Ephemeral });
            const displayRoles = roles.length < 1 ? `no tiene roles` : roles.join(", ");

            const data = new Date(member?.joinedAt as string)
            userinfoArr.push({
                name: "Ingreso al servidor:", value: `${data.toLocaleDateString()}`, inline: true
            })
            userinfoArr.push({
                name: `Roles (${roles.length})`, value: displayRoles, inline: false
            })
            ctx.write({ embeds: [embed.addFields(userinfoArr)], files: [attachment], flags: MessageFlags.Ephemeral });

        } catch (e: any) {
            if (e instanceof Error) {
                if (e.message.match('Unknown Guild 10004')) {
                    return ctx.write({ embeds: [embed.addFields(userinfoArr)], files: [attachment], flags: MessageFlags.Ephemeral });
                } else {
                    ctx.write({ content: "Ocurrio un error" });

                    throw new Error(e.message)
                }
            }
        }
    }
}