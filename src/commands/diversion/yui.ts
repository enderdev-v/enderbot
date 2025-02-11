import {
    type CommandContext,
    Declare,
    Command,
    Embed,
} from "seyfert"
import src from "#enderbot/utils/arr.js" 
@Declare({
    name: "randomyui",
    description: "Nomas genera una imagen de yui random"
})
export default class YuiCommand extends Command {
    override async run(ctx: CommandContext) {

        const random = Math.floor(Math.random() * (src.length)); // era mas facil hacerlo asi no critiquen xd 

        const embed = new Embed()
            .setTitle("Random Yui Image")
            .setImage("https://barstool74.nekoweb.org/Yui/" + src[random])
            .setThumbnail("https://images4.fanpop.com/image/photos/16500000/Yui-Hirasawa-yui-hirasawa-16561912-1280-1024.jpg")
            .setFooter({ text: "Powered by barstool74.nekoweb.org <3" })

        ctx.write({ embeds: [embed] })
    }
}