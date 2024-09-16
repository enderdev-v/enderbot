import ms from "ms";
import {
    type CommandContext,
    createUserOption,
    Declare,
    Command,
    Options,
    Embed,
} from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";


const options = {
    user: createUserOption({
        description: "get a user",
    })
}
@Declare({
    name: "avatar",
    description: "obtener el avatar de un usuario",
    integrationTypes: ["GuildInstall"]
})
@Options(options)
export default class AvatarCommand extends Command {
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
        const embed = new Embed()
            .setTitle(`Avatar de **${user.username}**`)
            .setImage(user.avatarURL({ size: 1024, forceStatic: true, extension: `png` }))
            .setColor(ctx.client.config.enderbotColor);

        ctx.write({ embeds: [embed], allowed_mentions: { replied_user: false } });
    }
}