"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeferredLogger {
    constructor() {
        this.type = "Logger";
        this.logs = [];
    }
    clear() {
        this.logs = [];
    }
    log(logLevel, title, detail, optionalParameters) {
        this.logs.push({ sender: this, logLevel, title, detail, optionalParameters });
        //[function(message?:any, optionalParameters?:any[]){}, console.error, console.error, console.warn, console.info, console.trace][logLevel](`${this}: ${title}\r\n${detail}`, optionalParameters) 
    }
    print() {
        this.logs.forEach(element => {
            [function (message, optionalParameters) { }, console.error, console.error, console.warn, console.info, console.trace][element.logLevel](`${element.sender}: ${element.title}\r\n${element.detail}`, element.optionalParameters);
        });
    }
}
exports.DeferredLogger = DeferredLogger;
