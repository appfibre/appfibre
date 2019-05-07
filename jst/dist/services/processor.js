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
var types_1 = require("../types");
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
    Processor.prototype.BaseComponent = function () {
        var app = this.app;
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function (obj) {
                return app.services.UI.processElement(obj, 0);
            };
            return class_1;
        }(app.services.UI.Component));
    };
    Processor.prototype.createClass = function (B, d) {
        return /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2(tag, attributes, children) {
                var _this = this;
                var b = _this = _super.call(this, tag, attributes, children) || this;
                var i = typeof d === "function" ? d.call(b, b) : d;
                if (b !== undefined)
                    for (var p in b.__proto__)
                        if (!i[p])
                            i[p] = b[p];
                if (i["constructor"])
                    i.constructor.call(i, i);
                return i;
            }
            return class_2;
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
        this.app.services.logger.log.call(this, types_1.LogLevel.Trace, 'Processor.parse', obj);
        var processor = this;
        return new Promise(function (r, f) {
            if (Array.isArray(obj)) {
                if (typeof obj[0] === "string")
                    obj[0] = processor.resolve(obj[0]);
                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform")
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);
                else
                    Promise.all(obj.map(function (v, i) { return processor.parse(v, level + 1, path + '[' + i + ']', i); })).then(function (o) { try {
                        r(processor.app.services.UI.processElement(o, level, index));
                    }
                    catch (e) {
                        processor.app.services.logger.log(types_1.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]);
                        f(e);
                    } }, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")
                Promise.all([(obj)(Inject(processor.app))]).then(function (o) { return r(processor.parse(o[0], level, path, index)); }, f);
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "Component")
                try {
                    r(processor.createClass(processor.BaseComponent(), obj));
                }
                catch (e) {
                    processor.app.services.logger.log(types_1.LogLevel.Error, 'Processor.parse: ' + e.stack, obj);
                    f(e);
                }
            else if (obj && obj.then)
                Promise.all([obj]).then(function (o) { return processor.parse(o[0], level, path, index).then(function (o2) { return r(o2); }, f); }, f);
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
            var obj = this.app.services.moduleSystem.instantiate(parts[0], this);
            if (parts.length == 1)
                return obj;
            return obj.then(function (x) { return _this.locate(x, parts.slice(1, parts.length).join(".")); });
        }
        else {
            var path = fullpath ? fullpath.split('.') : [''];
            var obj_1 = this.app.components || Object;
            var jst = false;
            var prop = "default";
            for (var part = 0; part < path.length; part++) {
                if (typeof obj_1 === "function" && this.getFunctionName(obj_1) === "inject")
                    obj_1 = obj_1(Inject(this.app, this.BaseComponent()));
                if (obj_1[path[part]] !== undefined) {
                    if (part == path.length - 1)
                        jst = obj_1.__jst;
                    obj_1 = obj_1[path[part]];
                    if (typeof obj_1 === "function" && this.getFunctionName(obj_1) == "inject")
                        obj_1 = obj_1(Inject(this.app, this.BaseComponent()));
                }
                else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0])
                    obj_1 = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj) { return ["pre", { "style": { "color": "red" } }, obj[1].stack ? obj[1].stack : obj[1]]; };
                    else {
                        this.app.services.logger.log.call(this, types_1.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'");
                        return /** @class */ (function (_super) {
                            __extends(class_3, _super);
                            function class_3() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            class_3.prototype.render = function () { return _super.prototype.render.call(this, ["span", { "style": { "color": "red" } }, (fullpath || 'undefined') + " not found!"]); };
                            return class_3;
                        }(this.app.services.UI.Component));
                    }
                }
            }
            if (obj_1["default"]) {
                if (obj_1.__jst)
                    jst = obj_1.__jst;
                obj_1 = obj_1["default"];
            }
            else if (jst)
                prop = path[path.length - 1];
            //if (typeof obj == "function" && this.getFunctionName(obj) === "inject")
            //    obj = obj(Inject(this.app, jst ? class Component extends this.app.services.UI.Component { render(obj:any):any { return this.parse(!this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, this.construct(this.app.UI.Component)] : obj); }} : this.construct(this.app.services.UI.Component)));
            //return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
            return this.cache[fullpath] = obj_1;
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
        return new Promise(function (resolve, reject) {
            var isTemplate = visit(obj);
            try {
                if (isTemplate) {
                    _this.app.services.moduleSystem.init(_this.app.options.basePath);
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
