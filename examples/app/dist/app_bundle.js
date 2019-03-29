/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../jst/dist/app.js":
/*!****************************************!*\
  !*** C:/Code/appfibre/jst/dist/app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var types_1 = __webpack_require__(/*! ./types */ "../../jst/dist/types.js");
//import { Intercept } from "./intercept";
var promise_1 = __webpack_require__(/*! ./services/promise */ "../../jst/dist/services/promise.js");
var loader_1 = __webpack_require__(/*! ./services/loader */ "../../jst/dist/services/loader.js");
var transformer_1 = __webpack_require__(/*! ./services/transformer */ "../../jst/dist/services/transformer.js");
var processor_1 = __webpack_require__(/*! ./services/processor */ "../../jst/dist/services/processor.js");
var webui_1 = __webpack_require__(/*! ./services/webui */ "../../jst/dist/services/webui.js");
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


/***/ }),

/***/ "../../jst/dist/components/async.js":
/*!*****************************************************!*\
  !*** C:/Code/appfibre/jst/dist/components/async.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Async = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Async, _super);
        function Async(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                value: _this.props.value[3]
            };
            return _this;
        }
        Async.prototype.componentDidMount = function () {
            var _this = this;
            if (app.services.promise.prototype.isPrototypeOf(this.props.value))
                this.props.value.then(function (value) { return _this.setState({ "value": value }); }, function (err) { return _this.setState({ "value": _this.props.value[4] ? _this.props.value[4](err) : ["Exception", err] }); });
            else if (this.props.value[0] && this.props.value[0].then)
                this.props.value[0].then(function (value) { return _this.setState({ "value": value }); }, function (err) { return _this.setState({ "value": _this.props.value[4] ? _this.props.value[4](err) : ["Exception", err] }); });
            else
                app.services.promise.all(this.props.value).then(function (value) { return _this.setState({ "value": value }); })["catch"](function (err) { if (_this.props.value[4])
                    _this.setState({ "value": _this.props.value[4] }); });
        };
        Async.prototype.render = function () {
            return this.state.value && typeof this.state.value !== "string" ? _super.prototype.render.call(this, this.state.value) : "";
        };
        return Async;
    }(app.services.processor.construct(app.services.UI.Component)));
};
exports.Async = Async;


/***/ }),

/***/ "../../jst/dist/components/intercept.js":
/*!*********************************************************!*\
  !*** C:/Code/appfibre/jst/dist/components/intercept.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Intercept = function inject(_a) {
    var Component = _a.Component;
    return /** @class */ (function (_super) {
        __extends(Intercept, _super);
        function Intercept() {
            var _this = _super.call(this) || this;
            _this.state = { focus: false, selected: false, editMode: null, canEdit: true };
            _this.onMessage = _this.onMessage.bind(_this);
            _this.click = _this.click.bind(_this);
            _this.mouseEnter = _this.mouseEnter.bind(_this);
            _this.mouseLeave = _this.mouseLeave.bind(_this);
            return _this;
        }
        Intercept.prototype.componentDidMount = function () {
            window.addEventListener("message", this.onMessage);
            window.onclick = function () { parent.postMessage({ eventType: "select", correlationId: Date.now().toString() }, location.href); };
        };
        Intercept.prototype.componentWillUnmount = function () {
            window.removeEventListener("message", this.onMessage);
        };
        Intercept.prototype.reconstruct = function (obj) {
            if (!obj[1])
                obj[1] = {};
            if (!obj[1].style)
                obj[1].style = {};
            if (!obj[1].style.border && !obj[1].style.padding && !obj[1].onMouseEnter && !obj[1].onMouseLeave) {
                obj[1].style.padding = this.state.focus || this.state.selected ? "1px" : "2px";
                if (this.state.editMode)
                    obj[1].style.background = "lightblue";
                if (this.state.selected)
                    obj[1].style.border = "1px solid black";
                else if (this.state.focus)
                    obj[1].style.border = "1px dashed grey";
                obj[1].onMouseEnter = this.mouseEnter;
                obj[1].onMouseLeave = this.mouseLeave;
                obj[1].onClick = this.click;
            }
            return obj;
        };
        Intercept.prototype.render = function () {
            //return super.render(Array.isArray(this.props.children) ? this.reconstruct(["div", {style: {display: "inline-block"}}, this.props.children])  : this.reconstruct(this.props.children));
            return _super.prototype.render.call(this, this.reconstruct(["div", { style: { display: "inline-block" }, key: 0 }, this.props.children]));
        };
        Intercept.prototype.mouseEnter = function () {
            //x.Designer.notify("x");
            this.setState({ "focus": true });
        };
        Intercept.prototype.mouseLeave = function () {
            //x.Designer.notify("y");
            this.setState({ "focus": false });
        };
        Intercept.prototype.click = function (ev) {
            ev.stopPropagation();
            //Designer.notify(this.props.file);
            var parent = window;
            while (parent.parent !== parent && window.parent != null)
                parent = parent.parent;
            var correlationId = Date.now().toString();
            parent.postMessage({ eventType: "select", editMode: this.state.editMode, canEdit: this.state.canEdit, correlationId: correlationId, control: { file: this.props.file, method: this.props.method } }, location.href);
            this.setState({ "selected": correlationId });
        };
        Intercept.prototype.onMessage = function (ev) {
            if (location.href.substr(0, ev.origin.length) == ev.origin && ev.type == "message" && ev.data) {
                if (this.state.selected == ev.data.correlationId)
                    switch (ev.data.eventType) {
                        case "deselect":
                            this.setState({ selected: false });
                            break;
                        case "edit":
                            this.setState({ editMode: ev.data.editMode });
                            break;
                    }
            }
        };
        return Intercept;
    }(Component));
};
exports.Intercept = Intercept;


/***/ }),

/***/ "../../jst/dist/index.js":
/*!******************************************!*\
  !*** C:/Code/appfibre/jst/dist/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var app_1 = __webpack_require__(/*! ./app */ "../../jst/dist/app.js");
exports.App = app_1.App;
var transformer_1 = __webpack_require__(/*! ./services/transformer */ "../../jst/dist/services/transformer.js");
exports.Transformer = transformer_1.Transformer;
var types = __importStar(__webpack_require__(/*! ./types */ "../../jst/dist/types.js"));
exports.types = types;


/***/ }),

/***/ "../../jst/dist/services/loader.js":
/*!****************************************************!*\
  !*** C:/Code/appfibre/jst/dist/services/loader.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Loader = /** @class */ (function () {
    function Loader(app) {
        this.type = "ModuleSystem";
        Loader.app = app;
    }
    Loader.prototype.load = function (url, parent) {
        return fetch(url, { credentials: 'same-origin' })
            .then(function (res) {
            if (!res.ok)
                throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
            return res.text();
        });
    };
    Loader.prototype.require = function (url) {
        return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, Loader.app.options.basePath);
    };
    Loader.prototype.run = function (source, url) {
        var m = { exports: {} };
        try {
            new Function('require', 'module', source + ";\n//# sourceURL=' + " + url)(this.require, m);
        }
        catch (f) {
            console.log('Error running script from from source' + url || false);
            throw f;
        }
        return m.exports;
    };
    Loader.prototype.exec = function (source, url) {
        var _this = this;
        return new Loader.app.services.promise(function (resolve, reject) {
            try {
                var output = _this.run(source, url);
                resolve(output);
            }
            catch (e) {
                console.log('Error executing script ' + url + ': ');
                reject(e);
            }
        });
    };
    Loader.prototype.instanciate = function (url, parent) {
        var app = Loader.app;
        return this.load(url, parent)
            .then(function (source) {
            return app.services.transformer.transform(url, source).code;
        })
            .then(this.exec);
    };
    return Loader;
}());
exports.Loader = Loader;


/***/ }),

/***/ "../../jst/dist/services/processor.js":
/*!*******************************************************!*\
  !*** C:/Code/appfibre/jst/dist/services/processor.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var intercept_1 = __webpack_require__(/*! ../components/intercept */ "../../jst/dist/components/intercept.js");
