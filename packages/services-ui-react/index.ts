import { createElement, Component } from 'react';
import { render } from 'react-dom';

export enum LogLevel {
    "None" = 0,
    "Exception" = 1,
    "Error" = 2,
    "Warn" = 3,
    "Info" = 4,
    "Trace" = 5
}

export interface IUI {
    render(node: any, parent: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
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
    log: (logLevel:LogLevel, title?:string, optionalParameters?:any[])=>string|void;
  }
  
export interface IServicesLoaded {
    logger:ILogger
}

export interface IAppLoaded {
    services:IServicesLoaded
}  

export default class react implements IUI {
    app:IAppLoaded;
    render (ui: any, parent?: any, mergeWith?: any): any { 
        return render(ui, parent, mergeWith);
    }

    Component = Component;
    
    constructor(app: IAppLoaded) {
        this.app = app;
    }

    processElement(element:any, depth:number, index?:number) {
        if (depth % 2 === 0) {
            if (typeof element !== "string" && !Array.isArray(element)) {
                this.app.services.logger.log.bind(this, LogLevel.Error, "Child element [2] should be either a string or array", element);
                throw new Error("Child element [2] should be either a string or array");
            }
            else if (index !== undefined && Array.isArray(element)) {
                element[1] = element[1] || {};
                if (!element[1].key) element[1].key = index;
            }
        }
        
        return depth % 2 === 1 || !Array.isArray(element) ? element : createElement(element[0], element[1], element[2]);
    }
}