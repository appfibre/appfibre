import { types } from "@appfibre/jst";
import { ILogger, LogLevel } from "@appfibre/jst/dist/types";

export class Mock_Logger implements ILogger
 {
     static cb:(logLevel:types.LogLevel, message?:any, optionalParameters?:any[])=>undefined 
     type:"Logger";
     constructor(callback:(logLevel:types.LogLevel, message?:any, optionalParameters?:any[])=>undefined) {
        this.type = "Logger";
        Mock_Logger.cb = callback;
     }

    log (logLevel:LogLevel, message?:any, optionalParameters?:any[]) { Mock_Logger.cb(logLevel, message, optionalParameters); }
}