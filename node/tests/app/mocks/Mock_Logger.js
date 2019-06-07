"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mock_Logger {
    constructor(callback) {
        this.type = "Logger";
        Mock_Logger.cb = callback;
    }
    log(logLevel, message, optionalParameters) { Mock_Logger.cb(logLevel, message, optionalParameters); }
}
exports.Mock_Logger = Mock_Logger;
