import { types } from "@appfibre/core";

export class Mock_Logger implements types.ILogger
 {
     static cb:(logLevel:types.LogLevel, message?:any, optionalParameters?:any[])=>undefined 
     type:"Logger";
     constructor(callback:(logLevel:types.LogLevel, message?:any, optionalParameters?:any[])=>undefined) {
        this.type = "Logger";
        Mock_Logger.cb = callback;
     }

    log (logLevel:types.LogLevel, message?:any, optionalParameters?:any[]) { Mock_Logger.cb(logLevel, message, optionalParameters); }
}