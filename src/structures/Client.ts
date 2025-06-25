import { Client } from "seyfert";
import { enderbotConfig } from "./classes/enderbot/Config.js";
import { Categories, enderbotConfigType } from "#enderbot/types";
import { enderbotHCmd } from "./classes/enderbot/handleCmd.js";
import { middlewares } from "./utils/utils/Middlewares.js";
import { onRunError, onOptionsError, onBotPermissionsFail, onPermissionsFail } from "./utils/functions/defaults.js";

export class enderbot extends Client<true> {
    config: enderbotConfigType = new enderbotConfig();
    isActivityRandom: boolean = true; // -> Esto permite que la activity pueda ser random o no desde el comando customact :D
    constructor() {
        super({
            commands: {
                prefix: () => { return this.config.prefix }, defaults: {
                    onRunError,
                    onOptionsError,
                    onBotPermissionsFail,
                    onPermissionsFail,
                    props: {
                        category: Categories.none,
                        usage: "No se"
                    }
                }
            }
        });
    }
    ChangeActivityRandom() {
        this.isActivityRandom = !this.isActivityRandom;
    }
    async run() {
        this.setServices({
            handleCommand: enderbotHCmd,
            middlewares: middlewares
        });
        await this.start();
        await this.uploadCommands();
        this.logger.info("Already nice")
    }
    async reload() {
        await this.logger.warn("OK Ok esto es hard reload de todo")
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

