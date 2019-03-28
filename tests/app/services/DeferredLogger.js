"use strict";
exports.__esModule = true;
var DeferredLogger = /** @class */ (function () {
    function DeferredLogger() {
        this.type = "Logger";
        this.logs = [];
    }
    DeferredLogger.prototype.clear = function () {
        this.logs = [];
    };
    DeferredLogger.prototype.log = function (logLevel, title, detail, optionalParameters) {
        this.logs.push({ sender: this, logLevel: logLevel, title: title, detail: detail, optionalParameters: optionalParameters });
        //[function(message?:any, optionalParameters?:any[]){}, console.error, console.error, console.warn, console.info, console.trace][logLevel](`${this}: ${title}\r\n${detail}`, optionalParameters) 
    };
    DeferredLogger.prototype.print = function () {
        this.logs.forEach(function (element) {
            [function (message, optionalParameters) { }, console.error, console.error, console.warn, console.info, console.trace][element.logLevel](element.sender + ": " + element.title + "\r\n" + element.detail, element.optionalParameters);
        });
    };
    return DeferredLogger;
}());
exports.DeferredLogger = DeferredLogger;
