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
    description: 'Información sobre un usario'
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
        try {
            const user = ctx.options.user || ctx.author;
            const member = await ctx.guild()?.members.fetch(user.id)
            const roles = (await member?.roles.list())?.sort((a, b) => b.position - a.position).map(roles => roles.toString()).slice(0, -1) as string[];

            const displayRoles = roles.length < 1 ? `no tiene roles` : roles.join(", ");
            const usercolor = member?.user.accentColor?.toString().replace("#", "0x")

            const banner = user.bannerURL({ forceStatic: true }) ?? "https://cdn.discordapp.com/attachments/1266554957788610583/1266555365105864704/OIP.fx71vhhJ-uK0KwVaKUnXZQHaEK.png?ex=66a8361a&is=66a6e49a&hm=ca8b286c5ae4b9a841ebae9e38ecad9d7606f117bc1931c934b5a0765c684ba3&"
            const img = await profileImage(user.id, {
                customBackground: banner,
                moreBackgroundBlur: true,
                borderColor: UsualColors.Color
            })

            const attachment = new AttachmentBuilder({ filename: "userimage.png" }).setFile('buffer', img)


            const embed = new Embed()
                .setTitle(`informacion de ${user.username}`)
                .setThumbnail(user.avatarURL({ extension: `png` }))
                .setColor(Number(usercolor))
                .addFields(
                    {
                        name: `Tag`, value: `${user.username}`, inline: true
                    },
                    {
                        name: "Apodo", value: `${user.name} || "no tiene ningun apodo"}`, inline: true
                    },
                    {
                        name: "Id:", value: `${user.id}`, inline: false
                    },
                    {
                        name: "Creacion de la cuenta:", value: `${user.createdAt.toLocaleDateString()}`, inline: true
                    },
                    {
                        name: "Ingreso al servidor:", value: `${member?.joinedAt}`, inline: true
                    },
                    {
                        name: `Roles (${roles.length})`, value: displayRoles, inline: false
                    }
                )
                .setImage("attachment://userimage.png");


            ctx.write({ embeds: [embed], files: [attachment], flags: MessageFlags.Ephemeral });

        } catch (e) {
            console.log("error", e);
            ctx.write({ content: "Ocurrio un error" });
        }
    }
}