import { Transformer, Loader, Navigation, Data, Events, Processor } from "./services";
import * as types from "./types";

export abstract class App<O,I> implements types.IAppLoaded<O,I>
{
    main: object | object[];
    defaultState?: Object | undefined;
    //ui?: { Component: any; processElement(tag: any, attributes?: object | undefined, children?: any): any; render: any; } | undefined;
    stateChanged?: Function | undefined;
    //disableIntercept?: boolean | undefined;
    options: types.IOptions&O;
    components?: {[name:string]:any} | Function | undefined;
    services:types.IServicesLoaded<types.IApp<O, I>>;
    controllers:{[index:string]:types.IController};
    info: types.IInfo&I

    constructor(app:Required<types.IApp<O,I>>)
    {
        try {
            Object.keys(app).forEach(k => {let d = Object.getOwnPropertyDescriptor(app, k); if (d) Object.defineProperty(this, k, d);});
            this.main = app.main;
            this.options = app.options;
            this.info = app.info;
            this.options.logLevel = this.options.logLevel || types.LogLevel.Error;
            let logger = app.services && app.services.logger ? (typeof app.services.logger === "object" ? app.services.logger : new app.services.logger(this)) : null;
            let s = app.services //|| {};
            if (!s.UI) throw new Error("UI required");
            s.logger = {log: (logLevel:types.LogLevel, title?:any, optionalParameters?:any[]):string|void => { 
                if (logLevel <= (this && this.options && this.options.logLevel ? (types.LogLevel[this.options.logLevel] || 2) : 2)) 
                    logger ? logger.log.bind(this, logLevel, title, optionalParameters) : [function(title?:any, optionalParameters?:any[]){}, console.error, console.error, console.warn, console.info, console.info][logLevel](title +'\r\n', optionalParameters || [this]); 
                }};
            s.transformer = s.transformer ? (typeof s.transformer === "object" ? s.transformer : new s.transformer(this)) : new Transformer( {module: types.ModuleSystem.AMD} );
            s.moduleSystem = s.moduleSystem ? (typeof s.moduleSystem === "object" ? s.moduleSystem : new s.moduleSystem(this)) : new Loader(this);
            s.navigation = s.navigation ? (typeof s.navigation === "object" ? s.navigation : new s.navigation(this)) : Navigation;
            s.data = s.data ? (typeof s.data === "object" ? s.data : new s.data(this)) : Data;
            s.UI  = typeof s.UI === "object" ? s.UI : new s.UI(this);
            s.events = s.events ? (typeof s.events === "object" ? s.events : new s.events(this)) : new Events(this);
            this.services = {moduleSystem: s.moduleSystem, processor: new Processor(this), transformer: s.transformer, logger: s.logger, UI: s.UI, navigation: s.navigation, events: s.events/*, intercept: s.intercept || ((m) => { if (Array.isArray(m) && m.length > 0 && m[0].default) m[0] = m[0].default; return m.default || m;})*/ };
            this.controllers = {};
            if (app.controllers)
                for (let c in app.controllers) {
                    let co = app.controllers[c];
                    this.controllers[c] = typeof co === "object" ? co : new (co)(this);
                }
            this.components = app.components;
            if (typeof this.components === "object" && !this.components["Navigation"]) this.components["Navigation"] = Navigation;
            if (typeof this.components === "object" && !this.components["Data"]) this.components["Data"] = Data;
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    protected initApp() {
        //if (!this.options.web) this.options.web = { };
        this.services.moduleSystem.init(this.options.baseExecutionPath);
    }

    abstract run():PromiseLike<any>;

}
