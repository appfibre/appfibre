import { h, render, Component } from 'preact';

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
        logger: { "type": "Logger", 
            log: (logLevel:LogLevel, title?:string, detail?:any, optionalParameters?:any[])=>void;
        }
    }
}

interface IUI {
    type: "UI";
    render(ui: any, parent?: any, mergeWith?: any): any;
    processElement(tag: any, attributes?: object | undefined, children?: any | undefined): any;
    Component: any;
}

export default class preact implements IUI {
    "type":'UI'
    app:IApp;
    render (ui: any, parent?: any, mergeWith?: any): any { 
        return render(ui, parent, mergeWith);
    }

    Component = Component;
    
    constructor(app: IApp) {
        this.type = 'UI';
        this.app = app;
    }

    processElement(tag:any, attributes?:object|undefined, children?:any|undefined) : any {
        if (typeof tag === "function" && Array.isArray(children)) {
            if (children.length > 1) {
                this.app.services.logger.log.bind(this, LogLevel.Warn, "Class/function tags cannot have more than one direct child elements, wrapping elements in a div tag", children);
                return this.processElement(tag, attributes, this.processElement("div", {}, children));
            } 
            else { 
                children = children[0];
            }
        }

        return h(tag, attributes || null, children ? children : null);   
    }
}