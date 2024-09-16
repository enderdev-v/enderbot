import { memoryUsage } from '#enderbot/functions';
import { LoggerColor, LoggerLevel } from '#enderbot/types';
import chalk from 'chalk';
import { Logger } from 'seyfert';
import { LogLevels } from 'seyfert/lib/common/index.js';


export class enderbotLogger extends Logger {
    private customLog(level: LoggerLevel, ...args: unknown[]) {
        const memoryData = memoryUsage()
        const name = [
            ['[ DEBUG ]', LoggerColor.debugLogger],
            ['[ INFO ]', LoggerColor.infoLogger],
            ['[ WARN ]', LoggerColor.warnLogger],
            ['[ ERROR ]', LoggerColor.errorLogger],
            ["[ FATAL ]", LoggerColor.FatalLogger],
            ['[ CHECK ]', LoggerColor.checkLogger],
            ['[ enderbot ]', LoggerColor.enderbotLogger],
        ];
        const color = name[level][1] as string;

        const text = `${chalk.italic(`${memoryData}`)} ${chalk.bold.hex(color)(`${name[level][0]}`)}`;

        return [text, ...args].join(" ");

    }
    check(...args: any[]) {
        console.log(this.customLog(LoggerLevel.check, ...args))
    }
    enderbot(...args: any[]) {
        console.log(this.customLog(LoggerLevel.enderbot, ...args))
    }
}

export function customLog(_this: Logger, level: LogLevels | LoggerLevel, args: unknown[]): unknown[] {
    const memoryData = memoryUsage()
    const name = [
        ['[ DEBUG ]', LoggerColor.debugLogger],
        ['[ INFO ]', LoggerColor.infoLogger],
        ['[ WARN ]', LoggerColor.warnLogger],
        ['[ ERROR ]', LoggerColor.errorLogger],
        ["[ FATAL ]", LoggerColor.FatalLogger],
        ['[ CHECK ]', LoggerColor.checkLogger],
        ['[ enderbot ]', LoggerColor.enderbotLogger],
    ];
    const color = name[level][1] as string;

    const text = `${chalk.italic(`${memoryData}`)} ${chalk.bold.hex(color)(`${name[level][0]}`)}`;

    return [text, ...args];

}
export function enderbotLoggerd(args: any) {
    const memoryData = memoryUsage()
    const text = `${chalk.italic(`${memoryData}`)} ${chalk.bold.hex(LoggerColor.enderbotLogger)(`[ enderbot ] `)}`;
    const log = `${text + [...args].join("")}`;

    return console.log(log);

}
export function checkLogger(args: any) {

    const memoryData = memoryUsage()
    const text = `${chalk.italic(`${memoryData}`)} ${chalk.bold.hex(LoggerColor.checkLogger)(`[ CHECK ] `)}`;
    const log = `${text + [...args].join("")}`;

    return console.log(log);

}
