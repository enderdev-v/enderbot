import { createMiddleware } from "seyfert";

export const Onlydev = createMiddleware<void>(async (middle) => {
    if (middle.context.author.id !== "780277567537414165") { 
        return middle.context.write({ content: "no puedes usar este comando" })
    } 
    middle.next();
})