import { IApp, IAppLoaded, IServicesLoaded, IOptions, IContext, LogLevel, ModuleSystem, IController } from "./types";
//import { Intercept } from "./intercept";
import { Promise, IPromise } from "./services/promise";
import { Loader } from "./services/loader";
import { Transformer } from "./services/transformer";
import { Processor } from "./services/processor";
import { WebUI } from "./services/webui";
import { Navigation } from "./services/navigation";

export class App implements IAppLoaded
{
    main: object | object[];
    defaultState?: Object | undefined;
    //ui?: { Component: any; processElement(tag: any, attributes?: object | undefined, children?: any): any; render: any; } | undefined;
    stateChanged?: Function | undefined;
    disableIntercept?: boolean | undefined;
    options: IOptions;
    context?:  IContext | undefined;
    components?: {[name:string]:any} | Function | undefined;
    services:IServicesLoaded;
    controllers:{[index:string]:IController};

    constructor(app:IApp = {main: []})
    {
        try {
            Object.keys(app).forEach(k => {let d = Object.getOwnPropertyDescriptor(app, k); if (d) Object.defineProperty(this, k, d);});
            this.main = app.main;
            this.options = app.options || {};
                this.options.logLevel = this.options.logLevel || LogLevel.Error;
            let logger = app.services && app.services.logger ? (typeof app.services.logger === "object" ? app.services.logger : new app.services.logger(this)) : null;
            let s = app.services || {};
            s.logger = {log: (logLevel:LogLevel, title?:any, optionalParameters?:any[]):string|void => { 
                if (logLevel <= (this && this.options && this.options.logLevel ? (LogLevel[this.options.logLevel] || 2) : 2)) 
                    logger ? logger.log.bind(this, logLevel, title, optionalParameters) : [function(title?:any, optionalParameters?:any[]){}, console.error, console.error, console.warn, console.info, console.info][logLevel](title +'\r\n', optionalParameters || [this]); 
                }};
            s.promise = s.promise || Promise;
            s.transformer = s.transformer ? (typeof s.transformer === "object" ? s.transformer : new s.transformer(this)) : new Transformer( {module: ModuleSystem.None} );
            s.moduleSystem = s.moduleSystem ? (typeof s.moduleSystem === "object" ? s.moduleSystem : new s.moduleSystem(this)) : new Loader(s.promise, this.options.basePath);
            s.navigation = s.navigation ? (typeof s.navigation === "object" ? s.navigation : new s.navigation(this)) : Navigation;
            s.UI = s.UI ? (typeof s.UI === "object" ? s.UI : new s.UI(this)) : new WebUI(this);
            this.services = {moduleSystem: s.moduleSystem, processor: new Processor(this), promise: s.promise, transformer: s.transformer, logger: s.logger, UI: s.UI, navigation: s.navigation };
            this.controllers = {};
            if (app.controllers)
                for (let c in app.controllers) {
                    let co = app.controllers[c];
                    this.controllers[c] = typeof co === "object" ? co : new (co)(this);
                }
            this.components = app.components;
            if (typeof this.components === "object" && !this.components["Navigation"]) this.components["Navigation"] = Navigation;
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    private initApp() {
        if (!this.options.web) this.options.web = {};
        
        try{

            if (document) { // web app
                if (!document.body) document.body = document.createElement('body');
                this.options.web.target = this.options.web.target || document.body;
                if (this.options.web.target === document.body) {
                    this.options.web.target = document.getElementById("main") || document.body.appendChild(document.createElement("div"));
                    if (!this.options.web.target.id) this.options.web.target.setAttribute("id", "main");
                } else if (typeof this.options.web.target === "string")
                    this.options.web.target = document.getElementById(this.options.web.target);
                if (this.options.web.target == null) throw new Error(`Cannot locate target (${this.options.web.target?'not specified':this.options.web.target}) in html document body.`);
                if (this.options.title) document.title = this.options.title;
                //if (module && module.hot) module.hot.accept();
                if (this.options.web.target.hasChildNodes()) this.options.web.target.innerHTML = "";
            } }
        catch 
        {
            //TODO: workaround for nodeJs as document element is not defined in Node runtime
        }
    }

    run():IPromise<any> {
        this.services.logger.log.call(this, LogLevel.Trace, 'App.run');
        let main:any = null;
        return new this.services.promise((resolve:any, reject:any) => {
            try {
                this.initApp();
                main = this.services.navigation.resolve.apply(this);
            } catch (e) {
                this.services.logger.log.call(this, LogLevel.Error, e);
                reject(e);
            }
            this.render(main).then(resolve, err => { this.services.logger.log.call(this, LogLevel.Error, err.message, err.stack); reject(err); this.render(["pre", {}, err.stack]) });
        });
    }

    private render(ui:any) : IPromise<any> 
    {
        return new this.services.promise( (resolve:Function, reject:Function) => {
            this.services.logger.log.call(this, LogLevel.Trace, 'App.render', [{ui}]);
            this.services.processor.process(ui).then((value) => { 
                try {
                    resolve(this.services.UI.render(value, this.options.web && this.options.web.target ? this.options.web.target : undefined));
               } catch (e) {
                   reject(e);
                }
            } , r=>reject(r));            
        });
    }

}