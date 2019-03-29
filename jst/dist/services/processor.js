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
var intercept_1 = require("../components/intercept");
var async_1 = require("../components/async");
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
