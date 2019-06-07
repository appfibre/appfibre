"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
//import {describe, it} from 'mocha';
const core_1 = require("@appfibre/core");
const webapp_1 = require("@appfibre/webapp");
const Mock_Logger_1 = require("./mocks/Mock_Logger");
describe('console logger', () => {
    let expectedLogLevel;
    let test = (logLevel, message, optionalParameters) => assert_1.default.equal(core_1.types.LogLevel[logLevel], core_1.types.LogLevel[expectedLogLevel]);
    var app = new webapp_1.WebApp({ main: [], options: { logLevel: core_1.types.LogLevel.Trace }, services: { logger: new Mock_Logger_1.Mock_Logger(test) } });
    it('logs all message types', () => {
        expectedLogLevel = core_1.types.LogLevel.Exception;
        app.services.logger.log(core_1.types.LogLevel.Exception, 'Exception');
        expectedLogLevel = core_1.types.LogLevel.Error;
        app.services.logger.log(core_1.types.LogLevel.Error, 'Error');
        expectedLogLevel = core_1.types.LogLevel.Warn;
        app.services.logger.log(core_1.types.LogLevel.Warn, 'Warn');
        expectedLogLevel = core_1.types.LogLevel.Info;
        app.services.logger.log(core_1.types.LogLevel.Info, 'Info');
        expectedLogLevel = core_1.types.LogLevel.Trace;
        app.services.logger.log(core_1.types.LogLevel.Trace, 'Trace');
    });
    it('Filter messages based on logLevel', () => {
        expectedLogLevel = core_1.types.LogLevel.None;
        if (app.options)
            app.options.logLevel = core_1.types.LogLevel.Error;
        app.services.logger.log(core_1.types.LogLevel.Warn, 'Trace');
    });
});
