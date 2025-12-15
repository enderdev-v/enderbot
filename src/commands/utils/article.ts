import { HexColor } from "#enderbot/utils/functions/functions.js";
import { Declare, type CommandContext, Middlewares, createStringOption, Options, Container, Separator, TextDisplay, IgnoreCommand, createBooleanOption, Section, Button, Command } from "seyfert";
import { Spacing, MessageFlags, ButtonStyle } from "seyfert/lib/types/index.js";

const options = {
    title: createStringOption({ description: "Escribe el titulo de tu articulo", required: true }),
    text: createStringOption({ description: "Escribe el texto de tu articulo", required: true }),
    footer: createStringOption({ description: "Escribe el footer de tu articulo", required: true }),
    color: createStringOption({ description: "Escribe el footer de tu articulo", required: true }),
    button: createBooleanOption({ description: "Quieres botones si o no?", required: true }),
    link: createStringOption({ description: "escribe el link del boton", }),
    label: createStringOption({ description: "Escribe el label del boton", }),
};

@Declare({
    name: "article",
    aliases: [],
    description: "Crea un articulo",
    ignore: IgnoreCommand.Message
})
@Middlewares(["CheckBots"])
@Options(options)
export default class ArticleCommand extends Command {
    override async run(ctx: CommandContext<typeof options>) {
        const title = ctx.options.title;
        const text = ctx.options.text;
        const footer = ctx.options.footer;
        const color = ctx.options.color;
        const button = ctx.options.button;
        const btnUrl = ctx.options.link ?? "https://youtu.be/dQw4w9WgXcQ?feature=shared";
        // Normaliza el color para .setColor de seyfert usando ternarias
        const scolor = color.includes("#") ? color.replace("#", "") : color.includes("0x") ? color.replace("0x", "") : color;
        const hex = !HexColor(scolor) ? ctx.client.config.colors.enderbotColor : Number("0x" + scolor.toLocaleLowerCase());
        const btnlabel = ctx.options.label ?? "No puso label";
        let components;

        if (button) components = new Container().setColor(hex).addComponents(
            new TextDisplay().setContent(`# ${title}`),
            new Separator().setSpacing(Spacing.Large), // Primer Separador
            new Section().setComponents(
                new TextDisplay().setContent(text),
            ).setAccessory(new Button().setURL(btnUrl).setStyle(ButtonStyle.Link).setLabel(btnlabel)),
            new TextDisplay().setContent(`-# ${footer}`)
        );
        else components = new Container().setColor(ctx.client.config.colors.enderbotColor).addComponents(
            new TextDisplay().setContent(`# ${title}`),
            new Separator().setSpacing(Spacing.Large), // Primer Separador
            new TextDisplay().setContent(text),
            new TextDisplay().setContent(`-# ${footer}`)
        );



        await ctx.write({ components: [components], flags: MessageFlags.IsComponentsV2 });
    }
}