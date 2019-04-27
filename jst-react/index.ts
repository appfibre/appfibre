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

interface IApp {
    services: {
        logger: { log: (logLevel:LogLevel, title?:string, optionalParameters?:any[])=>string|void }
    }
}

interface IUI {
    render(ui: any, parent?: any, mergeWith?: any): any;
    processElement(element:any, depth:number, index?:number) : any
    Component: any;
}

export default class react implements IUI {
    app:IApp;
    render (ui: any, parent?: any, mergeWith?: any): any { 
        return render(ui, parent, mergeWith);
    }

    Component = Component;
    
    constructor(app: IApp) {
        this.app = app;
    }

    /*processElement(tag:any, attributes?:object|undefined, children?:any|undefined) : any {
        if (typeof tag === "function" && Array.isArray(children)) {
            if (children.length > 1) {
                this.app.services.logger.log.bind(this, LogLevel.Warn, "Class/function tags cannot have more than one direct child elements, wrapping elements in a div tag", children);
                return this.processElement(tag, attributes, this.processElement("div", {}, children));
            } 
            else { 
                children = children[0];
            }
        }
    
        return createElement(tag, attributes, children ? children : null);   
    }*/

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