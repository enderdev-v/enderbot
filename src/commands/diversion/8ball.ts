import ms from "ms";
import {
    type CommandContext,
    Declare,
    Command,
    Options,
    createStringOption,
    Embed,
} from "seyfert";
import { Watch, Yuna } from "yunaforseyfert";

const options = {
    question: createStringOption({
        description: "get a a category",
        required: true
    })
}
@Declare({
    name: "help",
    description: "Desmutear a un usuario",
    defaultMemberPermissions: ["ModerateMembers"],
    integrationTypes: ["GuildInstall"]
})
@Options(options)
export default class BallCommand extends Command {
    @Watch({
        idle: ms("1min"),
        beforeCreate(ctx) {
            const watcher = Yuna.watchers.find(ctx.client, { userId: ctx.author.id, command: this });
            if (!watcher) return;

            watcher.stop("Just execute");
        },

    })
    override async run(ctx: CommandContext<typeof options>) {
        const question = ctx.options.question;
        if (!question) return ctx.write({ content: "preguntame algo 🎱" });

        const Ball = [`si`, `no`, `quiziera comprobarlo`, `por supuesto`, `claro que no`, `muy cierto`, `que dijiste`, `claro que si`];
        const Aleatorio = Math.floor(Math.random() * (Ball.length));

        const embed = new Embed()
            .setTitle("🎱 8Ball Question")
            .setDescription("Pregunta: \n " + question)
            .addFields(
                {
                    name: `Respuesta:`,
                    value: Ball[Aleatorio]
                }
            )
        ctx.write({ embeds: [embed] })
    }
}