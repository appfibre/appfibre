"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var components_1 = require("../components");
var types = __importStar(require("../types"));
function s_xa(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
function clone(a, b) { for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d)
        for (var e in d)
            s_xa(d, e) && (a[e] = d[e]);
} return a; }
function Inject(app, proxy) {
    var inj = clone(app);
    inj.services.UI.Component = proxy || components_1.BaseComponent(app) /*app.services.UI.Component*/;
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
        this.cache[".App"] = function inject(app) {
            return /** @class */ (function (_super) {
                __extends(Proxy, _super);
                //app:App;
                function Proxy(props, context) {
                    return _super.call(this, props, context) || this;
                    //this.app = new App(props);
                }
                Proxy.prototype.render = function () {
                    return _super.prototype.render.call(this, this.props.main);
                };
                return Proxy;
            }(components_1.BaseComponent(app)));
        };
    }
    Processor.prototype.Async = function () {
        this.async = this.async || components_1.Async(this.app);
        return this.async;
    };
    Processor.prototype.createClass = function (B, d) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = this;
                var b = _this = _super.call(this, arguments) || this;
                var i = typeof d === "function" ? d.call(b, b) : d;
                if (b !== undefined)
                    for (var p in b.__proto__)
                        if (!i[p])
                            i[p] = b[p];
                if (i["constructor"])
                    i.constructor.apply(i, arguments);
                return i;
            }
            return class_1;
        }(B));
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
        this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.parse', obj);
        var processor = this;
        return new Promise(function (r, f) {
            if (!obj)
                return r(obj);
            if (typeof obj === "object" && !Array.isArray(obj) && obj["default"])
                obj = processor.init(obj);
            if (Array.isArray(obj)) {
                if (typeof obj[0] === "object" && obj[0]['default'])
                    obj[0] = processor.init(obj[0]);
                if (typeof obj[0] === "string")
                    obj[0] = processor.resolve(obj[0]);
                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform")
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);
                else
                    Promise.all(obj.map(function (v, i) { return processor.parse(v, level + 1, path + '[' + i + ']', i); })).then(function (o) { try {
                        r(processor.app.services.UI.processElement(o, level, index));
                    }
                    catch (e) {
                        processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]);
                        f(e);
                    } }, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")
                Promise.resolve((obj)(Inject(processor.app))).then(function (o) { return processor.parse(o, level, path, index).then(r, f); }, f);
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "Component")
                try {
                    r(processor.createClass(components_1.BaseComponent(processor.app), obj));
                }
                catch (e) {
                    processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
                    f(e);
                }
            else if (Promise.resolve(obj) === obj) {
                Promise.resolve(obj).then(function (o) { return processor.parse(o, level, path, index).then(function (o2) { return r(o2); }, f); }, f);
            }
            else if (obj) {
                try {
                    r(processor.app.services.UI.processElement(obj, level, index));
                }
                catch (e) {
                    processor.app.services.logger.log(types.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
                    f(e);
                }
            }
            else
                r(obj);
        });
    };
    Processor.prototype.resolve = function (fullpath) {
        var _this = this;
        this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.resolve', [fullpath]);
        if (this.cache[fullpath])
            return this.cache[fullpath];
        if (fullpath.substring(0, 1) == "~") {
            var parts = fullpath.substring(1, fullpath.length).split('#');
            var obj = this.app.services.moduleSystem.instantiate(parts[0], this);
            if (parts.length == 1)
                return obj;
            return obj.then(function (x) { return _this.locate(x, parts.slice(1, parts.length).join(".")); });
        }
        else {
            var path = fullpath ? fullpath.split('.') : [''];
            var obj_1 = this.app.components || Object;
            for (var part = 0; part < path.length; part++) {
                if (typeof obj_1 === "function" && this.getFunctionName(obj_1) === "inject")
                    obj_1 = obj_1(Inject(this.app, components_1.BaseComponent(this.app)));
                if (obj_1[path[part]] !== undefined) {
                    obj_1 = obj_1[path[part]];
                    if (typeof obj_1 === "function" && this.getFunctionName(obj_1) == "inject")
                        obj_1 = obj_1(Inject(this.app, components_1.BaseComponent(this.app)));
                }
                else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0])
                    obj_1 = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj) { return ["pre", { "style": { "color": "red" } }, obj[1].stack ? obj[1].stack : obj[1]]; };
                    else {
                        this.app.services.logger.log.call(this, types.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'");
                        return /** @class */ (function (_super) {
                            __extends(class_2, _super);
                            function class_2() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            class_2.prototype.render = function () { return _super.prototype.render ? _super.prototype.render.call(this, ["span", { "style": { "color": "red" } }, (fullpath || 'undefined') + " not found!"]) : (fullpath || 'undefined') + " not found!"; };
                            return class_2;
                        }(components_1.BaseComponent(this.app)));
                    }
                }
            }
            //return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
            return this.cache[fullpath] = obj_1;
        }
    };
    Processor.prototype.init = function (obj) {
        return obj["default"];
    };
    Processor.prototype.processElement = function (obj, index) {
        var _this = this;
        if (!obj)
            return obj;
        if (typeof obj === "object" && !Array.isArray(obj) && obj["default"])
            obj = this.init(obj);
        if (Array.isArray(obj)) {
            if (typeof obj[0] === "object" && obj[0]['default'])
                // TODO: Remove <never>
                obj[0] = this.init(obj[0]);
            if (typeof obj[0] === "string") {
                obj[0] = this.resolve(obj[0]);
            }
            if (typeof obj[0] === "function") {
                var name = this.getFunctionName(obj[0]);
                switch (name) {
                    case "transform":
                        var key = index;
                        if (obj[1] && obj[1].key)
                            key = obj[1].key;
                        return this.processElement(obj[0].apply(this.app, obj.slice(1)), key);
                    case "inject":
                        obj[0] = (obj[0])(Inject(this.app));
                        return this.processElement(obj);
                    case "Component":
                        obj[0] = this.createClass(components_1.BaseComponent(this.app), obj[0]);
                        return this.processElement(obj);
                }
            }
        }
        if (Array.isArray(obj) && obj.some(function (c) { return Promise.resolve(c) === c; }))
            return this.app.services.UI.processElement([this.Async(), { id: Date.now() }, obj], 0, obj && obj[1] && obj[1].key !== undefined ? obj[1].key : index);
        else if (typeof obj === "string" || !obj)
            return obj;
        /*else if (typeof obj === "object" && (<{__jst:any}>obj).__jst)
            return this.processElement([Intercept(this.app), {}, [(<{default:any}>obj).default]]);*/
        //else if (obj.then)  
        //    Promise.all( [ obj ]).then(o => processor.parse(o[0], level, path, index).then((o2:any) => r(o2), f), f);
        if (Promise.resolve(obj) === obj)
            obj = [this.Async(), { index: index }, obj];
        if (Array.isArray(obj))
            return this.app.services.UI.processElement([obj[0], obj[1], Array.isArray(obj[2]) ? obj[2].map(function (c, idx) { return typeof c === "string" ? c : _this.processElement(c, idx); }) : obj[2]], 0, index);
        else
            return obj;
    };
    Processor.prototype.process = function (obj) {
        var _this = this;
        this.app.services.logger.log.call(this, types.LogLevel.Trace, 'Processor.process', obj);
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
        return new Promise(function (resolve, reject) {
            var isTemplate = visit(obj);
            try {
                if (isTemplate) {
                    _this.app.services.moduleSystem.init(_this.app.options.baseExecutionPath);
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
