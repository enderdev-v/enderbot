import { Client } from "seyfert";
import { enderbotConfig } from "./classes/Config.js";
import { enderbotConfigType } from "#enderbot/types";
import { enderbotHCmd } from "./classes/handleCmd.js";
import { enderbotLogger } from "./classes/Logger.js";
import { middlewares } from "./utils/Middlewares.js";

export class enderbot extends Client<true> {
    override logger: enderbotLogger = new enderbotLogger({
        name: "Using Seyfert!!"
    });
    config: enderbotConfigType = new enderbotConfig();
    constructor() {
        super({ commands: { prefix: () => this.config.prefix } });
    }
    async run() {
        this.setServices({
            handleCommand: enderbotHCmd,
            middlewares: middlewares
        });
        await this.start();
        await this.uploadCommands();
        this.logger.enderbot("Already nice")
    }
    async reload() {
        await this.logger.enderbot("OK Ok esto es hard reload de todo")
        try {
            await this.commands?.reloadAll()
            await this.uploadCommands()
            await this.events?.reloadAll()
            await this.components?.reloadAll()
            await this.commands?.reloadAll()
        } catch (e) {
            this.logger.error(e)
            this.logger.info("No hay servicio intentalo mas tarde")
        }
    }
}