import assert from 'assert';
//import {describe, it} from 'mocha';
import { App, types } from '@appfibre/jst';
import { Mock_Logger } from './mocks/Mock_Logger';


describe('console logger', () => {
    let expectedLogLevel:types.LogLevel;
    let test = (logLevel:types.LogLevel, message?:any, optionalParameters?:any[]):any => assert.equal(types.LogLevel[logLevel], types.LogLevel[expectedLogLevel]);

    var app = new App({main:[], options: {logLevel: types.LogLevel.Trace}, services: {logger: new Mock_Logger(test)}});

    it ('logs all message types', () => {
        expectedLogLevel = types.LogLevel.Exception; 
        app.services.logger.log(types.LogLevel.Exception, 'Exception');

        expectedLogLevel = types.LogLevel.Error; 
        app.services.logger.log(types.LogLevel.Error, 'Error');

        expectedLogLevel = types.LogLevel.Warn; 
        app.services.logger.log(types.LogLevel.Warn, 'Warn');

        expectedLogLevel = types.LogLevel.Info; 
        app.services.logger.log(types.LogLevel.Info, 'Info');

        expectedLogLevel = types.LogLevel.Trace; 
        app.services.logger.log(types.LogLevel.Trace, 'Trace');
    });

    it ('Filter messages based on logLevel', () => {
        expectedLogLevel = types.LogLevel.None; 
        if (app.options) app.options.logLevel = types.LogLevel.Error;
        app.services.logger.log(types.LogLevel.Warn, 'Trace');
    });


});