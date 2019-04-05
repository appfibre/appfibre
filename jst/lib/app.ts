import { IApp, IModule, IAppLoaded, IServicesLoaded, IOptions, IContext, IEvents, LogLevel } from "./types";
//import { Intercept } from "./intercept";
import { Promise, IPromise } from "./services/promise";
import { Loader } from "./services/loader";
import { Transformer } from "./services/transformer";
import { Processor } from "./services/processor";
import { WebUI } from "./services/webui";

export class App implements IAppLoaded
{
    main: object | object[];
    defaultState?: Object | undefined;
    //ui?: { Component: any; processElement(tag: any, attributes?: object | undefined, children?: any): any; render: any; } | undefined;
    stateChanged?: Function | undefined;
    disableIntercept?: boolean | undefined;
    options: IOptions;
    context?:  IContext | undefined;
    modules?: (string | IModule)[] | undefined;
    components?: Object | Function | undefined;
    events?: IEvents | undefined;
    services:IServicesLoaded;
    constructor(app:IApp = {main: []})
    {
        this.main = app.main;
        this.options = app.options || {};
        this.options.logLevel = this.options.logLevel || LogLevel.Error;
        let logger = app.services && app.services.logger ? ('type' in app.services.logger ? app.services.logger : new app.services.logger(this)) : null;
        let s = app.services || {};
        s.logger = {type: "Logger", log: (logLevel:LogLevel, title?:any, detail?:any, optionalParameters?:any[]) => { if (logLevel <= (this && this.options && this.options.logLevel ? (LogLevel[this.options.logLevel] || 2) : 2)) logger ? logger.log.bind(this, logLevel, title, detail, optionalParameters) : [function(title?:any,detail?:any, optionalParameters?:any[]){}, console.error, console.error, console.warn, console.info, console.trace][logLevel](`${this}: ${title} \r\n ${detail}`, optionalParameters) }};
        s.promise = s.promise || Promise;
        s.transformer = s.transformer ? ('type' in s.transformer ? s.transformer : new s.transformer(this)) : new Transformer();
        s.moduleSystem = s.moduleSystem ? ('type' in s.moduleSystem ? s.moduleSystem : new s.moduleSystem(this)) : new Loader(s.promise, this.options.basePath);
        s.UI = s.UI ? ('type' in s.UI ? s.UI : new s.UI(this)) : new WebUI(this);
        this.services = {moduleSystem: s.moduleSystem, processor: new Processor(this), promise: s.promise, transformer: s.transformer, logger: s.logger, UI: s.UI };
        this.modules = app.modules;
        this.components = app.components;
        
        this.loadModule(this);
    }

    loadModule(module:IModule) {
        if (module.modules)
            module.modules.forEach(element => {
                if (typeof element == 'object')
                    this.loadModule(element);
            });
    }

    initModule(this:any, module:IModule){
        if (module.modules)
            module.modules.forEach(element => {
                if (typeof element == 'object')
                    this.initModule(element);
            });    
        if (module.events && module.events.init) module.events.init.call(self, this, module);
    }

    /*log(logLevel:LogLevel, message?:string, optionalParameters?:any[]) {
        let l = [(message?:any, optionalParameters?:any[])=>{}, this.services.logger.exception, this.services.logger.error, this.services.logger.warn, this.services.logger.log, this.services.logger.trace];
        if (logLevel <= (this && this.options ? (this.options.logLevel || 2) : 2))
            l[logLevel](message, optionalParameters);
    }*/

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
         return new this.services.promise((resolve:any, reject:any) => {
            try {
                this.initApp();
                this.initModule(this);
            } catch (e) {
                reject(e);
            }
            this.services.logger.log.call(this, LogLevel.Trace, 'Rendering app.main', this.main);
            this.render(this.main).then(value => {this.services.logger.log(LogLevel.Trace, 'Rendered app.main', value); resolve(value)}, err => { this.services.logger.log.call(this, LogLevel.Error, 'Error rendering app.main', err); reject(err); });
        });
    }

    private render(ui:any) : IPromise<any> 
    {
        return new this.services.promise( (resolve:Function, reject:Function) => {
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

function xapp (app:IApp) : any {

    if (!app.services) app.services = {};
    /*if (!app.services.loader) app.services.loader = {load: function (url : string, parse : boolean, async?: boolean) : Promise<any> {
            
        }
    }*/



    //const _render = (jst:any, target:any) => app.ui ? app.ui.render(parse(jst), target) : null;
/*
    function _construct(jstComponent : any) : any {
        return class extends jstComponent {
            render(obj : any) {
                if (Array.isArray(obj) && obj.length === 1 && !Array.isArray(obj[0])) return typeof obj[0] == "string" ? parse(obj) : obj[0];
                return obj == null || typeof obj === "string" || obj.$$typeof ? obj : parse(obj);
            }
        }
    }*/

    function Inject (Proxy:any, Render:Function) : any {
        /*var Component = Proxy || (app.ui ? app.ui.Component : null);
        class Loader extends Component {
            load() {
                if (app.services && app.services.loader) app.services.loader.load(this.state.url, true).then(obj => {this.setState({children: obj})}, err => {this.setState({children: ["Exception", err]})});
            }
    
            componentWillMount()
            {
                this.componentWillUpdate({}, this.props);
            }
    
            componentWillUpdate(props:any, nextprops:any) 
            {
                this.checkurl(nextprops);
            }
            
            shouldComponentUpdate(props:any) {
                return this.checkurl(props);
            }
    
            checkurl(props:any) {
                var url = typeof props.url === "function" ? props.url() : props.url;
                if (!this.state || this.state.url !== url)
                    this.setState({children: this.props.children, url: url}, this.load);
                return !this.state || this.state.url === url;
            }
    
            render () {
                return super.render(this.checkurl(this.props) && this.state.children && this.state.children.length > 0 ? this.state.children : this.props.children);
            }
        }*/
    
        return app;
        /*var inj = {
              Component 
            , Context 
            , Loader
            , Resolve
            , State: Context.state
            , components : app.components
            , Render
        }
        var keys = Object.keys(app);
        for (var i in keys)
            if (keys[i] != "title" && keys[i] != "designer" && keys[i] != "ui" && keys[i] != "target")
                Object.defineProperty(inj, keys[i], Object.getOwnPropertyDescriptor(app, keys[i])||{});
        return inj;*/
    }


    
    document.writeln(JSON.stringify(app));

}   