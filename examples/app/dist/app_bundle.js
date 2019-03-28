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
        if (document) { // web app
            if (!this.options.web)
                this.options.web = {};
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
            return app.services.transformer.transform(url, source);
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
                obj[idx] = this.processElement([obj[idx]], supportAsync, true)[0];
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
                    _this.app.services.moduleSystem.exec(_this.app.services.transformer.transform(obj)).then(function (exported) {
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

exports.__esModule = true;
var types_1 = __webpack_require__(/*! ../types */ "../../jst/dist/types.js");
var Transformer = /** @class */ (function () {
    function Transformer(settings) {
        var _this = this;
        this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
        this.type = "Transformer";
        this.settings = settings ? { indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || types_1.ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports, preferConst: settings.preferConst } : { module: types_1.ModuleSystem.ES };
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
    Transformer.prototype.bundleModule = function (obj, parseSettings) {
        var _this = this;
        var output = '';
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
                    output += vr + " _" + r[req] + sp + "=" + sp + "require('" + req + "');" + nl;
                output += keys.map(function (key) { return "module.exports['" + key + "']" + sp + "=" + sp + _this.process(obj[key], true, false, parseSettings, 0) + ";"; }).join(nl);
                if (!isDefault)
                    output += nl + "module.exports['default']" + sp + "=" + sp + "{" + sp + keys.map(function (key) { return key + ": " + _this.process(obj[key], true, false, parseSettings, 0); }).join(nl) + " };";
                if (parseSettings.name)
                    output += nl + "module.exports['__jst'] = '" + name + ";";
                break;
            case "es":
                if (isDefault)
                    output += "export default" + sp + this.process(obj["default"], true, false, parseSettings, 0) + ";";
                else {
                    output += "export default" + sp + "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, parseSettings, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], true, false, parseSettings, 2)); }), parseSettings, 1) + "};";
                    if (this.settings.namedExports && validkeys.length > 0)
                        output = validkeys.map(function (key) { return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], true, false, parseSettings, 1) + ";"; }).join(nl) + ("" + (nl + output + nl));
                }
                break;
            default:
                if (parseSettings.name)
                    output += "return " + (isDefault ? "{'default' : " + this.process(obj["default"], true, false, parseSettings, 1) + ", '__jst': '" + parseSettings.name + "'}" : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, parseSettings, 1) : key + ":" + sp + _this.process(obj[key], true, false, parseSettings, 2); }), parseSettings, 1) + "}, '__jst': '" + parseSettings.name + "'") + ";";
                else
                    output += "return " + (isDefault ? this.process(obj["default"], true, false, parseSettings, 1) : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, parseSettings, 1) : key + ":" + sp + _this.process(obj[key], true, false, parseSettings, 2); }), parseSettings, 1) + "}") + ";";
        }
        var s = {};
        var r = {};
        if (parseSettings.imports.length > 0)
            for (var i = 0; i < parseSettings.imports.length; i++)
                if (parseSettings.imports[i].indexOf('#') > -1) {
                    var name = parseSettings.imports[i].substr(0, parseSettings.imports[i].indexOf('#'));
                    if (s[name] === undefined)
                        s[name] = {};
                    s[name][parseSettings.imports[i].substr(name.length + 1)] = i;
                }
                else
                    r[parseSettings.imports[i]] = i;
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output;
                break;
            case "amd":
                output = "define([" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], function (" + Object.keys(r).map(function (key) { return '_' + r[key]; }).join(", ") + ") { " + output + " });" + nl;
                break;
            case "es":
                output = Object.keys(s).map(function (key) { return (key.charAt(0) === '~' ? "var {" + Object.keys(s[key]).map(function (k) { return k + ": _" + s[key][k]; }) + "}  = await import('" + key.substr(1) + "');" + nl : "import {" + Object.keys(s[key]).map(function (k) { return k + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key + "';" + nl); }).join('') + Object.keys(r).map(function (key) { return (key.charAt(0) === '~' ? "var _" + r[key] + " = await import('" + key.substr(1) + "');" + nl : "import * as _" + r[key] + " from '" + key + "';" + nl); }).join('') + output;
                break;
            default:
                for (var req in r)
                    output = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output;
        }
        return output;
    };
    Transformer.prototype.transform = function (obj, name) {
        return this.bundleModule(Array.isArray(obj) || typeof (obj) != 'object' || Object.keys(obj).filter(function (k) { return k[0] == '.'; }).length > 0 ? { "default": obj } : obj, { name: name, imports: [], exports: {}, compositeObject: false });
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
        if (window) {
            var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "react"));
            if (obj) {
                this.processElement = obj.value.h;
                this.Component = obj.value.Component;
                this.renderInternal = obj.value.render;
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3QvYXBwLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L2NvbXBvbmVudHMvYXN5bmMuanMiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3QvY29tcG9uZW50cy9pbnRlcmNlcHQuanMiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3Qvc2VydmljZXMvbG9hZGVyLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vQzovQ29kZS9hcHBmaWJyZS9qc3QvZGlzdC9zZXJ2aWNlcy9wcm9taXNlLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3RyYW5zZm9ybWVyLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3dlYnVpLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3R5cGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFp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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQixtQkFBbUIsRUFBRTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDOVNhO0FBQ2I7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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TSwwQ0FBMEMsa0JBQWtCLDBDQUEwQyxnQ0FBZ0MsRUFBRSxxQkFBcUIsb0JBQW9CLFFBQVEsRUFBRSxnREFBZ0QsOEZBQThGLHlEQUF5RCxRQUFRLEVBQUU7QUFDL2pCO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlIQUF5SCxvQkFBb0IsRUFBRSxnQkFBZ0IsaUJBQWlCLFNBQVMscUNBQXFDLDBCQUEwQjtBQUN4UDtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDNUlhO0FBQ2I7QUFDQSxjQUFjLG1CQUFPLENBQUMseUNBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUM3QmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsdURBQXVEOzs7Ozs7Ozs7Ozs7O0FDbEIzQztBQUNiO0FBQ0EsWUFBWSxtQkFBTyxDQUFDLDhDQUFlO0FBQ25DO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImFwcF9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuLy9pbXBvcnQgeyBJbnRlcmNlcHQgfSBmcm9tIFwiLi9pbnRlcmNlcHRcIjtcclxudmFyIHByb21pc2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL3Byb21pc2VcIik7XHJcbnZhciBsb2FkZXJfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL2xvYWRlclwiKTtcclxudmFyIHRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy90cmFuc2Zvcm1lclwiKTtcclxudmFyIHByb2Nlc3Nvcl8xID0gcmVxdWlyZShcIi4vc2VydmljZXMvcHJvY2Vzc29yXCIpO1xyXG52YXIgd2VidWlfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL3dlYnVpXCIpO1xyXG52YXIgQXBwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXBwKGFwcCkge1xyXG4gICAgICAgIGlmIChhcHAgPT09IHZvaWQgMCkgeyBhcHAgPSB7IG1haW46IFtdIH07IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubWFpbiA9IGFwcC5tYWluO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGFwcC5vcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5sb2dMZXZlbCA9IHRoaXMub3B0aW9ucy5sb2dMZXZlbCB8fCB0eXBlc18xLkxvZ0xldmVsLkVycm9yO1xyXG4gICAgICAgIHZhciBsb2dnZXIgPSBhcHAuc2VydmljZXMgJiYgYXBwLnNlcnZpY2VzLmxvZ2dlciA/ICgndHlwZScgaW4gYXBwLnNlcnZpY2VzLmxvZ2dlciA/IGFwcC5zZXJ2aWNlcy5sb2dnZXIgOiBuZXcgYXBwLnNlcnZpY2VzLmxvZ2dlcih0aGlzKSkgOiBudWxsO1xyXG4gICAgICAgIHZhciBzID0gYXBwLnNlcnZpY2VzIHx8IHt9O1xyXG4gICAgICAgIHMubG9nZ2VyID0geyB0eXBlOiBcIkxvZ2dlclwiLCBsb2c6IGZ1bmN0aW9uIChsb2dMZXZlbCwgdGl0bGUsIGRldGFpbCwgb3B0aW9uYWxQYXJhbWV0ZXJzKSB7IGlmIChsb2dMZXZlbCA8PSAoX3RoaXMgJiYgX3RoaXMub3B0aW9ucyAmJiBfdGhpcy5vcHRpb25zLmxvZ0xldmVsID8gKHR5cGVzXzEuTG9nTGV2ZWxbX3RoaXMub3B0aW9ucy5sb2dMZXZlbF0gfHwgMikgOiAyKSlcclxuICAgICAgICAgICAgICAgIGxvZ2dlciA/IGxvZ2dlci5sb2cuYmluZChfdGhpcywgbG9nTGV2ZWwsIHRpdGxlLCBkZXRhaWwsIG9wdGlvbmFsUGFyYW1ldGVycykgOiBbZnVuY3Rpb24gKHRpdGxlLCBkZXRhaWwsIG9wdGlvbmFsUGFyYW1ldGVycykgeyB9LCBjb25zb2xlLmVycm9yLCBjb25zb2xlLmVycm9yLCBjb25zb2xlLndhcm4sIGNvbnNvbGUuaW5mbywgY29uc29sZS50cmFjZV1bbG9nTGV2ZWxdKF90aGlzICsgXCI6IFwiICsgdGl0bGUgKyBcIiBcXHJcXG4gXCIgKyBkZXRhaWwsIG9wdGlvbmFsUGFyYW1ldGVycyk7IH0gfTtcclxuICAgICAgICBzLnByb21pc2UgPSBzLnByb21pc2UgfHwgcHJvbWlzZV8xLlByb21pc2U7XHJcbiAgICAgICAgcy50cmFuc2Zvcm1lciA9IHMudHJhbnNmb3JtZXIgPyAoJ3R5cGUnIGluIHMudHJhbnNmb3JtZXIgPyBzLnRyYW5zZm9ybWVyIDogbmV3IHMudHJhbnNmb3JtZXIodGhpcykpIDogbmV3IHRyYW5zZm9ybWVyXzEuVHJhbnNmb3JtZXIoKTtcclxuICAgICAgICBzLm1vZHVsZVN5c3RlbSA9IHMubW9kdWxlU3lzdGVtID8gKCd0eXBlJyBpbiBzLm1vZHVsZVN5c3RlbSA/IHMubW9kdWxlU3lzdGVtIDogbmV3IHMubW9kdWxlU3lzdGVtKHRoaXMpKSA6IG5ldyBsb2FkZXJfMS5Mb2FkZXIodGhpcyk7XHJcbiAgICAgICAgcy5VSSA9IHMuVUkgPyAoJ3R5cGUnIGluIHMuVUkgPyBzLlVJIDogbmV3IHMuVUkodGhpcykpIDogbmV3IHdlYnVpXzEuV2ViVUkodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IHsgbW9kdWxlU3lzdGVtOiBzLm1vZHVsZVN5c3RlbSwgcHJvY2Vzc29yOiBuZXcgcHJvY2Vzc29yXzEuUHJvY2Vzc29yKHRoaXMpLCBwcm9taXNlOiBzLnByb21pc2UsIHRyYW5zZm9ybWVyOiBzLnRyYW5zZm9ybWVyLCBsb2dnZXI6IHMubG9nZ2VyLCBVSTogcy5VSSB9O1xyXG4gICAgICAgIHRoaXMubW9kdWxlcyA9IGFwcC5tb2R1bGVzO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IGFwcC5jb21wb25lbnRzO1xyXG4gICAgICAgIHRoaXMubG9hZE1vZHVsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIEFwcC5wcm90b3R5cGUubG9hZE1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChtb2R1bGUubW9kdWxlcylcclxuICAgICAgICAgICAgbW9kdWxlLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmxvYWRNb2R1bGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFwcC5wcm90b3R5cGUuaW5pdE1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChtb2R1bGUubW9kdWxlcylcclxuICAgICAgICAgICAgbW9kdWxlLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09ICdvYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmluaXRNb2R1bGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChtb2R1bGUuZXZlbnRzICYmIG1vZHVsZS5ldmVudHMuaW5pdClcclxuICAgICAgICAgICAgbW9kdWxlLmV2ZW50cy5pbml0LmNhbGwoc2VsZiwgdGhpcywgbW9kdWxlKTtcclxuICAgIH07XHJcbiAgICAvKmxvZyhsb2dMZXZlbDpMb2dMZXZlbCwgbWVzc2FnZT86c3RyaW5nLCBvcHRpb25hbFBhcmFtZXRlcnM/OmFueVtdKSB7XHJcbiAgICAgICAgbGV0IGwgPSBbKG1lc3NhZ2U/OmFueSwgb3B0aW9uYWxQYXJhbWV0ZXJzPzphbnlbXSk9Pnt9LCB0aGlzLnNlcnZpY2VzLmxvZ2dlci5leGNlcHRpb24sIHRoaXMuc2VydmljZXMubG9nZ2VyLmVycm9yLCB0aGlzLnNlcnZpY2VzLmxvZ2dlci53YXJuLCB0aGlzLnNlcnZpY2VzLmxvZ2dlci5sb2csIHRoaXMuc2VydmljZXMubG9nZ2VyLnRyYWNlXTtcclxuICAgICAgICBpZiAobG9nTGV2ZWwgPD0gKHRoaXMgJiYgdGhpcy5vcHRpb25zID8gKHRoaXMub3B0aW9ucy5sb2dMZXZlbCB8fCAyKSA6IDIpKVxyXG4gICAgICAgICAgICBsW2xvZ0xldmVsXShtZXNzYWdlLCBvcHRpb25hbFBhcmFtZXRlcnMpO1xyXG4gICAgfSovXHJcbiAgICBBcHAucHJvdG90eXBlLmluaXRBcHAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50KSB7IC8vIHdlYiBhcHBcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMud2ViKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYiA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9keScpO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMud2ViLnRhcmdldCA9IHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0IHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMud2ViLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYi50YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIikgfHwgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLndlYi50YXJnZXQuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYi50YXJnZXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtYWluXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMud2ViLnRhcmdldCA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5vcHRpb25zLndlYi50YXJnZXQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndlYi50YXJnZXQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBsb2NhdGUgdGFyZ2V0IChcIiArICh0aGlzLm9wdGlvbnMud2ViLnRhcmdldCA/ICdub3Qgc3BlY2lmaWVkJyA6IHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0KSArIFwiKSBpbiBodG1sIGRvY3VtZW50IGJvZHkuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSB0aGlzLm9wdGlvbnMudGl0bGU7XHJcbiAgICAgICAgICAgIC8vaWYgKG1vZHVsZSAmJiBtb2R1bGUuaG90KSBtb2R1bGUuaG90LmFjY2VwdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndlYi50YXJnZXQuaGFzQ2hpbGROb2RlcygpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYi50YXJnZXQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQXBwLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuc2VydmljZXMucHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pbml0QXBwKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pbml0TW9kdWxlKF90aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLnNlcnZpY2VzLmxvZ2dlci5sb2cuY2FsbChfdGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5UcmFjZSwgJ1JlbmRlcmluZyBhcHAubWFpbicsIF90aGlzLm1haW4pO1xyXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXIoX3RoaXMubWFpbikudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgX3RoaXMuc2VydmljZXMubG9nZ2VyLmxvZyh0eXBlc18xLkxvZ0xldmVsLlRyYWNlLCAnUmVuZGVyZWQgYXBwLm1haW4nLCB2YWx1ZSk7IHJlc29sdmUodmFsdWUpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IF90aGlzLnNlcnZpY2VzLmxvZ2dlci5sb2cuY2FsbChfdGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5FcnJvciwgJ0Vycm9yIHJlbmRlcmluZyBhcHAubWFpbicsIGVycik7IHJlamVjdChlcnIpOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBBcHAucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICh1aSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLnNlcnZpY2VzLnByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXJ2aWNlcy5wcm9jZXNzb3IucHJvY2Vzcyh1aSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcy5zZXJ2aWNlcy5VSS5yZW5kZXIodmFsdWUsIF90aGlzLm9wdGlvbnMud2ViICYmIF90aGlzLm9wdGlvbnMud2ViLnRhcmdldCA/IF90aGlzLm9wdGlvbnMud2ViLnRhcmdldCA6IHVuZGVmaW5lZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyKSB7IHJldHVybiByZWplY3Qocik7IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBcHA7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQXBwID0gQXBwO1xyXG5mdW5jdGlvbiB4YXBwKGFwcCkge1xyXG4gICAgaWYgKCFhcHAuc2VydmljZXMpXHJcbiAgICAgICAgYXBwLnNlcnZpY2VzID0ge307XHJcbiAgICAvKmlmICghYXBwLnNlcnZpY2VzLmxvYWRlcikgYXBwLnNlcnZpY2VzLmxvYWRlciA9IHtsb2FkOiBmdW5jdGlvbiAodXJsIDogc3RyaW5nLCBwYXJzZSA6IGJvb2xlYW4sIGFzeW5jPzogYm9vbGVhbikgOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuICAgIC8vY29uc3QgX3JlbmRlciA9IChqc3Q6YW55LCB0YXJnZXQ6YW55KSA9PiBhcHAudWkgPyBhcHAudWkucmVuZGVyKHBhcnNlKGpzdCksIHRhcmdldCkgOiBudWxsO1xyXG4gICAgLypcclxuICAgICAgICBmdW5jdGlvbiBfY29uc3RydWN0KGpzdENvbXBvbmVudCA6IGFueSkgOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBqc3RDb21wb25lbnQge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyKG9iaiA6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikgJiYgb2JqLmxlbmd0aCA9PT0gMSAmJiAhQXJyYXkuaXNBcnJheShvYmpbMF0pKSByZXR1cm4gdHlwZW9mIG9ialswXSA9PSBcInN0cmluZ1wiID8gcGFyc2Uob2JqKSA6IG9ialswXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqID09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIiB8fCBvYmouJCR0eXBlb2YgPyBvYmogOiBwYXJzZShvYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcbiAgICBmdW5jdGlvbiBJbmplY3QoUHJveHksIFJlbmRlcikge1xyXG4gICAgICAgIC8qdmFyIENvbXBvbmVudCA9IFByb3h5IHx8IChhcHAudWkgPyBhcHAudWkuQ29tcG9uZW50IDogbnVsbCk7XHJcbiAgICAgICAgY2xhc3MgTG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgICAgICAgICAgbG9hZCgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcHAuc2VydmljZXMgJiYgYXBwLnNlcnZpY2VzLmxvYWRlcikgYXBwLnNlcnZpY2VzLmxvYWRlci5sb2FkKHRoaXMuc3RhdGUudXJsLCB0cnVlKS50aGVuKG9iaiA9PiB7dGhpcy5zZXRTdGF0ZSh7Y2hpbGRyZW46IG9ian0pfSwgZXJyID0+IHt0aGlzLnNldFN0YXRlKHtjaGlsZHJlbjogW1wiRXhjZXB0aW9uXCIsIGVycl19KX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgY29tcG9uZW50V2lsbE1vdW50KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKHt9LCB0aGlzLnByb3BzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbXBvbmVudFdpbGxVcGRhdGUocHJvcHM6YW55LCBuZXh0cHJvcHM6YW55KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrdXJsKG5leHRwcm9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShwcm9wczphbnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrdXJsKHByb3BzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGNoZWNrdXJsKHByb3BzOmFueSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IHR5cGVvZiBwcm9wcy51cmwgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BzLnVybCgpIDogcHJvcHMudXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlIHx8IHRoaXMuc3RhdGUudXJsICE9PSB1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW4sIHVybDogdXJsfSwgdGhpcy5sb2FkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZSB8fCB0aGlzLnN0YXRlLnVybCA9PT0gdXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgcmVuZGVyICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5yZW5kZXIodGhpcy5jaGVja3VybCh0aGlzLnByb3BzKSAmJiB0aGlzLnN0YXRlLmNoaWxkcmVuICYmIHRoaXMuc3RhdGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRoaXMuc3RhdGUuY2hpbGRyZW4gOiB0aGlzLnByb3BzLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIHJldHVybiBhcHA7XHJcbiAgICAgICAgLyp2YXIgaW5qID0ge1xyXG4gICAgICAgICAgICAgIENvbXBvbmVudFxyXG4gICAgICAgICAgICAsIENvbnRleHRcclxuICAgICAgICAgICAgLCBMb2FkZXJcclxuICAgICAgICAgICAgLCBSZXNvbHZlXHJcbiAgICAgICAgICAgICwgU3RhdGU6IENvbnRleHQuc3RhdGVcclxuICAgICAgICAgICAgLCBjb21wb25lbnRzIDogYXBwLmNvbXBvbmVudHNcclxuICAgICAgICAgICAgLCBSZW5kZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcHApO1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4ga2V5cylcclxuICAgICAgICAgICAgaWYgKGtleXNbaV0gIT0gXCJ0aXRsZVwiICYmIGtleXNbaV0gIT0gXCJkZXNpZ25lclwiICYmIGtleXNbaV0gIT0gXCJ1aVwiICYmIGtleXNbaV0gIT0gXCJ0YXJnZXRcIilcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbmosIGtleXNbaV0sIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXBwLCBrZXlzW2ldKXx8e30pO1xyXG4gICAgICAgIHJldHVybiBpbmo7Ki9cclxuICAgIH1cclxuICAgIGRvY3VtZW50LndyaXRlbG4oSlNPTi5zdHJpbmdpZnkoYXBwKSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBBc3luYyA9IGZ1bmN0aW9uIGluamVjdChhcHApIHtcclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKEFzeW5jLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIEFzeW5jKHByb3BzKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdGhpcy5wcm9wcy52YWx1ZVszXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFzeW5jLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGFwcC5zZXJ2aWNlcy5wcm9taXNlLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHRoaXMucHJvcHMudmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy52YWx1ZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuc2V0U3RhdGUoeyBcInZhbHVlXCI6IHZhbHVlIH0pOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBfdGhpcy5zZXRTdGF0ZSh7IFwidmFsdWVcIjogX3RoaXMucHJvcHMudmFsdWVbNF0gPyBfdGhpcy5wcm9wcy52YWx1ZVs0XShlcnIpIDogW1wiRXhjZXB0aW9uXCIsIGVycl0gfSk7IH0pO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLnZhbHVlWzBdICYmIHRoaXMucHJvcHMudmFsdWVbMF0udGhlbilcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmFsdWVbMF0udGhlbihmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLnNldFN0YXRlKHsgXCJ2YWx1ZVwiOiB2YWx1ZSB9KTsgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gX3RoaXMuc2V0U3RhdGUoeyBcInZhbHVlXCI6IF90aGlzLnByb3BzLnZhbHVlWzRdID8gX3RoaXMucHJvcHMudmFsdWVbNF0oZXJyKSA6IFtcIkV4Y2VwdGlvblwiLCBlcnJdIH0pOyB9KTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYXBwLnNlcnZpY2VzLnByb21pc2UuYWxsKHRoaXMucHJvcHMudmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5zZXRTdGF0ZSh7IFwidmFsdWVcIjogdmFsdWUgfSk7IH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikgeyBpZiAoX3RoaXMucHJvcHMudmFsdWVbNF0pXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBcInZhbHVlXCI6IF90aGlzLnByb3BzLnZhbHVlWzRdIH0pOyB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFzeW5jLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlICYmIHR5cGVvZiB0aGlzLnN0YXRlLnZhbHVlICE9PSBcInN0cmluZ1wiID8gX3N1cGVyLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLCB0aGlzLnN0YXRlLnZhbHVlKSA6IFwiXCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gQXN5bmM7XHJcbiAgICB9KGFwcC5zZXJ2aWNlcy5wcm9jZXNzb3IuY29uc3RydWN0KGFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSk7XHJcbn07XHJcbmV4cG9ydHMuQXN5bmMgPSBBc3luYztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBJbnRlcmNlcHQgPSBmdW5jdGlvbiBpbmplY3QoX2EpIHtcclxuICAgIHZhciBDb21wb25lbnQgPSBfYS5Db21wb25lbnQ7XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhJbnRlcmNlcHQsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gSW50ZXJjZXB0KCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICBfdGhpcy5zdGF0ZSA9IHsgZm9jdXM6IGZhbHNlLCBzZWxlY3RlZDogZmFsc2UsIGVkaXRNb2RlOiBudWxsLCBjYW5FZGl0OiB0cnVlIH07XHJcbiAgICAgICAgICAgIF90aGlzLm9uTWVzc2FnZSA9IF90aGlzLm9uTWVzc2FnZS5iaW5kKF90aGlzKTtcclxuICAgICAgICAgICAgX3RoaXMuY2xpY2sgPSBfdGhpcy5jbGljay5iaW5kKF90aGlzKTtcclxuICAgICAgICAgICAgX3RoaXMubW91c2VFbnRlciA9IF90aGlzLm1vdXNlRW50ZXIuYmluZChfdGhpcyk7XHJcbiAgICAgICAgICAgIF90aGlzLm1vdXNlTGVhdmUgPSBfdGhpcy5tb3VzZUxlYXZlLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLm9uTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyBwYXJlbnQucG9zdE1lc3NhZ2UoeyBldmVudFR5cGU6IFwic2VsZWN0XCIsIGNvcnJlbGF0aW9uSWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSB9LCBsb2NhdGlvbi5ocmVmKTsgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLm9uTWVzc2FnZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLnJlY29uc3RydWN0ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIW9ialsxXSlcclxuICAgICAgICAgICAgICAgIG9ialsxXSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoIW9ialsxXS5zdHlsZSlcclxuICAgICAgICAgICAgICAgIG9ialsxXS5zdHlsZSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoIW9ialsxXS5zdHlsZS5ib3JkZXIgJiYgIW9ialsxXS5zdHlsZS5wYWRkaW5nICYmICFvYmpbMV0ub25Nb3VzZUVudGVyICYmICFvYmpbMV0ub25Nb3VzZUxlYXZlKSB7XHJcbiAgICAgICAgICAgICAgICBvYmpbMV0uc3R5bGUucGFkZGluZyA9IHRoaXMuc3RhdGUuZm9jdXMgfHwgdGhpcy5zdGF0ZS5zZWxlY3RlZCA/IFwiMXB4XCIgOiBcIjJweFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRpdE1vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqWzFdLnN0eWxlLmJhY2tncm91bmQgPSBcImxpZ2h0Ymx1ZVwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqWzFdLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmZvY3VzKVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialsxXS5zdHlsZS5ib3JkZXIgPSBcIjFweCBkYXNoZWQgZ3JleVwiO1xyXG4gICAgICAgICAgICAgICAgb2JqWzFdLm9uTW91c2VFbnRlciA9IHRoaXMubW91c2VFbnRlcjtcclxuICAgICAgICAgICAgICAgIG9ialsxXS5vbk1vdXNlTGVhdmUgPSB0aGlzLm1vdXNlTGVhdmU7XHJcbiAgICAgICAgICAgICAgICBvYmpbMV0ub25DbGljayA9IHRoaXMuY2xpY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3JldHVybiBzdXBlci5yZW5kZXIoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKSA/IHRoaXMucmVjb25zdHJ1Y3QoW1wiZGl2XCIsIHtzdHlsZToge2Rpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJ9fSwgdGhpcy5wcm9wcy5jaGlsZHJlbl0pICA6IHRoaXMucmVjb25zdHJ1Y3QodGhpcy5wcm9wcy5jaGlsZHJlbikpO1xyXG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLCB0aGlzLnJlY29uc3RydWN0KFtcImRpdlwiLCB7IHN0eWxlOiB7IGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIgfSwga2V5OiAwIH0sIHRoaXMucHJvcHMuY2hpbGRyZW5dKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLm1vdXNlRW50ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8veC5EZXNpZ25lci5ub3RpZnkoXCJ4XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgXCJmb2N1c1wiOiB0cnVlIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5tb3VzZUxlYXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3guRGVzaWduZXIubm90aWZ5KFwieVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFwiZm9jdXNcIjogZmFsc2UgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLmNsaWNrID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAvL0Rlc2lnbmVyLm5vdGlmeSh0aGlzLnByb3BzLmZpbGUpO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gd2luZG93O1xyXG4gICAgICAgICAgICB3aGlsZSAocGFyZW50LnBhcmVudCAhPT0gcGFyZW50ICYmIHdpbmRvdy5wYXJlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHZhciBjb3JyZWxhdGlvbklkID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBldmVudFR5cGU6IFwic2VsZWN0XCIsIGVkaXRNb2RlOiB0aGlzLnN0YXRlLmVkaXRNb2RlLCBjYW5FZGl0OiB0aGlzLnN0YXRlLmNhbkVkaXQsIGNvcnJlbGF0aW9uSWQ6IGNvcnJlbGF0aW9uSWQsIGNvbnRyb2w6IHsgZmlsZTogdGhpcy5wcm9wcy5maWxlLCBtZXRob2Q6IHRoaXMucHJvcHMubWV0aG9kIH0gfSwgbG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBcInNlbGVjdGVkXCI6IGNvcnJlbGF0aW9uSWQgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLm9uTWVzc2FnZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5zdWJzdHIoMCwgZXYub3JpZ2luLmxlbmd0aCkgPT0gZXYub3JpZ2luICYmIGV2LnR5cGUgPT0gXCJtZXNzYWdlXCIgJiYgZXYuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWQgPT0gZXYuZGF0YS5jb3JyZWxhdGlvbklkKVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXYuZGF0YS5ldmVudFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlc2VsZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlZGl0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZWRpdE1vZGU6IGV2LmRhdGEuZWRpdE1vZGUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBJbnRlcmNlcHQ7XHJcbiAgICB9KENvbXBvbmVudCkpO1xyXG59O1xyXG5leHBvcnRzLkludGVyY2VwdCA9IEludGVyY2VwdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xyXG5leHBvcnRzLkFwcCA9IGFwcF8xLkFwcDtcclxudmFyIHRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy90cmFuc2Zvcm1lclwiKTtcclxuZXhwb3J0cy5UcmFuc2Zvcm1lciA9IHRyYW5zZm9ybWVyXzEuVHJhbnNmb3JtZXI7XHJcbnZhciB0eXBlcyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi90eXBlc1wiKSk7XHJcbmV4cG9ydHMudHlwZXMgPSB0eXBlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBMb2FkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBMb2FkZXIoYXBwKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJNb2R1bGVTeXN0ZW1cIjtcclxuICAgICAgICBMb2FkZXIuYXBwID0gYXBwO1xyXG4gICAgfVxyXG4gICAgTG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwgeyBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGlmICghcmVzLm9rKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGZXRjaCBlcnJvcjogJyArIHJlcy5zdGF0dXMgKyAnICcgKyByZXMuc3RhdHVzVGV4dCArIChwYXJlbnQgPyAnIGxvYWRpbmcgZnJvbSAgJyArIHBhcmVudCA6ICcnKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMudGV4dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvYWRlci5wcm90b3R5cGUucmVxdWlyZSA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCd1cmwnLCAndG1wZGlyJywgJ3RtcGRpciA9IHRtcGRpciA/IHRtcGRpciA6IGdsb2JhbC5wcm9jZXNzLmVudi5JTklUX0NXRDsgdmFyIF9fZGlybmFtZV9fID0gZ2xvYmFsLnByb2Nlc3MuY3dkKCk7IGlmIChfX2Rpcm5hbWVfXyAhPSB0bXBkaXIpIGdsb2JhbC5wcm9jZXNzLmNoZGlyKHRtcGRpcik7IHZhciBfZXhwID0gKGdsb2JhbC5yZXF1aXJlIHx8IGdsb2JhbC5wcm9jZXNzLm1haW5Nb2R1bGUuY29uc3RydWN0b3IuX2xvYWQpKHVybCk7IGlmIChnbG9iYWwucHJvY2Vzcy5jd2QoKSAhPSBfX2Rpcm5hbWVfXykgZ2xvYmFsLnByb2Nlc3MuY2hkaXIoX19kaXJuYW1lX18pOyByZXR1cm4gX2V4cDsnKSh1cmwsIExvYWRlci5hcHAub3B0aW9ucy5iYXNlUGF0aCk7XHJcbiAgICB9O1xyXG4gICAgTG9hZGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc291cmNlLCB1cmwpIHtcclxuICAgICAgICB2YXIgbSA9IHsgZXhwb3J0czoge30gfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgRnVuY3Rpb24oJ3JlcXVpcmUnLCAnbW9kdWxlJywgc291cmNlICsgXCI7XFxuLy8jIHNvdXJjZVVSTD0nICsgXCIgKyB1cmwpKHRoaXMucmVxdWlyZSwgbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChmKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBydW5uaW5nIHNjcmlwdCBmcm9tIGZyb20gc291cmNlJyArIHVybCB8fCBzb3VyY2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS5leHBvcnRzO1xyXG4gICAgfTtcclxuICAgIExvYWRlci5wcm90b3R5cGUuZXhlYyA9IGZ1bmN0aW9uIChzb3VyY2UsIHVybCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMb2FkZXIuYXBwLnNlcnZpY2VzLnByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG91dHB1dCA9IF90aGlzLnJ1bihzb3VyY2UsIHVybCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG91dHB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBleGVjdXRpbmcgc2NyaXB0ICcgKyB1cmwgKyAnOiAnKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvYWRlci5wcm90b3R5cGUuaW5zdGFuY2lhdGUgPSBmdW5jdGlvbiAodXJsLCBwYXJlbnQpIHtcclxuICAgICAgICB2YXIgYXBwID0gTG9hZGVyLmFwcDtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkKHVybCwgcGFyZW50KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcHAuc2VydmljZXMudHJhbnNmb3JtZXIudHJhbnNmb3JtKHVybCwgc291cmNlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmV4ZWMpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBMb2FkZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuTG9hZGVyID0gTG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGludGVyY2VwdF8xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvaW50ZXJjZXB0XCIpO1xyXG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2FzeW5jXCIpO1xyXG5mdW5jdGlvbiBzX3hhKGEsIGIpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKTsgfVxyXG5mdW5jdGlvbiBjbG9uZShhLCBiKSB7IGZvciAodmFyIGMgPSAxOyBjIDwgYXJndW1lbnRzLmxlbmd0aDsgYysrKSB7XHJcbiAgICB2YXIgZCA9IGFyZ3VtZW50c1tjXTtcclxuICAgIGlmIChkKVxyXG4gICAgICAgIGZvciAodmFyIGUgaW4gZClcclxuICAgICAgICAgICAgc194YShkLCBlKSAmJiAoYVtlXSA9IGRbZV0pO1xyXG59IHJldHVybiBhOyB9XHJcbmZ1bmN0aW9uIEluamVjdChhcHAsIFByb3h5KSB7XHJcbiAgICB2YXIgaW5qID0gY2xvbmUoYXBwKTtcclxuICAgIGluai5zZXJ2aWNlcy5VSS5Db21wb25lbnQgPSBQcm94eSB8fCBhcHAuc2VydmljZXMuVUkuQ29tcG9uZW50O1xyXG4gICAgLypjbGFzcyBMb2FkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgICAgIGxvYWQoKSB7XHJcbiAgICAgICAgICAgIEpzdENvbnRleHQubG9hZCh0aGlzLnN0YXRlLnVybCwgdHJ1ZSkudGhlbihvYmogPT4ge3RoaXMuc2V0U3RhdGUoe2NoaWxkcmVuOiBvYmp9KX0sIGVyciA9PiB7dGhpcy5zZXRTdGF0ZSh7Y2hpbGRyZW46IFtcIkV4Y2VwdGlvblwiLCBlcnJdfSl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUoe30sIHRoaXMucHJvcHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wczphbnksIG5leHRwcm9wczphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrdXJsKG5leHRwcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShwcm9wczphbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2t1cmwocHJvcHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hlY2t1cmwocHJvcHM6YW55KSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSB0eXBlb2YgcHJvcHMudXJsID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wcy51cmwoKSA6IHByb3BzLnVybDtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlIHx8IHRoaXMuc3RhdGUudXJsICE9PSB1cmwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiwgdXJsOiB1cmx9LCB0aGlzLmxvYWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUgfHwgdGhpcy5zdGF0ZS51cmwgPT09IHVybDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5yZW5kZXIodGhpcy5jaGVja3VybCh0aGlzLnByb3BzKSAmJiB0aGlzLnN0YXRlLmNoaWxkcmVuICYmIHRoaXMuc3RhdGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRoaXMuc3RhdGUuY2hpbGRyZW4gOiB0aGlzLnByb3BzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuICAgIC8qbGV0IHsgdGl0bGUsIGRlc2lnbmVyLCB1aSwgdGFyZ2V0LCAuLi5pbmplY3QgfSA9IGFwcDtcclxuICAgIHJldHVybiB7IENvbXBvbmVudFxyXG4gICAgICAgICwgQ29udGV4dFxyXG4gICAgICAgICwgTG9hZGVyXHJcbiAgICAgICAgLCBjb21wb25lbnRzIDogYXBwLmNvbXBvbmVudHNcclxuICAgICAgICAsIC4uLmluamVjdFxyXG4gICAgfTsqL1xyXG4gICAgcmV0dXJuIGluajtcclxufVxyXG52YXIgUHJvY2Vzc29yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUHJvY2Vzc29yKGFwcCkge1xyXG4gICAgICAgIHRoaXMuY2FjaGUgPSBPYmplY3QoKTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIlByb2Nlc3NvclwiO1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgfVxyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5jb25zdHJ1Y3QgPSBmdW5jdGlvbiAoanN0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICAgICAgX19leHRlbmRzKGNsYXNzXzEsIF9zdXBlcik7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSAmJiBvYmoubGVuZ3RoID09PSAxICYmICFBcnJheS5pc0FycmF5KG9ialswXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmpbMF0gPT0gXCJzdHJpbmdcIiA/IGN0eC5wYXJzZShvYmopIDogb2JqWzBdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiA9PSBudWxsIHx8IHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIgfHwgb2JqLiQkdHlwZW9mID8gb2JqIDogY3R4LnBhcnNlKG9iaik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgICAgIH0oanN0Q29tcG9uZW50KSk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5sb2NhdGUgPSBmdW5jdGlvbiAocmVzb3VyY2UsIHBhdGgpIHtcclxuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIGpzdCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBvYmogPSByZXNvdXJjZTtcclxuICAgICAgICBmb3IgKHZhciBwYXJ0ID0gMDsgcGFydCA8IHBhcnRzLmxlbmd0aDsgcGFydCsrKVxyXG4gICAgICAgICAgICBpZiAob2JqW3BhcnRzW3BhcnRdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFydCA9PSBwYXRoLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAganN0ID0gb2JqLl9fanN0O1xyXG4gICAgICAgICAgICAgICAgb2JqID0gb2JqW3BhdGhbcGFydF1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9iaiA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH07XHJcbiAgICBQcm9jZXNzb3IucHJvdG90eXBlLmdldEZ1bmN0aW9uTmFtZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUpXHJcbiAgICAgICAgICAgIHJldHVybiBvYmoubmFtZTtcclxuICAgICAgICB2YXIgbmFtZSA9IG9iai50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJygnKSA+IC0xKVxyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5pbmRleE9mKCcoJykpO1xyXG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ2Z1bmN0aW9uJykgPiAtMSlcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKG5hbWUuaW5kZXhPZignZnVuY3Rpb24nKSArICdmdW5jdGlvbicubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gbmFtZS50cmltKCk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5wcm9jZXNzRWxlbWVudCA9IGZ1bmN0aW9uIChhciwgc3VwcG9ydEFzeW5jLCBsaWdodCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcclxuICAgICAgICB3aGlsZSAoIWRvbmUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhclswXSA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldEZ1bmN0aW9uTmFtZShhclswXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5qZWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyWzBdID0gYXJbMF0oSW5qZWN0KHRoaXMuYXBwLCB0aGlzLmNvbnN0cnVjdCh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2Zvcm1cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2UoYXJbMF0oYXIpLCB1bmRlZmluZWQsIHN1cHBvcnRBc3luYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhclswXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IGFyWzBdO1xyXG4gICAgICAgICAgICAgICAgYXJbMF0gPSB0aGlzLnJlc29sdmUoYXJbMF0pO1xyXG4gICAgICAgICAgICAgICAgZG9uZSA9IGFyWzBdID09PSB0YWc7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJbMF0udGhlbiAmJiBzdXBwb3J0QXN5bmMgJiYgIWxpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5hcHAuc2VydmljZXMucHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gYXJbMF0udGhlbihmdW5jdGlvbiAoeCkgeyByZXR1cm4gcmVzb2x2ZShfdGhpcy5wYXJzZSh4LCBhclsxXS5rZXksIHN1cHBvcnRBc3luYykpOyB9KTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYXJbMF0gJiYgYXJbMF0udGhlbiAmJiAhc3VwcG9ydEFzeW5jICYmICFsaWdodClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zZXJ2aWNlcy5VSS5wcm9jZXNzRWxlbWVudChhc3luY18xLkFzeW5jLCB7IFwidmFsdWVcIjogYXIgfSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlnaHQgPyBhciA6IHRoaXMuYXBwLnNlcnZpY2VzLlVJLnByb2Nlc3NFbGVtZW50KGFyWzBdLCBhclsxXSwgYXJbMl0pO1xyXG4gICAgfTtcclxuICAgIFByb2Nlc3Nvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAob2JqLCBrZXksIHN1cHBvcnRBc3luYykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKG9iaiAmJiBvYmpbXCJkZWZhdWx0XCJdKVxyXG4gICAgICAgICAgICBvYmogPSBvYmouX19qc3QgPyBbaW50ZXJjZXB0XzEuSW50ZXJjZXB0LCB7IGZpbGU6IG9iai5fX2pzdCB9LCBbb2JqW1wiZGVmYXVsdFwiXV1dIDogb2JqW1wiZGVmYXVsdFwiXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgJiYgIW9ialsxXSlcclxuICAgICAgICAgICAgICAgIG9ialsxXSA9IHsga2V5OiBrZXkgfTtcclxuICAgICAgICAgICAgaWYgKGtleSAmJiAhb2JqWzFdLmtleSlcclxuICAgICAgICAgICAgICAgIG9ialsxXS5rZXkgPSBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb2JqID0gW29iaiwga2V5ID8geyBrZXk6IGtleSB9IDogbnVsbF07XHJcbiAgICAgICAgdmFyIGlzQXN5bmMgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBvYmoubGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpZHhdID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIG9ialtpZHhdID0gdGhpcy5wcm9jZXNzRWxlbWVudChbb2JqW2lkeF1dLCBzdXBwb3J0QXN5bmMsIHRydWUpWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtpZHhdKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpbaWR4XS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtpZHhdW2ldKSB8fCB0eXBlb2Ygb2JqW2lkeF1baV0gPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2Ygb2JqW2lkeF1baV0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbaWR4XVtpXSA9PT0gXCJmdW5jdGlvblwiIHx8IEFycmF5LmlzQXJyYXkob2JqW2lkeF1baV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2lkeF1baV0gPSAoaWR4ID09IDIpID8gdGhpcy5wYXJzZShvYmpbaWR4XVtpXSwgdW5kZWZpbmVkLCBzdXBwb3J0QXN5bmMpIDogdGhpcy5wcm9jZXNzRWxlbWVudChvYmpbaWR4XVtpXSwgc3VwcG9ydEFzeW5jLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialtpZHhdW2ldICYmIG9ialtpZHhdW2ldLnRoZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FzeW5jID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaWR4ID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGVpdGhlciBkb3VibGUgYXJyYXkgb3Igc3RyaW5nIGZvciBjaGlsZHJlbiBQYXJlbnQ6XCIgKyBTdHJpbmcob2JqWzBdKSArIFwiLCBDaGlsZDpcIiArIEpTT04uc3RyaW5naWZ5KG9ialtpZHhdW2ldLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBTdHJpbmcodmFsdWUpIDogdmFsdWU7IH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIChpc0FzeW5jICYmICFvYmpbaWR4XS50aGVuKSBvYmpbaWR4XSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4gUHJvbWlzZS5hbGwob2JqW2lkeF0pLnRoZW4ob3V0cHV0ID0+IHJlc29sdmUob3V0cHV0KSwgcmVhc29uID0+IHJlamVjdChyZWFzb24pKSk7XHJcbiAgICAgICAgaWYgKGlzQXN5bmMpXHJcbiAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IG9iai5sZW5ndGg7IGlkeCsrKVxyXG4gICAgICAgICAgICAgICAgaWYgKCFvYmpbaWR4XS50aGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialtpZHhdID0gdGhpcy5hcHAuc2VydmljZXMucHJvbWlzZS5hbGwob2JqW2lkeF0pO1xyXG4gICAgICAgIGlmICghaXNBc3luYyAmJiAoKHR5cGVvZiBvYmpbMF0gPT09IFwiZnVuY3Rpb25cIiAmJiBvYmpbMF0udGhlbikgfHwgKHR5cGVvZiBvYmpbMV0gPT09IFwiZnVuY3Rpb25cIiAmJiBvYmpbMV0udGhlbikpKVxyXG4gICAgICAgICAgICBpc0FzeW5jID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIWlzQXN5bmMpIHtcclxuICAgICAgICAgICAgb2JqID0gdGhpcy5wcm9jZXNzRWxlbWVudChvYmosIHN1cHBvcnRBc3luYyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nICYmIG9iai50aGVuICYmICFzdXBwb3J0QXN5bmMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzRWxlbWVudChbYXN5bmNfMS5Bc3luYywgeyB2YWx1ZTogb2JqIH1dLCBzdXBwb3J0QXN5bmMpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXN1cHBvcnRBc3luYyAmJiBpc0FzeW5jKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzRWxlbWVudChbYXN5bmNfMS5Bc3luYywgeyB2YWx1ZTogdGhpcy5hcHAuc2VydmljZXMucHJvbWlzZS5hbGwob2JqKS50aGVuKGZ1bmN0aW9uIChvKSB7IHJldHVybiBfdGhpcy5wcm9jZXNzRWxlbWVudChvLCBzdXBwb3J0QXN5bmMpOyB9KSB9XSk7XHJcbiAgICAgICAgcmV0dXJuIGlzQXN5bmMgPyBuZXcgdGhpcy5hcHAuc2VydmljZXMucHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gX3RoaXMuYXBwLnNlcnZpY2VzLnByb21pc2UuYWxsKG9iaikudGhlbihmdW5jdGlvbiAobykgeyByZXR1cm4gcmVzb2x2ZShfdGhpcy5wcm9jZXNzRWxlbWVudChvLCBzdXBwb3J0QXN5bmMpKTsgfSk7IH0pIDogdGhpcy5wcm9jZXNzRWxlbWVudChbb2JqWzBdLCBvYmpbMV0sIG9ialsyXV0sIHN1cHBvcnRBc3luYyk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKGZ1bGxwYXRoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5jYWNoZVtmdWxscGF0aF0pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlW2Z1bGxwYXRoXTtcclxuICAgICAgICBpZiAoZnVsbHBhdGguc3Vic3RyaW5nKDAsIDEpID09IFwiflwiKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IGZ1bGxwYXRoLnN1YnN0cmluZygxLCBmdWxscGF0aC5sZW5ndGgpLnNwbGl0KCcjJyk7XHJcbiAgICAgICAgICAgIC8vdmFyIG9iaiA9IEFwcENvbnRleHQueGhyKHBhcnRzWzBdLCB0cnVlKTtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuYXBwLnNlcnZpY2VzLm1vZHVsZVN5c3RlbS5pbnN0YW5jaWF0ZShwYXJ0c1swXSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoudGhlbihmdW5jdGlvbiAoeCkgeyByZXR1cm4gX3RoaXMubG9jYXRlKHgsIHBhcnRzLnNsaWNlKDEsIHBhcnRzLmxlbmd0aCkuam9pbihcIi5cIikpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gZnVsbHBhdGguc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgdmFyIG9ial8xID0gdGhpcy5hcHAuY29tcG9uZW50cyB8fCBPYmplY3Q7XHJcbiAgICAgICAgICAgIHZhciBqc3RfMSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcHJvcF8xID0gXCJkZWZhdWx0XCI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHBhcnQgPSAwOyBwYXJ0IDwgcGF0aC5sZW5ndGg7IHBhcnQrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpfMSA9PT0gXCJmdW5jdGlvblwiICYmIHRoaXMuZ2V0RnVuY3Rpb25OYW1lKG9ial8xKSA9PT0gXCJpbmplY3RcIilcclxuICAgICAgICAgICAgICAgICAgICAvL29iaiA9IG9iaiggSW5qZWN0KCBhcHAuZGVzaWduZXIgPyBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBhcHAudWkuQ29tcG9uZW50IHsgcmVuZGVyKG9iaikgeyByZXR1cm4gcGFyc2UoanN0ID8gW3JlcXVpcmUoXCJAYXBwZmlicmUvanN0L2ludGVyY2VwdC5qc1wiKS5kZWZhdWx0LCB7XCJmaWxlXCI6IGpzdCwgXCJtZXRob2RcIjogcHJvcH0sIG9ial0gOiBvYmopOyB9fTpvYmopKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmpfMSA9IG9ial8xKEluamVjdCh0aGlzLmFwcCwgdGhpcy5jb25zdHJ1Y3QodGhpcy5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ial8xW3BhdGhbcGFydF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFydCA9PSBwYXRoLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzdF8xID0gb2JqXzEuX19qc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqXzEgPSBvYmpfMVtwYXRoW3BhcnRdXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhdGgubGVuZ3RoID09IDEgJiYgcGF0aFswXS50b0xvd2VyQ2FzZSgpID09IHBhdGhbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqXzEgPSBwYXRoW3BhcnRdO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bGxwYXRoID09PSBcIkV4Y2VwdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdHJhbnNmb3JtKG9iaikgeyByZXR1cm4gW1wicHJlXCIsIHsgXCJzdHlsZVwiOiB7IFwiY29sb3JcIjogXCJyZWRcIiB9IH0sIG9ialsxXS5zdGFjayA/IG9ialsxXS5zdGFjayA6IG9ialsxXV07IH07XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBsb2FkICcgKyBmdWxscGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2V4dGVuZHMoY2xhc3NfMiwgX3N1cGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsYXNzXzIoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NfMi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLCBbXCJzcGFuXCIsIHsgXCJzdHlsZVwiOiB7IFwiY29sb3JcIjogXCJyZWRcIiB9IH0sIGZ1bGxwYXRoICsgXCIgbm90IGZvdW5kIVwiXSk7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NfMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9ial8xW1wiZGVmYXVsdFwiXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ial8xLl9fanN0KVxyXG4gICAgICAgICAgICAgICAgICAgIGpzdF8xID0gb2JqXzEuX19qc3Q7XHJcbiAgICAgICAgICAgICAgICBvYmpfMSA9IG9ial8xW1wiZGVmYXVsdFwiXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChqc3RfMSlcclxuICAgICAgICAgICAgICAgIHByb3BfMSA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpfMSA9PSBcImZ1bmN0aW9uXCIgJiYgdGhpcy5nZXRGdW5jdGlvbk5hbWUob2JqXzEpID09PSBcImluamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgb2JqXzEgPSBvYmpfMShJbmplY3QodGhpcy5hcHAsIGpzdF8xID8gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhDb21wb25lbnQsIF9zdXBlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdGhpcy5wYXJzZSghdGhpcy5hcHAuZGlzYWJsZUludGVyY2VwdCAmJiB3aW5kb3cucGFyZW50ICE9PSBudWxsICYmIHdpbmRvdyAhPT0gd2luZG93LnBhcmVudCA/IFtpbnRlcmNlcHRfMS5JbnRlcmNlcHQsIHsgXCJmaWxlXCI6IGpzdF8xLCBcIm1ldGhvZFwiOiBwcm9wXzEgfSwgdGhpcy5jb25zdHJ1Y3QodGhpcy5hcHAuVUkuQ29tcG9uZW50KV0gOiBvYmopOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICB9KHRoaXMuYXBwLnNlcnZpY2VzLlVJLkNvbXBvbmVudCkpIDogdGhpcy5jb25zdHJ1Y3QodGhpcy5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVtmdWxscGF0aF0gPSBBcnJheS5pc0FycmF5KG9ial8xKSA/IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhXcmFwcGVyLCBfc3VwZXIpO1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gV3JhcHBlcigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBXcmFwcGVyLnByb3RvdHlwZS5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9O1xyXG4gICAgICAgICAgICAgICAgV3JhcHBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkgeyBpZiAoIW9ial8xWzFdKVxyXG4gICAgICAgICAgICAgICAgICAgIG9ial8xWzFdID0ge307IGlmICghb2JqXzFbMV0ua2V5KVxyXG4gICAgICAgICAgICAgICAgICAgIG9ial8xWzFdLmtleSA9IDA7IHJldHVybiB0aGlzLnBhcnNlKGpzdF8xICYmICF0aGlzLmFwcC5kaXNhYmxlSW50ZXJjZXB0ICYmIHdpbmRvdy5wYXJlbnQgIT09IG51bGwgJiYgd2luZG93ICE9PSB3aW5kb3cucGFyZW50ID8gW2ludGVyY2VwdF8xLkludGVyY2VwdCwgeyBcImZpbGVcIjoganN0XzEsIFwibWV0aG9kXCI6IHByb3BfMSB9LCBbb2JqXzFdXSA6IG9ial8xKTsgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBXcmFwcGVyO1xyXG4gICAgICAgICAgICB9KHRoaXMuYXBwLnNlcnZpY2VzLlVJLkNvbXBvbmVudCkpIDogb2JqXzE7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFByb2Nlc3Nvci5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGZ1bmN0aW9uIHZpc2l0KG9iaikge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIG9iailcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXQob2JqW2ldKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBvYmogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBrZXlzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlzW2ldLnN1YnN0cigwLCAxKSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmlzaXQob2JqW2tleXNbaV1dKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuYXBwLnNlcnZpY2VzLnByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgaXNUZW1wbGF0ZSA9IHZpc2l0KG9iaik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFwcC5zZXJ2aWNlcy5tb2R1bGVTeXN0ZW0uZXhlYyhfdGhpcy5hcHAuc2VydmljZXMudHJhbnNmb3JtZXIudHJhbnNmb3JtKG9iaikpLnRoZW4oZnVuY3Rpb24gKGV4cG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gX3RoaXMucGFyc2UoZXhwb3J0ZWRbXCJkZWZhdWx0XCJdIHx8IGV4cG9ydGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob3V0cHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJzKSB7IHJldHVybiByZWplY3QocnMpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzLnBhcnNlKG9iaikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUHJvY2Vzc29yO1xyXG59KCkpO1xyXG5leHBvcnRzLlByb2Nlc3NvciA9IFByb2Nlc3NvcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBzdGF0ZXMgPSB7IHBlbmRpbmc6IDAsIHNldHRsZWQ6IDEsIGZ1bGZpbGxlZDogMiwgcmVqZWN0ZWQ6IDMgfTtcclxudmFyIGFzeW5jUXVldWUgPSBbXTtcclxudmFyIGFzeW5jVGltZXI7XHJcbmZ1bmN0aW9uIGFzeW5jRmx1c2goKSB7XHJcbiAgICAvLyBydW4gcHJvbWlzZSBjYWxsYmFja3NcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXN5bmNRdWV1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFzeW5jUXVldWVbaV1bMF0oYXN5bmNRdWV1ZVtpXVsxXSk7XHJcbiAgICB9XHJcbiAgICAvLyByZXNldCBhc3luYyBhc3luY1F1ZXVlXHJcbiAgICBhc3luY1F1ZXVlID0gW107XHJcbiAgICBhc3luY1RpbWVyID0gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gYXN5bmNDYWxsKGNhbGxiYWNrLCBhcmcpIHtcclxuICAgIGFzeW5jUXVldWUucHVzaChbY2FsbGJhY2ssIGFyZ10pO1xyXG4gICAgaWYgKCFhc3luY1RpbWVyKSB7XHJcbiAgICAgICAgYXN5bmNUaW1lciA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dChhc3luY0ZsdXNoLCAwKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcclxuICAgIHByb21pc2UuX3RoZW4gPSBwcm9taXNlLl90aGVuLmZvckVhY2goaW52b2tlQ2FsbGJhY2spO1xyXG59XHJcbmZ1bmN0aW9uIGludm9rZUNhbGxiYWNrKHN1YnNjcmliZXIpIHtcclxuICAgIHZhciBvd25lciA9IHN1YnNjcmliZXIub3duZXI7XHJcbiAgICB2YXIgc2V0dGxlZCA9IG93bmVyLl9zdGF0ZTtcclxuICAgIHZhciB2YWx1ZSA9IG93bmVyLl9kYXRhO1xyXG4gICAgdmFyIGNhbGxiYWNrID0gc2V0dGxlZCA9PSBzdGF0ZXMuZnVsZmlsbGVkID8gc3Vic2NyaWJlci5mdWxmaWxsZWQgOiBzdWJzY3JpYmVyLnJlamVjdGVkO1xyXG4gICAgdmFyIHByb21pc2UgPSBzdWJzY3JpYmVyLnRoZW47XHJcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgc2V0dGxlZCA9IHN0YXRlcy5mdWxmaWxsZWQ7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHNldHRsZWQgPT0gc3RhdGVzLmZ1bGZpbGxlZCA/IFwiUmVzb2x2ZVwiIDogXCJSZWplY3RcIikgKyAnIG5vdCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFoYW5kbGVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSkpIHtcclxuICAgICAgICBpZiAoc2V0dGxlZCA9PT0gc3RhdGVzLmZ1bGZpbGxlZCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNldHRsZWQgPT09IHN0YXRlcy5yZWplY3RlZCkge1xyXG4gICAgICAgICAgICByZWplY3QocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnZva2VSZXNvbHZlcihyZXNvbHZlciwgcHJvbWlzZSkge1xyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpIHtcclxuICAgICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdFByb21pc2UocmVhc29uKSB7XHJcbiAgICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJlc29sdmVyKHJlc29sdmVQcm9taXNlLCByZWplY3RQcm9taXNlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0UHJvbWlzZShlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XHJcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUgfHwgIWhhbmRsZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlKSkge1xyXG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcclxuICAgIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gc3RhdGVzLnBlbmRpbmcpIHtcclxuICAgICAgICBwcm9taXNlLl9zdGF0ZSA9IHN0YXRlcy5zZXR0bGVkO1xyXG4gICAgICAgIHByb21pc2UuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICBhc3luY0NhbGwocHVibGlzaEZ1bGZpbGxtZW50LCBwcm9taXNlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XHJcbiAgICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IHN0YXRlcy5wZW5kaW5nKSB7XHJcbiAgICAgICAgcHJvbWlzZS5fc3RhdGUgPSBzdGF0ZXMuc2V0dGxlZDtcclxuICAgICAgICBwcm9taXNlLl9kYXRhID0gcmVhc29uO1xyXG4gICAgICAgIGFzeW5jQ2FsbChwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBwdWJsaXNoRnVsZmlsbG1lbnQocHJvbWlzZSkge1xyXG4gICAgcHJvbWlzZS5fc3RhdGUgPSBzdGF0ZXMuZnVsZmlsbGVkO1xyXG4gICAgcHVibGlzaChwcm9taXNlKTtcclxufVxyXG5mdW5jdGlvbiBwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcclxuICAgIHByb21pc2UuX3N0YXRlID0gc3RhdGVzLnJlamVjdGVkO1xyXG4gICAgcHVibGlzaChwcm9taXNlKTtcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSkge1xyXG4gICAgdmFyIHJlc29sdmVkID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSAmJiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpKSB7XHJcbiAgICAgICAgICAgIC8vIHRoZW4gc2hvdWxkIGJlIHJldHJpZXZlZCBvbmx5IG9uY2VcclxuICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWx1ZS50aGVuO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgPT09IHZhbCkgPyBmdWxmaWxsKHByb21pc2UsIHZhbCkgOiByZXNvbHZlKHByb21pc2UsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoIXJlc29sdmVkKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxudmFyIFByb21pc2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZXMucGVuZGluZztcclxuICAgICAgICB0aGlzLl9kYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90aGVuID0gW107XHJcbiAgICAgICAgaW52b2tlUmVzb2x2ZXIocmVzb2x2ZXIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCkge1xyXG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0ge1xyXG4gICAgICAgICAgICBvd25lcjogdGhpcyxcclxuICAgICAgICAgICAgdGhlbjogbmV3IFByb21pc2UoZnVuY3Rpb24gKCkgeyB9KSxcclxuICAgICAgICAgICAgZnVsZmlsbGVkOiBvbmZ1bGZpbGxlZCxcclxuICAgICAgICAgICAgcmVqZWN0ZWQ6IG9ucmVqZWN0ZWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICgob25yZWplY3RlZCB8fCBvbmZ1bGZpbGxlZCkgJiYgIXRoaXMuX2hhbmRsZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gc3RhdGVzLmZ1bGZpbGxlZCB8fCB0aGlzLl9zdGF0ZSA9PT0gc3RhdGVzLnJlamVjdGVkKVxyXG4gICAgICAgICAgICAvLyBhbHJlYWR5IHJlc29sdmVkLCBjYWxsIGNhbGxiYWNrIGFzeW5jXHJcbiAgICAgICAgICAgIGFzeW5jQ2FsbChpbnZva2VDYWxsYmFjaywgc3Vic2NyaWJlcik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAvLyBzdWJzY3JpYmVcclxuICAgICAgICAgICAgdGhpcy5fdGhlbi5wdXNoKHN1YnNjcmliZXIpO1xyXG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyLnRoZW47XHJcbiAgICB9O1xyXG4gICAgUHJvbWlzZS5wcm90b3R5cGVbXCJjYXRjaFwiXSA9IGZ1bmN0aW9uIChvbnJlamVjdGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvbnJlamVjdGVkKTtcclxuICAgIH07XHJcbiAgICBQcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9taXNlcykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBhcnJheSB0byBQcm9taXNlLmFsbCgpLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgcmVtYWluaW5nID0gMDtcclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZXIoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZysrO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJlbWFpbmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHByb21pc2U7IGkgPCBwcm9taXNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb21pc2UgJiYgdHlwZW9mIHByb21pc2UudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihyZXNvbHZlcihpKSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbaV0gPSBwcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcmVtYWluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb21pc2VzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIFByb21pc2UucmFjZSgpLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcHJvbWlzZTsgaSA8IHByb21pc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAmJiB0eXBlb2YgcHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgcmV0dXJuIFByb21pc2U7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUHJvbWlzZSA9IFByb21pc2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi90eXBlc1wiKTtcclxudmFyIFRyYW5zZm9ybWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVHJhbnNmb3JtZXIoc2V0dGluZ3MpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucmVzZXJ2ZWRXb3JkcyA9IFsnZnVuY3Rpb24nLCAnZm9yJywgJ3ZhcicsICd0aGlzJywgJ3NlbGYnLCAnbnVsbCddO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwiVHJhbnNmb3JtZXJcIjtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3MgPyB7IGluZGVudDogc2V0dGluZ3MuaW5kZW50IHx8ICdcXHQnLCBjb21wYWN0OiBzZXR0aW5ncy5jb21wYWN0IHx8IGZhbHNlLCBtb2R1bGU6IHNldHRpbmdzLm1vZHVsZSB8fCB0eXBlc18xLk1vZHVsZVN5c3RlbS5Ob25lLCBuYW1lZEV4cG9ydHM6IHNldHRpbmdzLm5hbWVkRXhwb3J0cyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNldHRpbmdzLm5hbWVkRXhwb3J0cywgcHJlZmVyQ29uc3Q6IHNldHRpbmdzLnByZWZlckNvbnN0IH0gOiB7IG1vZHVsZTogdHlwZXNfMS5Nb2R1bGVTeXN0ZW0uRVMgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnMgPSB0aGlzLnNldHRpbmdzLnBhcnNlcnMgfHwge307XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLnJlcXVpcmVcIl0gPSB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuaW1wb3J0XCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBfdGhpcy5sb2FkTW9kdWxlKG9ialtcIi5pbXBvcnRcIl0gfHwgb2JqW1wiLnJlcXVpcmVcIl0sIHBhcnNlU2V0dGluZ3MpOyB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5mdW5jdGlvblwiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgeyByZXR1cm4gXCJmdW5jdGlvbiBcIiArIChvYmpbXCIuZnVuY3Rpb25cIl0gPyBvYmpbXCIuZnVuY3Rpb25cIl0gOiBcIlwiKSArIFwiKFwiICsgKG9ialtcImFyZ3VtZW50c1wiXSA/IF90aGlzLnByb2Nlc3Mob2JqW1wiYXJndW1lbnRzXCJdLCBmYWxzZSwgdHJ1ZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSA6IFwiXCIpICsgXCIpeyByZXR1cm4gXCIgKyBfdGhpcy5wcm9jZXNzKG9ialtcInJldHVyblwiXSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyBcIiB9XCI7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLm1hcFwiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgeyByZXR1cm4gX3RoaXMucHJvY2VzcyhvYmpbXCIubWFwXCJdLCBmYWxzZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyBcIi5tYXAoZnVuY3Rpb24oXCIgKyBvYmpbXCJhcmd1bWVudHNcIl0gKyBcIikge3JldHVybiBcIiArIChzZXR0aW5ncyAmJiBzZXR0aW5ncy5pbmRlbnQgPyBuZXcgQXJyYXkob2Zmc2V0KS5qb2luKCcgJykgOiBcIlwiKSArIF90aGlzLnByb2Nlc3Mob2JqW1wicmV0dXJuXCJdLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiIH0pXCI7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmZpbHRlclwiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgeyByZXR1cm4gX3RoaXMucHJvY2VzcyhvYmpbXCIuZmlsdGVyXCJdLCBmYWxzZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyBcIi5maWx0ZXIoZnVuY3Rpb24oXCIgKyBvYmpbXCJhcmd1bWVudHNcIl0gKyBcIikge3JldHVybiBcIiArIF90aGlzLnByb2Nlc3Mob2JqW1wiY29uZGl0aW9uXCJdLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiIH0pXCI7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmNhbGxcIl0gPSBmdW5jdGlvbiAob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHsgcmV0dXJuIF90aGlzLnByb2Nlc3Mob2JqW1wiLmNhbGxcIl0sIGZhbHNlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiLmNhbGwoXCIgKyAob2JqW1wiYXJndW1lbnRzXCJdID8gX3RoaXMucHJvY2VzcyhvYmpbXCJhcmd1bWVudHNcIl0sIGZhbHNlLCB0cnVlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIDogXCJcIikgKyBcIilcIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuZXhlY1wiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgeyByZXR1cm4gX3RoaXMucHJvY2VzcyhvYmpbXCIuZXhlY1wiXSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyBcIihcIiArIChvYmpbXCJhcmd1bWVudHNcIl0gPyBfdGhpcy5wcm9jZXNzKG9ialtcImFyZ3VtZW50c1wiXSwgdHJ1ZSwgdHJ1ZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSA6IFwiXCIpICsgXCIpXCI7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLm5ld1wiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgeyByZXR1cm4gXCJuZXcgXCIgKyBfdGhpcy5wcm9jZXNzKG9ialtcIi5uZXdcIl0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIoXCIgKyAob2JqW1wiYXJndW1lbnRzXCJdID8gX3RoaXMucHJvY2VzcyhvYmpbXCJhcmd1bWVudHNcIl0sIHRydWUsIHRydWUsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgOiBcIlwiKSArIFwiKVwiOyB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5pZFwiXSA9IHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5jb2RlXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBvYmpbXCIuY29kZVwiXSB8fCBvYmpbXCIuaWRcIl07IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmFwcFwiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqMiA9IHt9O1xyXG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBrZXlzKVxyXG4gICAgICAgICAgICAgICAgb2JqMltrZXlzW2tleV0gPT0gXCIuYXBwXCIgPyBcIm1haW5cIiA6IGtleXNba2V5XV0gPSBvYmpba2V5c1trZXldXTtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb2Nlc3MoeyBcIi5uZXdcIjogeyBcIi5yZXF1aXJlXCI6IFwiQGFwcGZpYnJlL2pzdCNBcHBcIiB9LCBcImFyZ3VtZW50c1wiOiBbb2JqMl0gfSwgdHJ1ZSwgdHJ1ZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiLnJ1bigpXCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBvYmpbXCIuXCJdOyB9O1xyXG4gICAgfVxyXG4gICAgVHJhbnNmb3JtZXIucHJvdG90eXBlLmxvYWRNb2R1bGUgPSBmdW5jdGlvbiAodmFsLCBwYXJzZVNldHRpbmdzKSB7XHJcbiAgICAgICAgdmFyIG0gPSB2YWwuaW5kZXhPZignIycpID4gMCA/IHZhbC5zdWJzdHIoMCwgdmFsLmluZGV4T2YoJyMnKSkgOiB2YWw7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubW9kdWxlLnRvTG93ZXJDYXNlKCkgPT09IHR5cGVzXzEuTW9kdWxlU3lzdGVtLkVTLnRvTG93ZXJDYXNlKCkpXHJcbiAgICAgICAgICAgIG0gPSB2YWwuaW5kZXhPZignIycsIG0ubGVuZ3RoICsgMikgPiAtMSA/IHZhbC5zdWJzdHIoMCwgdmFsLmluZGV4T2YoJyMnLCBtLmxlbmd0aCArIDIpIC0gMSkgOiB2YWw7XHJcbiAgICAgICAgaWYgKHBhcnNlU2V0dGluZ3MuaW1wb3J0cy5pbmRleE9mKG0pID09PSAtMSlcclxuICAgICAgICAgICAgcGFyc2VTZXR0aW5ncy5pbXBvcnRzLnB1c2gobSk7XHJcbiAgICAgICAgcmV0dXJuIFwiX1wiICsgcGFyc2VTZXR0aW5ncy5pbXBvcnRzLmluZGV4T2YobSkgKyAodmFsLmxlbmd0aCA+IG0ubGVuZ3RoID8gdmFsLnN1YnN0cmluZyhtLmxlbmd0aCkucmVwbGFjZSgnIycsICcuJykgOiAnJyk7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNmb3JtZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uIChsaW5lcywgcGFyc2VTZXR0aW5ncywgaW5kZW50KSB7XHJcbiAgICAgICAgdmFyIGx0ID0gdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gXCJcIiA6IFwiXFxuXCI7XHJcbiAgICAgICAgdmFyIHRhYiA9IHRoaXMuc2V0dGluZ3MuY29tcGFjdCA/IFwiXCIgOiB0aGlzLnNldHRpbmdzLmluZGVudCB8fCBcIlxcdFwiO1xyXG4gICAgICAgIHJldHVybiBsdCArIG5ldyBBcnJheShpbmRlbnQgKyAxKS5qb2luKHRhYikgKyBsaW5lcy5qb2luKFwiLFwiICsgbHQgKyBuZXcgQXJyYXkoaW5kZW50ICsgMSkuam9pbih0YWIpKSArIGx0ICsgbmV3IEFycmF5KGluZGVudCkuam9pbih0YWIpO1xyXG4gICAgfTtcclxuICAgIFRyYW5zZm9ybWVyLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKG9iaiwgZXNjLCBldCwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgb3V0cHV0O1xyXG4gICAgICAgIGlmIChvYmogPT09IG51bGwpXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwibnVsbFwiO1xyXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcclxuICAgICAgICAgICAgb3V0cHV0ID0gKGV0ID8gXCJcIiA6IFwiW1wiKSArIHRoaXMuZm9ybWF0KG9iai5tYXAoZnVuY3Rpb24gKGUsIGkpIHsgcmV0dXJuIF90aGlzLnByb2Nlc3MoZSwgZXNjLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0ICsgMSk7IH0pLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgKGV0ID8gXCJcIiA6IFwiXVwiKTtcclxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICAgICAgdmFyIHByb2Nlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIGtleXMpXHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb2Nlc3NlZCAmJiBrZXlzW2tdLmxlbmd0aCA+IDAgJiYga2V5c1trXS5jaGFyQXQoMCkgPT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucGFyc2VycyAmJiB0aGlzLnNldHRpbmdzLnBhcnNlcnNba2V5c1trXV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gdGhpcy5zZXR0aW5ncy5wYXJzZXJzW2tleXNba11dKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgbG9jYXRlIHBhcnNlciBcIiArIGtleXNba10uc3Vic3RyKDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFwcm9jZXNzZWQpXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAoZXQgPyBcIlwiIDogXCJ7XCIpICsgdGhpcy5mb3JtYXQoa2V5cy5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGsubGVuZ3RoIDwgMiB8fCBrLnN1YnN0cigwLCAyKSAhPSAnLi4nOyB9KS5tYXAoZnVuY3Rpb24gKGssIGkpIHsgcmV0dXJuIChfdGhpcy5yZXNlcnZlZFdvcmRzLmluZGV4T2YoaykgPiAtMSA/IFwiXFxcIlwiICsgayArIFwiXFxcIlwiIDogaykgKyBcIjpcIiArIChfdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gJycgOiAnICcpICsgX3RoaXMucHJvY2VzcyhvYmpba10sIGVzYywgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCArIDEpOyB9KSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIChldCA/IFwiXCIgOiBcIn1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikgLy8gb2JqZWN0IG5vdCBKU09OLi4uXHJcbiAgICAgICAgICAgIG91dHB1dCA9IG9iai50b1N0cmluZygpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgb3V0cHV0ID0gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIiAmJiBlc2MgPyBKU09OLnN0cmluZ2lmeShvYmopIDogb2JqO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNmb3JtZXIucHJvdG90eXBlLmJ1bmRsZU1vZHVsZSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSAnJztcclxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICAgICAgdmFyIHZhbGlka2V5cyA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBrLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgay5pbmRleE9mKCcvJykgPT09IC0xICYmIGsuaW5kZXhPZignLScpID09PSAtMSAmJiBfdGhpcy5yZXNlcnZlZFdvcmRzLmluZGV4T2YoaykgPT09IC0xOyB9KTtcclxuICAgICAgICB2YXIgaXNEZWZhdWx0ID0ga2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gJ2RlZmF1bHQnO1xyXG4gICAgICAgIHZhciBubCA9IHRoaXMuc2V0dGluZ3MuY29tcGFjdCA/ICcnIDogJ1xcbic7XHJcbiAgICAgICAgdmFyIHNwID0gdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gJycgOiAnICc7XHJcbiAgICAgICAgdmFyIHZyID0gdGhpcy5zZXR0aW5ncy5wcmVmZXJDb25zdCA/ICdjb25zdCcgOiAndmFyJztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MubW9kdWxlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBcInVtZFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgY2FzZSBcImNqc1wiOlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcmVxIGluIHIpXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IHZyICsgXCIgX1wiICsgcltyZXFdICsgc3AgKyBcIj1cIiArIHNwICsgXCJyZXF1aXJlKCdcIiArIHJlcSArIFwiJyk7XCIgKyBubDtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBcIm1vZHVsZS5leHBvcnRzWydcIiArIGtleSArIFwiJ11cIiArIHNwICsgXCI9XCIgKyBzcCArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCAwKSArIFwiO1wiOyB9KS5qb2luKG5sKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNEZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBubCArIFwibW9kdWxlLmV4cG9ydHNbJ2RlZmF1bHQnXVwiICsgc3AgKyBcIj1cIiArIHNwICsgXCJ7XCIgKyBzcCArIGtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSArIFwiOiBcIiArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCAwKTsgfSkuam9pbihubCkgKyBcIiB9O1wiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlU2V0dGluZ3MubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gbmwgKyBcIm1vZHVsZS5leHBvcnRzWydfX2pzdCddID0gJ1wiICsgbmFtZSArIFwiO1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlc1wiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmYXVsdClcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCJleHBvcnQgZGVmYXVsdFwiICsgc3AgKyB0aGlzLnByb2Nlc3Mob2JqW1wiZGVmYXVsdFwiXSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIDApICsgXCI7XCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCJleHBvcnQgZGVmYXVsdFwiICsgc3AgKyBcIntcIiArIHRoaXMuZm9ybWF0KGtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbGlka2V5cy5pbmRleE9mKGtleSkgPT09IC0xID8gXCJcXFwiXCIgKyBrZXkgKyBcIlxcXCI6IFwiICsgX3RoaXMucHJvY2VzcyhvYmpba2V5XSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIDApIDoga2V5ICsgXCI6XCIgKyBzcCArIChfdGhpcy5zZXR0aW5ncy5uYW1lZEV4cG9ydHMgPyBrZXkgOiBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgMikpOyB9KSwgcGFyc2VTZXR0aW5ncywgMSkgKyBcIn07XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubmFtZWRFeHBvcnRzICYmIHZhbGlka2V5cy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSB2YWxpZGtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIFwiZXhwb3J0IFwiICsgdnIgKyBcIiBcIiArIGtleSArIHNwICsgXCI9XCIgKyBzcCArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCAxKSArIFwiO1wiOyB9KS5qb2luKG5sKSArIChcIlwiICsgKG5sICsgb3V0cHV0ICsgbmwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlU2V0dGluZ3MubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCJyZXR1cm4gXCIgKyAoaXNEZWZhdWx0ID8gXCJ7J2RlZmF1bHQnIDogXCIgKyB0aGlzLnByb2Nlc3Mob2JqW1wiZGVmYXVsdFwiXSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIDEpICsgXCIsICdfX2pzdCc6ICdcIiArIHBhcnNlU2V0dGluZ3MubmFtZSArIFwiJ31cIiA6IFwie1wiICsgdGhpcy5mb3JtYXQoa2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsaWRrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEgPyBcIlxcXCJcIiArIGtleSArIFwiXFxcIjogXCIgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgMSkgOiBrZXkgKyBcIjpcIiArIHNwICsgX3RoaXMucHJvY2VzcyhvYmpba2V5XSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIDIpOyB9KSwgcGFyc2VTZXR0aW5ncywgMSkgKyBcIn0sICdfX2pzdCc6ICdcIiArIHBhcnNlU2V0dGluZ3MubmFtZSArIFwiJ1wiKSArIFwiO1wiO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcInJldHVybiBcIiArIChpc0RlZmF1bHQgPyB0aGlzLnByb2Nlc3Mob2JqW1wiZGVmYXVsdFwiXSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIDEpIDogXCJ7XCIgKyB0aGlzLmZvcm1hdChrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxpZGtleXMuaW5kZXhPZihrZXkpID09PSAtMSA/IFwiXFxcIlwiICsga2V5ICsgXCJcXFwiOiBcIiArIF90aGlzLnByb2Nlc3Mob2JqW2tleV0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCAxKSA6IGtleSArIFwiOlwiICsgc3AgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgMik7IH0pLCBwYXJzZVNldHRpbmdzLCAxKSArIFwifVwiKSArIFwiO1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcyA9IHt9O1xyXG4gICAgICAgIHZhciByID0ge307XHJcbiAgICAgICAgaWYgKHBhcnNlU2V0dGluZ3MuaW1wb3J0cy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlU2V0dGluZ3MuaW1wb3J0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZVNldHRpbmdzLmltcG9ydHNbaV0uaW5kZXhPZignIycpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHBhcnNlU2V0dGluZ3MuaW1wb3J0c1tpXS5zdWJzdHIoMCwgcGFyc2VTZXR0aW5ncy5pbXBvcnRzW2ldLmluZGV4T2YoJyMnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNbbmFtZV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc1tuYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNbbmFtZV1bcGFyc2VTZXR0aW5ncy5pbXBvcnRzW2ldLnN1YnN0cihuYW1lLmxlbmd0aCArIDEpXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcltwYXJzZVNldHRpbmdzLmltcG9ydHNbaV1dID0gaTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MubW9kdWxlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBcInVtZFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgY2FzZSBcImNqc1wiOlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcmVxIGluIHIpXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gdnIgKyBcIiBfXCIgKyByW3JlcV0gKyBzcCArIFwiPVwiICsgc3AgKyBcInJlcXVpcmUoXFxcIlwiICsgcmVxICsgXCJcXFwiKTtcIiArIG5sICsgb3V0cHV0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhbWRcIjpcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiZGVmaW5lKFtcIiArIE9iamVjdC5rZXlzKHIpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBcIidcIiArIGtleSArIFwiJ1wiOyB9KS5qb2luKFwiLCBcIikgKyBcIl0sIGZ1bmN0aW9uIChcIiArIE9iamVjdC5rZXlzKHIpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAnXycgKyByW2tleV07IH0pLmpvaW4oXCIsIFwiKSArIFwiKSB7IFwiICsgb3V0cHV0ICsgXCIgfSk7XCIgKyBubDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXNcIjpcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IE9iamVjdC5rZXlzKHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAoa2V5LmNoYXJBdCgwKSA9PT0gJ34nID8gXCJ2YXIge1wiICsgT2JqZWN0LmtleXMoc1trZXldKS5tYXAoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGsgKyBcIjogX1wiICsgc1trZXldW2tdOyB9KSArIFwifSAgPSBhd2FpdCBpbXBvcnQoJ1wiICsga2V5LnN1YnN0cigxKSArIFwiJyk7XCIgKyBubCA6IFwiaW1wb3J0IHtcIiArIE9iamVjdC5rZXlzKHNba2V5XSkubWFwKGZ1bmN0aW9uIChrKSB7IHJldHVybiBrICsgXCIgYXMgX1wiICsgc1trZXldW2tdOyB9KS5qb2luKCcsJyArIHNwKSArIFwifSBmcm9tICdcIiArIGtleSArIFwiJztcIiArIG5sKTsgfSkuam9pbignJykgKyBPYmplY3Qua2V5cyhyKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKGtleS5jaGFyQXQoMCkgPT09ICd+JyA/IFwidmFyIF9cIiArIHJba2V5XSArIFwiID0gYXdhaXQgaW1wb3J0KCdcIiArIGtleS5zdWJzdHIoMSkgKyBcIicpO1wiICsgbmwgOiBcImltcG9ydCAqIGFzIF9cIiArIHJba2V5XSArIFwiIGZyb20gJ1wiICsga2V5ICsgXCInO1wiICsgbmwpOyB9KS5qb2luKCcnKSArIG91dHB1dDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcmVxIGluIHIpXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gdnIgKyBcIiBfXCIgKyByW3JlcV0gKyBzcCArIFwiPVwiICsgc3AgKyBcInJlcXVpcmUoXFxcIlwiICsgcmVxICsgXCJcXFwiKTtcIiArIG5sICsgb3V0cHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfTtcclxuICAgIFRyYW5zZm9ybWVyLnByb3RvdHlwZS50cmFuc2Zvcm0gPSBmdW5jdGlvbiAob2JqLCBuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVuZGxlTW9kdWxlKEFycmF5LmlzQXJyYXkob2JqKSB8fCB0eXBlb2YgKG9iaikgIT0gJ29iamVjdCcgfHwgT2JqZWN0LmtleXMob2JqKS5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGtbMF0gPT0gJy4nOyB9KS5sZW5ndGggPiAwID8geyBcImRlZmF1bHRcIjogb2JqIH0gOiBvYmosIHsgbmFtZTogbmFtZSwgaW1wb3J0czogW10sIGV4cG9ydHM6IHt9LCBjb21wb3NpdGVPYmplY3Q6IGZhbHNlIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBUcmFuc2Zvcm1lcjtcclxufSgpKTtcclxuZXhwb3J0cy5UcmFuc2Zvcm1lciA9IFRyYW5zZm9ybWVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcbnZhciBXZWJVSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlVJKGFwcCkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwiVUlcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgICAgICB0aGlzLmFwcC5vcHRpb25zID0gdGhpcy5hcHAub3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBpZiAod2luZG93KSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3csIFwicHJlYWN0XCIpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LCBcInJlYWN0XCIpKTtcclxuICAgICAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudCA9IG9iai52YWx1ZS5oO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wb25lbnQgPSBvYmoudmFsdWUuQ29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJJbnRlcm5hbCA9IG9iai52YWx1ZS5yZW5kZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBXZWJVSS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHVpLCBwYXJlbnQsIG1lcmdlV2l0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlbmRlckludGVybmFsKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJJbnRlcm5hbCh1aSwgcGFyZW50LCBtZXJnZVdpdGgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5hcHAuc2VydmljZXMubG9nZ2VyLmxvZy5jYWxsKHRoaXMsIHR5cGVzXzEuTG9nTGV2ZWwuRXJyb3IsIFwiVW5hYmxlIHRvIHJlbmRlciBVSSAtIE5vIFVJIGZyYW1ld29yayBkZXRlY3RlZC5cIiwgXCJFbnN1cmUgdGhhdCB5b3UgaGF2ZSByZWZlcmVuY2VkIGEgVUkgZnJhbWV3b3JrIGJlZm9yZSBleGVjdXRpbmcgdGhlIGFwcGxpY2F0aW9uLCBvciBzcGVjaWZ5IHVzaW5nIGFwcC5zZXJ2aWNlcy5VSVwiKTtcclxuICAgIH07XHJcbiAgICBXZWJVSS5wcm90b3R5cGUucHJvY2Vzc0VsZW1lbnQgPSBmdW5jdGlvbiAodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbikge1xyXG4gICAgICAgIC8vIGV4cGVjdGVkIHRvIGJlIGltcGxlbWVudGVkLlxyXG4gICAgICAgIHRoaXMuYXBwLnNlcnZpY2VzLmxvZ2dlci5sb2cuY2FsbCh0aGlzLCB0eXBlc18xLkxvZ0xldmVsLkVycm9yLCBcIlVuYWJsZSB0byBwcm9jZXNzIFVJIGVsZW1lbnQgLSBObyBVSSBmcmFtZXdvcmsgZGV0ZWN0ZWQuXCIsIFwiRW5zdXJlIHRoYXQgeW91IGhhdmUgcmVmZXJlbmNlZCBhIFVJIGZyYW1ld29yayBiZWZvcmUgZXhlY3V0aW5nIHRoZSBhcHBsaWNhdGlvbiwgb3Igc3BlY2lmeSB1c2luZyBhcHAuc2VydmljZXMuVUlcIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdlYlVJO1xyXG59KCkpO1xyXG5leHBvcnRzLldlYlVJID0gV2ViVUk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgTW9kdWxlU3lzdGVtO1xyXG4oZnVuY3Rpb24gKE1vZHVsZVN5c3RlbSkge1xyXG4gICAgTW9kdWxlU3lzdGVtW1wiTm9uZVwiXSA9IFwibm9uZVwiO1xyXG4gICAgTW9kdWxlU3lzdGVtW1wiQ29tbW9uSlNcIl0gPSBcImNvbW1vbmpzXCI7XHJcbiAgICBNb2R1bGVTeXN0ZW1bXCJBTURcIl0gPSBcImFtZFwiO1xyXG4gICAgTW9kdWxlU3lzdGVtW1wiVU1EXCJdID0gXCJ1bWRcIjtcclxuICAgIE1vZHVsZVN5c3RlbVtcIkVTXCJdID0gXCJlc1wiO1xyXG59KShNb2R1bGVTeXN0ZW0gPSBleHBvcnRzLk1vZHVsZVN5c3RlbSB8fCAoZXhwb3J0cy5Nb2R1bGVTeXN0ZW0gPSB7fSkpO1xyXG52YXIgTG9nTGV2ZWw7XHJcbihmdW5jdGlvbiAoTG9nTGV2ZWwpIHtcclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkV4Y2VwdGlvblwiXSA9IDFdID0gXCJFeGNlcHRpb25cIjtcclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiRXJyb3JcIl0gPSAyXSA9IFwiRXJyb3JcIjtcclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiV2FyblwiXSA9IDNdID0gXCJXYXJuXCI7XHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkluZm9cIl0gPSA0XSA9IFwiSW5mb1wiO1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJUcmFjZVwiXSA9IDVdID0gXCJUcmFjZVwiO1xyXG59KShMb2dMZXZlbCA9IGV4cG9ydHMuTG9nTGV2ZWwgfHwgKGV4cG9ydHMuTG9nTGV2ZWwgPSB7fSkpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGpzdF8xID0gcmVxdWlyZShcIkBhcHBmaWJyZS9qc3RcIik7XHJcbm5ldyBqc3RfMS5BcHAoe1xyXG4gICAgbWFpbjogW1wiZGl2XCIsIG51bGwsIFwidGVzdFwiXVxyXG59KS5ydW4oKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==