//@ts-check

import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

(async () => {
    console.info("Cleaning logs...");
    try {
        const path = resolve("logs");
        if (existsSync(path)) await rm(path, { recursive: true });
        console.info("Done! Cleared.");
    } catch (error) {
        console.info(error);
        process.exit(1);
    };
})(); // For the moment is in js my idea is to run in bat or other xd
