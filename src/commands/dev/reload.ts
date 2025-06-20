import { Command, CommandContext, createStringOption, Declare, Message, Middlewares, Options } from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";
import ms from "ms"
import { match } from "ts-pattern";

export const options = {
    option: createStringOption({
        description: "Escoger una opcion de recarga",
        required: true,
        choices: [{ name: "commands", value: "commands" }, { name: "events", value: "events" }, { name: "reset", value: "reset" }]
    }),
};

@Declare({
    name: "reload",
    description: "recarga algun que otro comando xd",
    integrationTypes: ["GuildInstall"]
})
@Options(options)
@Middlewares(["Onlydev", "CheckBots"])
export default class SayCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    override async run(ctx: CommandContext<typeof options>) {
        const option = ctx.options.option
        match(option.toLocaleLowerCase())
            .with("commands", () => {
                ctx.client.commands?.reloadAll()
                ctx.client.uploadCommands()
            })
            .with("events", () => ctx.client.events?.reloadAll())
            .with("reset", () => ctx.client.reload())
            .otherwise(() => ctx.write({ content: "debes escoger una opcion : commands, events" }))
        ctx.write({ embeds: [{ title: `Recargando ${option}`, description: "<:dino_ryo:1325620344459104372> Recargando", color: ctx.client.config.colors.enderbotColor }] }).then(async m => {

            (m as Message).edit({ embeds: [{ title: "Reload command", description: `<:dino_ryo:1325620344459104372> ${option}, Cargados`, color: ctx.client.config.colors.enderbotColor }] });
        });
    }
}