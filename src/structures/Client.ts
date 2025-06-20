import { Client } from "seyfert";
import { enderbotConfig } from "./classes/enderbot/Config.js";
import { Categories, enderbotConfigType } from "#enderbot/types";
import { enderbotHCmd } from "./classes/enderbot/handleCmd.js";
import { enderbotLogger } from "./classes/Logger.js";
import { middlewares } from "./utils/utils/Middlewares.js";
import { onRunError, onOptionsError, onBotPermissionsFail, onPermissionsFail } from "./utils/functions/defaults.js";

export class enderbot extends Client<true> {
    override logger: enderbotLogger = new enderbotLogger({
        name: "Using Seyfert!!"
    });
    config: enderbotConfigType = new enderbotConfig();
    constructor() {
        super({ commands: { prefix: () => { return this.config.prefix }, defaults: {
            onRunError,
            onOptionsError,
            onBotPermissionsFail,
            onPermissionsFail,
            props: {
                category: Categories.none,
                usage: "No se"
            }
        } }});
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

