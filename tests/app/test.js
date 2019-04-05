"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
//import {describe, it} from 'mocha';
var jst_1 = require("@appfibre/jst");
var Mock_Logger_1 = require("./mocks/Mock_Logger");
describe('console logger', function () {
    var expectedLogLevel;
    var test = function (logLevel, message, optionalParameters) { return assert_1["default"].equal(jst_1.types.LogLevel[logLevel], jst_1.types.LogLevel[expectedLogLevel]); };
    var app = new jst_1.App({ main: [], options: { logLevel: jst_1.types.LogLevel.Trace }, services: { logger: new Mock_Logger_1.Mock_Logger(test) } });
    it('logs all message types', function () {
        expectedLogLevel = jst_1.types.LogLevel.Exception;
        app.services.logger.log(jst_1.types.LogLevel.Exception, 'Exception');
        expectedLogLevel = jst_1.types.LogLevel.Error;
        app.services.logger.log(jst_1.types.LogLevel.Error, 'Error');
        expectedLogLevel = jst_1.types.LogLevel.Warn;
        app.services.logger.log(jst_1.types.LogLevel.Warn, 'Warn');
        expectedLogLevel = jst_1.types.LogLevel.Info;
        app.services.logger.log(jst_1.types.LogLevel.Info, 'Info');
        expectedLogLevel = jst_1.types.LogLevel.Trace;
        app.services.logger.log(jst_1.types.LogLevel.Trace, 'Trace');
    });
    it('Filter messages based on logLevel', function () {
        expectedLogLevel = jst_1.types.LogLevel.None;
        if (app.options)
            app.options.logLevel = jst_1.types.LogLevel.Error;
        app.services.logger.log(jst_1.types.LogLevel.Warn, 'Trace');
    });
});
