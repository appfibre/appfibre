"use strict";
exports.__esModule = true;
var types_1 = require("./types");
//import { Intercept } from "./intercept";
var promise_1 = require("./services/promise");
var loader_1 = require("./services/loader");
var transformer_1 = require("./services/transformer");
var processor_1 = require("./services/processor");
var webui_1 = require("./services/webui");
var App = /** @class */ (function () {
    function App(app) {
        if (app === void 0) { app = { main: [] }; }
        var _this = this;
        this.main = app.main;
        this.options = app.options || {};
        this.options.logLevel = this.options.logLevel || types_1.LogLevel.Error;
        var logger = app.services && app.services.logger ? ('type' in app.services.logger ? app.services.logger : new app.services.logger(this)) : null;
        var s = app.services || {};
        s.logger = { type: "Logger", log: function (logLevel, title, detail, optionalParameters) { if (logLevel <= (_this && _this.options && _this.options.logLevel ? (types_1.LogLevel[_this.options.logLevel] || 2) : 2))
                logger ? logger.log.bind(_this, logLevel, title, detail, optionalParameters) : [function (title, detail, optionalParameters) { }, console.error, console.error, console.warn, console.info, console.trace][logLevel](_this + ": " + title + " \r\n " + detail, optionalParameters); } };
        s.promise = s.promise || promise_1.Promise;
        s.transformer = s.transformer ? ('type' in s.transformer ? s.transformer : new s.transformer(this)) : new transformer_1.Transformer();
        s.moduleSystem = s.moduleSystem ? ('type' in s.moduleSystem ? s.moduleSystem : new s.moduleSystem(this)) : new loader_1.Loader(this);
        s.UI = s.UI ? ('type' in s.UI ? s.UI : new s.UI(this)) : new webui_1.WebUI(this);
        this.services = { moduleSystem: s.moduleSystem, processor: new processor_1.Processor(this), promise: s.promise, transformer: s.transformer, logger: s.logger, UI: s.UI };
        this.modules = app.modules;
        this.components = app.components;
        this.loadModule(this);
    }
    App.prototype.loadModule = function (module) {
        var _this = this;
        if (module.modules)
            module.modules.forEach(function (element) {
                if (typeof element == 'object')
                    _this.loadModule(element);
            });
    };
    App.prototype.initModule = function (module) {
        var _this = this;
        if (module.modules)
            module.modules.forEach(function (element) {
                if (typeof element == 'object')
                    _this.initModule(element);
            });
        if (module.events && module.events.init)
            module.events.init.call(self, this, module);
    };
    /*log(logLevel:LogLevel, message?:string, optionalParameters?:any[]) {
        let l = [(message?:any, optionalParameters?:any[])=>{}, this.services.logger.exception, this.services.logger.error, this.services.logger.warn, this.services.logger.log, this.services.logger.trace];
        if (logLevel <= (this && this.options ? (this.options.logLevel || 2) : 2))
            l[logLevel](message, optionalParameters);
    }*/
    App.prototype.initApp = function () {
        if (!this.options.web)
            this.options.web = {};
        try {
            if (document) { // web app
                if (!document.body)
                    document.body = document.createElement('body');
                this.options.web.target = this.options.web.target || document.body;
                if (this.options.web.target === document.body) {
                    this.options.web.target = document.getElementById("main") || document.body.appendChild(document.createElement("div"));
                    if (!this.options.web.target.id)
                        this.options.web.target.setAttribute("id", "main");
                }
                else if (typeof this.options.web.target === "string")
                    this.options.web.target = document.getElementById(this.options.web.target);
                if (this.options.web.target == null)
                    throw new Error("Cannot locate target (" + (this.options.web.target ? 'not specified' : this.options.web.target) + ") in html document body.");
                if (this.options.title)
                    document.title = this.options.title;
                //if (module && module.hot) module.hot.accept();
                if (this.options.web.target.hasChildNodes())
                    this.options.web.target.innerHTML = "";
            }
        }
        catch (_a) {
            //TODO: workaround for nodeJs as document element is not defined in Node runtime
        }
    };
    App.prototype.run = function () {
        var _this = this;
        return new this.services.promise(function (resolve, reject) {
            try {
                _this.initApp();
                _this.initModule(_this);
            }
            catch (e) {
                reject(e);
            }
            _this.services.logger.log.call(_this, types_1.LogLevel.Trace, 'Rendering app.main', _this.main);
            _this.render(_this.main).then(function (value) { _this.services.logger.log(types_1.LogLevel.Trace, 'Rendered app.main', value); resolve(value); }, function (err) { _this.services.logger.log.call(_this, types_1.LogLevel.Error, 'Error rendering app.main', err); reject(err); });
        });
    };
    App.prototype.render = function (ui) {
        var _this = this;
        return new this.services.promise(function (resolve, reject) {
            _this.services.processor.process(ui).then(function (value) {
                try {
                    resolve(_this.services.UI.render(value, _this.options.web && _this.options.web.target ? _this.options.web.target : undefined));
                }
                catch (e) {
                    reject(e);
                }
            }, function (r) { return reject(r); });
        });
    };
    return App;
}());
exports.App = App;
function xapp(app) {
    if (!app.services)
        app.services = {};
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
    function Inject(Proxy, Render) {
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
