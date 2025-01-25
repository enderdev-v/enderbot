import {
    type CommandContext,
    Declare,
    Command,
    Embed,
} from "seyfert"
import src from "#enderbot/utils/arr.js" // El array de imagenes de yui
@Declare({
    name: "randomyui",
    description: "Nomas genera una imagen de yui random"
})
export default class YuiCommand extends Command {
    override async run(ctx: CommandContext) {
       /*  const response = await fetch('https://barstool74.nekoweb.org/')
        if (!response.ok) return ctx.write({ content: "No se pudo obtener la imagen" })

        const res = await response.text()

        console.log(res)
        const regex = /<img\s+src="Yui\/[^"]+"\s+alt="Unexpected Yui">/g

        const match = regex.exec(res)

        console.log(match) */

        // No encontre una api de yui, encontre esto y me puse a analizar como funciona para traer esto
        //  antes que nada si encuentro una api de yui la implementare o si la encujentran pasenla

        const random = Math.floor(Math.random() * (src.length)); // era mas facil hacerlo asi no critiquen xd 

        const embed = new Embed()
            .setTitle("Random Yui Image")
            .setImage("https://barstool74.nekoweb.org/Yui/" + src[random])
            .setThumbnail("https://images4.fanpop.com/image/photos/16500000/Yui-Hirasawa-yui-hirasawa-16561912-1280-1024.jpg")
            .setFooter({ text: "Powered by barstool74.nekoweb.org <3" })

        ctx.write({ embeds: [embed] })
    }
}