var async_1 = __webpack_require__(/*! ../components/async */ "../../jst/dist/components/async.js");
function s_xa(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
function clone(a, b) { for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d)
        for (var e in d)
            s_xa(d, e) && (a[e] = d[e]);
} return a; }
function Inject(app, Proxy) {
    var inj = clone(app);
    inj.services.UI.Component = Proxy || app.services.UI.Component;
    /*class Loader extends Component {
        load() {
            JstContext.load(this.state.url, true).then(obj => {this.setState({children: obj})}, err => {this.setState({children: ["Exception", err]})});
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
    /*let { title, designer, ui, target, ...inject } = app;
    return { Component
        , Context
        , Loader
        , components : app.components
        , ...inject
    };*/
    return inj;
}
var Processor = /** @class */ (function () {
    function Processor(app) {
        this.cache = Object();
        this.type = "Processor";
        this.app = app;
    }
    Processor.prototype.construct = function (jstComponent) {
        var ctx = this;
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function (obj) {
                if (Array.isArray(obj) && obj.length === 1 && !Array.isArray(obj[0]))
                    return typeof obj[0] == "string" ? ctx.parse(obj) : obj[0];
                return obj == null || typeof obj === "string" || obj.$$typeof ? obj : ctx.parse(obj);
            };
            return class_1;
        }(jstComponent));
    };
    Processor.prototype.locate = function (resource, path) {
        var parts = path.split('.');
        var jst = false;
        var obj = resource;
        for (var part = 0; part < parts.length; part++)
            if (obj[parts[part]] !== undefined) {
                if (part == path.length - 1)
                    jst = obj.__jst;
                obj = obj[path[part]];
            }
            else
                obj = null;
        return obj;
    };
    Processor.prototype.getFunctionName = function (obj) {
        if (obj.name)
            return obj.name;
        var name = obj.toString();
        if (name.indexOf('(') > -1)
            name = name.substr(0, name.indexOf('('));
        if (name.indexOf('function') > -1)
            name = name.substr(name.indexOf('function') + 'function'.length);
        return name.trim();
    };
    Processor.prototype.processElement = function (ar, supportAsync, light) {
        var _this = this;
        var done = false;
        while (!done) {
            if (typeof ar[0] === "function")
                switch (this.getFunctionName(ar[0])) {
                    case "inject":
                        ar[0] = ar[0](Inject(this.app, this.construct(this.app.services.UI.Component)));
                        break;
                    case "transform":
                        return this.parse(ar[0](ar), undefined, supportAsync);
                    default:
                        done = true;
                }
            else if (typeof ar[0] === "string") {
                var tag = ar[0];
                ar[0] = this.resolve(ar[0]);
                done = ar[0] === tag;
                if (ar[0].then && supportAsync && !light)
                    return new this.app.services.promise(function (resolve) { return ar[0].then(function (x) { return resolve(_this.parse(x, ar[1].key, supportAsync)); }); });
            }
            else if (ar[0] && ar[0].then && !supportAsync && !light)
                return this.app.services.UI.processElement(async_1.Async, { "value": ar });
            else
                done = true;
        }
        return light ? ar : this.app.services.UI.processElement(ar[0], ar[1], ar[2]);
    };
    Processor.prototype.parse = function (obj, key, supportAsync) {
        var _this = this;
        if (obj && obj["default"])
            obj = obj.__jst ? [intercept_1.Intercept, { file: obj.__jst }, [obj["default"]]] : obj["default"];
        if (Array.isArray(obj)) {
            if (key && !obj[1])
                obj[1] = { key: key };
            if (key && !obj[1].key)
                obj[1].key = key;
        }
        else
            obj = [obj, key ? { key: key } : null];
        var isAsync = false;
        for (var idx = 0; idx < obj.length; idx++) {
            if (typeof obj[idx] === "function") {
                //obj[idx] = this.processElement([obj[idx]], supportAsync, true)[0];
            }
            if (Array.isArray(obj[idx])) {
                for (var i = 0; i < obj[idx].length; i++) {
                    if (Array.isArray(obj[idx][i]) || typeof obj[idx][i] === "function" || typeof obj[idx][i] === "object") {
                        if (typeof obj[idx][i] === "function" || Array.isArray(obj[idx][i]))
                            obj[idx][i] = (idx == 2) ? this.parse(obj[idx][i], undefined, supportAsync) : this.processElement(obj[idx][i], supportAsync, true);
                        if (obj[idx][i] && obj[idx][i].then)
                            isAsync = true;
                    }
                    else if (idx == 2)
                        throw new Error("Expected either double array or string for children Parent:" + String(obj[0]) + ", Child:" + JSON.stringify(obj[idx][i], function (key, value) { return typeof value === "function" ? String(value) : value; }));
                }
            }
        }
        //if (isAsync && !obj[idx].then) obj[idx] = new Promise((resolve,reject) => Promise.all(obj[idx]).then(output => resolve(output), reason => reject(reason)));
        if (isAsync)
            for (var idx = 0; idx < obj.length; idx++)
                if (!obj[idx].then)
                    obj[idx] = this.app.services.promise.all(obj[idx]);
        if (!isAsync && ((typeof obj[0] === "function" && obj[0].then) || (typeof obj[1] === "function" && obj[1].then)))
            isAsync = true;
        if (!isAsync) {
            obj = this.processElement(obj, supportAsync);
            if (typeof obj === 'function' && obj.then && !supportAsync)
                return this.processElement([async_1.Async, { value: obj }], supportAsync);
            else
                return obj;
        }
        if (!supportAsync && isAsync)
            return this.processElement([async_1.Async, { value: this.app.services.promise.all(obj).then(function (o) { return _this.processElement(o, supportAsync); }) }]);
        return isAsync ? new this.app.services.promise(function (resolve) { return _this.app.services.promise.all(obj).then(function (o) { return resolve(_this.processElement(o, supportAsync)); }); }) : this.processElement([obj[0], obj[1], obj[2]], supportAsync);
    };
    Processor.prototype.resolve = function (fullpath) {
        var _this = this;
        if (this.cache[fullpath])
            return this.cache[fullpath];
        if (fullpath.substring(0, 1) == "~") {
            var parts = fullpath.substring(1, fullpath.length).split('#');
            //var obj = AppContext.xhr(parts[0], true);
            var obj = this.app.services.moduleSystem.instanciate(parts[0], this);
            if (parts.length == 1)
                return obj;
            return obj.then(function (x) { return _this.locate(x, parts.slice(1, parts.length).join(".")); });
        }
        else {
            var path = fullpath.split('.');
            var obj_1 = this.app.components || Object;
            var jst_1 = false;
            var prop_1 = "default";
            for (var part = 0; part < path.length; part++) {
                if (typeof obj_1 === "function" && this.getFunctionName(obj_1) === "inject")
                    //obj = obj( Inject( app.designer ? class Component extends app.ui.Component { render(obj) { return parse(jst ? [require("@appfibre/jst/intercept.js").default, {"file": jst, "method": prop}, obj] : obj); }}:obj));
                    obj_1 = obj_1(Inject(this.app, this.construct(this.app.services.UI.Component)));
                if (obj_1[path[part]] !== undefined) {
                    if (part == path.length - 1)
                        jst_1 = obj_1.__jst;
                    obj_1 = obj_1[path[part]];
                }
                else if (path.length == 1 && path[0].toLowerCase() == path[0])
                    obj_1 = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj) { return ["pre", { "style": { "color": "red" } }, obj[1].stack ? obj[1].stack : obj[1]]; };
                    else {
                        console.error('Cannot load ' + fullpath);
                        return /** @class */ (function (_super) {
                            __extends(class_2, _super);
                            function class_2() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            class_2.prototype.render = function () { return _super.prototype.render.call(this, ["span", { "style": { "color": "red" } }, fullpath + " not found!"]); };
                            return class_2;
                        }(this.app.services.UI.Component));
                    }
                }
            }
            if (obj_1["default"]) {
                if (obj_1.__jst)
                    jst_1 = obj_1.__jst;
                obj_1 = obj_1["default"];
            }
            else if (jst_1)
                prop_1 = path[path.length - 1];
            if (typeof obj_1 == "function" && this.getFunctionName(obj_1) === "inject")
                obj_1 = obj_1(Inject(this.app, jst_1 ? /** @class */ (function (_super) {
                    __extends(Component, _super);
                    function Component() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Component.prototype.render = function (obj) { return this.parse(!this.app.disableIntercept && window.parent !== null && window !== window.parent ? [intercept_1.Intercept, { "file": jst_1, "method": prop_1 }, this.construct(this.app.UI.Component)] : obj); };
                    return Component;
                }(this.app.services.UI.Component)) : this.construct(this.app.services.UI.Component)));
            return this.cache[fullpath] = Array.isArray(obj_1) ? /** @class */ (function (_super) {
                __extends(Wrapper, _super);
                function Wrapper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Wrapper.prototype.shouldComponentUpdate = function () { return true; };
                Wrapper.prototype.render = function () { if (!obj_1[1])
                    obj_1[1] = {}; if (!obj_1[1].key)
                    obj_1[1].key = 0; return this.parse(jst_1 && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [intercept_1.Intercept, { "file": jst_1, "method": prop_1 }, [obj_1]] : obj_1); };
                return Wrapper;
            }(this.app.services.UI.Component)) : obj_1;
        }
    };
    Processor.prototype.process = function (obj) {
        var _this = this;
        function visit(obj) {
            if (Array.isArray(obj)) {
                for (var i in obj)
                    if (visit(obj[i]))
                        return true;
            }
            else if (typeof obj === "object" && obj != null) {
                var keys = Object.keys(obj);
                for (var i in keys)
                    if (keys[i].substr(0, 1) == ".")
                        return true;
                    else if (visit(obj[keys[i]]))
                        return true;
            }
            return false;
        }
        return new this.app.services.promise(function (resolve, reject) {
            var isTemplate = visit(obj);
            try {
                if (isTemplate) {
                    _this.app.services.moduleSystem.exec(_this.app.services.transformer.transform(JSON.stringify(obj)).code).then(function (exported) {
                        try {
                            var output = _this.parse(exported["default"] || exported);
                            resolve(output);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, function (rs) { return reject(rs); });
                }
                else
                    resolve(_this.parse(obj));
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return Processor;
}());
exports.Processor = Processor;


/***/ }),

/***/ "../../jst/dist/services/promise.js":
/*!*****************************************************!*\
  !*** C:/Code/appfibre/jst/dist/services/promise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var states = { pending: 0, settled: 1, fulfilled: 2, rejected: 3 };
var asyncQueue = [];
var asyncTimer;
function asyncFlush() {
    // run promise callbacks
    for (var i = 0; i < asyncQueue.length; i++) {
        asyncQueue[i][0](asyncQueue[i][1]);
    }
    // reset async asyncQueue
    asyncQueue = [];
    asyncTimer = false;
}
function asyncCall(callback, arg) {
    asyncQueue.push([callback, arg]);
    if (!asyncTimer) {
        asyncTimer = true;
        setTimeout(asyncFlush, 0);
    }
}
function publish(promise) {
    promise._then = promise._then.forEach(invokeCallback);
}
function invokeCallback(subscriber) {
    var owner = subscriber.owner;
    var settled = owner._state;
    var value = owner._data;
    var callback = settled == states.fulfilled ? subscriber.fulfilled : subscriber.rejected;
    var promise = subscriber.then;
    if (typeof callback === 'function') {
        settled = states.fulfilled;
        try {
            value = callback(value);
        }
        catch (e) {
            reject(promise, e);
        }
    }
    else {
        throw new Error((settled == states.fulfilled ? "Resolve" : "Reject") + ' not implemented');
    }
    if (!handleThenable(promise, value)) {
        if (settled === states.fulfilled) {
            resolve(promise, value);
        }
        if (settled === states.rejected) {
            reject(promise, value);
        }
    }
}
function invokeResolver(resolver, promise) {
    function resolvePromise(value) {
        resolve(promise, value);
    }
    function rejectPromise(reason) {
        reject(promise, reason);
    }
    try {
        resolver(resolvePromise, rejectPromise);
    }
    catch (e) {
        rejectPromise(e);
    }
}
function resolve(promise, value) {
    if (promise === value || !handleThenable(promise, value)) {
        fulfill(promise, value);
    }
}
function fulfill(promise, value) {
    if (promise._state === states.pending) {
        promise._state = states.settled;
        promise._data = value;
        asyncCall(publishFulfillment, promise);
    }
}
function reject(promise, reason) {
    if (promise._state === states.pending) {
        promise._state = states.settled;
        promise._data = reason;
        asyncCall(publishRejection, promise);
    }
}
function publishFulfillment(promise) {
    promise._state = states.fulfilled;
    publish(promise);
}
function publishRejection(promise) {
    promise._state = states.rejected;
    publish(promise);
}
function handleThenable(promise, value) {
    var resolved = false;
    try {
        if (promise === value) {
            throw new TypeError('A promises callback cannot return that same promise.');
        }
        if (value && (typeof value === 'function' || typeof value === 'object')) {
            // then should be retrieved only once
            var then = value.then;
            if (typeof then === 'function') {
                then.call(value, function (val) {
                    if (!resolved) {
                        resolved = true;
                        (value === val) ? fulfill(promise, val) : resolve(promise, val);
                    }
                }, function (reason) {
                    if (!resolved) {
                        resolved = true;
                        reject(promise, reason);
                    }
                });
                return true;
            }
        }
    }
    catch (e) {
        if (!resolved) {
            reject(promise, e);
        }
        return true;
    }
    return false;
}
var Promise = /** @class */ (function () {
    function Promise(resolver) {
        this._state = states.pending;
        this._data = undefined;
        this._handled = false;
        this._then = [];
        invokeResolver(resolver, this);
    }
    Promise.prototype.then = function (onfulfilled, onrejected) {
        var subscriber = {
            owner: this,
            then: new Promise(function () { }),
            fulfilled: onfulfilled,
            rejected: onrejected
        };
        if ((onrejected || onfulfilled) && !this._handled)
            this._handled = true;
        if (this._state === states.fulfilled || this._state === states.rejected)
            // already resolved, call callback async
            asyncCall(invokeCallback, subscriber);
        else
            // subscribe
            this._then.push(subscriber);
        return subscriber.then;
    };
    Promise.prototype["catch"] = function (onrejected) {
        return this.then(null, onrejected);
    };
    Promise.all = function (promises) {
        if (!Array.isArray(promises)) {
            throw new TypeError('You must pass an array to Promise.all().');
        }
        return new Promise(function (resolve, reject) {
            var results = [];
            var remaining = 0;
            function resolver(index) {
                remaining++;
                return function (value) {
                    results[index] = value;
                    if (!--remaining) {
                        resolve(results);
                    }
                };
            }
            for (var i = 0, promise; i < promises.length; i++) {
                promise = promises[i];
                if (promise && typeof promise.then === 'function') {
                    promise.then(resolver(i), reject);
                }
                else {
                    results[i] = promise;
                }
            }
            if (!remaining) {
                resolve(results);
            }
        });
    };
    ;
    Promise.race = function (promises) {
        if (!Array.isArray(promises)) {
            throw new TypeError('You must pass an array to Promise.race().');
        }
        return new Promise(function (resolve, reject) {
            for (var i = 0, promise; i < promises.length; i++) {
                promise = promises[i];
                if (promise && typeof promise.then === 'function') {
                    promise.then(resolve, reject);
                }
                else {
                    resolve(promise);
                }
            }
        });
    };
    ;
    return Promise;
}());
exports.Promise = Promise;


/***/ }),

/***/ "../../jst/dist/services/transformer.js":
/*!*********************************************************!*\
  !*** C:/Code/appfibre/jst/dist/services/transformer.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var types_1 = __webpack_require__(/*! ../types */ "../../jst/dist/types.js");
