import { Component } from 'preact';
export declare enum LogLevel {
    "None" = 0,
    "Exception" = 1,
    "Error" = 2,
    "Warn" = 3,
    "Info" = 4,
    "Trace" = 5
}
export interface IUI {
    render(node: element, parent: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
    processElement(element: any, depth: number, index?: number): element;
    Component: typeof Component;
}
export declare type elementBase = [string | Function, {
    [key: string]: any;
}?, (string | Function | {
    [index: number]: elementBase;
} | {
    [index: string]: elementBase;
})?];
export declare type element = elementBase | string | Function | undefined | {
    [index: number]: element | Promise<element>;
};
export interface ILogger {
    log: (logLevel: LogLevel, title?: string, optionalParameters?: any[]) => string | void;
}
export interface IServicesLoaded {
    logger: ILogger;
}
export interface IAppLoaded {
    services: IServicesLoaded;
}
export default class preact implements IUI {
    app: IAppLoaded;
    render(ui: any, parent?: any, mergeWith?: any): any;
    Component: typeof Component;
    constructor(app: IAppLoaded);
    processElement(element: any, depth: number, index?: number): any;
}
