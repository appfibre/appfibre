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
            log: (logLevel: LogLevel, title?: string, optionalParameters?: any[]) => string | void;
        };
    };
}
interface IUI {
    render(ui: any, parent?: any, mergeWith?: any): any;
    processElement(element: any, depth: number, index?: number): any;
    Component: any;
}
export default class preact implements IUI {
    app: IApp;
    render(ui: any, parent?: any, mergeWith?: any): any;
    Component: typeof Component;
    constructor(app: IApp);
    processElement(element: any, depth: number, index?: number): any;
}
export {};
