"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
//import {describe, it} from 'mocha';
const webapp_1 = require("@appfibre/webapp");
const Mock_Logger_1 = require("./mocks/Mock_Logger");
const types_1 = __importDefault(require("@appfibre/types"));
describe('console logger', () => {
    let expectedLogLevel;
    let test = (logLevel, message, optionalParameters) => assert_1.default.equal(types_1.default.LogLevel[logLevel], types_1.default.LogLevel[expectedLogLevel]);
    var app = new webapp_1.WebApp({ main: [], settings: { logLevel: types_1.default.LogLevel.Trace }, services: { logger: new Mock_Logger_1.Mock_Logger(test) } });
    it('logs all message types', () => {
        expectedLogLevel = types_1.default.LogLevel.Exception;
        app.services.logger.log(types_1.default.LogLevel.Exception, 'Exception');
        expectedLogLevel = types_1.default.LogLevel.Error;
        app.services.logger.log(types_1.default.LogLevel.Error, 'Error');
        expectedLogLevel = types_1.default.LogLevel.Warn;
        app.services.logger.log(types_1.default.LogLevel.Warn, 'Warn');
        expectedLogLevel = types_1.default.LogLevel.Info;
        app.services.logger.log(types_1.default.LogLevel.Info, 'Info');
        expectedLogLevel = types_1.default.LogLevel.Trace;
        app.services.logger.log(types_1.default.LogLevel.Trace, 'Trace');
    });
    it('Filter messages based on logLevel', () => {
        expectedLogLevel = types_1.default.LogLevel.None;
        if (app.settings)
            app.settings.logLevel = types_1.default.LogLevel.Error;
        app.services.logger.log(types_1.default.LogLevel.Warn, 'Trace');
    });
});
