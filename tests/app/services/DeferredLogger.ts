import appfibre from '@appfibre/types'

export class DeferredLogger implements appfibre.app.ILogger {
    type:"Logger";
    logs:{sender:any, logLevel: appfibre.LogLevel, title?: any, detail?: any, optionalParameters?: any[] | undefined}[];

    constructor() {
        this.type = "Logger";
        this.logs = [];
    }

    clear() {
        this.logs = [];
    }

    log (logLevel: appfibre.LogLevel, title?: any, detail?:any, optionalParameters?: any[] | undefined) {
        this.logs.push({sender: this, logLevel, title, detail, optionalParameters});
        //[function(message?:any, optionalParameters?:any[]){}, console.error, console.error, console.warn, console.info, console.trace][logLevel](`${this}: ${title}\r\n${detail}`, optionalParameters) 
    }

    print() {
        this.logs.forEach(element => {
            [function(message?:any, optionalParameters?:any[]){}, console.error, console.error, console.warn, console.info, console.trace][element.logLevel](`${element.sender}: ${element.title}\r\n${element.detail}`, element.optionalParameters) 
        });
    }

}