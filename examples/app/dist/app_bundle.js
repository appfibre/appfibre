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
        Object.keys(app).forEach(function (k) { var d = Object.getOwnPropertyDescriptor(app, k); if (d)
            Object.defineProperty(_this, k, d); });
        this.main = app.main;
        this.options = app.options || {};
        this.options.logLevel = this.options.logLevel || types_1.LogLevel.Error;
        var logger = app.services && app.services.logger ? ('type' in app.services.logger ? app.services.logger : new app.services.logger(this)) : null;
        var s = app.services || {};
        s.logger = { type: "Logger", log: function (logLevel, title, optionalParameters) {
                if (logLevel <= (_this && _this.options && _this.options.logLevel ? (types_1.LogLevel[_this.options.logLevel] || 2) : 2))
                    logger ? logger.log.bind(_this, logLevel, title, optionalParameters) : [function (title, optionalParameters) { }, console.error, console.error, console.warn, console.info, console.info][logLevel](title + '\r\n', optionalParameters || [_this]);
            } };
        s.promise = s.promise || promise_1.Promise;
        s.transformer = s.transformer ? ('type' in s.transformer ? s.transformer : new s.transformer(this)) : new transformer_1.Transformer({ module: types_1.ModuleSystem.None });
        s.moduleSystem = s.moduleSystem ? ('type' in s.moduleSystem ? s.moduleSystem : new s.moduleSystem(this)) : new loader_1.Loader(s.promise, this.options.basePath);
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
        this.services.logger.log.call(this, types_1.LogLevel.Trace, 'App.initModule', { module: module });
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
        this.services.logger.log.call(this, types_1.LogLevel.Trace, 'App.run');
        return new this.services.promise(function (resolve, reject) {
            try {
                _this.initApp();
                _this.initModule(_this);
            }
            catch (e) {
                reject(e);
            }
            _this.render(_this.main).then(resolve, function (err) { _this.services.logger.log.call(_this, types_1.LogLevel.Error, err.message, err.stack); reject(err); _this.render(["pre", {}, err.stack]); });
        });
    };
    App.prototype.render = function (ui) {
        var _this = this;
        return new this.services.promise(function (resolve, reject) {
            _this.services.logger.log.call(_this, types_1.LogLevel.Trace, 'App.render', [{ ui: ui }]);
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


/***/ }),

/***/ "../../jst/dist/browser/loader.js":
/*!***************************************************!*\
  !*** C:/Code/appfibre/jst/dist/browser/loader.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var basePath = '';
function nodeRequire(url) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basePath);
}
function run(source, url, basePath) {
    var m = { exports: {} };
    try {
        new Function('require', 'module', source + ";\n//# sourceURL=' + " + url)(nodeRequire, m);
    }
    catch (f) {
        console.log('Error running script from from source' + url || false);
        throw f;
    }
    return m.exports;
}
var Loader = {
    type: "ModuleSystem",
    instanciate: function (url, parent) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, { credentials: 'same-origin' })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
                    return [2 /*return*/, res.text()];
            }
        });
    }); },
    "import": function (source, url) { return __awaiter(_this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            try {
                output = run(source, url, basePath);
                return [2 /*return*/, output];
            }
            catch (e) {
                console.log('Error executing script ' + url + ': ');
                throw (e);
            }
            return [2 /*return*/];
        });
    }); }
};
exports["default"] = Loader;


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
var loader_1 = __webpack_require__(/*! ./services/loader */ "../../jst/dist/services/loader.js");
exports.Loader = loader_1.Loader;
var promise_1 = __webpack_require__(/*! ./services/promise */ "../../jst/dist/services/promise.js");
exports.Promise = promise_1.Promise;
var types = __importStar(__webpack_require__(/*! ./types */ "../../jst/dist/types.js"));
exports.types = types;


/***/ }),