var Transformer = /** @class */ (function () {
    function Transformer(settings) {
        var _this = this;
        this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
        this.type = "Transformer";
        this.settings = settings ? __assign({}, settings, { indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || types_1.ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports }) : { module: types_1.ModuleSystem.ES };
        this.settings.parsers = this.settings.parsers || {};
        this.settings.parsers[".require"] = this.settings.parsers[".import"] = function (obj, parseSettings, offset) { return _this.loadModule(obj[".import"] || obj[".require"], parseSettings); };
        this.settings.parsers[".function"] = function (obj, parseSettings, offset) { return "function " + (obj[".function"] ? obj[".function"] : "") + "(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + "){ return " + _this.process(obj["return"], true, false, parseSettings, offset) + " }"; };
        this.settings.parsers[".map"] = function (obj, parseSettings, offset) { return _this.process(obj[".map"], false, false, parseSettings, offset) + ".map(function(" + obj["arguments"] + ") {return " + (settings && settings.indent ? new Array(offset).join(' ') : "") + _this.process(obj["return"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".filter"] = function (obj, parseSettings, offset) { return _this.process(obj[".filter"], false, false, parseSettings, offset) + ".filter(function(" + obj["arguments"] + ") {return " + _this.process(obj["condition"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".call"] = function (obj, parseSettings, offset) { return _this.process(obj[".call"], false, false, parseSettings, offset) + ".call(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".exec"] = function (obj, parseSettings, offset) { return _this.process(obj[".exec"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".new"] = function (obj, parseSettings, offset) { return "new " + _this.process(obj[".new"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".id"] = this.settings.parsers[".code"] = function (obj, parseSettings, offset) { return obj[".code"] || obj[".id"]; };
        this.settings.parsers[".app"] = function (obj, parseSettings, offset) {
            var obj2 = {};
            var keys = Object.keys(obj);
            for (var key in keys)
                obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
            return _this.process({ ".new": { ".require": "@appfibre/jst#App" }, "arguments": [obj2] }, true, true, parseSettings, offset) + ".run()";
        };
        this.settings.parsers["."] = function (obj, parseSettings, offset) { return obj["."]; };
    }
    Transformer.prototype.loadModule = function (val, parseSettings) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (this.settings.module.toLowerCase() === types_1.ModuleSystem.ES.toLowerCase())
            m = val.indexOf('#', m.length + 2) > -1 ? val.substr(0, val.indexOf('#', m.length + 2) - 1) : val;
        if (parseSettings.imports.indexOf(m) === -1)
            parseSettings.imports.push(m);
        return "_" + parseSettings.imports.indexOf(m) + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '');
    };
    Transformer.prototype.format = function (lines, parseSettings, indent) {
        var lt = this.settings.compact ? "" : "\n";
        var tab = this.settings.compact ? "" : this.settings.indent || "\t";
        return lt + new Array(indent + 1).join(tab) + lines.join("," + lt + new Array(indent + 1).join(tab)) + lt + new Array(indent).join(tab);
    };
    Transformer.prototype.process = function (obj, esc, et, parseSettings, offset) {
        var _this = this;
        var output;
        if (obj === null)
            output = "null";
        else if (Array.isArray(obj))
            output = (et ? "" : "[") + this.format(obj.map(function (e, i) { return _this.process(e, esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "]");
        else if (typeof obj === "object") {
            var keys = Object.keys(obj);
            var processed = false;
            for (var k in keys)
                if (!processed && keys[k].length > 0 && keys[k].charAt(0) == '.') {
                    if (this.settings.parsers && this.settings.parsers[keys[k]]) {
                        processed = true;
                        output = this.settings.parsers[keys[k]](obj, parseSettings, offset) || '';
                    }
                    else
                        throw new Error("Could not locate parser " + keys[k].substr(1));
                }
            if (!processed)
                output = (et ? "" : "{") + this.format(keys.filter(function (k) { return k.length < 2 || k.substr(0, 2) != '..'; }).map(function (k, i) { return (_this.reservedWords.indexOf(k) > -1 ? "\"" + k + "\"" : k) + ":" + (_this.settings.compact ? '' : ' ') + _this.process(obj[k], esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "}");
        }
        else if (typeof obj === "function") // object not JSON...
            output = obj.toString();
        else
            output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
        return output;
    };
    Transformer.prototype.bundleModule = function (obj, name) {
        var _this = this;
        var output = { name: name, imports: [], exports: {}, compositeObject: false, code: '' };
        var keys = Object.keys(obj);
        var validkeys = keys.filter(function (k) { return k.indexOf(' ') === -1 && k.indexOf('/') === -1 && k.indexOf('-') === -1 && _this.reservedWords.indexOf(k) === -1; });
        var isDefault = keys.length === 1 && keys[0] === 'default';
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var';
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output.code += vr + " _" + r[req] + sp + "=" + sp + "require('" + req + "');" + nl;
                output.code += keys.map(function (key) { return "module.exports['" + key + "']" + sp + "=" + sp + _this.process(obj[key], true, false, output, 0) + ";"; }).join(nl);
                if (!isDefault)
                    output.code += nl + "module.exports['default']" + sp + "=" + sp + "{" + sp + keys.map(function (key) { return key + ": " + _this.process(obj[key], true, false, output, 0); }).join(nl) + " };";
                if (output.name)
                    output.code += nl + "module.exports['__jst'] = '" + name + ";";
                break;
            case "es":
                if (isDefault)
                    output.code += "export default" + sp + this.process(obj["default"], true, false, output, 0) + ";";
                else {
                    output.code += "export default" + sp + "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], true, false, output, 2)); }), output, 1) + "};";
                    if (this.settings.namedExports && validkeys.length > 0)
                        output.code = validkeys.map(function (key) { return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], true, false, output, 1) + ";"; }).join(nl) + ("" + (nl + output.code + nl));
                }
                break;
            default:
                if (output.name)
                    output.code += "return " + (isDefault ? "{'default' : " + this.process(obj["default"], true, false, output, 1) + ", '__jst': '" + output.name + "'}" : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + "}, '__jst': '" + output.name + "'") + ";";
                else
                    output.code += "return " + (isDefault ? this.process(obj["default"], true, false, output, 1) : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + "}") + ";";
        }
        var s = {};
        var r = {};
        if (output.imports.length > 0)
            for (var i = 0; i < output.imports.length; i++)
                if (output.imports[i].indexOf('#') > -1) {
                    var module_name = output.imports[i].substr(0, output.imports[i].indexOf('#'));
                    if (s[module_name] === undefined)
                        s[module_name] = {};
                    s[module_name][output.imports[i].substr(module_name.length + 1)] = i;
                }
                else
                    r[output.imports[i]] = i;
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                break;
            case "amd":
                output.code = "define([" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], function (" + Object.keys(r).map(function (key) { return '_' + r[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                break;
            case "es":
                output.code = Object.keys(s).map(function (key) { return (key.charAt(0) === '~' ? "var {" + Object.keys(s[key]).map(function (k) { return k + ": _" + s[key][k]; }) + "}  = await import('" + key.substr(1) + "');" + nl : "import {" + Object.keys(s[key]).map(function (k) { return k + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key + "';" + nl); }).join('') + Object.keys(r).map(function (key) { return (key.charAt(0) === '~' ? "var _" + r[key] + " = await import('" + key.substr(1) + "');" + nl : "import * as _" + r[key] + " from '" + key + "';" + nl); }).join('') + output.code;
                break;
            default:
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
        }
        return output;
    };
    Transformer.prototype.transform = function (input, name) {
        var obj;
        try {
            obj = typeof input === "string" ? JSON.parse(input) : input;
        }
        catch (e) {
            //console.log(JSON.stringify(this.settings));
            if (this.settings.dangerouslyProcessJavaScript || this.settings.dangerouslyProcessJavaScript === undefined) {
                try {
                    obj = eval("(" + input + ");");
                    if (this.settings.dangerouslyProcessJavaScript === undefined)
                        console.warn("Warning: " + (name || '') + " is not JSON compliant: " + e.message + ".  Set option \"dangerouslyProcessJavaScript\" to true to hide this message.\r\n" + input);
                }
                catch (f) {
                    throw new Error("Unable to process " + (name || '') + " as JavaScript: " + f.message);
                }
            }
            else
                throw new Error("Unable to parse JSON file " + (name || '') + ": " + e.message);
        }
        try {
            return this.bundleModule(Array.isArray(obj) || typeof (obj || '') !== 'object' || Object.keys(obj).filter(function (k) { return k[0] == '.'; }).length > 0 ? { "default": obj } : obj, name);
        }
        catch (e) {
            throw new Error("Unable to transform js template: " + e.message + "\r\n" + e.stack);
        }
    };
    return Transformer;
}());
exports.Transformer = Transformer;


/***/ }),

/***/ "../../jst/dist/services/webui.js":
/*!***************************************************!*\
  !*** C:/Code/appfibre/jst/dist/services/webui.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var types_1 = __webpack_require__(/*! ../types */ "../../jst/dist/types.js");
var WebUI = /** @class */ (function () {
    function WebUI(app) {
        this.type = "UI";
        this.app = app;
        this.app.options = this.app.options || {};
        try {
            if (window) {
                var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "react"));
                if (obj) {
                    this.processElement = obj.value.h;
                    this.Component = obj.value.Component;
                    this.renderInternal = obj.value.render;
                }
            }
        }
        catch (_a) {
            //TODO: find a workaround. in NodeJS ReferenceError: window is not defined
        }
    }
    WebUI.prototype.render = function (ui, parent, mergeWith) {
        if (this.renderInternal)
            return this.renderInternal(ui, parent, mergeWith);
        else
            this.app.services.logger.log.call(this, types_1.LogLevel.Error, "Unable to render UI - No UI framework detected.", "Ensure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    WebUI.prototype.processElement = function (tag, attributes, children) {
        // expected to be implemented.
        this.app.services.logger.log.call(this, types_1.LogLevel.Error, "Unable to process UI element - No UI framework detected.", "Ensure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    return WebUI;
}());
exports.WebUI = WebUI;


/***/ }),

/***/ "../../jst/dist/types.js":
/*!******************************************!*\
  !*** C:/Code/appfibre/jst/dist/types.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ModuleSystem;
(function (ModuleSystem) {
    ModuleSystem["None"] = "none";
    ModuleSystem["CommonJS"] = "commonjs";
    ModuleSystem["AMD"] = "amd";
    ModuleSystem["UMD"] = "umd";
    ModuleSystem["ES"] = "es";
})(ModuleSystem = exports.ModuleSystem || (exports.ModuleSystem = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Exception"] = 1] = "Exception";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Trace"] = 5] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var jst_1 = __webpack_require__(/*! @appfibre/jst */ "../../jst/dist/index.js");
new jst_1.App({
    main: ["div", null, "test"]
}).run();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3QvYXBwLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L2NvbXBvbmVudHMvYXN5bmMuanMiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3QvY29tcG9uZW50cy9pbnRlcmNlcHQuanMiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3Qvc2VydmljZXMvbG9hZGVyLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vQzovQ29kZS9hcHBmaWJyZS9qc3QvZGlzdC9zZXJ2aWNlcy9wcm9taXNlLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3RyYW5zZm9ybWVyLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3dlYnVpLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3R5cGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFp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Q2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUIsbUJBQW1CLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQzlTYTtBQUNiO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbi8vaW1wb3J0IHsgSW50ZXJjZXB0IH0gZnJvbSBcIi4vaW50ZXJjZXB0XCI7XHJcbnZhciBwcm9taXNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9wcm9taXNlXCIpO1xyXG52YXIgbG9hZGVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9sb2FkZXJcIik7XHJcbnZhciB0cmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4vc2VydmljZXMvdHJhbnNmb3JtZXJcIik7XHJcbnZhciBwcm9jZXNzb3JfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL3Byb2Nlc3NvclwiKTtcclxudmFyIHdlYnVpXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy93ZWJ1aVwiKTtcclxudmFyIEFwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEFwcChhcHApIHtcclxuICAgICAgICBpZiAoYXBwID09PSB2b2lkIDApIHsgYXBwID0geyBtYWluOiBbXSB9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLm1haW4gPSBhcHAubWFpbjtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBhcHAub3B0aW9ucyB8fCB7fTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMubG9nTGV2ZWwgPSB0aGlzLm9wdGlvbnMubG9nTGV2ZWwgfHwgdHlwZXNfMS5Mb2dMZXZlbC5FcnJvcjtcclxuICAgICAgICB2YXIgbG9nZ2VyID0gYXBwLnNlcnZpY2VzICYmIGFwcC5zZXJ2aWNlcy5sb2dnZXIgPyAoJ3R5cGUnIGluIGFwcC5zZXJ2aWNlcy5sb2dnZXIgPyBhcHAuc2VydmljZXMubG9nZ2VyIDogbmV3IGFwcC5zZXJ2aWNlcy5sb2dnZXIodGhpcykpIDogbnVsbDtcclxuICAgICAgICB2YXIgcyA9IGFwcC5zZXJ2aWNlcyB8fCB7fTtcclxuICAgICAgICBzLmxvZ2dlciA9IHsgdHlwZTogXCJMb2dnZXJcIiwgbG9nOiBmdW5jdGlvbiAobG9nTGV2ZWwsIHRpdGxlLCBkZXRhaWwsIG9wdGlvbmFsUGFyYW1ldGVycykgeyBpZiAobG9nTGV2ZWwgPD0gKF90aGlzICYmIF90aGlzLm9wdGlvbnMgJiYgX3RoaXMub3B0aW9ucy5sb2dMZXZlbCA/ICh0eXBlc18xLkxvZ0xldmVsW190aGlzLm9wdGlvbnMubG9nTGV2ZWxdIHx8IDIpIDogMikpXHJcbiAgICAgICAgICAgICAgICBsb2dnZXIgPyBsb2dnZXIubG9nLmJpbmQoX3RoaXMsIGxvZ0xldmVsLCB0aXRsZSwgZGV0YWlsLCBvcHRpb25hbFBhcmFtZXRlcnMpIDogW2Z1bmN0aW9uICh0aXRsZSwgZGV0YWlsLCBvcHRpb25hbFBhcmFtZXRlcnMpIHsgfSwgY29uc29sZS5lcnJvciwgY29uc29sZS5lcnJvciwgY29uc29sZS53YXJuLCBjb25zb2xlLmluZm8sIGNvbnNvbGUudHJhY2VdW2xvZ0xldmVsXShfdGhpcyArIFwiOiBcIiArIHRpdGxlICsgXCIgXFxyXFxuIFwiICsgZGV0YWlsLCBvcHRpb25hbFBhcmFtZXRlcnMpOyB9IH07XHJcbiAgICAgICAgcy5wcm9taXNlID0gcy5wcm9taXNlIHx8IHByb21pc2VfMS5Qcm9taXNlO1xyXG4gICAgICAgIHMudHJhbnNmb3JtZXIgPSBzLnRyYW5zZm9ybWVyID8gKCd0eXBlJyBpbiBzLnRyYW5zZm9ybWVyID8gcy50cmFuc2Zvcm1lciA6IG5ldyBzLnRyYW5zZm9ybWVyKHRoaXMpKSA6IG5ldyB0cmFuc2Zvcm1lcl8xLlRyYW5zZm9ybWVyKCk7XHJcbiAgICAgICAgcy5tb2R1bGVTeXN0ZW0gPSBzLm1vZHVsZVN5c3RlbSA/ICgndHlwZScgaW4gcy5tb2R1bGVTeXN0ZW0gPyBzLm1vZHVsZVN5c3RlbSA6IG5ldyBzLm1vZHVsZVN5c3RlbSh0aGlzKSkgOiBuZXcgbG9hZGVyXzEuTG9hZGVyKHRoaXMpO1xyXG4gICAgICAgIHMuVUkgPSBzLlVJID8gKCd0eXBlJyBpbiBzLlVJID8gcy5VSSA6IG5ldyBzLlVJKHRoaXMpKSA6IG5ldyB3ZWJ1aV8xLldlYlVJKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZXMgPSB7IG1vZHVsZVN5c3RlbTogcy5tb2R1bGVTeXN0ZW0sIHByb2Nlc3NvcjogbmV3IHByb2Nlc3Nvcl8xLlByb2Nlc3Nvcih0aGlzKSwgcHJvbWlzZTogcy5wcm9taXNlLCB0cmFuc2Zvcm1lcjogcy50cmFuc2Zvcm1lciwgbG9nZ2VyOiBzLmxvZ2dlciwgVUk6IHMuVUkgfTtcclxuICAgICAgICB0aGlzLm1vZHVsZXMgPSBhcHAubW9kdWxlcztcclxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBhcHAuY29tcG9uZW50cztcclxuICAgICAgICB0aGlzLmxvYWRNb2R1bGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBBcHAucHJvdG90eXBlLmxvYWRNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAobW9kdWxlLm1vZHVsZXMpXHJcbiAgICAgICAgICAgIG1vZHVsZS5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkTW9kdWxlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBBcHAucHJvdG90eXBlLmluaXRNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAobW9kdWxlLm1vZHVsZXMpXHJcbiAgICAgICAgICAgIG1vZHVsZS5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbml0TW9kdWxlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBpZiAobW9kdWxlLmV2ZW50cyAmJiBtb2R1bGUuZXZlbnRzLmluaXQpXHJcbiAgICAgICAgICAgIG1vZHVsZS5ldmVudHMuaW5pdC5jYWxsKHNlbGYsIHRoaXMsIG1vZHVsZSk7XHJcbiAgICB9O1xyXG4gICAgLypsb2cobG9nTGV2ZWw6TG9nTGV2ZWwsIG1lc3NhZ2U/OnN0cmluZywgb3B0aW9uYWxQYXJhbWV0ZXJzPzphbnlbXSkge1xyXG4gICAgICAgIGxldCBsID0gWyhtZXNzYWdlPzphbnksIG9wdGlvbmFsUGFyYW1ldGVycz86YW55W10pPT57fSwgdGhpcy5zZXJ2aWNlcy5sb2dnZXIuZXhjZXB0aW9uLCB0aGlzLnNlcnZpY2VzLmxvZ2dlci5lcnJvciwgdGhpcy5zZXJ2aWNlcy5sb2dnZXIud2FybiwgdGhpcy5zZXJ2aWNlcy5sb2dnZXIubG9nLCB0aGlzLnNlcnZpY2VzLmxvZ2dlci50cmFjZV07XHJcbiAgICAgICAgaWYgKGxvZ0xldmVsIDw9ICh0aGlzICYmIHRoaXMub3B0aW9ucyA/ICh0aGlzLm9wdGlvbnMubG9nTGV2ZWwgfHwgMikgOiAyKSlcclxuICAgICAgICAgICAgbFtsb2dMZXZlbF0obWVzc2FnZSwgb3B0aW9uYWxQYXJhbWV0ZXJzKTtcclxuICAgIH0qL1xyXG4gICAgQXBwLnByb3RvdHlwZS5pbml0QXBwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLndlYilcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYiA9IHt9O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudCkgeyAvLyB3ZWIgYXBwXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID0gdGhpcy5vcHRpb25zLndlYi50YXJnZXQgfHwgZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMud2ViLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpIHx8IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMud2ViLnRhcmdldC5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYi50YXJnZXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtYWluXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5vcHRpb25zLndlYi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGxvY2F0ZSB0YXJnZXQgKFwiICsgKHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID8gJ25vdCBzcGVjaWZpZWQnIDogdGhpcy5vcHRpb25zLndlYi50YXJnZXQpICsgXCIpIGluIGh0bWwgZG9jdW1lbnQgYm9keS5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAobW9kdWxlICYmIG1vZHVsZS5ob3QpIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndlYi50YXJnZXQuaGFzQ2hpbGROb2RlcygpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzogd29ya2Fyb3VuZCBmb3Igbm9kZUpzIGFzIGRvY3VtZW50IGVsZW1lbnQgaXMgbm90IGRlZmluZWQgaW4gTm9kZSBydW50aW1lXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFwcC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLnNlcnZpY2VzLnByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaW5pdEFwcCgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaW5pdE1vZHVsZShfdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwoX3RoaXMsIHR5cGVzXzEuTG9nTGV2ZWwuVHJhY2UsICdSZW5kZXJpbmcgYXBwLm1haW4nLCBfdGhpcy5tYWluKTtcclxuICAgICAgICAgICAgX3RoaXMucmVuZGVyKF90aGlzLm1haW4pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IF90aGlzLnNlcnZpY2VzLmxvZ2dlci5sb2codHlwZXNfMS5Mb2dMZXZlbC5UcmFjZSwgJ1JlbmRlcmVkIGFwcC5tYWluJywgdmFsdWUpOyByZXNvbHZlKHZhbHVlKTsgfSwgZnVuY3Rpb24gKGVycikgeyBfdGhpcy5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwoX3RoaXMsIHR5cGVzXzEuTG9nTGV2ZWwuRXJyb3IsICdFcnJvciByZW5kZXJpbmcgYXBwLm1haW4nLCBlcnIpOyByZWplY3QoZXJyKTsgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQXBwLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodWkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5zZXJ2aWNlcy5wcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2VydmljZXMucHJvY2Vzc29yLnByb2Nlc3ModWkpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuc2VydmljZXMuVUkucmVuZGVyKHZhbHVlLCBfdGhpcy5vcHRpb25zLndlYiAmJiBfdGhpcy5vcHRpb25zLndlYi50YXJnZXQgPyBfdGhpcy5vcHRpb25zLndlYi50YXJnZXQgOiB1bmRlZmluZWQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocikgeyByZXR1cm4gcmVqZWN0KHIpOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXBwO1xyXG59KCkpO1xyXG5leHBvcnRzLkFwcCA9IEFwcDtcclxuZnVuY3Rpb24geGFwcChhcHApIHtcclxuICAgIGlmICghYXBwLnNlcnZpY2VzKVxyXG4gICAgICAgIGFwcC5zZXJ2aWNlcyA9IHt9O1xyXG4gICAgLyppZiAoIWFwcC5zZXJ2aWNlcy5sb2FkZXIpIGFwcC5zZXJ2aWNlcy5sb2FkZXIgPSB7bG9hZDogZnVuY3Rpb24gKHVybCA6IHN0cmluZywgcGFyc2UgOiBib29sZWFuLCBhc3luYz86IGJvb2xlYW4pIDogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcbiAgICAvL2NvbnN0IF9yZW5kZXIgPSAoanN0OmFueSwgdGFyZ2V0OmFueSkgPT4gYXBwLnVpID8gYXBwLnVpLnJlbmRlcihwYXJzZShqc3QpLCB0YXJnZXQpIDogbnVsbDtcclxuICAgIC8qXHJcbiAgICAgICAgZnVuY3Rpb24gX2NvbnN0cnVjdChqc3RDb21wb25lbnQgOiBhbnkpIDogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMganN0Q29tcG9uZW50IHtcclxuICAgICAgICAgICAgICAgIHJlbmRlcihvYmogOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopICYmIG9iai5sZW5ndGggPT09IDEgJiYgIUFycmF5LmlzQXJyYXkob2JqWzBdKSkgcmV0dXJuIHR5cGVvZiBvYmpbMF0gPT0gXCJzdHJpbmdcIiA/IHBhcnNlKG9iaikgOiBvYmpbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsIHx8IHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIgfHwgb2JqLiQkdHlwZW9mID8gb2JqIDogcGFyc2Uob2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgZnVuY3Rpb24gSW5qZWN0KFByb3h5LCBSZW5kZXIpIHtcclxuICAgICAgICAvKnZhciBDb21wb25lbnQgPSBQcm94eSB8fCAoYXBwLnVpID8gYXBwLnVpLkNvbXBvbmVudCA6IG51bGwpO1xyXG4gICAgICAgIGNsYXNzIExvYWRlciBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAgICAgICAgIGxvYWQoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXBwLnNlcnZpY2VzICYmIGFwcC5zZXJ2aWNlcy5sb2FkZXIpIGFwcC5zZXJ2aWNlcy5sb2FkZXIubG9hZCh0aGlzLnN0YXRlLnVybCwgdHJ1ZSkudGhlbihvYmogPT4ge3RoaXMuc2V0U3RhdGUoe2NoaWxkcmVuOiBvYmp9KX0sIGVyciA9PiB7dGhpcy5zZXRTdGF0ZSh7Y2hpbGRyZW46IFtcIkV4Y2VwdGlvblwiLCBlcnJdfSl9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZSh7fSwgdGhpcy5wcm9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBjb21wb25lbnRXaWxsVXBkYXRlKHByb3BzOmFueSwgbmV4dHByb3BzOmFueSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja3VybChuZXh0cHJvcHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUocHJvcHM6YW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja3VybChwcm9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBjaGVja3VybChwcm9wczphbnkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB1cmwgPSB0eXBlb2YgcHJvcHMudXJsID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wcy51cmwoKSA6IHByb3BzLnVybDtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZSB8fCB0aGlzLnN0YXRlLnVybCAhPT0gdXJsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuLCB1cmw6IHVybH0sIHRoaXMubG9hZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUgfHwgdGhpcy5zdGF0ZS51cmwgPT09IHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmVuZGVyKHRoaXMuY2hlY2t1cmwodGhpcy5wcm9wcykgJiYgdGhpcy5zdGF0ZS5jaGlsZHJlbiAmJiB0aGlzLnN0YXRlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0aGlzLnN0YXRlLmNoaWxkcmVuIDogdGhpcy5wcm9wcy5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuICAgICAgICByZXR1cm4gYXBwO1xyXG4gICAgICAgIC8qdmFyIGluaiA9IHtcclxuICAgICAgICAgICAgICBDb21wb25lbnRcclxuICAgICAgICAgICAgLCBDb250ZXh0XHJcbiAgICAgICAgICAgICwgTG9hZGVyXHJcbiAgICAgICAgICAgICwgUmVzb2x2ZVxyXG4gICAgICAgICAgICAsIFN0YXRlOiBDb250ZXh0LnN0YXRlXHJcbiAgICAgICAgICAgICwgY29tcG9uZW50cyA6IGFwcC5jb21wb25lbnRzXHJcbiAgICAgICAgICAgICwgUmVuZGVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYXBwKTtcclxuICAgICAgICBmb3IgKHZhciBpIGluIGtleXMpXHJcbiAgICAgICAgICAgIGlmIChrZXlzW2ldICE9IFwidGl0bGVcIiAmJiBrZXlzW2ldICE9IFwiZGVzaWduZXJcIiAmJiBrZXlzW2ldICE9IFwidWlcIiAmJiBrZXlzW2ldICE9IFwidGFyZ2V0XCIpXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5qLCBrZXlzW2ldLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFwcCwga2V5c1tpXSl8fHt9KTtcclxuICAgICAgICByZXR1cm4gaW5qOyovXHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC53cml0ZWxuKEpTT04uc3RyaW5naWZ5KGFwcCkpO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgQXN5bmMgPSBmdW5jdGlvbiBpbmplY3QoYXBwKSB7XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhBc3luYywgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBBc3luYyhwcm9wcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcclxuICAgICAgICAgICAgX3RoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogX3RoaXMucHJvcHMudmFsdWVbM11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBc3luYy5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChhcHAuc2VydmljZXMucHJvbWlzZS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih0aGlzLnByb3BzLnZhbHVlKSlcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmFsdWUudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLnNldFN0YXRlKHsgXCJ2YWx1ZVwiOiB2YWx1ZSB9KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gX3RoaXMuc2V0U3RhdGUoeyBcInZhbHVlXCI6IF90aGlzLnByb3BzLnZhbHVlWzRdID8gX3RoaXMucHJvcHMudmFsdWVbNF0oZXJyKSA6IFtcIkV4Y2VwdGlvblwiLCBlcnJdIH0pOyB9KTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy52YWx1ZVswXSAmJiB0aGlzLnByb3BzLnZhbHVlWzBdLnRoZW4pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnZhbHVlWzBdLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5zZXRTdGF0ZSh7IFwidmFsdWVcIjogdmFsdWUgfSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIF90aGlzLnNldFN0YXRlKHsgXCJ2YWx1ZVwiOiBfdGhpcy5wcm9wcy52YWx1ZVs0XSA/IF90aGlzLnByb3BzLnZhbHVlWzRdKGVycikgOiBbXCJFeGNlcHRpb25cIiwgZXJyXSB9KTsgfSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGFwcC5zZXJ2aWNlcy5wcm9taXNlLmFsbCh0aGlzLnByb3BzLnZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuc2V0U3RhdGUoeyBcInZhbHVlXCI6IHZhbHVlIH0pOyB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHsgaWYgKF90aGlzLnByb3BzLnZhbHVlWzRdKVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgXCJ2YWx1ZVwiOiBfdGhpcy5wcm9wcy52YWx1ZVs0XSB9KTsgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBc3luYy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZSAmJiB0eXBlb2YgdGhpcy5zdGF0ZS52YWx1ZSAhPT0gXCJzdHJpbmdcIiA/IF9zdXBlci5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcywgdGhpcy5zdGF0ZS52YWx1ZSkgOiBcIlwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEFzeW5jO1xyXG4gICAgfShhcHAuc2VydmljZXMucHJvY2Vzc29yLmNvbnN0cnVjdChhcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkpO1xyXG59O1xyXG5leHBvcnRzLkFzeW5jID0gQXN5bmM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgSW50ZXJjZXB0ID0gZnVuY3Rpb24gaW5qZWN0KF9hKSB7XHJcbiAgICB2YXIgQ29tcG9uZW50ID0gX2EuQ29tcG9uZW50O1xyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoSW50ZXJjZXB0LCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIEludGVyY2VwdCgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICAgICAgX3RoaXMuc3RhdGUgPSB7IGZvY3VzOiBmYWxzZSwgc2VsZWN0ZWQ6IGZhbHNlLCBlZGl0TW9kZTogbnVsbCwgY2FuRWRpdDogdHJ1ZSB9O1xyXG4gICAgICAgICAgICBfdGhpcy5vbk1lc3NhZ2UgPSBfdGhpcy5vbk1lc3NhZ2UuYmluZChfdGhpcyk7XHJcbiAgICAgICAgICAgIF90aGlzLmNsaWNrID0gX3RoaXMuY2xpY2suYmluZChfdGhpcyk7XHJcbiAgICAgICAgICAgIF90aGlzLm1vdXNlRW50ZXIgPSBfdGhpcy5tb3VzZUVudGVyLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgICAgICBfdGhpcy5tb3VzZUxlYXZlID0gX3RoaXMubW91c2VMZWF2ZS5iaW5kKF90aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5vbk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcGFyZW50LnBvc3RNZXNzYWdlKHsgZXZlbnRUeXBlOiBcInNlbGVjdFwiLCBjb3JyZWxhdGlvbklkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCkgfSwgbG9jYXRpb24uaHJlZik7IH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5vbk1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5yZWNvbnN0cnVjdCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgaWYgKCFvYmpbMV0pXHJcbiAgICAgICAgICAgICAgICBvYmpbMV0gPSB7fTtcclxuICAgICAgICAgICAgaWYgKCFvYmpbMV0uc3R5bGUpXHJcbiAgICAgICAgICAgICAgICBvYmpbMV0uc3R5bGUgPSB7fTtcclxuICAgICAgICAgICAgaWYgKCFvYmpbMV0uc3R5bGUuYm9yZGVyICYmICFvYmpbMV0uc3R5bGUucGFkZGluZyAmJiAhb2JqWzFdLm9uTW91c2VFbnRlciAmJiAhb2JqWzFdLm9uTW91c2VMZWF2ZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqWzFdLnN0eWxlLnBhZGRpbmcgPSB0aGlzLnN0YXRlLmZvY3VzIHx8IHRoaXMuc3RhdGUuc2VsZWN0ZWQgPyBcIjFweFwiIDogXCIycHhcIjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXRNb2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialsxXS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJsaWdodGJsdWVcIjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialsxXS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5mb2N1cylcclxuICAgICAgICAgICAgICAgICAgICBvYmpbMV0uc3R5bGUuYm9yZGVyID0gXCIxcHggZGFzaGVkIGdyZXlcIjtcclxuICAgICAgICAgICAgICAgIG9ialsxXS5vbk1vdXNlRW50ZXIgPSB0aGlzLm1vdXNlRW50ZXI7XHJcbiAgICAgICAgICAgICAgICBvYmpbMV0ub25Nb3VzZUxlYXZlID0gdGhpcy5tb3VzZUxlYXZlO1xyXG4gICAgICAgICAgICAgICAgb2JqWzFdLm9uQ2xpY2sgPSB0aGlzLmNsaWNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy9yZXR1cm4gc3VwZXIucmVuZGVyKEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikgPyB0aGlzLnJlY29uc3RydWN0KFtcImRpdlwiLCB7c3R5bGU6IHtkaXNwbGF5OiBcImlubGluZS1ibG9ja1wifX0sIHRoaXMucHJvcHMuY2hpbGRyZW5dKSAgOiB0aGlzLnJlY29uc3RydWN0KHRoaXMucHJvcHMuY2hpbGRyZW4pKTtcclxuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcywgdGhpcy5yZWNvbnN0cnVjdChbXCJkaXZcIiwgeyBzdHlsZTogeyBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiIH0sIGtleTogMCB9LCB0aGlzLnByb3BzLmNoaWxkcmVuXSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5tb3VzZUVudGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3guRGVzaWduZXIubm90aWZ5KFwieFwiKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFwiZm9jdXNcIjogdHJ1ZSB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUubW91c2VMZWF2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy94LkRlc2lnbmVyLm5vdGlmeShcInlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBcImZvY3VzXCI6IGZhbHNlIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgLy9EZXNpZ25lci5ub3RpZnkodGhpcy5wcm9wcy5maWxlKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHdpbmRvdztcclxuICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnQgIT09IHBhcmVudCAmJiB3aW5kb3cucGFyZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xyXG4gICAgICAgICAgICB2YXIgY29ycmVsYXRpb25JZCA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcGFyZW50LnBvc3RNZXNzYWdlKHsgZXZlbnRUeXBlOiBcInNlbGVjdFwiLCBlZGl0TW9kZTogdGhpcy5zdGF0ZS5lZGl0TW9kZSwgY2FuRWRpdDogdGhpcy5zdGF0ZS5jYW5FZGl0LCBjb3JyZWxhdGlvbklkOiBjb3JyZWxhdGlvbklkLCBjb250cm9sOiB7IGZpbGU6IHRoaXMucHJvcHMuZmlsZSwgbWV0aG9kOiB0aGlzLnByb3BzLm1ldGhvZCB9IH0sIGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgXCJzZWxlY3RlZFwiOiBjb3JyZWxhdGlvbklkIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5vbk1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsIGV2Lm9yaWdpbi5sZW5ndGgpID09IGV2Lm9yaWdpbiAmJiBldi50eXBlID09IFwibWVzc2FnZVwiICYmIGV2LmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkID09IGV2LmRhdGEuY29ycmVsYXRpb25JZClcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2LmRhdGEuZXZlbnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZXNlbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWRpdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVkaXRNb2RlOiBldi5kYXRhLmVkaXRNb2RlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gSW50ZXJjZXB0O1xyXG4gICAgfShDb21wb25lbnQpKTtcclxufTtcclxuZXhwb3J0cy5JbnRlcmNlcHQgPSBJbnRlcmNlcHQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBhcHBfMSA9IHJlcXVpcmUoXCIuL2FwcFwiKTtcclxuZXhwb3J0cy5BcHAgPSBhcHBfMS5BcHA7XHJcbnZhciB0cmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4vc2VydmljZXMvdHJhbnNmb3JtZXJcIik7XHJcbmV4cG9ydHMuVHJhbnNmb3JtZXIgPSB0cmFuc2Zvcm1lcl8xLlRyYW5zZm9ybWVyO1xyXG52YXIgdHlwZXMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIikpO1xyXG5leHBvcnRzLnR5cGVzID0gdHlwZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgTG9hZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTG9hZGVyKGFwcCkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwiTW9kdWxlU3lzdGVtXCI7XHJcbiAgICAgICAgTG9hZGVyLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIExvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBpZiAoIXJlcy5vaylcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmV0Y2ggZXJyb3I6ICcgKyByZXMuc3RhdHVzICsgJyAnICsgcmVzLnN0YXR1c1RleHQgKyAocGFyZW50ID8gJyBsb2FkaW5nIGZyb20gICcgKyBwYXJlbnQgOiAnJykpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnRleHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBMb2FkZXIucHJvdG90eXBlLnJlcXVpcmUgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbigndXJsJywgJ3RtcGRpcicsICd0bXBkaXIgPSB0bXBkaXIgPyB0bXBkaXIgOiBnbG9iYWwucHJvY2Vzcy5lbnYuSU5JVF9DV0Q7IHZhciBfX2Rpcm5hbWVfXyA9IGdsb2JhbC5wcm9jZXNzLmN3ZCgpOyBpZiAoX19kaXJuYW1lX18gIT0gdG1wZGlyKSBnbG9iYWwucHJvY2Vzcy5jaGRpcih0bXBkaXIpOyB2YXIgX2V4cCA9IChnbG9iYWwucmVxdWlyZSB8fCBnbG9iYWwucHJvY2Vzcy5tYWluTW9kdWxlLmNvbnN0cnVjdG9yLl9sb2FkKSh1cmwpOyBpZiAoZ2xvYmFsLnByb2Nlc3MuY3dkKCkgIT0gX19kaXJuYW1lX18pIGdsb2JhbC5wcm9jZXNzLmNoZGlyKF9fZGlybmFtZV9fKTsgcmV0dXJuIF9leHA7JykodXJsLCBMb2FkZXIuYXBwLm9wdGlvbnMuYmFzZVBhdGgpO1xyXG4gICAgfTtcclxuICAgIExvYWRlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNvdXJjZSwgdXJsKSB7XHJcbiAgICAgICAgdmFyIG0gPSB7IGV4cG9ydHM6IHt9IH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKCdyZXF1aXJlJywgJ21vZHVsZScsIHNvdXJjZSArIFwiO1xcbi8vIyBzb3VyY2VVUkw9JyArIFwiICsgdXJsKSh0aGlzLnJlcXVpcmUsIG0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcnVubmluZyBzY3JpcHQgZnJvbSBmcm9tIHNvdXJjZScgKyB1cmwgfHwgc291cmNlKTtcclxuICAgICAgICAgICAgdGhyb3cgZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG0uZXhwb3J0cztcclxuICAgIH07XHJcbiAgICBMb2FkZXIucHJvdG90eXBlLmV4ZWMgPSBmdW5jdGlvbiAoc291cmNlLCB1cmwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgTG9hZGVyLmFwcC5zZXJ2aWNlcy5wcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBvdXRwdXQgPSBfdGhpcy5ydW4oc291cmNlLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZXhlY3V0aW5nIHNjcmlwdCAnICsgdXJsICsgJzogJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBMb2FkZXIucHJvdG90eXBlLmluc3RhbmNpYXRlID0gZnVuY3Rpb24gKHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgdmFyIGFwcCA9IExvYWRlci5hcHA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZCh1cmwsIHBhcmVudClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBwLnNlcnZpY2VzLnRyYW5zZm9ybWVyLnRyYW5zZm9ybSh1cmwsIHNvdXJjZSkuY29kZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmV4ZWMpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBMb2FkZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuTG9hZGVyID0gTG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGludGVyY2VwdF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaW50ZXJjZXB0XCIpO1xyXG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2FzeW5jXCIpO1xyXG5mdW5jdGlvbiBzX3hhKGEsIGIpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKTsgfVxyXG5mdW5jdGlvbiBjbG9uZShhLCBiKSB7IGZvciAodmFyIGMgPSAxOyBjIDwgYXJndW1lbnRzLmxlbmd0aDsgYysrKSB7XHJcbiAgICB2YXIgZCA9IGFyZ3VtZW50c1tjXTtcclxuICAgIGlmIChkKVxyXG4gICAgICAgIGZvciAodmFyIGUgaW4gZClcclxuICAgICAgICAgICAgc194YShkLCBlKSAmJiAoYVtlXSA9IGRbZV0pO1xyXG59IHJldHVybiBhOyB9XHJcbmZ1bmN0aW9uIEluamVjdChhcHAsIFByb3h5KSB7XHJcbiAgICB2YXIgaW5qID0gY2xvbmUoYXBwKTtcclxuICAgIGluai5zZXJ2aWNlcy5VSS5Db21wb25lbnQgPSBQcm94eSB8fCBhcHAuc2VydmljZXMuVUkuQ29tcG9uZW50O1xyXG4gICAgLypjbGFzcyBMb2FkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgICAgIGxvYWQoKSB7XHJcbiAgICAgICAgICAgIEpzdENvbnRleHQubG9hZCh0aGlzLnN0YXRlLnVybCwgdHJ1ZSkudGhlbihvYmogPT4ge3RoaXMuc2V0U3RhdGUoe2NoaWxkcmVuOiBvYmp9KX0sIGVyciA9PiB7dGhpcy5zZXRTdGF0ZSh7Y2hpbGRyZW46IFtcIkV4Y2VwdGlvblwiLCBlcnJdfSl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUoe30sIHRoaXMucHJvcHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wczphbnksIG5leHRwcm9wczphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrdXJsKG5leHRwcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShwcm9wczphbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2t1cmwocHJvcHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hlY2t1cmwocHJvcHM6YW55KSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSB0eXBlb2YgcHJvcHMudXJsID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wcy51cmwoKSA6IHByb3BzLnVybDtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlIHx8IHRoaXMuc3RhdGUudXJsICE9PSB1cmwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiwgdXJsOiB1cmx9LCB0aGlzLmxvYWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUgfHwgdGhpcy5zdGF0ZS51cmwgPT09IHVybDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5yZW5kZXIodGhpcy5jaGVja3VybCh0aGlzLnByb3BzKSAmJiB0aGlzLnN0YXRlLmNoaWxkcmVuICYmIHRoaXMuc3RhdGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRoaXMuc3RhdGUuY2hpbGRyZW4gOiB0aGlzLnByb3BzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuICAgIC8qbGV0IHsgdGl0bGUsIGRlc2lnbmVyLCB1aSwgdGFyZ2V0LCAuLi5pbmplY3QgfSA9IGFwcDtcclxuICAgIHJldHVybiB7IENvbXBvbmVudFxyXG4gICAgICAgICwgQ29udGV4dFxyXG4gICAgICAgICwgTG9hZGVyXHJcbiAgICAgICAgLCBjb21wb25lbnRzIDogYXBwLmNvbXBvbmVudHNcclxuICAgICAgICAsIC4uLmluamVjdFxyXG4gICAgfTsqL1xyXG4gICAgcmV0dXJuIGluajtcclxufVxyXG52YXIgUHJvY2Vzc29yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUHJvY2Vzc29yKGFwcCkge1xyXG4gICAgICAgIHRoaXMuY2FjaGUgPSBPYmplY3QoKTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIlByb2Nlc3NvclwiO1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgfVxyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5jb25zdHJ1Y3QgPSBmdW5jdGlvbiAoanN0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICAgICAgX19leHRlbmRzKGNsYXNzXzEsIF9zdXBlcik7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSAmJiBvYmoubGVuZ3RoID09PSAxICYmICFBcnJheS5pc0FycmF5KG9ialswXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmpbMF0gPT0gXCJzdHJpbmdcIiA/IGN0eC5wYXJzZShvYmopIDogb2JqWzBdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsIHx8IHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIgfHwgb2JqLiQkdHlwZW9mID8gb2JqIDogY3R4LnBhcnNlKG9iaik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgICAgIH0oanN0Q29tcG9uZW50KSk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5sb2NhdGUgPSBmdW5jdGlvbiAocmVzb3VyY2UsIHBhdGgpIHtcclxuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIGpzdCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBvYmogPSByZXNvdXJjZTtcclxuICAgICAgICBmb3IgKHZhciBwYXJ0ID0gMDsgcGFydCA8IHBhcnRzLmxlbmd0aDsgcGFydCsrKVxyXG4gICAgICAgICAgICBpZiAob2JqW3BhcnRzW3BhcnRdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFydCA9PSBwYXRoLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAganN0ID0gb2JqLl9fanN0O1xyXG4gICAgICAgICAgICAgICAgb2JqID0gb2JqW3BhdGhbcGFydF1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9iaiA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH07XHJcbiAgICBQcm9jZXNzb3IucHJvdG90eXBlLmdldEZ1bmN0aW9uTmFtZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUpXHJcbiAgICAgICAgICAgIHJldHVybiBvYmoubmFtZTtcclxuICAgICAgICB2YXIgbmFtZSA9IG9iai50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJygnKSA+IC0xKVxyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5pbmRleE9mKCcoJykpO1xyXG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ2Z1bmN0aW9uJykgPiAtMSlcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKG5hbWUuaW5kZXhPZignZnVuY3Rpb24nKSArICdmdW5jdGlvbicubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gbmFtZS50cmltKCk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5wcm9jZXNzRWxlbWVudCA9IGZ1bmN0aW9uIChhciwgc3VwcG9ydEFzeW5jLCBsaWdodCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcclxuICAgICAgICB3aGlsZSAoIWRvbmUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhclswXSA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldEZ1bmN0aW9uTmFtZShhclswXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5qZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyWzBdID0gYXJbMF0oSW5qZWN0KHRoaXMuYXBwLCB0aGlzLmNvbnN0cnVjdCh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2Zvcm1cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UoYXJbMF0oYXIpLCB1bmRlZmluZWQsIHN1cHBvcnRBc3luYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhclswXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IGFyWzBdO1xyXG4gICAgICAgICAgICAgICAgYXJbMF0gPSB0aGlzLnJlc29sdmUoYXJbMF0pO1xyXG4gICAgICAgICAgICAgICAgZG9uZSA9IGFyWzBdID09PSB0YWc7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJbMF0udGhlbiAmJiBzdXBwb3J0QXN5bmMgJiYgIWxpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5hcHAuc2VydmljZXMucHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gYXJbMF0udGhlbihmdW5jdGlvbiAoeCkgeyByZXR1cm4gcmVzb2x2ZShfdGhpcy5wYXJzZSh4LCBhclsxXS5rZXksIHN1cHBvcnRBc3luYykpOyB9KTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYXJbMF0gJiYgYXJbMF0udGhlbiAmJiAhc3VwcG9ydEFzeW5jICYmICFsaWdodClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zZXJ2aWNlcy5VSS5wcm9jZXNzRWxlbWVudChhc3luY18xLkFzeW5jLCB7IFwidmFsdWVcIjogYXIgfSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlnaHQgPyBhciA6IHRoaXMuYXBwLnNlcnZpY2VzLlVJLnByb2Nlc3NFbGVtZW50KGFyWzBdLCBhclsxXSwgYXJbMl0pO1xyXG4gICAgfTtcclxuICAgIFByb2Nlc3Nvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAob2JqLCBrZXksIHN1cHBvcnRBc3luYykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKG9iaiAmJiBvYmpbXCJkZWZhdWx0XCJdKVxyXG4gICAgICAgICAgICBvYmogPSBvYmouX19qc3QgPyBbaW50ZXJjZXB0XzEuSW50ZXJjZXB0LCB7IGZpbGU6IG9iai5fX2pzdCB9LCBbb2JqW1wiZGVmYXVsdFwiXV1dIDogb2JqW1wiZGVmYXVsdFwiXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgJiYgIW9ialsxXSlcclxuICAgICAgICAgICAgICAgIG9ialsxXSA9IHsga2V5OiBrZXkgfTtcclxuICAgICAgICAgICAgaWYgKGtleSAmJiAhb2JqWzFdLmtleSlcclxuICAgICAgICAgICAgICAgIG9ialsxXS5rZXkgPSBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb2JqID0gW29iaiwga2V5ID8geyBrZXk6IGtleSB9IDogbnVsbF07XHJcbiAgICAgICAgdmFyIGlzQXN5bmMgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBvYmoubGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpZHhdID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vb2JqW2lkeF0gPSB0aGlzLnByb2Nlc3NFbGVtZW50KFtvYmpbaWR4XV0sIHN1cHBvcnRBc3luYywgdHJ1ZSlbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2lkeF0pKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9ialtpZHhdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2lkeF1baV0pIHx8IHR5cGVvZiBvYmpbaWR4XVtpXSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBvYmpbaWR4XVtpXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpZHhdW2ldID09PSBcImZ1bmN0aW9uXCIgfHwgQXJyYXkuaXNBcnJheShvYmpbaWR4XVtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbaWR4XVtpXSA9IChpZHggPT0gMikgPyB0aGlzLnBhcnNlKG9ialtpZHhdW2ldLCB1bmRlZmluZWQsIHN1cHBvcnRBc3luYykgOiB0aGlzLnByb2Nlc3NFbGVtZW50KG9ialtpZHhdW2ldLCBzdXBwb3J0QXN5bmMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqW2lkeF1baV0gJiYgb2JqW2lkeF1baV0udGhlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQXN5bmMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpZHggPT0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgZWl0aGVyIGRvdWJsZSBhcnJheSBvciBzdHJpbmcgZm9yIGNoaWxkcmVuIFBhcmVudDpcIiArIFN0cmluZyhvYmpbMF0pICsgXCIsIENoaWxkOlwiICsgSlNPTi5zdHJpbmdpZnkob2JqW2lkeF1baV0sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IFN0cmluZyh2YWx1ZSkgOiB2YWx1ZTsgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgKGlzQXN5bmMgJiYgIW9ialtpZHhdLnRoZW4pIG9ialtpZHhdID0gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiBQcm9taXNlLmFsbChvYmpbaWR4XSkudGhlbihvdXRwdXQgPT4gcmVzb2x2ZShvdXRwdXQpLCByZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpKTtcclxuICAgICAgICBpZiAoaXNBc3luYylcclxuICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgb2JqLmxlbmd0aDsgaWR4KyspXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9ialtpZHhdLnRoZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW2lkeF0gPSB0aGlzLmFwcC5zZXJ2aWNlcy5wcm9taXNlLmFsbChvYmpbaWR4XSk7XHJcbiAgICAgICAgaWYgKCFpc0FzeW5jICYmICgodHlwZW9mIG9ialswXSA9PT0gXCJmdW5jdGlvblwiICYmIG9ialswXS50aGVuKSB8fCAodHlwZW9mIG9ialsxXSA9PT0gXCJmdW5jdGlvblwiICYmIG9ialsxXS50aGVuKSkpXHJcbiAgICAgICAgICAgIGlzQXN5bmMgPSB0cnVlO1xyXG4gICAgICAgIGlmICghaXNBc3luYykge1xyXG4gICAgICAgICAgICBvYmogPSB0aGlzLnByb2Nlc3NFbGVtZW50KG9iaiwgc3VwcG9ydEFzeW5jKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicgJiYgb2JqLnRoZW4gJiYgIXN1cHBvcnRBc3luYylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NFbGVtZW50KFthc3luY18xLkFzeW5jLCB7IHZhbHVlOiBvYmogfV0sIHN1cHBvcnRBc3luYyk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc3VwcG9ydEFzeW5jICYmIGlzQXN5bmMpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NFbGVtZW50KFthc3luY18xLkFzeW5jLCB7IHZhbHVlOiB0aGlzLmFwcC5zZXJ2aWNlcy5wcm9taXNlLmFsbChvYmopLnRoZW4oZnVuY3Rpb24gKG8pIHsgcmV0dXJuIF90aGlzLnByb2Nlc3NFbGVtZW50KG8sIHN1cHBvcnRBc3luYyk7IH0pIH1dKTtcclxuICAgICAgICByZXR1cm4gaXNBc3luYyA/IG5ldyB0aGlzLmFwcC5zZXJ2aWNlcy5wcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBfdGhpcy5hcHAuc2VydmljZXMucHJvbWlzZS5hbGwob2JqKS50aGVuKGZ1bmN0aW9uIChvKSB7IHJldHVybiByZXNvbHZlKF90aGlzLnByb2Nlc3NFbGVtZW50KG8sIHN1cHBvcnRBc3luYykpOyB9KTsgfSkgOiB0aGlzLnByb2Nlc3NFbGVtZW50KFtvYmpbMF0sIG9ialsxXSwgb2JqWzJdXSwgc3VwcG9ydEFzeW5jKTtcclxuICAgIH07XHJcbiAgICBQcm9jZXNzb3IucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAoZnVsbHBhdGgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlW2Z1bGxwYXRoXSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbZnVsbHBhdGhdO1xyXG4gICAgICAgIGlmIChmdWxscGF0aC5zdWJzdHJpbmcoMCwgMSkgPT0gXCJ+XCIpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gZnVsbHBhdGguc3Vic3RyaW5nKDEsIGZ1bGxwYXRoLmxlbmd0aCkuc3BsaXQoJyMnKTtcclxuICAgICAgICAgICAgLy92YXIgb2JqID0gQXBwQ29udGV4dC54aHIocGFydHNbMF0sIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5hcHAuc2VydmljZXMubW9kdWxlU3lzdGVtLmluc3RhbmNpYXRlKHBhcnRzWzBdLCB0aGlzKTtcclxuICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgcmV0dXJuIG9iai50aGVuKGZ1bmN0aW9uICh4KSB7IHJldHVybiBfdGhpcy5sb2NhdGUoeCwgcGFydHMuc2xpY2UoMSwgcGFydHMubGVuZ3RoKS5qb2luKFwiLlwiKSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSBmdWxscGF0aC5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICB2YXIgb2JqXzEgPSB0aGlzLmFwcC5jb21wb25lbnRzIHx8IE9iamVjdDtcclxuICAgICAgICAgICAgdmFyIGpzdF8xID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBwcm9wXzEgPSBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgcGFydCA9IDA7IHBhcnQgPCBwYXRoLmxlbmd0aDsgcGFydCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ial8xID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpcy5nZXRGdW5jdGlvbk5hbWUob2JqXzEpID09PSBcImluamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vb2JqID0gb2JqKCBJbmplY3QoIGFwcC5kZXNpZ25lciA/IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIGFwcC51aS5Db21wb25lbnQgeyByZW5kZXIob2JqKSB7IHJldHVybiBwYXJzZShqc3QgPyBbcmVxdWlyZShcIkBhcHBmaWJyZS9qc3QvaW50ZXJjZXB0LmpzXCIpLmRlZmF1bHQsIHtcImZpbGVcIjoganN0LCBcIm1ldGhvZFwiOiBwcm9wfSwgb2JqXSA6IG9iaik7IH19Om9iaikpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ial8xID0gb2JqXzEoSW5qZWN0KHRoaXMuYXBwLCB0aGlzLmNvbnN0cnVjdCh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqXzFbcGF0aFtwYXJ0XV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0ID09IHBhdGgubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAganN0XzEgPSBvYmpfMS5fX2pzdDtcclxuICAgICAgICAgICAgICAgICAgICBvYmpfMSA9IG9ial8xW3BhdGhbcGFydF1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGF0aC5sZW5ndGggPT0gMSAmJiBwYXRoWzBdLnRvTG93ZXJDYXNlKCkgPT0gcGF0aFswXSlcclxuICAgICAgICAgICAgICAgICAgICBvYmpfMSA9IHBhdGhbcGFydF07XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZnVsbHBhdGggPT09IFwiRXhjZXB0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB0cmFuc2Zvcm0ob2JqKSB7IHJldHVybiBbXCJwcmVcIiwgeyBcInN0eWxlXCI6IHsgXCJjb2xvclwiOiBcInJlZFwiIH0gfSwgb2JqWzFdLnN0YWNrID8gb2JqWzFdLnN0YWNrIDogb2JqWzFdXTsgfTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IGxvYWQgJyArIGZ1bGxwYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhjbGFzc18yLCBfc3VwZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2xhc3NfMigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc18yLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMsIFtcInNwYW5cIiwgeyBcInN0eWxlXCI6IHsgXCJjb2xvclwiOiBcInJlZFwiIH0gfSwgZnVsbHBhdGggKyBcIiBub3QgZm91bmQhXCJdKTsgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc18yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KHRoaXMuYXBwLnNlcnZpY2VzLlVJLkNvbXBvbmVudCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqXzFbXCJkZWZhdWx0XCJdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqXzEuX19qc3QpXHJcbiAgICAgICAgICAgICAgICAgICAganN0XzEgPSBvYmpfMS5fX2pzdDtcclxuICAgICAgICAgICAgICAgIG9ial8xID0gb2JqXzFbXCJkZWZhdWx0XCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGpzdF8xKVxyXG4gICAgICAgICAgICAgICAgcHJvcF8xID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ial8xID09IFwiZnVuY3Rpb25cIiAmJiB0aGlzLmdldEZ1bmN0aW9uTmFtZShvYmpfMSkgPT09IFwiaW5qZWN0XCIpXHJcbiAgICAgICAgICAgICAgICBvYmpfMSA9IG9ial8xKEluamVjdCh0aGlzLmFwcCwganN0XzEgPyAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX19leHRlbmRzKENvbXBvbmVudCwgX3N1cGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBDb21wb25lbnQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0aGlzLnBhcnNlKCF0aGlzLmFwcC5kaXNhYmxlSW50ZXJjZXB0ICYmIHdpbmRvdy5wYXJlbnQgIT09IG51bGwgJiYgd2luZG93ICE9PSB3aW5kb3cucGFyZW50ID8gW2ludGVyY2VwdF8xLkludGVyY2VwdCwgeyBcImZpbGVcIjoganN0XzEsIFwibWV0aG9kXCI6IHByb3BfMSB9LCB0aGlzLmNvbnN0cnVjdCh0aGlzLmFwcC5VSS5Db21wb25lbnQpXSA6IG9iaik7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIH0odGhpcy5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkgOiB0aGlzLmNvbnN0cnVjdCh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2Z1bGxwYXRoXSA9IEFycmF5LmlzQXJyYXkob2JqXzEpID8gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgICAgICAgICAgX19leHRlbmRzKFdyYXBwZXIsIF9zdXBlcik7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBXcmFwcGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFdyYXBwZXIucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XHJcbiAgICAgICAgICAgICAgICBXcmFwcGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IGlmICghb2JqXzFbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqXzFbMV0gPSB7fTsgaWYgKCFvYmpfMVsxXS5rZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqXzFbMV0ua2V5ID0gMDsgcmV0dXJuIHRoaXMucGFyc2UoanN0XzEgJiYgIXRoaXMuYXBwLmRpc2FibGVJbnRlcmNlcHQgJiYgd2luZG93LnBhcmVudCAhPT0gbnVsbCAmJiB3aW5kb3cgIT09IHdpbmRvdy5wYXJlbnQgPyBbaW50ZXJjZXB0XzEuSW50ZXJjZXB0LCB7IFwiZmlsZVwiOiBqc3RfMSwgXCJtZXRob2RcIjogcHJvcF8xIH0sIFtvYmpfMV1dIDogb2JqXzEpOyB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFdyYXBwZXI7XHJcbiAgICAgICAgICAgIH0odGhpcy5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkgOiBvYmpfMTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgZnVuY3Rpb24gdmlzaXQob2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gb2JqKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdChvYmpbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIG9iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGtleXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXNbaV0uc3Vic3RyKDAsIDEpID09IFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2aXNpdChvYmpba2V5c1tpXV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5hcHAuc2VydmljZXMucHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciBpc1RlbXBsYXRlID0gdmlzaXQob2JqKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBwLnNlcnZpY2VzLm1vZHVsZVN5c3RlbS5leGVjKF90aGlzLmFwcC5zZXJ2aWNlcy50cmFuc2Zvcm1lci50cmFuc2Zvcm0oSlNPTi5zdHJpbmdpZnkob2JqKSkuY29kZSkudGhlbihmdW5jdGlvbiAoZXhwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdXRwdXQgPSBfdGhpcy5wYXJzZShleHBvcnRlZFtcImRlZmF1bHRcIl0gfHwgZXhwb3J0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocnMpIHsgcmV0dXJuIHJlamVjdChycyk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMucGFyc2Uob2JqKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQcm9jZXNzb3I7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUHJvY2Vzc29yID0gUHJvY2Vzc29yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHN0YXRlcyA9IHsgcGVuZGluZzogMCwgc2V0dGxlZDogMSwgZnVsZmlsbGVkOiAyLCByZWplY3RlZDogMyB9O1xyXG52YXIgYXN5bmNRdWV1ZSA9IFtdO1xyXG52YXIgYXN5bmNUaW1lcjtcclxuZnVuY3Rpb24gYXN5bmNGbHVzaCgpIHtcclxuICAgIC8vIHJ1biBwcm9taXNlIGNhbGxiYWNrc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3luY1F1ZXVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYXN5bmNRdWV1ZVtpXVswXShhc3luY1F1ZXVlW2ldWzFdKTtcclxuICAgIH1cclxuICAgIC8vIHJlc2V0IGFzeW5jIGFzeW5jUXVldWVcclxuICAgIGFzeW5jUXVldWUgPSBbXTtcclxuICAgIGFzeW5jVGltZXIgPSBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBhc3luY0NhbGwoY2FsbGJhY2ssIGFyZykge1xyXG4gICAgYXN5bmNRdWV1ZS5wdXNoKFtjYWxsYmFjaywgYXJnXSk7XHJcbiAgICBpZiAoIWFzeW5jVGltZXIpIHtcclxuICAgICAgICBhc3luY1RpbWVyID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jRmx1c2gsIDApO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHB1Ymxpc2gocHJvbWlzZSkge1xyXG4gICAgcHJvbWlzZS5fdGhlbiA9IHByb21pc2UuX3RoZW4uZm9yRWFjaChpbnZva2VDYWxsYmFjayk7XHJcbn1cclxuZnVuY3Rpb24gaW52b2tlQ2FsbGJhY2soc3Vic2NyaWJlcikge1xyXG4gICAgdmFyIG93bmVyID0gc3Vic2NyaWJlci5vd25lcjtcclxuICAgIHZhciBzZXR0bGVkID0gb3duZXIuX3N0YXRlO1xyXG4gICAgdmFyIHZhbHVlID0gb3duZXIuX2RhdGE7XHJcbiAgICB2YXIgY2FsbGJhY2sgPSBzZXR0bGVkID09IHN0YXRlcy5mdWxmaWxsZWQgPyBzdWJzY3JpYmVyLmZ1bGZpbGxlZCA6IHN1YnNjcmliZXIucmVqZWN0ZWQ7XHJcbiAgICB2YXIgcHJvbWlzZSA9IHN1YnNjcmliZXIudGhlbjtcclxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBzZXR0bGVkID0gc3RhdGVzLmZ1bGZpbGxlZDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigoc2V0dGxlZCA9PSBzdGF0ZXMuZnVsZmlsbGVkID8gXCJSZXNvbHZlXCIgOiBcIlJlamVjdFwiKSArICcgbm90IGltcGxlbWVudGVkJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWhhbmRsZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlKSkge1xyXG4gICAgICAgIGlmIChzZXR0bGVkID09PSBzdGF0ZXMuZnVsZmlsbGVkKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2V0dGxlZCA9PT0gc3RhdGVzLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGludm9rZVJlc29sdmVyKHJlc29sdmVyLCBwcm9taXNlKSB7XHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSkge1xyXG4gICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcclxuICAgICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVzb2x2ZXIocmVzb2x2ZVByb21pc2UsIHJlamVjdFByb21pc2UpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICByZWplY3RQcm9taXNlKGUpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcclxuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSB8fCAhaGFuZGxlVGhlbmFibGUocHJvbWlzZSwgdmFsdWUpKSB7XHJcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xyXG4gICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBzdGF0ZXMucGVuZGluZykge1xyXG4gICAgICAgIHByb21pc2UuX3N0YXRlID0gc3RhdGVzLnNldHRsZWQ7XHJcbiAgICAgICAgcHJvbWlzZS5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIGFzeW5jQ2FsbChwdWJsaXNoRnVsZmlsbG1lbnQsIHByb21pc2UpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlamVjdChwcm9taXNlLCByZWFzb24pIHtcclxuICAgIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gc3RhdGVzLnBlbmRpbmcpIHtcclxuICAgICAgICBwcm9taXNlLl9zdGF0ZSA9IHN0YXRlcy5zZXR0bGVkO1xyXG4gICAgICAgIHByb21pc2UuX2RhdGEgPSByZWFzb247XHJcbiAgICAgICAgYXN5bmNDYWxsKHB1Ymxpc2hSZWplY3Rpb24sIHByb21pc2UpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHB1Ymxpc2hGdWxmaWxsbWVudChwcm9taXNlKSB7XHJcbiAgICBwcm9taXNlLl9zdGF0ZSA9IHN0YXRlcy5mdWxmaWxsZWQ7XHJcbiAgICBwdWJsaXNoKHByb21pc2UpO1xyXG59XHJcbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xyXG4gICAgcHJvbWlzZS5fc3RhdGUgPSBzdGF0ZXMucmVqZWN0ZWQ7XHJcbiAgICBwdWJsaXNoKHByb21pc2UpO1xyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlKSB7XHJcbiAgICB2YXIgcmVzb2x2ZWQgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlICYmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICAgICAgLy8gdGhlbiBzaG91bGQgYmUgcmV0cmlldmVkIG9ubHkgb25jZVxyXG4gICAgICAgICAgICB2YXIgdGhlbiA9IHZhbHVlLnRoZW47XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNvbHZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gdmFsKSA/IGZ1bGZpbGwocHJvbWlzZSwgdmFsKSA6IHJlc29sdmUocHJvbWlzZSwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNvbHZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmICghcmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG52YXIgUHJvbWlzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlcy5wZW5kaW5nO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RoZW4gPSBbXTtcclxuICAgICAgICBpbnZva2VSZXNvbHZlcihyZXNvbHZlciwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBQcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKSB7XHJcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSB7XHJcbiAgICAgICAgICAgIG93bmVyOiB0aGlzLFxyXG4gICAgICAgICAgICB0aGVuOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoKSB7IH0pLFxyXG4gICAgICAgICAgICBmdWxmaWxsZWQ6IG9uZnVsZmlsbGVkLFxyXG4gICAgICAgICAgICByZWplY3RlZDogb25yZWplY3RlZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKChvbnJlamVjdGVkIHx8IG9uZnVsZmlsbGVkKSAmJiAhdGhpcy5faGFuZGxlZClcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBzdGF0ZXMuZnVsZmlsbGVkIHx8IHRoaXMuX3N0YXRlID09PSBzdGF0ZXMucmVqZWN0ZWQpXHJcbiAgICAgICAgICAgIC8vIGFscmVhZHkgcmVzb2x2ZWQsIGNhbGwgY2FsbGJhY2sgYXN5bmNcclxuICAgICAgICAgICAgYXN5bmNDYWxsKGludm9rZUNhbGxiYWNrLCBzdWJzY3JpYmVyKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIC8vIHN1YnNjcmliZVxyXG4gICAgICAgICAgICB0aGlzLl90aGVuLnB1c2goc3Vic2NyaWJlcik7XHJcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIudGhlbjtcclxuICAgIH07XHJcbiAgICBQcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKG9ucmVqZWN0ZWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9ucmVqZWN0ZWQpO1xyXG4gICAgfTtcclxuICAgIFByb21pc2UuYWxsID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb21pc2VzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIFByb21pc2UuYWxsKCkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSAwO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlcihpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nKys7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcmVtYWluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcHJvbWlzZTsgaSA8IHByb21pc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAmJiB0eXBlb2YgcHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc29sdmVyKGkpLCByZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tpXSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZW1haW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICBQcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvbWlzZXMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gUHJvbWlzZS5yYWNlKCkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBwcm9taXNlOyBpIDwgcHJvbWlzZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICYmIHR5cGVvZiBwcm9taXNlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICByZXR1cm4gUHJvbWlzZTtcclxufSgpKTtcclxuZXhwb3J0cy5Qcm9taXNlID0gUHJvbWlzZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcbnZhciBUcmFuc2Zvcm1lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRyYW5zZm9ybWVyKHNldHRpbmdzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnJlc2VydmVkV29yZHMgPSBbJ2Z1bmN0aW9uJywgJ2ZvcicsICd2YXInLCAndGhpcycsICdzZWxmJywgJ251bGwnXTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIlRyYW5zZm9ybWVyXCI7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzID8gX19hc3NpZ24oe30sIHNldHRpbmdzLCB7IGluZGVudDogc2V0dGluZ3MuaW5kZW50IHx8ICdcXHQnLCBjb21wYWN0OiBzZXR0aW5ncy5jb21wYWN0IHx8IGZhbHNlLCBtb2R1bGU6IHNldHRpbmdzLm1vZHVsZSB8fCB0eXBlc18xLk1vZHVsZVN5c3RlbS5Ob25lLCBuYW1lZEV4cG9ydHM6IHNldHRpbmdzLm5hbWVkRXhwb3J0cyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNldHRpbmdzLm5hbWVkRXhwb3J0cyB9KSA6IHsgbW9kdWxlOiB0eXBlc18xLk1vZHVsZVN5c3RlbS5FUyB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2VycyA9IHRoaXMuc2V0dGluZ3MucGFyc2VycyB8fCB7fTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIucmVxdWlyZVwiXSA9IHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5pbXBvcnRcIl0gPSBmdW5jdGlvbiAob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHsgcmV0dXJuIF90aGlzLmxvYWRNb2R1bGUob2JqW1wiLmltcG9ydFwiXSB8fCBvYmpbXCIucmVxdWlyZVwiXSwgcGFyc2VTZXR0aW5ncyk7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmZ1bmN0aW9uXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBcImZ1bmN0aW9uIFwiICsgKG9ialtcIi5mdW5jdGlvblwiXSA/IG9ialtcIi5mdW5jdGlvblwiXSA6IFwiXCIpICsgXCIoXCIgKyAob2JqW1wiYXJndW1lbnRzXCJdID8gX3RoaXMucHJvY2VzcyhvYmpbXCJhcmd1bWVudHNcIl0sIGZhbHNlLCB0cnVlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIDogXCJcIikgKyBcIil7IHJldHVybiBcIiArIF90aGlzLnByb2Nlc3Mob2JqW1wicmV0dXJuXCJdLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiIH1cIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIubWFwXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBfdGhpcy5wcm9jZXNzKG9ialtcIi5tYXBcIl0sIGZhbHNlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiLm1hcChmdW5jdGlvbihcIiArIG9ialtcImFyZ3VtZW50c1wiXSArIFwiKSB7cmV0dXJuIFwiICsgKHNldHRpbmdzICYmIHNldHRpbmdzLmluZGVudCA/IG5ldyBBcnJheShvZmZzZXQpLmpvaW4oJyAnKSA6IFwiXCIpICsgX3RoaXMucHJvY2VzcyhvYmpbXCJyZXR1cm5cIl0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIgfSlcIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuZmlsdGVyXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBfdGhpcy5wcm9jZXNzKG9ialtcIi5maWx0ZXJcIl0sIGZhbHNlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiLmZpbHRlcihmdW5jdGlvbihcIiArIG9ialtcImFyZ3VtZW50c1wiXSArIFwiKSB7cmV0dXJuIFwiICsgX3RoaXMucHJvY2VzcyhvYmpbXCJjb25kaXRpb25cIl0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIgfSlcIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuY2FsbFwiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgeyByZXR1cm4gX3RoaXMucHJvY2VzcyhvYmpbXCIuY2FsbFwiXSwgZmFsc2UsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIuY2FsbChcIiArIChvYmpbXCJhcmd1bWVudHNcIl0gPyBfdGhpcy5wcm9jZXNzKG9ialtcImFyZ3VtZW50c1wiXSwgZmFsc2UsIHRydWUsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgOiBcIlwiKSArIFwiKVwiOyB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5leGVjXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBfdGhpcy5wcm9jZXNzKG9ialtcIi5leGVjXCJdLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiKFwiICsgKG9ialtcImFyZ3VtZW50c1wiXSA/IF90aGlzLnByb2Nlc3Mob2JqW1wiYXJndW1lbnRzXCJdLCB0cnVlLCB0cnVlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIDogXCJcIikgKyBcIilcIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIubmV3XCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBcIm5ldyBcIiArIF90aGlzLnByb2Nlc3Mob2JqW1wiLm5ld1wiXSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyBcIihcIiArIChvYmpbXCJhcmd1bWVudHNcIl0gPyBfdGhpcy5wcm9jZXNzKG9ialtcImFyZ3VtZW50c1wiXSwgdHJ1ZSwgdHJ1ZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSA6IFwiXCIpICsgXCIpXCI7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmlkXCJdID0gdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmNvZGVcIl0gPSBmdW5jdGlvbiAob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHsgcmV0dXJuIG9ialtcIi5jb2RlXCJdIHx8IG9ialtcIi5pZFwiXTsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuYXBwXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBvYmoyID0ge307XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGtleXMpXHJcbiAgICAgICAgICAgICAgICBvYmoyW2tleXNba2V5XSA9PSBcIi5hcHBcIiA/IFwibWFpblwiIDoga2V5c1trZXldXSA9IG9ialtrZXlzW2tleV1dO1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvY2Vzcyh7IFwiLm5ld1wiOiB7IFwiLnJlcXVpcmVcIjogXCJAYXBwZmlicmUvanN0I0FwcFwiIH0sIFwiYXJndW1lbnRzXCI6IFtvYmoyXSB9LCB0cnVlLCB0cnVlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIucnVuKClcIjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5cIl0gPSBmdW5jdGlvbiAob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHsgcmV0dXJuIG9ialtcIi5cIl07IH07XHJcbiAgICB9XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUubG9hZE1vZHVsZSA9IGZ1bmN0aW9uICh2YWwsIHBhcnNlU2V0dGluZ3MpIHtcclxuICAgICAgICB2YXIgbSA9IHZhbC5pbmRleE9mKCcjJykgPiAwID8gdmFsLnN1YnN0cigwLCB2YWwuaW5kZXhPZignIycpKSA6IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tb2R1bGUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZXNfMS5Nb2R1bGVTeXN0ZW0uRVMudG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgbSA9IHZhbC5pbmRleE9mKCcjJywgbS5sZW5ndGggKyAyKSA+IC0xID8gdmFsLnN1YnN0cigwLCB2YWwuaW5kZXhPZignIycsIG0ubGVuZ3RoICsgMikgLSAxKSA6IHZhbDtcclxuICAgICAgICBpZiAocGFyc2VTZXR0aW5ncy5pbXBvcnRzLmluZGV4T2YobSkgPT09IC0xKVxyXG4gICAgICAgICAgICBwYXJzZVNldHRpbmdzLmltcG9ydHMucHVzaChtKTtcclxuICAgICAgICByZXR1cm4gXCJfXCIgKyBwYXJzZVNldHRpbmdzLmltcG9ydHMuaW5kZXhPZihtKSArICh2YWwubGVuZ3RoID4gbS5sZW5ndGggPyB2YWwuc3Vic3RyaW5nKG0ubGVuZ3RoKS5yZXBsYWNlKCcjJywgJy4nKSA6ICcnKTtcclxuICAgIH07XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGxpbmVzLCBwYXJzZVNldHRpbmdzLCBpbmRlbnQpIHtcclxuICAgICAgICB2YXIgbHQgPSB0aGlzLnNldHRpbmdzLmNvbXBhY3QgPyBcIlwiIDogXCJcXG5cIjtcclxuICAgICAgICB2YXIgdGFiID0gdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gXCJcIiA6IHRoaXMuc2V0dGluZ3MuaW5kZW50IHx8IFwiXFx0XCI7XHJcbiAgICAgICAgcmV0dXJuIGx0ICsgbmV3IEFycmF5KGluZGVudCArIDEpLmpvaW4odGFiKSArIGxpbmVzLmpvaW4oXCIsXCIgKyBsdCArIG5ldyBBcnJheShpbmRlbnQgKyAxKS5qb2luKHRhYikpICsgbHQgKyBuZXcgQXJyYXkoaW5kZW50KS5qb2luKHRhYik7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNmb3JtZXIucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAob2JqLCBlc2MsIGV0LCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBvdXRwdXQ7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbClcclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJudWxsXCI7XHJcbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxyXG4gICAgICAgICAgICBvdXRwdXQgPSAoZXQgPyBcIlwiIDogXCJbXCIpICsgdGhpcy5mb3JtYXQob2JqLm1hcChmdW5jdGlvbiAoZSwgaSkgeyByZXR1cm4gX3RoaXMucHJvY2VzcyhlLCBlc2MsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQgKyAxKTsgfSksIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyAoZXQgPyBcIlwiIDogXCJdXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4ga2V5cylcclxuICAgICAgICAgICAgICAgIGlmICghcHJvY2Vzc2VkICYmIGtleXNba10ubGVuZ3RoID4gMCAmJiBrZXlzW2tdLmNoYXJBdCgwKSA9PSAnLicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5wYXJzZXJzICYmIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1trZXlzW2tdXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSB0aGlzLnNldHRpbmdzLnBhcnNlcnNba2V5c1trXV0ob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBsb2NhdGUgcGFyc2VyIFwiICsga2V5c1trXS5zdWJzdHIoMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXByb2Nlc3NlZClcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IChldCA/IFwiXCIgOiBcIntcIikgKyB0aGlzLmZvcm1hdChrZXlzLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gay5sZW5ndGggPCAyIHx8IGsuc3Vic3RyKDAsIDIpICE9ICcuLic7IH0pLm1hcChmdW5jdGlvbiAoaywgaSkgeyByZXR1cm4gKF90aGlzLnJlc2VydmVkV29yZHMuaW5kZXhPZihrKSA+IC0xID8gXCJcXFwiXCIgKyBrICsgXCJcXFwiXCIgOiBrKSArIFwiOlwiICsgKF90aGlzLnNldHRpbmdzLmNvbXBhY3QgPyAnJyA6ICcgJykgKyBfdGhpcy5wcm9jZXNzKG9ialtrXSwgZXNjLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0ICsgMSk7IH0pLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgKGV0ID8gXCJcIiA6IFwifVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSAvLyBvYmplY3Qgbm90IEpTT04uLi5cclxuICAgICAgICAgICAgb3V0cHV0ID0gb2JqLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvdXRwdXQgPSB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiICYmIGVzYyA/IEpTT04uc3RyaW5naWZ5KG9iaikgOiBvYmo7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH07XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUuYnVuZGxlTW9kdWxlID0gZnVuY3Rpb24gKG9iaiwgbmFtZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIG91dHB1dCA9IHsgbmFtZTogbmFtZSwgaW1wb3J0czogW10sIGV4cG9ydHM6IHt9LCBjb21wb3NpdGVPYmplY3Q6IGZhbHNlLCBjb2RlOiAnJyB9O1xyXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICB2YXIgdmFsaWRrZXlzID0ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGsuaW5kZXhPZignICcpID09PSAtMSAmJiBrLmluZGV4T2YoJy8nKSA9PT0gLTEgJiYgay5pbmRleE9mKCctJykgPT09IC0xICYmIF90aGlzLnJlc2VydmVkV29yZHMuaW5kZXhPZihrKSA9PT0gLTE7IH0pO1xyXG4gICAgICAgIHZhciBpc0RlZmF1bHQgPSBrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSAnZGVmYXVsdCc7XHJcbiAgICAgICAgdmFyIG5sID0gdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gJycgOiAnXFxuJztcclxuICAgICAgICB2YXIgc3AgPSB0aGlzLnNldHRpbmdzLmNvbXBhY3QgPyAnJyA6ICcgJztcclxuICAgICAgICB2YXIgdnIgPSB0aGlzLnNldHRpbmdzLnByZWZlckNvbnN0ID8gJ2NvbnN0JyA6ICd2YXInO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy5tb2R1bGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlIFwidW1kXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb21tb25qc1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiY2pzXCI6XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByZXEgaW4gcilcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSArPSB2ciArIFwiIF9cIiArIHJbcmVxXSArIHNwICsgXCI9XCIgKyBzcCArIFwicmVxdWlyZSgnXCIgKyByZXEgKyBcIicpO1wiICsgbmw7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSArPSBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBcIm1vZHVsZS5leHBvcnRzWydcIiArIGtleSArIFwiJ11cIiArIHNwICsgXCI9XCIgKyBzcCArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBvdXRwdXQsIDApICsgXCI7XCI7IH0pLmpvaW4obmwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0RlZmF1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgKz0gbmwgKyBcIm1vZHVsZS5leHBvcnRzWydkZWZhdWx0J11cIiArIHNwICsgXCI9XCIgKyBzcCArIFwie1wiICsgc3AgKyBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgKyBcIjogXCIgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAwKTsgfSkuam9pbihubCkgKyBcIiB9O1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKG91dHB1dC5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlICs9IG5sICsgXCJtb2R1bGUuZXhwb3J0c1snX19qc3QnXSA9ICdcIiArIG5hbWUgKyBcIjtcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXNcIjpcclxuICAgICAgICAgICAgICAgIGlmIChpc0RlZmF1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgKz0gXCJleHBvcnQgZGVmYXVsdFwiICsgc3AgKyB0aGlzLnByb2Nlc3Mob2JqW1wiZGVmYXVsdFwiXSwgdHJ1ZSwgZmFsc2UsIG91dHB1dCwgMCkgKyBcIjtcIjtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlICs9IFwiZXhwb3J0IGRlZmF1bHRcIiArIHNwICsgXCJ7XCIgKyB0aGlzLmZvcm1hdChrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxpZGtleXMuaW5kZXhPZihrZXkpID09PSAtMSA/IFwiXFxcIlwiICsga2V5ICsgXCJcXFwiOiBcIiArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBvdXRwdXQsIDApIDoga2V5ICsgXCI6XCIgKyBzcCArIChfdGhpcy5zZXR0aW5ncy5uYW1lZEV4cG9ydHMgPyBrZXkgOiBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAyKSk7IH0pLCBvdXRwdXQsIDEpICsgXCJ9O1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm5hbWVkRXhwb3J0cyAmJiB2YWxpZGtleXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgPSB2YWxpZGtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIFwiZXhwb3J0IFwiICsgdnIgKyBcIiBcIiArIGtleSArIHNwICsgXCI9XCIgKyBzcCArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBvdXRwdXQsIDEpICsgXCI7XCI7IH0pLmpvaW4obmwpICsgKFwiXCIgKyAobmwgKyBvdXRwdXQuY29kZSArIG5sKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChvdXRwdXQubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSArPSBcInJldHVybiBcIiArIChpc0RlZmF1bHQgPyBcInsnZGVmYXVsdCcgOiBcIiArIHRoaXMucHJvY2VzcyhvYmpbXCJkZWZhdWx0XCJdLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAxKSArIFwiLCAnX19qc3QnOiAnXCIgKyBvdXRwdXQubmFtZSArIFwiJ31cIiA6IFwie1wiICsgdGhpcy5mb3JtYXQoa2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsaWRrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEgPyBcIlxcXCJcIiArIGtleSArIFwiXFxcIjogXCIgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAxKSA6IGtleSArIFwiOlwiICsgc3AgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAyKTsgfSksIG91dHB1dCwgMSkgKyBcIn0sICdfX2pzdCc6ICdcIiArIG91dHB1dC5uYW1lICsgXCInXCIpICsgXCI7XCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgKz0gXCJyZXR1cm4gXCIgKyAoaXNEZWZhdWx0ID8gdGhpcy5wcm9jZXNzKG9ialtcImRlZmF1bHRcIl0sIHRydWUsIGZhbHNlLCBvdXRwdXQsIDEpIDogXCJ7XCIgKyB0aGlzLmZvcm1hdChrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxpZGtleXMuaW5kZXhPZihrZXkpID09PSAtMSA/IFwiXFxcIlwiICsga2V5ICsgXCJcXFwiOiBcIiArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBvdXRwdXQsIDEpIDoga2V5ICsgXCI6XCIgKyBzcCArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBvdXRwdXQsIDIpOyB9KSwgb3V0cHV0LCAxKSArIFwifVwiKSArIFwiO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcyA9IHt9O1xyXG4gICAgICAgIHZhciByID0ge307XHJcbiAgICAgICAgaWYgKG91dHB1dC5pbXBvcnRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0cHV0LmltcG9ydHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICBpZiAob3V0cHV0LmltcG9ydHNbaV0uaW5kZXhPZignIycpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kdWxlX25hbWUgPSBvdXRwdXQuaW1wb3J0c1tpXS5zdWJzdHIoMCwgb3V0cHV0LmltcG9ydHNbaV0uaW5kZXhPZignIycpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc1ttb2R1bGVfbmFtZV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc1ttb2R1bGVfbmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBzW21vZHVsZV9uYW1lXVtvdXRwdXQuaW1wb3J0c1tpXS5zdWJzdHIobW9kdWxlX25hbWUubGVuZ3RoICsgMSldID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByW291dHB1dC5pbXBvcnRzW2ldXSA9IGk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLm1vZHVsZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1bWRcIjpcclxuICAgICAgICAgICAgY2FzZSBcImNvbW1vbmpzXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJjanNcIjpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHJlcSBpbiByKVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlID0gdnIgKyBcIiBfXCIgKyByW3JlcV0gKyBzcCArIFwiPVwiICsgc3AgKyBcInJlcXVpcmUoXFxcIlwiICsgcmVxICsgXCJcXFwiKTtcIiArIG5sICsgb3V0cHV0LmNvZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImFtZFwiOlxyXG4gICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgPSBcImRlZmluZShbXCIgKyBPYmplY3Qua2V5cyhyKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gXCInXCIgKyBrZXkgKyBcIidcIjsgfSkuam9pbihcIiwgXCIpICsgXCJdLCBmdW5jdGlvbiAoXCIgKyBPYmplY3Qua2V5cyhyKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gJ18nICsgcltrZXldOyB9KS5qb2luKFwiLCBcIikgKyBcIikgeyBcIiArIG91dHB1dC5jb2RlICsgXCIgfSk7XCIgKyBubDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXNcIjpcclxuICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlID0gT2JqZWN0LmtleXMocykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIChrZXkuY2hhckF0KDApID09PSAnficgPyBcInZhciB7XCIgKyBPYmplY3Qua2V5cyhzW2tleV0pLm1hcChmdW5jdGlvbiAoaykgeyByZXR1cm4gayArIFwiOiBfXCIgKyBzW2tleV1ba107IH0pICsgXCJ9ICA9IGF3YWl0IGltcG9ydCgnXCIgKyBrZXkuc3Vic3RyKDEpICsgXCInKTtcIiArIG5sIDogXCJpbXBvcnQge1wiICsgT2JqZWN0LmtleXMoc1trZXldKS5tYXAoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGsgKyBcIiBhcyBfXCIgKyBzW2tleV1ba107IH0pLmpvaW4oJywnICsgc3ApICsgXCJ9IGZyb20gJ1wiICsga2V5ICsgXCInO1wiICsgbmwpOyB9KS5qb2luKCcnKSArIE9iamVjdC5rZXlzKHIpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAoa2V5LmNoYXJBdCgwKSA9PT0gJ34nID8gXCJ2YXIgX1wiICsgcltrZXldICsgXCIgPSBhd2FpdCBpbXBvcnQoJ1wiICsga2V5LnN1YnN0cigxKSArIFwiJyk7XCIgKyBubCA6IFwiaW1wb3J0ICogYXMgX1wiICsgcltrZXldICsgXCIgZnJvbSAnXCIgKyBrZXkgKyBcIic7XCIgKyBubCk7IH0pLmpvaW4oJycpICsgb3V0cHV0LmNvZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHJlcSBpbiByKVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlID0gdnIgKyBcIiBfXCIgKyByW3JlcV0gKyBzcCArIFwiPVwiICsgc3AgKyBcInJlcXVpcmUoXFxcIlwiICsgcmVxICsgXCJcXFwiKTtcIiArIG5sICsgb3V0cHV0LmNvZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNmb3JtZXIucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uIChpbnB1dCwgbmFtZSkge1xyXG4gICAgICAgIHZhciBvYmo7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgb2JqID0gdHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiID8gSlNPTi5wYXJzZShpbnB1dCkgOiBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnNldHRpbmdzKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRhbmdlcm91c2x5UHJvY2Vzc0phdmFTY3JpcHQgfHwgdGhpcy5zZXR0aW5ncy5kYW5nZXJvdXNseVByb2Nlc3NKYXZhU2NyaXB0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gZXZhbChcIihcIiArIGlucHV0ICsgXCIpO1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kYW5nZXJvdXNseVByb2Nlc3NKYXZhU2NyaXB0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IFwiICsgKG5hbWUgfHwgJycpICsgXCIgaXMgbm90IEpTT04gY29tcGxpYW50OiBcIiArIGUubWVzc2FnZSArIFwiLiAgU2V0IG9wdGlvbiBcXFwiZGFuZ2Vyb3VzbHlQcm9jZXNzSmF2YVNjcmlwdFxcXCIgdG8gdHJ1ZSB0byBoaWRlIHRoaXMgbWVzc2FnZS5cXHJcXG5cIiArIGlucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHByb2Nlc3MgXCIgKyAobmFtZSB8fCAnJykgKyBcIiBhcyBKYXZhU2NyaXB0OiBcIiArIGYubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHBhcnNlIEpTT04gZmlsZSBcIiArIChuYW1lIHx8ICcnKSArIFwiOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1bmRsZU1vZHVsZShBcnJheS5pc0FycmF5KG9iaikgfHwgdHlwZW9mIChvYmogfHwgJycpICE9PSAnb2JqZWN0JyB8fCBPYmplY3Qua2V5cyhvYmopLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4ga1swXSA9PSAnLic7IH0pLmxlbmd0aCA+IDAgPyB7IFwiZGVmYXVsdFwiOiBvYmogfSA6IG9iaiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byB0cmFuc2Zvcm0ganMgdGVtcGxhdGU6IFwiICsgZS5tZXNzYWdlICsgXCJcXHJcXG5cIiArIGUuc3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gVHJhbnNmb3JtZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVHJhbnNmb3JtZXIgPSBUcmFuc2Zvcm1lcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xyXG52YXIgV2ViVUkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWJVSShhcHApIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIlVJXCI7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgdGhpcy5hcHAub3B0aW9ucyA9IHRoaXMuYXBwLm9wdGlvbnMgfHwge307XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdywgXCJwcmVhY3RcIikgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3csIFwicmVhY3RcIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0VsZW1lbnQgPSBvYmoudmFsdWUuaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBvbmVudCA9IG9iai52YWx1ZS5Db21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJbnRlcm5hbCA9IG9iai52YWx1ZS5yZW5kZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzogZmluZCBhIHdvcmthcm91bmQuIGluIE5vZGVKUyBSZWZlcmVuY2VFcnJvcjogd2luZG93IGlzIG5vdCBkZWZpbmVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgV2ViVUkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICh1aSwgcGFyZW50LCBtZXJnZVdpdGgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJJbnRlcm5hbClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVySW50ZXJuYWwodWksIHBhcmVudCwgbWVyZ2VXaXRoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYXBwLnNlcnZpY2VzLmxvZ2dlci5sb2cuY2FsbCh0aGlzLCB0eXBlc18xLkxvZ0xldmVsLkVycm9yLCBcIlVuYWJsZSB0byByZW5kZXIgVUkgLSBObyBVSSBmcmFtZXdvcmsgZGV0ZWN0ZWQuXCIsIFwiRW5zdXJlIHRoYXQgeW91IGhhdmUgcmVmZXJlbmNlZCBhIFVJIGZyYW1ld29yayBiZWZvcmUgZXhlY3V0aW5nIHRoZSBhcHBsaWNhdGlvbiwgb3Igc3BlY2lmeSB1c2luZyBhcHAuc2VydmljZXMuVUlcIik7XHJcbiAgICB9O1xyXG4gICAgV2ViVUkucHJvdG90eXBlLnByb2Nlc3NFbGVtZW50ID0gZnVuY3Rpb24gKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4pIHtcclxuICAgICAgICAvLyBleHBlY3RlZCB0byBiZSBpbXBsZW1lbnRlZC5cclxuICAgICAgICB0aGlzLmFwcC5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwodGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5FcnJvciwgXCJVbmFibGUgdG8gcHJvY2VzcyBVSSBlbGVtZW50IC0gTm8gVUkgZnJhbWV3b3JrIGRldGVjdGVkLlwiLCBcIkVuc3VyZSB0aGF0IHlvdSBoYXZlIHJlZmVyZW5jZWQgYSBVSSBmcmFtZXdvcmsgYmVmb3JlIGV4ZWN1dGluZyB0aGUgYXBwbGljYXRpb24sIG9yIHNwZWNpZnkgdXNpbmcgYXBwLnNlcnZpY2VzLlVJXCIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXZWJVSTtcclxufSgpKTtcclxuZXhwb3J0cy5XZWJVSSA9IFdlYlVJO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIE1vZHVsZVN5c3RlbTtcclxuKGZ1bmN0aW9uIChNb2R1bGVTeXN0ZW0pIHtcclxuICAgIE1vZHVsZVN5c3RlbVtcIk5vbmVcIl0gPSBcIm5vbmVcIjtcclxuICAgIE1vZHVsZVN5c3RlbVtcIkNvbW1vbkpTXCJdID0gXCJjb21tb25qc1wiO1xyXG4gICAgTW9kdWxlU3lzdGVtW1wiQU1EXCJdID0gXCJhbWRcIjtcclxuICAgIE1vZHVsZVN5c3RlbVtcIlVNRFwiXSA9IFwidW1kXCI7XHJcbiAgICBNb2R1bGVTeXN0ZW1bXCJFU1wiXSA9IFwiZXNcIjtcclxufSkoTW9kdWxlU3lzdGVtID0gZXhwb3J0cy5Nb2R1bGVTeXN0ZW0gfHwgKGV4cG9ydHMuTW9kdWxlU3lzdGVtID0ge30pKTtcclxudmFyIExvZ0xldmVsO1xyXG4oZnVuY3Rpb24gKExvZ0xldmVsKSB7XHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIk5vbmVcIl0gPSAwXSA9IFwiTm9uZVwiO1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJFeGNlcHRpb25cIl0gPSAxXSA9IFwiRXhjZXB0aW9uXCI7XHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkVycm9yXCJdID0gMl0gPSBcIkVycm9yXCI7XHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIldhcm5cIl0gPSAzXSA9IFwiV2FyblwiO1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJJbmZvXCJdID0gNF0gPSBcIkluZm9cIjtcclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiVHJhY2VcIl0gPSA1XSA9IFwiVHJhY2VcIjtcclxufSkoTG9nTGV2ZWwgPSBleHBvcnRzLkxvZ0xldmVsIHx8IChleHBvcnRzLkxvZ0xldmVsID0ge30pKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBqc3RfMSA9IHJlcXVpcmUoXCJAYXBwZmlicmUvanN0XCIpO1xyXG5uZXcganN0XzEuQXBwKHtcclxuICAgIG1haW46IFtcImRpdlwiLCBudWxsLCBcInRlc3RcIl1cclxufSkucnVuKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=