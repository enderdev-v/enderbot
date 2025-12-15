import { Categories } from "#enderbot/types";
import { sendMessage } from "#enderbot/utils/functions/functions.js";
import ms from "ms";
import { type CommandContext, createUserOption, Declare, Command, Options, Embed, Middlewares, } from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";

const options = { user: createUserOption({ description: "get a user" }) }; // Define options

@Declare({
    name: "avatar",
    description: "obtener el avatar de un usuario",
    integrationTypes: ["GuildInstall", "UserInstall"],
    props: {
        usage: "e?avatar {usuario}",
        category: Categories.fun
    }
})
@Options(options)
@Middlewares(["CheckBots"])
export default class AvatarCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) { const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this }); if (!watcher) return; watcher.stop("Just execute"); },
    }) // Watcher to monitor command usage
    override async run(ctx: CommandContext<typeof options>) {
        const user = ctx.options.user || ctx.author; // Get the user or default to the author
        const embed = new Embed().setTitle("Avatar de **${user.username}**").setImage(user.avatarURL({ size: 1024, forceStatic: true, extension: "png" })).setColor(ctx.client.config.colors.enderbotColor); // Create embed with avatar
        sendMessage(ctx, { embeds: [embed] }); // Send the embed as a message
    }
}