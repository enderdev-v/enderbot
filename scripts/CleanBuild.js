//@ts-check

import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

(async () => {
    console.info("Cleaning dist...");
    try {
        const path = resolve("dist");
        if (existsSync(path)) await rm(path, { recursive: true });
        console.info("Done! Cleared.");
    } catch (error) {
        console.info(error);
        process.exit(1);
    };
})(); // For the moment is in js my idea is to run in bat or other xd
