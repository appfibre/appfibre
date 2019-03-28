import { Component } from 'preact';
export declare enum LogLevel {
    "None" = 0,
    "Exception" = 1,
    "Error" = 2,
    "Warn" = 3,
    "Info" = 4,
    "Trace" = 5
}
interface IApp {
    services: {
        logger: {
            "type": "Logger";
            log: (logLevel: LogLevel, title?: string, detail?: any, optionalParameters?: any[]) => void;
        };
    };
}
interface IUI {
    type: "UI";
    render(ui: any, parent?: any, mergeWith?: any): any;
    processElement(tag: any, attributes?: object | undefined, children?: any | undefined): any;
    Component: any;
}
export default class preact implements IUI {
    "type": 'UI';
    app: IApp;
    render(ui: any, parent?: any, mergeWith?: any): any;
    Component: typeof Component;
    constructor(app: IApp);
    processElement(tag: any, attributes?: object | undefined, children?: any | undefined): any;
}
export {};
