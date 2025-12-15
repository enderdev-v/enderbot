import { createMiddleware } from "seyfert";

export const Onlydev = createMiddleware<void>(async (middle) => {
    if (!middle.context.client.config.devsId.includes(middle.context.author.id)) { 
        return middle.context.write({ content: "no puedes usar este comando" });
    } 
    middle.next();
});