/***/ "../../jst/dist/nodeJS/loader.js":
/*!**************************************************!*\
  !*** C:/Code/appfibre/jst/dist/nodeJS/loader.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var basePath = '';
function nodeRequire(url) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basePath);
}
function run(source, url, basePath) {
    var m = { exports: {} };
    try {
        new Function('require', 'module', source + ";\n//# sourceURL=' + " + url)(nodeRequire, m);
    }
    catch (f) {
        console.log('Error running script from from source' + url || false);
        throw f;
    }
    return m.exports;
}
var Loader = {
    type: "ModuleSystem",
    instanciate: function (url, parent) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, { credentials: 'same-origin' })];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
                    return [2 /*return*/, res.text()];
            }
        });
    }); },
    "import": function (source, url) { return __awaiter(_this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            try {
                output = run(source, url, basePath);
                return [2 /*return*/, output];
            }
            catch (e) {
                console.log('Error executing script ' + url + ': ');
                throw (e);
            }
            return [2 /*return*/];
        });
    }); }
};
exports["default"] = Loader;


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
    function Loader(promise, basePath) {
        this.type = "ModuleSystem";
        try {
            //nodeJS does not regocnise "window"
            if (window) {
                var systemjs = Object.getOwnPropertyDescriptor(window, "System");
                if (systemjs) {
                    this.proxy = { type: "ModuleSystem", "import": systemjs.value["import"].bind(systemjs.value), instanciate: systemjs.value.instanciate.bind(systemjs.value) };
                    //this.exec = systemjs.value.instantiate.bind(systemjs.value);
                }
                else
                    this.proxy = __webpack_require__(/*! ../browser/loader */ "../../jst/dist/browser/loader.js");
            }
        }
        catch (_a) {
        }
        if (this['proxy'] == null) {
            console.log('****************************');
            console.log(__webpack_require__(/*! ../nodeJS/loader */ "../../jst/dist/nodeJS/loader.js"));
            this.proxy = __webpack_require__(/*! ../nodeJS/loader */ "../../jst/dist/nodeJS/loader.js");
        }
    }
    /*load(url: string, parent?: any): PromiseLike<any> {
        return this.proxy.load(url, parent);
    }
    exec(source: string, url?: string | undefined) {
        return this.proxy.exec(source, url);
    }*/
    Loader.prototype["import"] = function (moduleName, normalizedParentName) {
        return this.proxy["import"](moduleName, normalizedParentName);
    };
    Loader.prototype.instanciate = function (url, parent) {
        return this.proxy.instanciate(url, parent);
    };
    return Loader;
}());
exports.Loader = Loader;
/*import { IModuleSystem, IAppLoaded, PromiseConstructor } from '../types';
import { IPromise } from "./promise";

export class Loader implements IModuleSystem {
    type:"ModuleSystem"
    
    promise:PromiseConstructor&{ all(promises:IPromise<any>[]) : IPromise<any> }
    basePath?:string
    static base?:string;
    constructor(promise:PromiseConstructor&{ all(promises:IPromise<any>[]) : IPromise<any> }, basePath?:string)
    {
        this.type = "ModuleSystem";
        this.basePath = basePath;
        this.promise = promise;
    }

    private nodeRequire(url:string) {
        return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, Loader.base);
    }

    private run(source:string, url?:string, basePath?:string) {
        Loader.base = basePath;
        let  m = { exports: {}};
        try{
            new Function('require', 'module', `${source};\n//# sourceURL=' + ${url}`)(this.nodeRequire, m);
        } catch(f) {
            console.log('Error running script from from source'+url||source);
            throw f;
        }
        return m.exports;
    }

    load(url:string, parent?:any):Promise<string> {
        return fetch(url, {credentials: 'same-origin'})
        .then(function(res) {
            if (!res.ok)
                throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
            return res.text();
          });
    }

    exec(source:string, url?:string):Promise<any> {
        Loader.base = this.basePath;
        return new this.promise((resolve:Function, reject:Function) => {
            try {
                var output = this.run(source, url, this.basePath);
                debugger;
                resolve(output);
            } catch(e) {
                console.log('Error executing script '+url+': ');
                reject(e);
            }
        });
    }
}*/ 


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
var types_1 = __webpack_require__(/*! ../types */ "../../jst/dist/types.js");
var intercept_1 = __webpack_require__(/*! ../components/intercept */ "../../jst/dist/components/intercept.js");
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
                    return typeof obj[0] == "string" ? ctx.parse(obj, 0, '') : obj[0];
                return obj == null || typeof obj === "string" || obj.$$typeof ? obj : ctx.parse(obj, 0, '');
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
    Processor.prototype.parse = function (obj, level, path, index) {
        this.app.services.logger.log.call(this, types_1.LogLevel.Trace, 'Processor.parse', obj);
        var processor = this;
        return new this.app.services.promise(function (r, f) {
            if (Array.isArray(obj)) {
                if (typeof obj[0] === "string")
                    obj[0] = processor.resolve(obj[0]);
                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform")
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);
                else
                    processor.app.services.promise.all(obj.map(function (v, i) { return processor.parse(v, level + 1, path + '.[' + i + ']', i); })).then(function (o) { try {
                        r(processor.app.services.UI.processElement(o, level, index));
                    }
                    catch (e) {
                        processor.app.services.logger.log(types_1.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]);
                        f(e);
                    } }, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")
                processor.app.services.promise.all([(obj.apply)(Inject(processor.app, processor.construct(processor.app.services.UI.Component)), Inject(processor.app, processor.construct(processor.app.services.UI.Component)))]).then(function (o) { return r(processor.parse(o[0], level, path, index)); }, f);
            else if (obj && obj.then)
                processor.app.services.promise.all([obj]).then(function (o) { return r(o[0]); }, f);
            else if (obj) {
                try {
                    r(processor.app.services.UI.processElement(obj, level, index));
                }
                catch (e) {
                    processor.app.services.logger.log(types_1.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
                    f(e);
                }
            }
            else
                r(obj);
        });
    };
    Processor.prototype.resolve = function (fullpath) {
        var _this = this;
        this.app.services.logger.log.call(this, types_1.LogLevel.Trace, 'Processor.resolve', [fullpath]);
        if (this.cache[fullpath])
            return this.cache[fullpath];
        if (fullpath.substring(0, 1) == "~") {
            var parts = fullpath.substring(1, fullpath.length).split('#');
            var obj = this.app.services.moduleSystem.instanciate(parts[0], this);
            if (parts.length == 1)
                return obj;
            return obj.then(function (x) { return _this.locate(x, parts.slice(1, parts.length).join(".")); });
        }
        else {
            var path = fullpath ? fullpath.split('.') : [''];
            var obj_1 = this.app.components || Object;
            var jst_1 = false;
            var prop_1 = "default";
            for (var part = 0; part < path.length; part++) {
                if (typeof obj_1 === "function" && this.getFunctionName(obj_1) === "inject")
                    obj_1 = obj_1.apply(this.app, Inject(this.app, this.construct(this.app.services.UI.Component)));
                if (obj_1[path[part]] !== undefined) {
                    if (part == path.length - 1)
                        jst_1 = obj_1.__jst;
                    obj_1 = obj_1[path[part]];
                }
                else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0])
                    obj_1 = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj) { return ["pre", { "style": { "color": "red" } }, obj[1].stack ? obj[1].stack : obj[1]]; };
                    else {
                        this.app.services.logger.log.call(this, types_1.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'");
                        return /** @class */ (function (_super) {
                            __extends(class_2, _super);
                            function class_2() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            class_2.prototype.render = function () { return _super.prototype.render.call(this, ["span", { "style": { "color": "red" } }, (fullpath || 'undefined') + " not found!"]); };
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
                obj_1 = obj_1.apply(Inject(this.app, jst_1 ? /** @class */ (function (_super) {
                    __extends(Component, _super);
                    function Component() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Component.prototype.render = function (obj) { return this.parse(!this.app.disableIntercept && window.parent !== null && window !== window.parent ? [intercept_1.Intercept, { "file": jst_1, "method": prop_1 }, this.construct(this.app.UI.Component)] : obj); };
                    return Component;
                }(this.app.services.UI.Component)) : this.construct(this.app.services.UI.Component)), Inject(this.app, jst_1 ? /** @class */ (function (_super) {
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
        this.app.services.logger.log.call(this, types_1.LogLevel.Trace, 'Processor.process', obj);
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
                    _this.app.services.moduleSystem["import"](_this.app.services.transformer.transform(JSON.stringify(obj)).code).then(function (exported) {
                        try {
                            _this.parse(exported["default"] || exported, 0, '').then(resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, function (rs) { return reject(rs); });
                }
                else
                    _this.parse(obj, 0, '').then(resolve, reject);
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
        this.settings.parsers[".require"] = this.settings.parsers[".import"] = function (obj, parseSettings, offset) { return _this.loadModule(_this.process(obj[".import"] || obj[".require"], false, false, parseSettings, offset), parseSettings, offset); };
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
    Transformer.prototype.loadModule = function (val, parseSettings, offset) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (val[0] === "~") {
            return "" + this.process({ ".function": null, arguments: "loader", "return": { ".code": "loader.load('" + (m[1] === "/" ? '.' : '') + m.substr(1) + "')" + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '') + ";" } }, false, false, parseSettings, offset);
        }
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
    Transformer.prototype.processExports = function (output, obj) {
        var _this = this;
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
                //for (var req in r) output.code += `${vr} _${r[req]}${sp}=${sp}require('${req}');${nl}`;
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
                    output.code += "return " + (isDefault ? "{'default' : " + this.process(obj["default"], true, false, output, 1) + ", \"__jst\": \"" + output.name + "\"}" : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + ", \"__jst\": \"" + output.name + "\"}") + (output.name.indexOf('#') > -1 ? output.name.slice(output.name.indexOf('#') + 1).split('#').map(function (p) { return "['" + p + "']"; }) : '') + ";";
                else
                    output.code += "return " + (isDefault ? this.process(obj["default"], true, false, output, 1) : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, output, 1) : key + ":" + sp + _this.process(obj[key], true, false, output, 2); }), output, 1) + "}") + ";";
        }
    };
    Transformer.prototype.processImports = function (output, name) {
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var';
        var s = {};
        var r = {};
        var s2 = {};
        var r2 = {};
        if (output.imports.length > 0)
            for (var i = 0; i < output.imports.length; i++) {
                var ext = output.imports[i][0] === "~";
                if (output.imports[i].indexOf('#') > -1) {
                    var module_name = output.imports[i].substr(0, output.imports[i].indexOf('#'));
                    if ((ext ? s2 : s)[module_name] === undefined)
                        (ext ? s2 : s)[module_name] = {};
                    (ext ? s2 : s)[module_name][output.imports[i].substr(module_name.length + 1)] = i;
                }
                else
                    (ext ? r2 : r)[output.imports[i]] = i;
            }
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                break;
            case "amd":
                output.code = "define(" + (Object.keys(r).length > 0 ? "[" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], " : '') + "function (" + Object.keys(r).map(function (key) { return '_' + r[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                break;
            case "es":
                output.code = Object.keys(s).map(function (key) { return "import {" + Object.keys(s[key]).map(function (k) { return k + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key + "';" + nl; }).join('') + Object.keys(r).map(function (key) { return "import * as _" + r[key] + " from '" + key.substr(key[0] == "~" ? 1 : 0) + "';" + nl; }).join('') + output.code;
                break;
            default:
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
        }
        if (Object.keys(s2).length > 0 || Object.keys(r2).length > 0) {
            /*output.code += ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;' + JSON.stringify(s2) + ' ' + JSON.stringify(r2);
            if (this.settings.runtimeModule)
                output.code += this.settings.runtimeModule;*/
            switch (this.settings.runtimeModule ? this.settings.runtimeModule.toLowerCase() : "none") {
                case "umd":
                case "commonjs":
                case "cjs":
                    //throw new Error(JSON.stringify(s2));
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                    break;
                case "amd":
                    output.code = "define(" + (Object.keys(r2).length > 0 ? "[" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], " : '') + "function (" + Object.keys(r2).map(function (key) { return '_' + r2[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                    break;
                case "es":
                    output.code = Object.keys(s2).map(function (key) { return "import {" + Object.keys(s2[key]).map(function (k) { return k.substr(1) + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key.substr(1) + "';" + nl; }).join('') + Object.keys(r2).map(function (key) { return "import * as _" + r2[key] + " from '" + key.substr(1) + "';" + nl; }).join('') + output.code;
                    break;
                default:
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
            }
        }
    };
    Transformer.prototype.bundleModule = function (obj, name) {
        var output = { name: name, imports: [], exports: {}, compositeObject: false, code: '' };
        this.processExports(output, obj);
        this.processImports(output, name || '');
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
                    obj = Function("return (" + input + ");")();
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
                var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React"));
                if (obj) {
                    this.processElementInternal = obj.value.h || obj.value.createElement;
                    this.Component = obj.value.Component;
                    this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM") || { value: null }).value.render;
                }
            }
        }
        catch (_a) {
            debugger;
            //TODO: find a workaround. in NodeJS ReferenceError: window is not defined
        }
    }
    WebUI.prototype.render = function (ui, parent, mergeWith) {
        if (this.renderInternal) {
            this.app.services.logger.log.call(this, types_1.LogLevel.Trace, "WebUI.render", [ui]);
            return this.renderInternal(ui, parent, mergeWith);
        }
        else
            this.app.services.logger.log.call(this, types_1.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    WebUI.prototype.processElement = function (element, depth, index) {
        if (depth % 2 === 0 && typeof element !== "string" && !Array.isArray(element))
            throw new Error("Child element [2] should be either a string or array");
        else if (depth % 2 === 0 && index !== undefined && Array.isArray(element) && typeof element[1] === "object" && !element[1].key)
            element[1].key = index;
        return depth % 2 === 1 || !this.processElementInternal || !Array.isArray(element) ? element : this.processElementInternal.apply(this, element);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3QvYXBwLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L2Jyb3dzZXIvbG9hZGVyLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L2NvbXBvbmVudHMvaW50ZXJjZXB0LmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L25vZGVKUy9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vL0M6L0NvZGUvYXBwZmlicmUvanN0L2Rpc3Qvc2VydmljZXMvbG9hZGVyLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vQzovQ29kZS9hcHBmaWJyZS9qc3QvZGlzdC9zZXJ2aWNlcy9wcm9taXNlLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3RyYW5zZm9ybWVyLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3NlcnZpY2VzL3dlYnVpLmpzIiwid2VicGFjazovLy9DOi9Db2RlL2FwcGZpYnJlL2pzdC9kaXN0L3R5cGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsRUFBRTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHFCQUFxQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHFCQUFxQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQzNNYTtBQUNiO0FBQ0E7QUFDQSxnREFB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LDBDQUEwQyxFQUFFLHFCQUFxQiw4QkFBOEIsT0FBTyxFQUFFLGlEQUFpRCxtRUFBbUUsT0FBTyxFQUFFO0FBQ3ZXO0FBQ0E7QUFDQTtBQUNBLHNHQUFzRztBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxQ0FBcUM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9JQUFvSSxvQkFBb0IsRUFBRSxnQkFBZ0IsaUJBQWlCO0FBQzNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQ3JOYTtBQUNiO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLHlDQUFVO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1SEFBdUgsY0FBYztBQUNySTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUN4Q2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsdURBQXVEOzs7Ozs7Ozs7Ozs7O0FDbEIzQztBQUNiO0FBQ0EsWUFBWSxtQkFBTyxDQUFDLDhDQUFlO0FBQ25DO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImFwcF9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuLy9pbXBvcnQgeyBJbnRlcmNlcHQgfSBmcm9tIFwiLi9pbnRlcmNlcHRcIjtcclxudmFyIHByb21pc2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL3Byb21pc2VcIik7XHJcbnZhciBsb2FkZXJfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL2xvYWRlclwiKTtcclxudmFyIHRyYW5zZm9ybWVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy90cmFuc2Zvcm1lclwiKTtcclxudmFyIHByb2Nlc3Nvcl8xID0gcmVxdWlyZShcIi4vc2VydmljZXMvcHJvY2Vzc29yXCIpO1xyXG52YXIgd2VidWlfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL3dlYnVpXCIpO1xyXG52YXIgQXBwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXBwKGFwcCkge1xyXG4gICAgICAgIGlmIChhcHAgPT09IHZvaWQgMCkgeyBhcHAgPSB7IG1haW46IFtdIH07IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGFwcCkuZm9yRWFjaChmdW5jdGlvbiAoaykgeyB2YXIgZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXBwLCBrKTsgaWYgKGQpXHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfdGhpcywgaywgZCk7IH0pO1xyXG4gICAgICAgIHRoaXMubWFpbiA9IGFwcC5tYWluO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGFwcC5vcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5sb2dMZXZlbCA9IHRoaXMub3B0aW9ucy5sb2dMZXZlbCB8fCB0eXBlc18xLkxvZ0xldmVsLkVycm9yO1xyXG4gICAgICAgIHZhciBsb2dnZXIgPSBhcHAuc2VydmljZXMgJiYgYXBwLnNlcnZpY2VzLmxvZ2dlciA/ICgndHlwZScgaW4gYXBwLnNlcnZpY2VzLmxvZ2dlciA/IGFwcC5zZXJ2aWNlcy5sb2dnZXIgOiBuZXcgYXBwLnNlcnZpY2VzLmxvZ2dlcih0aGlzKSkgOiBudWxsO1xyXG4gICAgICAgIHZhciBzID0gYXBwLnNlcnZpY2VzIHx8IHt9O1xyXG4gICAgICAgIHMubG9nZ2VyID0geyB0eXBlOiBcIkxvZ2dlclwiLCBsb2c6IGZ1bmN0aW9uIChsb2dMZXZlbCwgdGl0bGUsIG9wdGlvbmFsUGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZ0xldmVsIDw9IChfdGhpcyAmJiBfdGhpcy5vcHRpb25zICYmIF90aGlzLm9wdGlvbnMubG9nTGV2ZWwgPyAodHlwZXNfMS5Mb2dMZXZlbFtfdGhpcy5vcHRpb25zLmxvZ0xldmVsXSB8fCAyKSA6IDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlciA/IGxvZ2dlci5sb2cuYmluZChfdGhpcywgbG9nTGV2ZWwsIHRpdGxlLCBvcHRpb25hbFBhcmFtZXRlcnMpIDogW2Z1bmN0aW9uICh0aXRsZSwgb3B0aW9uYWxQYXJhbWV0ZXJzKSB7IH0sIGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUud2FybiwgY29uc29sZS5pbmZvLCBjb25zb2xlLmluZm9dW2xvZ0xldmVsXSh0aXRsZSArICdcXHJcXG4nLCBvcHRpb25hbFBhcmFtZXRlcnMgfHwgW190aGlzXSk7XHJcbiAgICAgICAgICAgIH0gfTtcclxuICAgICAgICBzLnByb21pc2UgPSBzLnByb21pc2UgfHwgcHJvbWlzZV8xLlByb21pc2U7XHJcbiAgICAgICAgcy50cmFuc2Zvcm1lciA9IHMudHJhbnNmb3JtZXIgPyAoJ3R5cGUnIGluIHMudHJhbnNmb3JtZXIgPyBzLnRyYW5zZm9ybWVyIDogbmV3IHMudHJhbnNmb3JtZXIodGhpcykpIDogbmV3IHRyYW5zZm9ybWVyXzEuVHJhbnNmb3JtZXIoeyBtb2R1bGU6IHR5cGVzXzEuTW9kdWxlU3lzdGVtLk5vbmUgfSk7XHJcbiAgICAgICAgcy5tb2R1bGVTeXN0ZW0gPSBzLm1vZHVsZVN5c3RlbSA/ICgndHlwZScgaW4gcy5tb2R1bGVTeXN0ZW0gPyBzLm1vZHVsZVN5c3RlbSA6IG5ldyBzLm1vZHVsZVN5c3RlbSh0aGlzKSkgOiBuZXcgbG9hZGVyXzEuTG9hZGVyKHMucHJvbWlzZSwgdGhpcy5vcHRpb25zLmJhc2VQYXRoKTtcclxuICAgICAgICBzLlVJID0gcy5VSSA/ICgndHlwZScgaW4gcy5VSSA/IHMuVUkgOiBuZXcgcy5VSSh0aGlzKSkgOiBuZXcgd2VidWlfMS5XZWJVSSh0aGlzKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VzID0geyBtb2R1bGVTeXN0ZW06IHMubW9kdWxlU3lzdGVtLCBwcm9jZXNzb3I6IG5ldyBwcm9jZXNzb3JfMS5Qcm9jZXNzb3IodGhpcyksIHByb21pc2U6IHMucHJvbWlzZSwgdHJhbnNmb3JtZXI6IHMudHJhbnNmb3JtZXIsIGxvZ2dlcjogcy5sb2dnZXIsIFVJOiBzLlVJIH07XHJcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gYXBwLm1vZHVsZXM7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gYXBwLmNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5sb2FkTW9kdWxlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgQXBwLnByb3RvdHlwZS5sb2FkTW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKG1vZHVsZS5tb2R1bGVzKVxyXG4gICAgICAgICAgICBtb2R1bGUubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT0gJ29iamVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZE1vZHVsZShlbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQXBwLnByb3RvdHlwZS5pbml0TW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwodGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5UcmFjZSwgJ0FwcC5pbml0TW9kdWxlJywgeyBtb2R1bGU6IG1vZHVsZSB9KTtcclxuICAgICAgICBpZiAobW9kdWxlLm1vZHVsZXMpXHJcbiAgICAgICAgICAgIG1vZHVsZS5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbml0TW9kdWxlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBpZiAobW9kdWxlLmV2ZW50cyAmJiBtb2R1bGUuZXZlbnRzLmluaXQpXHJcbiAgICAgICAgICAgIG1vZHVsZS5ldmVudHMuaW5pdC5jYWxsKHNlbGYsIHRoaXMsIG1vZHVsZSk7XHJcbiAgICB9O1xyXG4gICAgLypsb2cobG9nTGV2ZWw6TG9nTGV2ZWwsIG1lc3NhZ2U/OnN0cmluZywgb3B0aW9uYWxQYXJhbWV0ZXJzPzphbnlbXSkge1xyXG4gICAgICAgIGxldCBsID0gWyhtZXNzYWdlPzphbnksIG9wdGlvbmFsUGFyYW1ldGVycz86YW55W10pPT57fSwgdGhpcy5zZXJ2aWNlcy5sb2dnZXIuZXhjZXB0aW9uLCB0aGlzLnNlcnZpY2VzLmxvZ2dlci5lcnJvciwgdGhpcy5zZXJ2aWNlcy5sb2dnZXIud2FybiwgdGhpcy5zZXJ2aWNlcy5sb2dnZXIubG9nLCB0aGlzLnNlcnZpY2VzLmxvZ2dlci50cmFjZV07XHJcbiAgICAgICAgaWYgKGxvZ0xldmVsIDw9ICh0aGlzICYmIHRoaXMub3B0aW9ucyA/ICh0aGlzLm9wdGlvbnMubG9nTGV2ZWwgfHwgMikgOiAyKSlcclxuICAgICAgICAgICAgbFtsb2dMZXZlbF0obWVzc2FnZSwgb3B0aW9uYWxQYXJhbWV0ZXJzKTtcclxuICAgIH0qL1xyXG4gICAgQXBwLnByb3RvdHlwZS5pbml0QXBwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLndlYilcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYiA9IHt9O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudCkgeyAvLyB3ZWIgYXBwXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID0gdGhpcy5vcHRpb25zLndlYi50YXJnZXQgfHwgZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMud2ViLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpIHx8IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMud2ViLnRhcmdldC5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLndlYi50YXJnZXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtYWluXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5vcHRpb25zLndlYi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGxvY2F0ZSB0YXJnZXQgKFwiICsgKHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0ID8gJ25vdCBzcGVjaWZpZWQnIDogdGhpcy5vcHRpb25zLndlYi50YXJnZXQpICsgXCIpIGluIGh0bWwgZG9jdW1lbnQgYm9keS5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAobW9kdWxlICYmIG1vZHVsZS5ob3QpIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLndlYi50YXJnZXQuaGFzQ2hpbGROb2RlcygpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy53ZWIudGFyZ2V0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzogd29ya2Fyb3VuZCBmb3Igbm9kZUpzIGFzIGRvY3VtZW50IGVsZW1lbnQgaXMgbm90IGRlZmluZWQgaW4gTm9kZSBydW50aW1lXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFwcC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwodGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5UcmFjZSwgJ0FwcC5ydW4nKTtcclxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuc2VydmljZXMucHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pbml0QXBwKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pbml0TW9kdWxlKF90aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLnJlbmRlcihfdGhpcy5tYWluKS50aGVuKHJlc29sdmUsIGZ1bmN0aW9uIChlcnIpIHsgX3RoaXMuc2VydmljZXMubG9nZ2VyLmxvZy5jYWxsKF90aGlzLCB0eXBlc18xLkxvZ0xldmVsLkVycm9yLCBlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTsgcmVqZWN0KGVycik7IF90aGlzLnJlbmRlcihbXCJwcmVcIiwge30sIGVyci5zdGFja10pOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBBcHAucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICh1aSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLnNlcnZpY2VzLnByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwoX3RoaXMsIHR5cGVzXzEuTG9nTGV2ZWwuVHJhY2UsICdBcHAucmVuZGVyJywgW3sgdWk6IHVpIH1dKTtcclxuICAgICAgICAgICAgX3RoaXMuc2VydmljZXMucHJvY2Vzc29yLnByb2Nlc3ModWkpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuc2VydmljZXMuVUkucmVuZGVyKHZhbHVlLCBfdGhpcy5vcHRpb25zLndlYiAmJiBfdGhpcy5vcHRpb25zLndlYi50YXJnZXQgPyBfdGhpcy5vcHRpb25zLndlYi50YXJnZXQgOiB1bmRlZmluZWQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocikgeyByZXR1cm4gcmVqZWN0KHIpOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXBwO1xyXG59KCkpO1xyXG5leHBvcnRzLkFwcCA9IEFwcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIF90aGlzID0gdGhpcztcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGJhc2VQYXRoID0gJyc7XHJcbmZ1bmN0aW9uIG5vZGVSZXF1aXJlKHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbigndXJsJywgJ3RtcGRpcicsICd0bXBkaXIgPSB0bXBkaXIgPyB0bXBkaXIgOiBnbG9iYWwucHJvY2Vzcy5lbnYuSU5JVF9DV0Q7IHZhciBfX2Rpcm5hbWVfXyA9IGdsb2JhbC5wcm9jZXNzLmN3ZCgpOyBpZiAoX19kaXJuYW1lX18gIT0gdG1wZGlyKSBnbG9iYWwucHJvY2Vzcy5jaGRpcih0bXBkaXIpOyB2YXIgX2V4cCA9IChnbG9iYWwucmVxdWlyZSB8fCBnbG9iYWwucHJvY2Vzcy5tYWluTW9kdWxlLmNvbnN0cnVjdG9yLl9sb2FkKSh1cmwpOyBpZiAoZ2xvYmFsLnByb2Nlc3MuY3dkKCkgIT0gX19kaXJuYW1lX18pIGdsb2JhbC5wcm9jZXNzLmNoZGlyKF9fZGlybmFtZV9fKTsgcmV0dXJuIF9leHA7JykodXJsLCBiYXNlUGF0aCk7XHJcbn1cclxuZnVuY3Rpb24gcnVuKHNvdXJjZSwgdXJsLCBiYXNlUGF0aCkge1xyXG4gICAgdmFyIG0gPSB7IGV4cG9ydHM6IHt9IH07XHJcbiAgICB0cnkge1xyXG4gICAgICAgIG5ldyBGdW5jdGlvbigncmVxdWlyZScsICdtb2R1bGUnLCBzb3VyY2UgKyBcIjtcXG4vLyMgc291cmNlVVJMPScgKyBcIiArIHVybCkobm9kZVJlcXVpcmUsIG0pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGYpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcnVubmluZyBzY3JpcHQgZnJvbSBmcm9tIHNvdXJjZScgKyB1cmwgfHwgc291cmNlKTtcclxuICAgICAgICB0aHJvdyBmO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG0uZXhwb3J0cztcclxufVxyXG52YXIgTG9hZGVyID0ge1xyXG4gICAgdHlwZTogXCJNb2R1bGVTeXN0ZW1cIixcclxuICAgIGluc3RhbmNpYXRlOiBmdW5jdGlvbiAodXJsLCBwYXJlbnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh1cmwsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5vaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGZXRjaCBlcnJvcjogJyArIHJlcy5zdGF0dXMgKyAnICcgKyByZXMuc3RhdHVzVGV4dCArIChwYXJlbnQgPyAnIGxvYWRpbmcgZnJvbSAgJyArIHBhcmVudCA6ICcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlcy50ZXh0KCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfSxcclxuICAgIFwiaW1wb3J0XCI6IGZ1bmN0aW9uIChzb3VyY2UsIHVybCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBvdXRwdXQ7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gcnVuKHNvdXJjZSwgdXJsLCBiYXNlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgb3V0cHV0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGV4ZWN1dGluZyBzY3JpcHQgJyArIHVybCArICc6ICcpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9XHJcbn07XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gTG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIEludGVyY2VwdCA9IGZ1bmN0aW9uIGluamVjdChfYSkge1xyXG4gICAgdmFyIENvbXBvbmVudCA9IF9hLkNvbXBvbmVudDtcclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKEludGVyY2VwdCwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBJbnRlcmNlcHQoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLnN0YXRlID0geyBmb2N1czogZmFsc2UsIHNlbGVjdGVkOiBmYWxzZSwgZWRpdE1vZGU6IG51bGwsIGNhbkVkaXQ6IHRydWUgfTtcclxuICAgICAgICAgICAgX3RoaXMub25NZXNzYWdlID0gX3RoaXMub25NZXNzYWdlLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgICAgICBfdGhpcy5jbGljayA9IF90aGlzLmNsaWNrLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgICAgICBfdGhpcy5tb3VzZUVudGVyID0gX3RoaXMubW91c2VFbnRlci5iaW5kKF90aGlzKTtcclxuICAgICAgICAgICAgX3RoaXMubW91c2VMZWF2ZSA9IF90aGlzLm1vdXNlTGVhdmUuYmluZChfdGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMub25NZXNzYWdlKTtcclxuICAgICAgICAgICAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHBhcmVudC5wb3N0TWVzc2FnZSh7IGV2ZW50VHlwZTogXCJzZWxlY3RcIiwgY29ycmVsYXRpb25JZDogRGF0ZS5ub3coKS50b1N0cmluZygpIH0sIGxvY2F0aW9uLmhyZWYpOyB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMub25NZXNzYWdlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUucmVjb25zdHJ1Y3QgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghb2JqWzFdKVxyXG4gICAgICAgICAgICAgICAgb2JqWzFdID0ge307XHJcbiAgICAgICAgICAgIGlmICghb2JqWzFdLnN0eWxlKVxyXG4gICAgICAgICAgICAgICAgb2JqWzFdLnN0eWxlID0ge307XHJcbiAgICAgICAgICAgIGlmICghb2JqWzFdLnN0eWxlLmJvcmRlciAmJiAhb2JqWzFdLnN0eWxlLnBhZGRpbmcgJiYgIW9ialsxXS5vbk1vdXNlRW50ZXIgJiYgIW9ialsxXS5vbk1vdXNlTGVhdmUpIHtcclxuICAgICAgICAgICAgICAgIG9ialsxXS5zdHlsZS5wYWRkaW5nID0gdGhpcy5zdGF0ZS5mb2N1cyB8fCB0aGlzLnN0YXRlLnNlbGVjdGVkID8gXCIxcHhcIiA6IFwiMnB4XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5lZGl0TW9kZSlcclxuICAgICAgICAgICAgICAgICAgICBvYmpbMV0uc3R5bGUuYmFja2dyb3VuZCA9IFwibGlnaHRibHVlXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZClcclxuICAgICAgICAgICAgICAgICAgICBvYmpbMV0uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgYmxhY2tcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuZm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqWzFdLnN0eWxlLmJvcmRlciA9IFwiMXB4IGRhc2hlZCBncmV5XCI7XHJcbiAgICAgICAgICAgICAgICBvYmpbMV0ub25Nb3VzZUVudGVyID0gdGhpcy5tb3VzZUVudGVyO1xyXG4gICAgICAgICAgICAgICAgb2JqWzFdLm9uTW91c2VMZWF2ZSA9IHRoaXMubW91c2VMZWF2ZTtcclxuICAgICAgICAgICAgICAgIG9ialsxXS5vbkNsaWNrID0gdGhpcy5jbGljaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSW50ZXJjZXB0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHN1cGVyLnJlbmRlcihBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pID8gdGhpcy5yZWNvbnN0cnVjdChbXCJkaXZcIiwge3N0eWxlOiB7ZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIn19LCB0aGlzLnByb3BzLmNoaWxkcmVuXSkgIDogdGhpcy5yZWNvbnN0cnVjdCh0aGlzLnByb3BzLmNoaWxkcmVuKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMsIHRoaXMucmVjb25zdHJ1Y3QoW1wiZGl2XCIsIHsgc3R5bGU6IHsgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIiB9LCBrZXk6IDAgfSwgdGhpcy5wcm9wcy5jaGlsZHJlbl0pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUubW91c2VFbnRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy94LkRlc2lnbmVyLm5vdGlmeShcInhcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBcImZvY3VzXCI6IHRydWUgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBJbnRlcmNlcHQucHJvdG90eXBlLm1vdXNlTGVhdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8veC5EZXNpZ25lci5ub3RpZnkoXCJ5XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgXCJmb2N1c1wiOiBmYWxzZSB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUuY2xpY2sgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vRGVzaWduZXIubm90aWZ5KHRoaXMucHJvcHMuZmlsZSk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB3aW5kb3c7XHJcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQucGFyZW50ICE9PSBwYXJlbnQgJiYgd2luZG93LnBhcmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgICAgICAgICAgdmFyIGNvcnJlbGF0aW9uSWQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IGV2ZW50VHlwZTogXCJzZWxlY3RcIiwgZWRpdE1vZGU6IHRoaXMuc3RhdGUuZWRpdE1vZGUsIGNhbkVkaXQ6IHRoaXMuc3RhdGUuY2FuRWRpdCwgY29ycmVsYXRpb25JZDogY29ycmVsYXRpb25JZCwgY29udHJvbDogeyBmaWxlOiB0aGlzLnByb3BzLmZpbGUsIG1ldGhvZDogdGhpcy5wcm9wcy5tZXRob2QgfSB9LCBsb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFwic2VsZWN0ZWRcIjogY29ycmVsYXRpb25JZCB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEludGVyY2VwdC5wcm90b3R5cGUub25NZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLnN1YnN0cigwLCBldi5vcmlnaW4ubGVuZ3RoKSA9PSBldi5vcmlnaW4gJiYgZXYudHlwZSA9PSBcIm1lc3NhZ2VcIiAmJiBldi5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZCA9PSBldi5kYXRhLmNvcnJlbGF0aW9uSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldi5kYXRhLmV2ZW50VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGVzZWxlY3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVkaXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlZGl0TW9kZTogZXYuZGF0YS5lZGl0TW9kZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEludGVyY2VwdDtcclxuICAgIH0oQ29tcG9uZW50KSk7XHJcbn07XHJcbmV4cG9ydHMuSW50ZXJjZXB0ID0gSW50ZXJjZXB0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgYXBwXzEgPSByZXF1aXJlKFwiLi9hcHBcIik7XHJcbmV4cG9ydHMuQXBwID0gYXBwXzEuQXBwO1xyXG52YXIgdHJhbnNmb3JtZXJfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL3RyYW5zZm9ybWVyXCIpO1xyXG5leHBvcnRzLlRyYW5zZm9ybWVyID0gdHJhbnNmb3JtZXJfMS5UcmFuc2Zvcm1lcjtcclxudmFyIGxvYWRlcl8xID0gcmVxdWlyZShcIi4vc2VydmljZXMvbG9hZGVyXCIpO1xyXG5leHBvcnRzLkxvYWRlciA9IGxvYWRlcl8xLkxvYWRlcjtcclxudmFyIHByb21pc2VfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL3Byb21pc2VcIik7XHJcbmV4cG9ydHMuUHJvbWlzZSA9IHByb21pc2VfMS5Qcm9taXNlO1xyXG52YXIgdHlwZXMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIikpO1xyXG5leHBvcnRzLnR5cGVzID0gdHlwZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbnZhciBfdGhpcyA9IHRoaXM7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBiYXNlUGF0aCA9ICcnO1xyXG5mdW5jdGlvbiBub2RlUmVxdWlyZSh1cmwpIHtcclxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3VybCcsICd0bXBkaXInLCAndG1wZGlyID0gdG1wZGlyID8gdG1wZGlyIDogZ2xvYmFsLnByb2Nlc3MuZW52LklOSVRfQ1dEOyB2YXIgX19kaXJuYW1lX18gPSBnbG9iYWwucHJvY2Vzcy5jd2QoKTsgaWYgKF9fZGlybmFtZV9fICE9IHRtcGRpcikgZ2xvYmFsLnByb2Nlc3MuY2hkaXIodG1wZGlyKTsgdmFyIF9leHAgPSAoZ2xvYmFsLnJlcXVpcmUgfHwgZ2xvYmFsLnByb2Nlc3MubWFpbk1vZHVsZS5jb25zdHJ1Y3Rvci5fbG9hZCkodXJsKTsgaWYgKGdsb2JhbC5wcm9jZXNzLmN3ZCgpICE9IF9fZGlybmFtZV9fKSBnbG9iYWwucHJvY2Vzcy5jaGRpcihfX2Rpcm5hbWVfXyk7IHJldHVybiBfZXhwOycpKHVybCwgYmFzZVBhdGgpO1xyXG59XHJcbmZ1bmN0aW9uIHJ1bihzb3VyY2UsIHVybCwgYmFzZVBhdGgpIHtcclxuICAgIHZhciBtID0geyBleHBvcnRzOiB7fSB9O1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBuZXcgRnVuY3Rpb24oJ3JlcXVpcmUnLCAnbW9kdWxlJywgc291cmNlICsgXCI7XFxuLy8jIHNvdXJjZVVSTD0nICsgXCIgKyB1cmwpKG5vZGVSZXF1aXJlLCBtKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChmKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHJ1bm5pbmcgc2NyaXB0IGZyb20gZnJvbSBzb3VyY2UnICsgdXJsIHx8IHNvdXJjZSk7XHJcbiAgICAgICAgdGhyb3cgZjtcclxuICAgIH1cclxuICAgIHJldHVybiBtLmV4cG9ydHM7XHJcbn1cclxudmFyIExvYWRlciA9IHtcclxuICAgIHR5cGU6IFwiTW9kdWxlU3lzdGVtXCIsXHJcbiAgICBpbnN0YW5jaWF0ZTogZnVuY3Rpb24gKHVybCwgcGFyZW50KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlcztcclxuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godXJsLCB7IGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nIH0pXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMub2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmV0Y2ggZXJyb3I6ICcgKyByZXMuc3RhdHVzICsgJyAnICsgcmVzLnN0YXR1c1RleHQgKyAocGFyZW50ID8gJyBsb2FkaW5nIGZyb20gICcgKyBwYXJlbnQgOiAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXMudGV4dCgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IH0sXHJcbiAgICBcImltcG9ydFwiOiBmdW5jdGlvbiAoc291cmNlLCB1cmwpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgb3V0cHV0O1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IHJ1bihzb3VyY2UsIHVybCwgYmFzZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG91dHB1dF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBleGVjdXRpbmcgc2NyaXB0ICcgKyB1cmwgKyAnOiAnKTtcclxuICAgICAgICAgICAgICAgIHRocm93IChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfVxyXG59O1xyXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IExvYWRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciBMb2FkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBMb2FkZXIocHJvbWlzZSwgYmFzZVBhdGgpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIk1vZHVsZVN5c3RlbVwiO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vbm9kZUpTIGRvZXMgbm90IHJlZ29jbmlzZSBcIndpbmRvd1wiXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzeXN0ZW1qcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LCBcIlN5c3RlbVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzeXN0ZW1qcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJveHkgPSB7IHR5cGU6IFwiTW9kdWxlU3lzdGVtXCIsIFwiaW1wb3J0XCI6IHN5c3RlbWpzLnZhbHVlW1wiaW1wb3J0XCJdLmJpbmQoc3lzdGVtanMudmFsdWUpLCBpbnN0YW5jaWF0ZTogc3lzdGVtanMudmFsdWUuaW5zdGFuY2lhdGUuYmluZChzeXN0ZW1qcy52YWx1ZSkgfTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZXhlYyA9IHN5c3RlbWpzLnZhbHVlLmluc3RhbnRpYXRlLmJpbmQoc3lzdGVtanMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJveHkgPSByZXF1aXJlKCcuLi9icm93c2VyL2xvYWRlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpc1sncHJveHknXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcXVpcmUoJy4uL25vZGVKUy9sb2FkZXInKSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJveHkgPSByZXF1aXJlKCcuLi9ub2RlSlMvbG9hZGVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLypsb2FkKHVybDogc3RyaW5nLCBwYXJlbnQ/OiBhbnkpOiBQcm9taXNlTGlrZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm94eS5sb2FkKHVybCwgcGFyZW50KTtcclxuICAgIH1cclxuICAgIGV4ZWMoc291cmNlOiBzdHJpbmcsIHVybD86IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3h5LmV4ZWMoc291cmNlLCB1cmwpO1xyXG4gICAgfSovXHJcbiAgICBMb2FkZXIucHJvdG90eXBlW1wiaW1wb3J0XCJdID0gZnVuY3Rpb24gKG1vZHVsZU5hbWUsIG5vcm1hbGl6ZWRQYXJlbnROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJveHlbXCJpbXBvcnRcIl0obW9kdWxlTmFtZSwgbm9ybWFsaXplZFBhcmVudE5hbWUpO1xyXG4gICAgfTtcclxuICAgIExvYWRlci5wcm90b3R5cGUuaW5zdGFuY2lhdGUgPSBmdW5jdGlvbiAodXJsLCBwYXJlbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm94eS5pbnN0YW5jaWF0ZSh1cmwsIHBhcmVudCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIExvYWRlcjtcclxufSgpKTtcclxuZXhwb3J0cy5Mb2FkZXIgPSBMb2FkZXI7XHJcbi8qaW1wb3J0IHsgSU1vZHVsZVN5c3RlbSwgSUFwcExvYWRlZCwgUHJvbWlzZUNvbnN0cnVjdG9yIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBJUHJvbWlzZSB9IGZyb20gXCIuL3Byb21pc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkZXIgaW1wbGVtZW50cyBJTW9kdWxlU3lzdGVtIHtcclxuICAgIHR5cGU6XCJNb2R1bGVTeXN0ZW1cIlxyXG4gICAgXHJcbiAgICBwcm9taXNlOlByb21pc2VDb25zdHJ1Y3RvciZ7IGFsbChwcm9taXNlczpJUHJvbWlzZTxhbnk+W10pIDogSVByb21pc2U8YW55PiB9XHJcbiAgICBiYXNlUGF0aD86c3RyaW5nXHJcbiAgICBzdGF0aWMgYmFzZT86c3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHJvbWlzZTpQcm9taXNlQ29uc3RydWN0b3ImeyBhbGwocHJvbWlzZXM6SVByb21pc2U8YW55PltdKSA6IElQcm9taXNlPGFueT4gfSwgYmFzZVBhdGg/OnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIk1vZHVsZVN5c3RlbVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVBhdGggPSBiYXNlUGF0aDtcclxuICAgICAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbm9kZVJlcXVpcmUodXJsOnN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3VybCcsICd0bXBkaXInLCAndG1wZGlyID0gdG1wZGlyID8gdG1wZGlyIDogZ2xvYmFsLnByb2Nlc3MuZW52LklOSVRfQ1dEOyB2YXIgX19kaXJuYW1lX18gPSBnbG9iYWwucHJvY2Vzcy5jd2QoKTsgaWYgKF9fZGlybmFtZV9fICE9IHRtcGRpcikgZ2xvYmFsLnByb2Nlc3MuY2hkaXIodG1wZGlyKTsgdmFyIF9leHAgPSAoZ2xvYmFsLnJlcXVpcmUgfHwgZ2xvYmFsLnByb2Nlc3MubWFpbk1vZHVsZS5jb25zdHJ1Y3Rvci5fbG9hZCkodXJsKTsgaWYgKGdsb2JhbC5wcm9jZXNzLmN3ZCgpICE9IF9fZGlybmFtZV9fKSBnbG9iYWwucHJvY2Vzcy5jaGRpcihfX2Rpcm5hbWVfXyk7IHJldHVybiBfZXhwOycpKHVybCwgTG9hZGVyLmJhc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcnVuKHNvdXJjZTpzdHJpbmcsIHVybD86c3RyaW5nLCBiYXNlUGF0aD86c3RyaW5nKSB7XHJcbiAgICAgICAgTG9hZGVyLmJhc2UgPSBiYXNlUGF0aDtcclxuICAgICAgICBsZXQgIG0gPSB7IGV4cG9ydHM6IHt9fTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIG5ldyBGdW5jdGlvbigncmVxdWlyZScsICdtb2R1bGUnLCBgJHtzb3VyY2V9O1xcbi8vIyBzb3VyY2VVUkw9JyArICR7dXJsfWApKHRoaXMubm9kZVJlcXVpcmUsIG0pO1xyXG4gICAgICAgIH0gY2F0Y2goZikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcnVubmluZyBzY3JpcHQgZnJvbSBmcm9tIHNvdXJjZScrdXJsfHxzb3VyY2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbS5leHBvcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWQodXJsOnN0cmluZywgcGFyZW50PzphbnkpOlByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge2NyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nfSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgaWYgKCFyZXMub2spXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZldGNoIGVycm9yOiAnICsgcmVzLnN0YXR1cyArICcgJyArIHJlcy5zdGF0dXNUZXh0ICsgKHBhcmVudCA/ICcgbG9hZGluZyBmcm9tICAnICsgcGFyZW50IDogJycpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBleGVjKHNvdXJjZTpzdHJpbmcsIHVybD86c3RyaW5nKTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIExvYWRlci5iYXNlID0gdGhpcy5iYXNlUGF0aDtcclxuICAgICAgICByZXR1cm4gbmV3IHRoaXMucHJvbWlzZSgocmVzb2x2ZTpGdW5jdGlvbiwgcmVqZWN0OkZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5ydW4oc291cmNlLCB1cmwsIHRoaXMuYmFzZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG91dHB1dCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGV4ZWN1dGluZyBzY3JpcHQgJyt1cmwrJzogJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSovIFxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcbnZhciBpbnRlcmNlcHRfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL2ludGVyY2VwdFwiKTtcclxuZnVuY3Rpb24gc194YShhLCBiKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7IH1cclxuZnVuY3Rpb24gY2xvbmUoYSwgYikgeyBmb3IgKHZhciBjID0gMTsgYyA8IGFyZ3VtZW50cy5sZW5ndGg7IGMrKykge1xyXG4gICAgdmFyIGQgPSBhcmd1bWVudHNbY107XHJcbiAgICBpZiAoZClcclxuICAgICAgICBmb3IgKHZhciBlIGluIGQpXHJcbiAgICAgICAgICAgIHNfeGEoZCwgZSkgJiYgKGFbZV0gPSBkW2VdKTtcclxufSByZXR1cm4gYTsgfVxyXG5mdW5jdGlvbiBJbmplY3QoYXBwLCBQcm94eSkge1xyXG4gICAgdmFyIGluaiA9IGNsb25lKGFwcCk7XHJcbiAgICBpbmouc2VydmljZXMuVUkuQ29tcG9uZW50ID0gUHJveHkgfHwgYXBwLnNlcnZpY2VzLlVJLkNvbXBvbmVudDtcclxuICAgIC8qY2xhc3MgTG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgICAgICBsb2FkKCkge1xyXG4gICAgICAgICAgICBKc3RDb250ZXh0LmxvYWQodGhpcy5zdGF0ZS51cmwsIHRydWUpLnRoZW4ob2JqID0+IHt0aGlzLnNldFN0YXRlKHtjaGlsZHJlbjogb2JqfSl9LCBlcnIgPT4ge3RoaXMuc2V0U3RhdGUoe2NoaWxkcmVuOiBbXCJFeGNlcHRpb25cIiwgZXJyXX0pfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb21wb25lbnRXaWxsTW91bnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKHt9LCB0aGlzLnByb3BzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxVcGRhdGUocHJvcHM6YW55LCBuZXh0cHJvcHM6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja3VybChuZXh0cHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUocHJvcHM6YW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrdXJsKHByb3BzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoZWNrdXJsKHByb3BzOmFueSkge1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gdHlwZW9mIHByb3BzLnVybCA9PT0gXCJmdW5jdGlvblwiID8gcHJvcHMudXJsKCkgOiBwcm9wcy51cmw7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZSB8fCB0aGlzLnN0YXRlLnVybCAhPT0gdXJsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hpbGRyZW46IHRoaXMucHJvcHMuY2hpbGRyZW4sIHVybDogdXJsfSwgdGhpcy5sb2FkKTtcclxuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlIHx8IHRoaXMuc3RhdGUudXJsID09PSB1cmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW5kZXIgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIucmVuZGVyKHRoaXMuY2hlY2t1cmwodGhpcy5wcm9wcykgJiYgdGhpcy5zdGF0ZS5jaGlsZHJlbiAmJiB0aGlzLnN0YXRlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0aGlzLnN0YXRlLmNoaWxkcmVuIDogdGhpcy5wcm9wcy5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcbiAgICAvKmxldCB7IHRpdGxlLCBkZXNpZ25lciwgdWksIHRhcmdldCwgLi4uaW5qZWN0IH0gPSBhcHA7XHJcbiAgICByZXR1cm4geyBDb21wb25lbnRcclxuICAgICAgICAsIENvbnRleHRcclxuICAgICAgICAsIExvYWRlclxyXG4gICAgICAgICwgY29tcG9uZW50cyA6IGFwcC5jb21wb25lbnRzXHJcbiAgICAgICAgLCAuLi5pbmplY3RcclxuICAgIH07Ki9cclxuICAgIHJldHVybiBpbmo7XHJcbn1cclxudmFyIFByb2Nlc3NvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFByb2Nlc3NvcihhcHApIHtcclxuICAgICAgICB0aGlzLmNhY2hlID0gT2JqZWN0KCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJQcm9jZXNzb3JcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIFByb2Nlc3Nvci5wcm90b3R5cGUuY29uc3RydWN0ID0gZnVuY3Rpb24gKGpzdENvbXBvbmVudCkge1xyXG4gICAgICAgIHZhciBjdHggPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgICAgIF9fZXh0ZW5kcyhjbGFzc18xLCBfc3VwZXIpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikgJiYgb2JqLmxlbmd0aCA9PT0gMSAmJiAhQXJyYXkuaXNBcnJheShvYmpbMF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqWzBdID09IFwic3RyaW5nXCIgPyBjdHgucGFyc2Uob2JqLCAwLCAnJykgOiBvYmpbMF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqID09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIiB8fCBvYmouJCR0eXBlb2YgPyBvYmogOiBjdHgucGFyc2Uob2JqLCAwLCAnJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgICAgIH0oanN0Q29tcG9uZW50KSk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5sb2NhdGUgPSBmdW5jdGlvbiAocmVzb3VyY2UsIHBhdGgpIHtcclxuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIGpzdCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBvYmogPSByZXNvdXJjZTtcclxuICAgICAgICBmb3IgKHZhciBwYXJ0ID0gMDsgcGFydCA8IHBhcnRzLmxlbmd0aDsgcGFydCsrKVxyXG4gICAgICAgICAgICBpZiAob2JqW3BhcnRzW3BhcnRdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFydCA9PSBwYXRoLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAganN0ID0gb2JqLl9fanN0O1xyXG4gICAgICAgICAgICAgICAgb2JqID0gb2JqW3BhdGhbcGFydF1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9iaiA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH07XHJcbiAgICBQcm9jZXNzb3IucHJvdG90eXBlLmdldEZ1bmN0aW9uTmFtZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUpXHJcbiAgICAgICAgICAgIHJldHVybiBvYmoubmFtZTtcclxuICAgICAgICB2YXIgbmFtZSA9IG9iai50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJygnKSA+IC0xKVxyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5pbmRleE9mKCcoJykpO1xyXG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ2Z1bmN0aW9uJykgPiAtMSlcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKG5hbWUuaW5kZXhPZignZnVuY3Rpb24nKSArICdmdW5jdGlvbicubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gbmFtZS50cmltKCk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChvYmosIGxldmVsLCBwYXRoLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuYXBwLnNlcnZpY2VzLmxvZ2dlci5sb2cuY2FsbCh0aGlzLCB0eXBlc18xLkxvZ0xldmVsLlRyYWNlLCAnUHJvY2Vzc29yLnBhcnNlJywgb2JqKTtcclxuICAgICAgICB2YXIgcHJvY2Vzc29yID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuYXBwLnNlcnZpY2VzLnByb21pc2UoZnVuY3Rpb24gKHIsIGYpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbMF0gPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqWzBdID0gcHJvY2Vzc29yLnJlc29sdmUob2JqWzBdKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqWzBdID09PSBcImZ1bmN0aW9uXCIgJiYgcHJvY2Vzc29yLmdldEZ1bmN0aW9uTmFtZShvYmpbMF0pID09PSBcInRyYW5zZm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3Nvci5wYXJzZShvYmpbMF0uYXBwbHkocHJvY2Vzc29yLmFwcCwgb2JqLnNsaWNlKDEpKSwgbGV2ZWwsIHBhdGggKyAnWzBdKCknLCBpbmRleCkudGhlbihyLCBmKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzb3IuYXBwLnNlcnZpY2VzLnByb21pc2UuYWxsKG9iai5tYXAoZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIHByb2Nlc3Nvci5wYXJzZSh2LCBsZXZlbCArIDEsIHBhdGggKyAnLlsnICsgaSArICddJywgaSk7IH0pKS50aGVuKGZ1bmN0aW9uIChvKSB7IHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHIocHJvY2Vzc29yLmFwcC5zZXJ2aWNlcy5VSS5wcm9jZXNzRWxlbWVudChvLCBsZXZlbCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yLmFwcC5zZXJ2aWNlcy5sb2dnZXIubG9nKHR5cGVzXzEuTG9nTGV2ZWwuRXJyb3IsICdQcm9jZXNzb3IucGFyc2U6ICcgKyBlLnN0YWNrLCBbb10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gfSwgZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIHByb2Nlc3Nvci5nZXRGdW5jdGlvbk5hbWUob2JqKSA9PT0gXCJpbmplY3RcIilcclxuICAgICAgICAgICAgICAgIHByb2Nlc3Nvci5hcHAuc2VydmljZXMucHJvbWlzZS5hbGwoWyhvYmouYXBwbHkpKEluamVjdChwcm9jZXNzb3IuYXBwLCBwcm9jZXNzb3IuY29uc3RydWN0KHByb2Nlc3Nvci5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSksIEluamVjdChwcm9jZXNzb3IuYXBwLCBwcm9jZXNzb3IuY29uc3RydWN0KHByb2Nlc3Nvci5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkpXSkudGhlbihmdW5jdGlvbiAobykgeyByZXR1cm4gcihwcm9jZXNzb3IucGFyc2Uob1swXSwgbGV2ZWwsIHBhdGgsIGluZGV4KSk7IH0sIGYpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmogJiYgb2JqLnRoZW4pXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzb3IuYXBwLnNlcnZpY2VzLnByb21pc2UuYWxsKFtvYmpdKS50aGVuKGZ1bmN0aW9uIChvKSB7IHJldHVybiByKG9bMF0pOyB9LCBmKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHIocHJvY2Vzc29yLmFwcC5zZXJ2aWNlcy5VSS5wcm9jZXNzRWxlbWVudChvYmosIGxldmVsLCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzb3IuYXBwLnNlcnZpY2VzLmxvZ2dlci5sb2codHlwZXNfMS5Mb2dMZXZlbC5FcnJvciwgJ1Byb2Nlc3Nvci5wYXJzZTogJyArIGUuc3RhY2ssIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgZihlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByKG9iaik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUHJvY2Vzc29yLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKGZ1bGxwYXRoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmFwcC5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwodGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5UcmFjZSwgJ1Byb2Nlc3Nvci5yZXNvbHZlJywgW2Z1bGxwYXRoXSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVbZnVsbHBhdGhdKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVtmdWxscGF0aF07XHJcbiAgICAgICAgaWYgKGZ1bGxwYXRoLnN1YnN0cmluZygwLCAxKSA9PSBcIn5cIikge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBmdWxscGF0aC5zdWJzdHJpbmcoMSwgZnVsbHBhdGgubGVuZ3RoKS5zcGxpdCgnIycpO1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5hcHAuc2VydmljZXMubW9kdWxlU3lzdGVtLmluc3RhbmNpYXRlKHBhcnRzWzBdLCB0aGlzKTtcclxuICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgcmV0dXJuIG9iai50aGVuKGZ1bmN0aW9uICh4KSB7IHJldHVybiBfdGhpcy5sb2NhdGUoeCwgcGFydHMuc2xpY2UoMSwgcGFydHMubGVuZ3RoKS5qb2luKFwiLlwiKSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSBmdWxscGF0aCA/IGZ1bGxwYXRoLnNwbGl0KCcuJykgOiBbJyddO1xyXG4gICAgICAgICAgICB2YXIgb2JqXzEgPSB0aGlzLmFwcC5jb21wb25lbnRzIHx8IE9iamVjdDtcclxuICAgICAgICAgICAgdmFyIGpzdF8xID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBwcm9wXzEgPSBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgcGFydCA9IDA7IHBhcnQgPCBwYXRoLmxlbmd0aDsgcGFydCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ial8xID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpcy5nZXRGdW5jdGlvbk5hbWUob2JqXzEpID09PSBcImluamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9ial8xID0gb2JqXzEuYXBwbHkodGhpcy5hcHAsIEluamVjdCh0aGlzLmFwcCwgdGhpcy5jb25zdHJ1Y3QodGhpcy5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ial8xW3BhdGhbcGFydF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFydCA9PSBwYXRoLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzdF8xID0gb2JqXzEuX19qc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqXzEgPSBvYmpfMVtwYXRoW3BhcnRdXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhdGgubGVuZ3RoID09IDEgJiYgcGF0aFswXS5sZW5ndGggPiAwICYmIHBhdGhbMF0udG9Mb3dlckNhc2UoKSA9PSBwYXRoWzBdKVxyXG4gICAgICAgICAgICAgICAgICAgIG9ial8xID0gcGF0aFtwYXJ0XTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmdWxscGF0aCA9PT0gXCJFeGNlcHRpb25cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zZm9ybShvYmopIHsgcmV0dXJuIFtcInByZVwiLCB7IFwic3R5bGVcIjogeyBcImNvbG9yXCI6IFwicmVkXCIgfSB9LCBvYmpbMV0uc3RhY2sgPyBvYmpbMV0uc3RhY2sgOiBvYmpbMV1dOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcC5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwodGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5FcnJvciwgJ1VuYWJsZSB0byByZXNvbHZlIFwiQXBwLmNvbXBvbmVudHMuJyArIChmdWxscGF0aCB8fCAndW5kZWZpbmVkJykgKyBcIidcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2V4dGVuZHMoY2xhc3NfMiwgX3N1cGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsYXNzXzIoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NfMi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzLCBbXCJzcGFuXCIsIHsgXCJzdHlsZVwiOiB7IFwiY29sb3JcIjogXCJyZWRcIiB9IH0sIChmdWxscGF0aCB8fCAndW5kZWZpbmVkJykgKyBcIiBub3QgZm91bmQhXCJdKTsgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc18yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KHRoaXMuYXBwLnNlcnZpY2VzLlVJLkNvbXBvbmVudCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqXzFbXCJkZWZhdWx0XCJdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqXzEuX19qc3QpXHJcbiAgICAgICAgICAgICAgICAgICAganN0XzEgPSBvYmpfMS5fX2pzdDtcclxuICAgICAgICAgICAgICAgIG9ial8xID0gb2JqXzFbXCJkZWZhdWx0XCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGpzdF8xKVxyXG4gICAgICAgICAgICAgICAgcHJvcF8xID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ial8xID09IFwiZnVuY3Rpb25cIiAmJiB0aGlzLmdldEZ1bmN0aW9uTmFtZShvYmpfMSkgPT09IFwiaW5qZWN0XCIpXHJcbiAgICAgICAgICAgICAgICBvYmpfMSA9IG9ial8xLmFwcGx5KEluamVjdCh0aGlzLmFwcCwganN0XzEgPyAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX19leHRlbmRzKENvbXBvbmVudCwgX3N1cGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBDb21wb25lbnQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0aGlzLnBhcnNlKCF0aGlzLmFwcC5kaXNhYmxlSW50ZXJjZXB0ICYmIHdpbmRvdy5wYXJlbnQgIT09IG51bGwgJiYgd2luZG93ICE9PSB3aW5kb3cucGFyZW50ID8gW2ludGVyY2VwdF8xLkludGVyY2VwdCwgeyBcImZpbGVcIjoganN0XzEsIFwibWV0aG9kXCI6IHByb3BfMSB9LCB0aGlzLmNvbnN0cnVjdCh0aGlzLmFwcC5VSS5Db21wb25lbnQpXSA6IG9iaik7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIH0odGhpcy5hcHAuc2VydmljZXMuVUkuQ29tcG9uZW50KSkgOiB0aGlzLmNvbnN0cnVjdCh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSwgSW5qZWN0KHRoaXMuYXBwLCBqc3RfMSA/IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBfX2V4dGVuZHMoQ29tcG9uZW50LCBfc3VwZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHRoaXMucGFyc2UoIXRoaXMuYXBwLmRpc2FibGVJbnRlcmNlcHQgJiYgd2luZG93LnBhcmVudCAhPT0gbnVsbCAmJiB3aW5kb3cgIT09IHdpbmRvdy5wYXJlbnQgPyBbaW50ZXJjZXB0XzEuSW50ZXJjZXB0LCB7IFwiZmlsZVwiOiBqc3RfMSwgXCJtZXRob2RcIjogcHJvcF8xIH0sIHRoaXMuY29uc3RydWN0KHRoaXMuYXBwLlVJLkNvbXBvbmVudCldIDogb2JqKTsgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgfSh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSA6IHRoaXMuY29uc3RydWN0KHRoaXMuYXBwLnNlcnZpY2VzLlVJLkNvbXBvbmVudCkpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbZnVsbHBhdGhdID0gQXJyYXkuaXNBcnJheShvYmpfMSkgPyAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgICAgICAgICBfX2V4dGVuZHMoV3JhcHBlciwgX3N1cGVyKTtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFdyYXBwZXIoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgV3JhcHBlci5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTtcclxuICAgICAgICAgICAgICAgIFdyYXBwZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHsgaWYgKCFvYmpfMVsxXSlcclxuICAgICAgICAgICAgICAgICAgICBvYmpfMVsxXSA9IHt9OyBpZiAoIW9ial8xWzFdLmtleSlcclxuICAgICAgICAgICAgICAgICAgICBvYmpfMVsxXS5rZXkgPSAwOyByZXR1cm4gdGhpcy5wYXJzZShqc3RfMSAmJiAhdGhpcy5hcHAuZGlzYWJsZUludGVyY2VwdCAmJiB3aW5kb3cucGFyZW50ICE9PSBudWxsICYmIHdpbmRvdyAhPT0gd2luZG93LnBhcmVudCA/IFtpbnRlcmNlcHRfMS5JbnRlcmNlcHQsIHsgXCJmaWxlXCI6IGpzdF8xLCBcIm1ldGhvZFwiOiBwcm9wXzEgfSwgW29ial8xXV0gOiBvYmpfMSk7IH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gV3JhcHBlcjtcclxuICAgICAgICAgICAgfSh0aGlzLmFwcC5zZXJ2aWNlcy5VSS5Db21wb25lbnQpKSA6IG9ial8xO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBQcm9jZXNzb3IucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmFwcC5zZXJ2aWNlcy5sb2dnZXIubG9nLmNhbGwodGhpcywgdHlwZXNfMS5Mb2dMZXZlbC5UcmFjZSwgJ1Byb2Nlc3Nvci5wcm9jZXNzJywgb2JqKTtcclxuICAgICAgICBmdW5jdGlvbiB2aXNpdChvYmopIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2l0KG9ialtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgb2JqICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4ga2V5cylcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5c1tpXS5zdWJzdHIoMCwgMSkgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZpc2l0KG9ialtrZXlzW2ldXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLmFwcC5zZXJ2aWNlcy5wcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIGlzVGVtcGxhdGUgPSB2aXNpdChvYmopO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcHAuc2VydmljZXMubW9kdWxlU3lzdGVtW1wiaW1wb3J0XCJdKF90aGlzLmFwcC5zZXJ2aWNlcy50cmFuc2Zvcm1lci50cmFuc2Zvcm0oSlNPTi5zdHJpbmdpZnkob2JqKSkuY29kZSkudGhlbihmdW5jdGlvbiAoZXhwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnBhcnNlKGV4cG9ydGVkW1wiZGVmYXVsdFwiXSB8fCBleHBvcnRlZCwgMCwgJycpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJzKSB7IHJldHVybiByZWplY3QocnMpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wYXJzZShvYmosIDAsICcnKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQcm9jZXNzb3I7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUHJvY2Vzc29yID0gUHJvY2Vzc29yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHN0YXRlcyA9IHsgcGVuZGluZzogMCwgc2V0dGxlZDogMSwgZnVsZmlsbGVkOiAyLCByZWplY3RlZDogMyB9O1xyXG52YXIgYXN5bmNRdWV1ZSA9IFtdO1xyXG52YXIgYXN5bmNUaW1lcjtcclxuZnVuY3Rpb24gYXN5bmNGbHVzaCgpIHtcclxuICAgIC8vIHJ1biBwcm9taXNlIGNhbGxiYWNrc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3luY1F1ZXVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYXN5bmNRdWV1ZVtpXVswXShhc3luY1F1ZXVlW2ldWzFdKTtcclxuICAgIH1cclxuICAgIC8vIHJlc2V0IGFzeW5jIGFzeW5jUXVldWVcclxuICAgIGFzeW5jUXVldWUgPSBbXTtcclxuICAgIGFzeW5jVGltZXIgPSBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBhc3luY0NhbGwoY2FsbGJhY2ssIGFyZykge1xyXG4gICAgYXN5bmNRdWV1ZS5wdXNoKFtjYWxsYmFjaywgYXJnXSk7XHJcbiAgICBpZiAoIWFzeW5jVGltZXIpIHtcclxuICAgICAgICBhc3luY1RpbWVyID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jRmx1c2gsIDApO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHB1Ymxpc2gocHJvbWlzZSkge1xyXG4gICAgcHJvbWlzZS5fdGhlbiA9IHByb21pc2UuX3RoZW4uZm9yRWFjaChpbnZva2VDYWxsYmFjayk7XHJcbn1cclxuZnVuY3Rpb24gaW52b2tlQ2FsbGJhY2soc3Vic2NyaWJlcikge1xyXG4gICAgdmFyIG93bmVyID0gc3Vic2NyaWJlci5vd25lcjtcclxuICAgIHZhciBzZXR0bGVkID0gb3duZXIuX3N0YXRlO1xyXG4gICAgdmFyIHZhbHVlID0gb3duZXIuX2RhdGE7XHJcbiAgICB2YXIgY2FsbGJhY2sgPSBzZXR0bGVkID09IHN0YXRlcy5mdWxmaWxsZWQgPyBzdWJzY3JpYmVyLmZ1bGZpbGxlZCA6IHN1YnNjcmliZXIucmVqZWN0ZWQ7XHJcbiAgICB2YXIgcHJvbWlzZSA9IHN1YnNjcmliZXIudGhlbjtcclxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBzZXR0bGVkID0gc3RhdGVzLmZ1bGZpbGxlZDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigoc2V0dGxlZCA9PSBzdGF0ZXMuZnVsZmlsbGVkID8gXCJSZXNvbHZlXCIgOiBcIlJlamVjdFwiKSArICcgbm90IGltcGxlbWVudGVkJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWhhbmRsZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlKSkge1xyXG4gICAgICAgIGlmIChzZXR0bGVkID09PSBzdGF0ZXMuZnVsZmlsbGVkKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2V0dGxlZCA9PT0gc3RhdGVzLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGludm9rZVJlc29sdmVyKHJlc29sdmVyLCBwcm9taXNlKSB7XHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSkge1xyXG4gICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcclxuICAgICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVzb2x2ZXIocmVzb2x2ZVByb21pc2UsIHJlamVjdFByb21pc2UpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICByZWplY3RQcm9taXNlKGUpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcclxuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSB8fCAhaGFuZGxlVGhlbmFibGUocHJvbWlzZSwgdmFsdWUpKSB7XHJcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xyXG4gICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBzdGF0ZXMucGVuZGluZykge1xyXG4gICAgICAgIHByb21pc2UuX3N0YXRlID0gc3RhdGVzLnNldHRsZWQ7XHJcbiAgICAgICAgcHJvbWlzZS5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIGFzeW5jQ2FsbChwdWJsaXNoRnVsZmlsbG1lbnQsIHByb21pc2UpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlamVjdChwcm9taXNlLCByZWFzb24pIHtcclxuICAgIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gc3RhdGVzLnBlbmRpbmcpIHtcclxuICAgICAgICBwcm9taXNlLl9zdGF0ZSA9IHN0YXRlcy5zZXR0bGVkO1xyXG4gICAgICAgIHByb21pc2UuX2RhdGEgPSByZWFzb247XHJcbiAgICAgICAgYXN5bmNDYWxsKHB1Ymxpc2hSZWplY3Rpb24sIHByb21pc2UpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHB1Ymxpc2hGdWxmaWxsbWVudChwcm9taXNlKSB7XHJcbiAgICBwcm9taXNlLl9zdGF0ZSA9IHN0YXRlcy5mdWxmaWxsZWQ7XHJcbiAgICBwdWJsaXNoKHByb21pc2UpO1xyXG59XHJcbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xyXG4gICAgcHJvbWlzZS5fc3RhdGUgPSBzdGF0ZXMucmVqZWN0ZWQ7XHJcbiAgICBwdWJsaXNoKHByb21pc2UpO1xyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlKSB7XHJcbiAgICB2YXIgcmVzb2x2ZWQgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlICYmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICAgICAgLy8gdGhlbiBzaG91bGQgYmUgcmV0cmlldmVkIG9ubHkgb25jZVxyXG4gICAgICAgICAgICB2YXIgdGhlbiA9IHZhbHVlLnRoZW47XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNvbHZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9PT0gdmFsKSA/IGZ1bGZpbGwocHJvbWlzZSwgdmFsKSA6IHJlc29sdmUocHJvbWlzZSwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNvbHZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmICghcmVzb2x2ZWQpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHByb21pc2UsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG52YXIgUHJvbWlzZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlcy5wZW5kaW5nO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3RoZW4gPSBbXTtcclxuICAgICAgICBpbnZva2VSZXNvbHZlcihyZXNvbHZlciwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBQcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKSB7XHJcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSB7XHJcbiAgICAgICAgICAgIG93bmVyOiB0aGlzLFxyXG4gICAgICAgICAgICB0aGVuOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoKSB7IH0pLFxyXG4gICAgICAgICAgICBmdWxmaWxsZWQ6IG9uZnVsZmlsbGVkLFxyXG4gICAgICAgICAgICByZWplY3RlZDogb25yZWplY3RlZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKChvbnJlamVjdGVkIHx8IG9uZnVsZmlsbGVkKSAmJiAhdGhpcy5faGFuZGxlZClcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBzdGF0ZXMuZnVsZmlsbGVkIHx8IHRoaXMuX3N0YXRlID09PSBzdGF0ZXMucmVqZWN0ZWQpXHJcbiAgICAgICAgICAgIC8vIGFscmVhZHkgcmVzb2x2ZWQsIGNhbGwgY2FsbGJhY2sgYXN5bmNcclxuICAgICAgICAgICAgYXN5bmNDYWxsKGludm9rZUNhbGxiYWNrLCBzdWJzY3JpYmVyKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIC8vIHN1YnNjcmliZVxyXG4gICAgICAgICAgICB0aGlzLl90aGVuLnB1c2goc3Vic2NyaWJlcik7XHJcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIudGhlbjtcclxuICAgIH07XHJcbiAgICBQcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKG9ucmVqZWN0ZWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9ucmVqZWN0ZWQpO1xyXG4gICAgfTtcclxuICAgIFByb21pc2UuYWxsID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb21pc2VzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIFByb21pc2UuYWxsKCkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSAwO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlcihpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nKys7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcmVtYWluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcHJvbWlzZTsgaSA8IHByb21pc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAmJiB0eXBlb2YgcHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc29sdmVyKGkpLCByZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tpXSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZW1haW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICBQcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvbWlzZXMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gUHJvbWlzZS5yYWNlKCkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBwcm9taXNlOyBpIDwgcHJvbWlzZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICYmIHR5cGVvZiBwcm9taXNlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICByZXR1cm4gUHJvbWlzZTtcclxufSgpKTtcclxuZXhwb3J0cy5Qcm9taXNlID0gUHJvbWlzZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcbnZhciBUcmFuc2Zvcm1lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRyYW5zZm9ybWVyKHNldHRpbmdzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnJlc2VydmVkV29yZHMgPSBbJ2Z1bmN0aW9uJywgJ2ZvcicsICd2YXInLCAndGhpcycsICdzZWxmJywgJ251bGwnXTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIlRyYW5zZm9ybWVyXCI7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzID8gX19hc3NpZ24oe30sIHNldHRpbmdzLCB7IGluZGVudDogc2V0dGluZ3MuaW5kZW50IHx8ICdcXHQnLCBjb21wYWN0OiBzZXR0aW5ncy5jb21wYWN0IHx8IGZhbHNlLCBtb2R1bGU6IHNldHRpbmdzLm1vZHVsZSB8fCB0eXBlc18xLk1vZHVsZVN5c3RlbS5Ob25lLCBuYW1lZEV4cG9ydHM6IHNldHRpbmdzLm5hbWVkRXhwb3J0cyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNldHRpbmdzLm5hbWVkRXhwb3J0cyB9KSA6IHsgbW9kdWxlOiB0eXBlc18xLk1vZHVsZVN5c3RlbS5FUyB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2VycyA9IHRoaXMuc2V0dGluZ3MucGFyc2VycyB8fCB7fTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIucmVxdWlyZVwiXSA9IHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5pbXBvcnRcIl0gPSBmdW5jdGlvbiAob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHsgcmV0dXJuIF90aGlzLmxvYWRNb2R1bGUoX3RoaXMucHJvY2VzcyhvYmpbXCIuaW1wb3J0XCJdIHx8IG9ialtcIi5yZXF1aXJlXCJdLCBmYWxzZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCksIHBhcnNlU2V0dGluZ3MsIG9mZnNldCk7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmZ1bmN0aW9uXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBcImZ1bmN0aW9uIFwiICsgKG9ialtcIi5mdW5jdGlvblwiXSA/IG9ialtcIi5mdW5jdGlvblwiXSA6IFwiXCIpICsgXCIoXCIgKyAob2JqW1wiYXJndW1lbnRzXCJdID8gX3RoaXMucHJvY2VzcyhvYmpbXCJhcmd1bWVudHNcIl0sIGZhbHNlLCB0cnVlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIDogXCJcIikgKyBcIil7IHJldHVybiBcIiArIF90aGlzLnByb2Nlc3Mob2JqW1wicmV0dXJuXCJdLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiIH1cIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIubWFwXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBfdGhpcy5wcm9jZXNzKG9ialtcIi5tYXBcIl0sIGZhbHNlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiLm1hcChmdW5jdGlvbihcIiArIG9ialtcImFyZ3VtZW50c1wiXSArIFwiKSB7cmV0dXJuIFwiICsgKHNldHRpbmdzICYmIHNldHRpbmdzLmluZGVudCA/IG5ldyBBcnJheShvZmZzZXQpLmpvaW4oJyAnKSA6IFwiXCIpICsgX3RoaXMucHJvY2VzcyhvYmpbXCJyZXR1cm5cIl0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIgfSlcIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuZmlsdGVyXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBfdGhpcy5wcm9jZXNzKG9ialtcIi5maWx0ZXJcIl0sIGZhbHNlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiLmZpbHRlcihmdW5jdGlvbihcIiArIG9ialtcImFyZ3VtZW50c1wiXSArIFwiKSB7cmV0dXJuIFwiICsgX3RoaXMucHJvY2VzcyhvYmpbXCJjb25kaXRpb25cIl0sIHRydWUsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIgfSlcIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuY2FsbFwiXSA9IGZ1bmN0aW9uIChvYmosIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgeyByZXR1cm4gX3RoaXMucHJvY2VzcyhvYmpbXCIuY2FsbFwiXSwgZmFsc2UsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIuY2FsbChcIiArIChvYmpbXCJhcmd1bWVudHNcIl0gPyBfdGhpcy5wcm9jZXNzKG9ialtcImFyZ3VtZW50c1wiXSwgZmFsc2UsIHRydWUsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgOiBcIlwiKSArIFwiKVwiOyB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5leGVjXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBfdGhpcy5wcm9jZXNzKG9ialtcIi5leGVjXCJdLCB0cnVlLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSArIFwiKFwiICsgKG9ialtcImFyZ3VtZW50c1wiXSA/IF90aGlzLnByb2Nlc3Mob2JqW1wiYXJndW1lbnRzXCJdLCB0cnVlLCB0cnVlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIDogXCJcIikgKyBcIilcIjsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIubmV3XCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7IHJldHVybiBcIm5ldyBcIiArIF90aGlzLnByb2Nlc3Mob2JqW1wiLm5ld1wiXSwgdHJ1ZSwgZmFsc2UsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyBcIihcIiArIChvYmpbXCJhcmd1bWVudHNcIl0gPyBfdGhpcy5wcm9jZXNzKG9ialtcImFyZ3VtZW50c1wiXSwgdHJ1ZSwgdHJ1ZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSA6IFwiXCIpICsgXCIpXCI7IH07XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmlkXCJdID0gdGhpcy5zZXR0aW5ncy5wYXJzZXJzW1wiLmNvZGVcIl0gPSBmdW5jdGlvbiAob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHsgcmV0dXJuIG9ialtcIi5jb2RlXCJdIHx8IG9ialtcIi5pZFwiXTsgfTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnBhcnNlcnNbXCIuYXBwXCJdID0gZnVuY3Rpb24gKG9iaiwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBvYmoyID0ge307XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGtleXMpXHJcbiAgICAgICAgICAgICAgICBvYmoyW2tleXNba2V5XSA9PSBcIi5hcHBcIiA/IFwibWFpblwiIDoga2V5c1trZXldXSA9IG9ialtrZXlzW2tleV1dO1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvY2Vzcyh7IFwiLm5ld1wiOiB7IFwiLnJlcXVpcmVcIjogXCJAYXBwZmlicmUvanN0I0FwcFwiIH0sIFwiYXJndW1lbnRzXCI6IFtvYmoyXSB9LCB0cnVlLCB0cnVlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgXCIucnVuKClcIjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1tcIi5cIl0gPSBmdW5jdGlvbiAob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHsgcmV0dXJuIG9ialtcIi5cIl07IH07XHJcbiAgICB9XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUubG9hZE1vZHVsZSA9IGZ1bmN0aW9uICh2YWwsIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciBtID0gdmFsLmluZGV4T2YoJyMnKSA+IDAgPyB2YWwuc3Vic3RyKDAsIHZhbC5pbmRleE9mKCcjJykpIDogdmFsO1xyXG4gICAgICAgIGlmICh2YWxbMF0gPT09IFwiflwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5wcm9jZXNzKHsgXCIuZnVuY3Rpb25cIjogbnVsbCwgYXJndW1lbnRzOiBcImxvYWRlclwiLCBcInJldHVyblwiOiB7IFwiLmNvZGVcIjogXCJsb2FkZXIubG9hZCgnXCIgKyAobVsxXSA9PT0gXCIvXCIgPyAnLicgOiAnJykgKyBtLnN1YnN0cigxKSArIFwiJylcIiArICh2YWwubGVuZ3RoID4gbS5sZW5ndGggPyB2YWwuc3Vic3RyaW5nKG0ubGVuZ3RoKS5yZXBsYWNlKCcjJywgJy4nKSA6ICcnKSArIFwiO1wiIH0gfSwgZmFsc2UsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tb2R1bGUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZXNfMS5Nb2R1bGVTeXN0ZW0uRVMudG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgbSA9IHZhbC5pbmRleE9mKCcjJywgbS5sZW5ndGggKyAyKSA+IC0xID8gdmFsLnN1YnN0cigwLCB2YWwuaW5kZXhPZignIycsIG0ubGVuZ3RoICsgMikgLSAxKSA6IHZhbDtcclxuICAgICAgICBpZiAocGFyc2VTZXR0aW5ncy5pbXBvcnRzLmluZGV4T2YobSkgPT09IC0xKVxyXG4gICAgICAgICAgICBwYXJzZVNldHRpbmdzLmltcG9ydHMucHVzaChtKTtcclxuICAgICAgICByZXR1cm4gXCJfXCIgKyBwYXJzZVNldHRpbmdzLmltcG9ydHMuaW5kZXhPZihtKSArICh2YWwubGVuZ3RoID4gbS5sZW5ndGggPyB2YWwuc3Vic3RyaW5nKG0ubGVuZ3RoKS5yZXBsYWNlKCcjJywgJy4nKSA6ICcnKTtcclxuICAgIH07XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGxpbmVzLCBwYXJzZVNldHRpbmdzLCBpbmRlbnQpIHtcclxuICAgICAgICB2YXIgbHQgPSB0aGlzLnNldHRpbmdzLmNvbXBhY3QgPyBcIlwiIDogXCJcXG5cIjtcclxuICAgICAgICB2YXIgdGFiID0gdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gXCJcIiA6IHRoaXMuc2V0dGluZ3MuaW5kZW50IHx8IFwiXFx0XCI7XHJcbiAgICAgICAgcmV0dXJuIGx0ICsgbmV3IEFycmF5KGluZGVudCArIDEpLmpvaW4odGFiKSArIGxpbmVzLmpvaW4oXCIsXCIgKyBsdCArIG5ldyBBcnJheShpbmRlbnQgKyAxKS5qb2luKHRhYikpICsgbHQgKyBuZXcgQXJyYXkoaW5kZW50KS5qb2luKHRhYik7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNmb3JtZXIucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAob2JqLCBlc2MsIGV0LCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBvdXRwdXQ7XHJcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbClcclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJudWxsXCI7XHJcbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxyXG4gICAgICAgICAgICBvdXRwdXQgPSAoZXQgPyBcIlwiIDogXCJbXCIpICsgdGhpcy5mb3JtYXQob2JqLm1hcChmdW5jdGlvbiAoZSwgaSkgeyByZXR1cm4gX3RoaXMucHJvY2VzcyhlLCBlc2MsIGZhbHNlLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQgKyAxKTsgfSksIHBhcnNlU2V0dGluZ3MsIG9mZnNldCkgKyAoZXQgPyBcIlwiIDogXCJdXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4ga2V5cylcclxuICAgICAgICAgICAgICAgIGlmICghcHJvY2Vzc2VkICYmIGtleXNba10ubGVuZ3RoID4gMCAmJiBrZXlzW2tdLmNoYXJBdCgwKSA9PSAnLicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5wYXJzZXJzICYmIHRoaXMuc2V0dGluZ3MucGFyc2Vyc1trZXlzW2tdXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSB0aGlzLnNldHRpbmdzLnBhcnNlcnNba2V5c1trXV0ob2JqLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBsb2NhdGUgcGFyc2VyIFwiICsga2V5c1trXS5zdWJzdHIoMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXByb2Nlc3NlZClcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IChldCA/IFwiXCIgOiBcIntcIikgKyB0aGlzLmZvcm1hdChrZXlzLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gay5sZW5ndGggPCAyIHx8IGsuc3Vic3RyKDAsIDIpICE9ICcuLic7IH0pLm1hcChmdW5jdGlvbiAoaywgaSkgeyByZXR1cm4gKF90aGlzLnJlc2VydmVkV29yZHMuaW5kZXhPZihrKSA+IC0xID8gXCJcXFwiXCIgKyBrICsgXCJcXFwiXCIgOiBrKSArIFwiOlwiICsgKF90aGlzLnNldHRpbmdzLmNvbXBhY3QgPyAnJyA6ICcgJykgKyBfdGhpcy5wcm9jZXNzKG9ialtrXSwgZXNjLCBmYWxzZSwgcGFyc2VTZXR0aW5ncywgb2Zmc2V0ICsgMSk7IH0pLCBwYXJzZVNldHRpbmdzLCBvZmZzZXQpICsgKGV0ID8gXCJcIiA6IFwifVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSAvLyBvYmplY3Qgbm90IEpTT04uLi5cclxuICAgICAgICAgICAgb3V0cHV0ID0gb2JqLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBvdXRwdXQgPSB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiICYmIGVzYyA/IEpTT04uc3RyaW5naWZ5KG9iaikgOiBvYmo7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH07XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUucHJvY2Vzc0V4cG9ydHMgPSBmdW5jdGlvbiAob3V0cHV0LCBvYmopIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICB2YXIgdmFsaWRrZXlzID0ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGsuaW5kZXhPZignICcpID09PSAtMSAmJiBrLmluZGV4T2YoJy8nKSA9PT0gLTEgJiYgay5pbmRleE9mKCctJykgPT09IC0xICYmIF90aGlzLnJlc2VydmVkV29yZHMuaW5kZXhPZihrKSA9PT0gLTE7IH0pO1xyXG4gICAgICAgIHZhciBpc0RlZmF1bHQgPSBrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSAnZGVmYXVsdCc7XHJcbiAgICAgICAgdmFyIG5sID0gdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gJycgOiAnXFxuJztcclxuICAgICAgICB2YXIgc3AgPSB0aGlzLnNldHRpbmdzLmNvbXBhY3QgPyAnJyA6ICcgJztcclxuICAgICAgICB2YXIgdnIgPSB0aGlzLnNldHRpbmdzLnByZWZlckNvbnN0ID8gJ2NvbnN0JyA6ICd2YXInO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy5tb2R1bGUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlIFwidW1kXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb21tb25qc1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiY2pzXCI6XHJcbiAgICAgICAgICAgICAgICAvL2ZvciAodmFyIHJlcSBpbiByKSBvdXRwdXQuY29kZSArPSBgJHt2cn0gXyR7cltyZXFdfSR7c3B9PSR7c3B9cmVxdWlyZSgnJHtyZXF9Jyk7JHtubH1gO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgKz0ga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gXCJtb2R1bGUuZXhwb3J0c1snXCIgKyBrZXkgKyBcIiddXCIgKyBzcCArIFwiPVwiICsgc3AgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAwKSArIFwiO1wiOyB9KS5qb2luKG5sKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNEZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlICs9IG5sICsgXCJtb2R1bGUuZXhwb3J0c1snZGVmYXVsdCddXCIgKyBzcCArIFwiPVwiICsgc3AgKyBcIntcIiArIHNwICsga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5ICsgXCI6IFwiICsgX3RoaXMucHJvY2VzcyhvYmpba2V5XSwgdHJ1ZSwgZmFsc2UsIG91dHB1dCwgMCk7IH0pLmpvaW4obmwpICsgXCIgfTtcIjtcclxuICAgICAgICAgICAgICAgIGlmIChvdXRwdXQubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSArPSBubCArIFwibW9kdWxlLmV4cG9ydHNbJ19fanN0J10gPSAnXCIgKyBuYW1lICsgXCI7XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVzXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlICs9IFwiZXhwb3J0IGRlZmF1bHRcIiArIHNwICsgdGhpcy5wcm9jZXNzKG9ialtcImRlZmF1bHRcIl0sIHRydWUsIGZhbHNlLCBvdXRwdXQsIDApICsgXCI7XCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSArPSBcImV4cG9ydCBkZWZhdWx0XCIgKyBzcCArIFwie1wiICsgdGhpcy5mb3JtYXQoa2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsaWRrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEgPyBcIlxcXCJcIiArIGtleSArIFwiXFxcIjogXCIgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAwKSA6IGtleSArIFwiOlwiICsgc3AgKyAoX3RoaXMuc2V0dGluZ3MubmFtZWRFeHBvcnRzID8ga2V5IDogX3RoaXMucHJvY2VzcyhvYmpba2V5XSwgdHJ1ZSwgZmFsc2UsIG91dHB1dCwgMikpOyB9KSwgb3V0cHV0LCAxKSArIFwifTtcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5uYW1lZEV4cG9ydHMgJiYgdmFsaWRrZXlzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlID0gdmFsaWRrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBcImV4cG9ydCBcIiArIHZyICsgXCIgXCIgKyBrZXkgKyBzcCArIFwiPVwiICsgc3AgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAxKSArIFwiO1wiOyB9KS5qb2luKG5sKSArIChcIlwiICsgKG5sICsgb3V0cHV0LmNvZGUgKyBubCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAob3V0cHV0Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgKz0gXCJyZXR1cm4gXCIgKyAoaXNEZWZhdWx0ID8gXCJ7J2RlZmF1bHQnIDogXCIgKyB0aGlzLnByb2Nlc3Mob2JqW1wiZGVmYXVsdFwiXSwgdHJ1ZSwgZmFsc2UsIG91dHB1dCwgMSkgKyBcIiwgXFxcIl9fanN0XFxcIjogXFxcIlwiICsgb3V0cHV0Lm5hbWUgKyBcIlxcXCJ9XCIgOiBcIntcIiArIHRoaXMuZm9ybWF0KGtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbGlka2V5cy5pbmRleE9mKGtleSkgPT09IC0xID8gXCJcXFwiXCIgKyBrZXkgKyBcIlxcXCI6IFwiICsgX3RoaXMucHJvY2VzcyhvYmpba2V5XSwgdHJ1ZSwgZmFsc2UsIG91dHB1dCwgMSkgOiBrZXkgKyBcIjpcIiArIHNwICsgX3RoaXMucHJvY2VzcyhvYmpba2V5XSwgdHJ1ZSwgZmFsc2UsIG91dHB1dCwgMik7IH0pLCBvdXRwdXQsIDEpICsgXCIsIFxcXCJfX2pzdFxcXCI6IFxcXCJcIiArIG91dHB1dC5uYW1lICsgXCJcXFwifVwiKSArIChvdXRwdXQubmFtZS5pbmRleE9mKCcjJykgPiAtMSA/IG91dHB1dC5uYW1lLnNsaWNlKG91dHB1dC5uYW1lLmluZGV4T2YoJyMnKSArIDEpLnNwbGl0KCcjJykubWFwKGZ1bmN0aW9uIChwKSB7IHJldHVybiBcIlsnXCIgKyBwICsgXCInXVwiOyB9KSA6ICcnKSArIFwiO1wiO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlICs9IFwicmV0dXJuIFwiICsgKGlzRGVmYXVsdCA/IHRoaXMucHJvY2VzcyhvYmpbXCJkZWZhdWx0XCJdLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAxKSA6IFwie1wiICsgdGhpcy5mb3JtYXQoa2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsaWRrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEgPyBcIlxcXCJcIiArIGtleSArIFwiXFxcIjogXCIgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAxKSA6IGtleSArIFwiOlwiICsgc3AgKyBfdGhpcy5wcm9jZXNzKG9ialtrZXldLCB0cnVlLCBmYWxzZSwgb3V0cHV0LCAyKTsgfSksIG91dHB1dCwgMSkgKyBcIn1cIikgKyBcIjtcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgVHJhbnNmb3JtZXIucHJvdG90eXBlLnByb2Nlc3NJbXBvcnRzID0gZnVuY3Rpb24gKG91dHB1dCwgbmFtZSkge1xyXG4gICAgICAgIHZhciBubCA9IHRoaXMuc2V0dGluZ3MuY29tcGFjdCA/ICcnIDogJ1xcbic7XHJcbiAgICAgICAgdmFyIHNwID0gdGhpcy5zZXR0aW5ncy5jb21wYWN0ID8gJycgOiAnICc7XHJcbiAgICAgICAgdmFyIHZyID0gdGhpcy5zZXR0aW5ncy5wcmVmZXJDb25zdCA/ICdjb25zdCcgOiAndmFyJztcclxuICAgICAgICB2YXIgcyA9IHt9O1xyXG4gICAgICAgIHZhciByID0ge307XHJcbiAgICAgICAgdmFyIHMyID0ge307XHJcbiAgICAgICAgdmFyIHIyID0ge307XHJcbiAgICAgICAgaWYgKG91dHB1dC5pbXBvcnRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0cHV0LmltcG9ydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHQgPSBvdXRwdXQuaW1wb3J0c1tpXVswXSA9PT0gXCJ+XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAob3V0cHV0LmltcG9ydHNbaV0uaW5kZXhPZignIycpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kdWxlX25hbWUgPSBvdXRwdXQuaW1wb3J0c1tpXS5zdWJzdHIoMCwgb3V0cHV0LmltcG9ydHNbaV0uaW5kZXhPZignIycpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGV4dCA/IHMyIDogcylbbW9kdWxlX25hbWVdID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChleHQgPyBzMiA6IHMpW21vZHVsZV9uYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIChleHQgPyBzMiA6IHMpW21vZHVsZV9uYW1lXVtvdXRwdXQuaW1wb3J0c1tpXS5zdWJzdHIobW9kdWxlX25hbWUubGVuZ3RoICsgMSldID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAoZXh0ID8gcjIgOiByKVtvdXRwdXQuaW1wb3J0c1tpXV0gPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLm1vZHVsZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1bWRcIjpcclxuICAgICAgICAgICAgY2FzZSBcImNvbW1vbmpzXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJjanNcIjpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHJlcSBpbiByKVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlID0gdnIgKyBcIiBfXCIgKyByW3JlcV0gKyBzcCArIFwiPVwiICsgc3AgKyBcInJlcXVpcmUoXFxcIlwiICsgcmVxICsgXCJcXFwiKTtcIiArIG5sICsgb3V0cHV0LmNvZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImFtZFwiOlxyXG4gICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgPSBcImRlZmluZShcIiArIChPYmplY3Qua2V5cyhyKS5sZW5ndGggPiAwID8gXCJbXCIgKyBPYmplY3Qua2V5cyhyKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gXCInXCIgKyBrZXkgKyBcIidcIjsgfSkuam9pbihcIiwgXCIpICsgXCJdLCBcIiA6ICcnKSArIFwiZnVuY3Rpb24gKFwiICsgT2JqZWN0LmtleXMocikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICdfJyArIHJba2V5XTsgfSkuam9pbihcIiwgXCIpICsgXCIpIHsgXCIgKyBvdXRwdXQuY29kZSArIFwiIH0pO1wiICsgbmw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVzXCI6XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSA9IE9iamVjdC5rZXlzKHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBcImltcG9ydCB7XCIgKyBPYmplY3Qua2V5cyhzW2tleV0pLm1hcChmdW5jdGlvbiAoaykgeyByZXR1cm4gayArIFwiIGFzIF9cIiArIHNba2V5XVtrXTsgfSkuam9pbignLCcgKyBzcCkgKyBcIn0gZnJvbSAnXCIgKyBrZXkgKyBcIic7XCIgKyBubDsgfSkuam9pbignJykgKyBPYmplY3Qua2V5cyhyKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gXCJpbXBvcnQgKiBhcyBfXCIgKyByW2tleV0gKyBcIiBmcm9tICdcIiArIGtleS5zdWJzdHIoa2V5WzBdID09IFwiflwiID8gMSA6IDApICsgXCInO1wiICsgbmw7IH0pLmpvaW4oJycpICsgb3V0cHV0LmNvZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHJlcSBpbiByKVxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5jb2RlID0gdnIgKyBcIiBfXCIgKyByW3JlcV0gKyBzcCArIFwiPVwiICsgc3AgKyBcInJlcXVpcmUoXFxcIlwiICsgcmVxICsgXCJcXFwiKTtcIiArIG5sICsgb3V0cHV0LmNvZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzMikubGVuZ3RoID4gMCB8fCBPYmplY3Qua2V5cyhyMikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvKm91dHB1dC5jb2RlICs9ICc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OycgKyBKU09OLnN0cmluZ2lmeShzMikgKyAnICcgKyBKU09OLnN0cmluZ2lmeShyMik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnJ1bnRpbWVNb2R1bGUpXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSArPSB0aGlzLnNldHRpbmdzLnJ1bnRpbWVNb2R1bGU7Ki9cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLnJ1bnRpbWVNb2R1bGUgPyB0aGlzLnNldHRpbmdzLnJ1bnRpbWVNb2R1bGUudG9Mb3dlckNhc2UoKSA6IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidW1kXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjanNcIjpcclxuICAgICAgICAgICAgICAgICAgICAvL3Rocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShzMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHJlcSBpbiByMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgPSB2ciArIFwiIF9cIiArIHIyW3JlcV0gKyBzcCArIFwiPVwiICsgc3AgKyBcInJlcXVpcmUoXFxcIlwiICsgcmVxICsgXCJcXFwiKTtcIiArIG5sICsgb3V0cHV0LmNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYW1kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmNvZGUgPSBcImRlZmluZShcIiArIChPYmplY3Qua2V5cyhyMikubGVuZ3RoID4gMCA/IFwiW1wiICsgT2JqZWN0LmtleXMocikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIFwiJ1wiICsga2V5ICsgXCInXCI7IH0pLmpvaW4oXCIsIFwiKSArIFwiXSwgXCIgOiAnJykgKyBcImZ1bmN0aW9uIChcIiArIE9iamVjdC5rZXlzKHIyKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gJ18nICsgcjJba2V5XTsgfSkuam9pbihcIiwgXCIpICsgXCIpIHsgXCIgKyBvdXRwdXQuY29kZSArIFwiIH0pO1wiICsgbmw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXNcIjpcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSA9IE9iamVjdC5rZXlzKHMyKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gXCJpbXBvcnQge1wiICsgT2JqZWN0LmtleXMoczJba2V5XSkubWFwKGZ1bmN0aW9uIChrKSB7IHJldHVybiBrLnN1YnN0cigxKSArIFwiIGFzIF9cIiArIHNba2V5XVtrXTsgfSkuam9pbignLCcgKyBzcCkgKyBcIn0gZnJvbSAnXCIgKyBrZXkuc3Vic3RyKDEpICsgXCInO1wiICsgbmw7IH0pLmpvaW4oJycpICsgT2JqZWN0LmtleXMocjIpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBcImltcG9ydCAqIGFzIF9cIiArIHIyW2tleV0gKyBcIiBmcm9tICdcIiArIGtleS5zdWJzdHIoMSkgKyBcIic7XCIgKyBubDsgfSkuam9pbignJykgKyBvdXRwdXQuY29kZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcmVxIGluIHIyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQuY29kZSA9IHZyICsgXCIgX1wiICsgcjJbcmVxXSArIHNwICsgXCI9XCIgKyBzcCArIFwicmVxdWlyZShcXFwiXCIgKyByZXEgKyBcIlxcXCIpO1wiICsgbmwgKyBvdXRwdXQuY29kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUuYnVuZGxlTW9kdWxlID0gZnVuY3Rpb24gKG9iaiwgbmFtZSkge1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSB7IG5hbWU6IG5hbWUsIGltcG9ydHM6IFtdLCBleHBvcnRzOiB7fSwgY29tcG9zaXRlT2JqZWN0OiBmYWxzZSwgY29kZTogJycgfTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NFeHBvcnRzKG91dHB1dCwgb2JqKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NJbXBvcnRzKG91dHB1dCwgbmFtZSB8fCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH07XHJcbiAgICBUcmFuc2Zvcm1lci5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKGlucHV0LCBuYW1lKSB7XHJcbiAgICAgICAgdmFyIG9iajtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBvYmogPSB0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIgPyBKU09OLnBhcnNlKGlucHV0KSA6IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuc2V0dGluZ3MpKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGFuZ2Vyb3VzbHlQcm9jZXNzSmF2YVNjcmlwdCB8fCB0aGlzLnNldHRpbmdzLmRhbmdlcm91c2x5UHJvY2Vzc0phdmFTY3JpcHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSBGdW5jdGlvbihcInJldHVybiAoXCIgKyBpbnB1dCArIFwiKTtcIikoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kYW5nZXJvdXNseVByb2Nlc3NKYXZhU2NyaXB0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IFwiICsgKG5hbWUgfHwgJycpICsgXCIgaXMgbm90IEpTT04gY29tcGxpYW50OiBcIiArIGUubWVzc2FnZSArIFwiLiAgU2V0IG9wdGlvbiBcXFwiZGFuZ2Vyb3VzbHlQcm9jZXNzSmF2YVNjcmlwdFxcXCIgdG8gdHJ1ZSB0byBoaWRlIHRoaXMgbWVzc2FnZS5cXHJcXG5cIiArIGlucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHByb2Nlc3MgXCIgKyAobmFtZSB8fCAnJykgKyBcIiBhcyBKYXZhU2NyaXB0OiBcIiArIGYubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHBhcnNlIEpTT04gZmlsZSBcIiArIChuYW1lIHx8ICcnKSArIFwiOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1bmRsZU1vZHVsZShBcnJheS5pc0FycmF5KG9iaikgfHwgdHlwZW9mIChvYmogfHwgJycpICE9PSAnb2JqZWN0JyB8fCBPYmplY3Qua2V5cyhvYmopLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4ga1swXSA9PSAnLic7IH0pLmxlbmd0aCA+IDAgPyB7IFwiZGVmYXVsdFwiOiBvYmogfSA6IG9iaiwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byB0cmFuc2Zvcm0ganMgdGVtcGxhdGU6IFwiICsgZS5tZXNzYWdlICsgXCJcXHJcXG5cIiArIGUuc3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gVHJhbnNmb3JtZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVHJhbnNmb3JtZXIgPSBUcmFuc2Zvcm1lcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XHJcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xyXG52YXIgV2ViVUkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBXZWJVSShhcHApIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcIlVJXCI7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgdGhpcy5hcHAub3B0aW9ucyA9IHRoaXMuYXBwLm9wdGlvbnMgfHwge307XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdywgXCJwcmVhY3RcIikgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3csIFwiUmVhY3RcIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0VsZW1lbnRJbnRlcm5hbCA9IG9iai52YWx1ZS5oIHx8IG9iai52YWx1ZS5jcmVhdGVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29tcG9uZW50ID0gb2JqLnZhbHVlLkNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckludGVybmFsID0gb2JqLnZhbHVlLnJlbmRlciB8fCAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3csIFwiUmVhY3RET01cIikgfHwgeyB2YWx1ZTogbnVsbCB9KS52YWx1ZS5yZW5kZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvL1RPRE86IGZpbmQgYSB3b3JrYXJvdW5kLiBpbiBOb2RlSlMgUmVmZXJlbmNlRXJyb3I6IHdpbmRvdyBpcyBub3QgZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFdlYlVJLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodWksIHBhcmVudCwgbWVyZ2VXaXRoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVuZGVySW50ZXJuYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHAuc2VydmljZXMubG9nZ2VyLmxvZy5jYWxsKHRoaXMsIHR5cGVzXzEuTG9nTGV2ZWwuVHJhY2UsIFwiV2ViVUkucmVuZGVyXCIsIFt1aV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJJbnRlcm5hbCh1aSwgcGFyZW50LCBtZXJnZVdpdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYXBwLnNlcnZpY2VzLmxvZ2dlci5sb2cuY2FsbCh0aGlzLCB0eXBlc18xLkxvZ0xldmVsLkVycm9yLCBcIlVuYWJsZSB0byByZW5kZXIgVUkgLSBObyBVSSBmcmFtZXdvcmsgZGV0ZWN0ZWQuIFxcbkVuc3VyZSB0aGF0IHlvdSBoYXZlIHJlZmVyZW5jZWQgYSBVSSBmcmFtZXdvcmsgYmVmb3JlIGV4ZWN1dGluZyB0aGUgYXBwbGljYXRpb24sIG9yIHNwZWNpZnkgdXNpbmcgYXBwLnNlcnZpY2VzLlVJXCIpO1xyXG4gICAgfTtcclxuICAgIFdlYlVJLnByb3RvdHlwZS5wcm9jZXNzRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBkZXB0aCwgaW5kZXgpIHtcclxuICAgICAgICBpZiAoZGVwdGggJSAyID09PSAwICYmIHR5cGVvZiBlbGVtZW50ICE9PSBcInN0cmluZ1wiICYmICFBcnJheS5pc0FycmF5KGVsZW1lbnQpKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGlsZCBlbGVtZW50IFsyXSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFycmF5XCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKGRlcHRoICUgMiA9PT0gMCAmJiBpbmRleCAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkoZWxlbWVudCkgJiYgdHlwZW9mIGVsZW1lbnRbMV0gPT09IFwib2JqZWN0XCIgJiYgIWVsZW1lbnRbMV0ua2V5KVxyXG4gICAgICAgICAgICBlbGVtZW50WzFdLmtleSA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybiBkZXB0aCAlIDIgPT09IDEgfHwgIXRoaXMucHJvY2Vzc0VsZW1lbnRJbnRlcm5hbCB8fCAhQXJyYXkuaXNBcnJheShlbGVtZW50KSA/IGVsZW1lbnQgOiB0aGlzLnByb2Nlc3NFbGVtZW50SW50ZXJuYWwuYXBwbHkodGhpcywgZWxlbWVudCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdlYlVJO1xyXG59KCkpO1xyXG5leHBvcnRzLldlYlVJID0gV2ViVUk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgTW9kdWxlU3lzdGVtO1xyXG4oZnVuY3Rpb24gKE1vZHVsZVN5c3RlbSkge1xyXG4gICAgTW9kdWxlU3lzdGVtW1wiTm9uZVwiXSA9IFwibm9uZVwiO1xyXG4gICAgTW9kdWxlU3lzdGVtW1wiQ29tbW9uSlNcIl0gPSBcImNvbW1vbmpzXCI7XHJcbiAgICBNb2R1bGVTeXN0ZW1bXCJBTURcIl0gPSBcImFtZFwiO1xyXG4gICAgTW9kdWxlU3lzdGVtW1wiVU1EXCJdID0gXCJ1bWRcIjtcclxuICAgIE1vZHVsZVN5c3RlbVtcIkVTXCJdID0gXCJlc1wiO1xyXG59KShNb2R1bGVTeXN0ZW0gPSBleHBvcnRzLk1vZHVsZVN5c3RlbSB8fCAoZXhwb3J0cy5Nb2R1bGVTeXN0ZW0gPSB7fSkpO1xyXG52YXIgTG9nTGV2ZWw7XHJcbihmdW5jdGlvbiAoTG9nTGV2ZWwpIHtcclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkV4Y2VwdGlvblwiXSA9IDFdID0gXCJFeGNlcHRpb25cIjtcclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiRXJyb3JcIl0gPSAyXSA9IFwiRXJyb3JcIjtcclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiV2FyblwiXSA9IDNdID0gXCJXYXJuXCI7XHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkluZm9cIl0gPSA0XSA9IFwiSW5mb1wiO1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJUcmFjZVwiXSA9IDVdID0gXCJUcmFjZVwiO1xyXG59KShMb2dMZXZlbCA9IGV4cG9ydHMuTG9nTGV2ZWwgfHwgKGV4cG9ydHMuTG9nTGV2ZWwgPSB7fSkpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIGpzdF8xID0gcmVxdWlyZShcIkBhcHBmaWJyZS9qc3RcIik7XHJcbm5ldyBqc3RfMS5BcHAoe1xyXG4gICAgbWFpbjogW1wiZGl2XCIsIG51bGwsIFwidGVzdFwiXVxyXG59KS5ydW4oKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==