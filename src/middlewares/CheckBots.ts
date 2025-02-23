import { createMiddleware } from "seyfert";

export const CheckBots = createMiddleware<void>(async (middle) => {
    if (middle.context.author.bot) return;
    middle.next();
})