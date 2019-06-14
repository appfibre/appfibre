import assert from 'assert';
//import {describe, it} from 'mocha';
import { WebApp } from '@appfibre/webapp';
import { Mock_Logger } from './mocks/Mock_Logger';
import appfibre from '@appfibre/types'

describe('console logger', () => {
    let expectedLogLevel:appfibre.LogLevel;
    let test = (logLevel:appfibre.LogLevel, message?:any, optionalParameters?:any[]):any => assert.equal(appfibre.LogLevel[logLevel], appfibre.LogLevel[expectedLogLevel]);

    var app = new WebApp({main:[], settings: {logLevel: appfibre.LogLevel.Trace}, services: {logger: new Mock_Logger(test)}});

    it ('logs all message types', () => {
        expectedLogLevel = appfibre.LogLevel.Exception; 
        app.services.logger.log(appfibre.LogLevel.Exception, 'Exception');

        expectedLogLevel = appfibre.LogLevel.Error; 
        app.services.logger.log(appfibre.LogLevel.Error, 'Error');

        expectedLogLevel = appfibre.LogLevel.Warn; 
        app.services.logger.log(appfibre.LogLevel.Warn, 'Warn');

        expectedLogLevel = appfibre.LogLevel.Info; 
        app.services.logger.log(appfibre.LogLevel.Info, 'Info');

        expectedLogLevel = appfibre.LogLevel.Trace; 
        app.services.logger.log(appfibre.LogLevel.Trace, 'Trace');
    });

    it ('Filter messages based on logLevel', () => {
        expectedLogLevel = appfibre.LogLevel.None; 
        if (app.settings) app.settings.logLevel = appfibre.LogLevel.Error;
        app.services.logger.log(appfibre.LogLevel.Warn, 'Trace');
    });


});