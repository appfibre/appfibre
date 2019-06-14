import appfibre from "@appfibre/types";

export class Mock_Logger implements appfibre.app.ILogger
 {
     static cb:(logLevel:appfibre.LogLevel, message?:any, optionalParameters?:any[])=>undefined 
     type:"Logger";
     constructor(callback:(logLevel:appfibre.LogLevel, message?:any, optionalParameters?:any[])=>undefined) {
        this.type = "Logger";
        Mock_Logger.cb = callback;
     }

    log (logLevel:appfibre.LogLevel, message?:any, optionalParameters?:any[]) { Mock_Logger.cb(logLevel, message, optionalParameters); }
}