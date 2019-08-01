"use strict";
exports.__esModule = true;
var Loader = /** @class */ (function () {
    function Loader(app) {
        var _this = this;
        this.app = app;
        if (typeof window === "object") {
            var systemjs = Object.getOwnPropertyDescriptor(window, "System");
            if (systemjs) {
                systemjs.value.constructor.prototype.jst = function (input, name) { return _this.app.services.transformer.transform(input, name); };
                this.proxy = { "import": systemjs.value["import"].bind(systemjs.value), resolve: function (name) { return name; }, instantiate: systemjs.value.instantiate.bind(systemjs.value), init: function ( /*basePath: string*/) { return void {}; } };
                systemjs.value.constructor.prototype.instantiate = this.instantiate.bind(this);
                systemjs.value.constructor.prototype["import"] = this["import"].bind(this);
            }
            else
                this.proxy = require('./loaders/Browser')["Loader"];
        }
        if (this['proxy'] == null)
            this.proxy = require('./loaders/NodeJs')["Loader"];
    }
    Loader.prototype["import"] = function (moduleName, normalizedParentName, _references) {
        var _this = this;
        var u = moduleName.indexOf('#') > -1 ? moduleName.slice(0, moduleName.indexOf('#')) : moduleName;
        var b = u.length + 1 < moduleName.length ? moduleName.slice(u.length + 1).split('#') : [];
        return new Promise(function (r, rj) { return _this.proxy["import"](_this.resolve(u), normalizedParentName).then(function (x) {
            if (x["default"])
                x = x["default"];
            for (var i = 0; i < b.length; i++)
                if ((x = x[b[i]]) === undefined) {
                    //debugger;
                    rj("Could not resolve property " + b[i] + " on " + moduleName);
                }
            ;
            r({ "default": x, __esModule: moduleName });
        }, rj); });
    };
    Loader.prototype.resolve = function (url) {
        if (url[0] == '@' && this.app.settings.cdn) {
            var cdn = url.slice(0, url.indexOf('/'));
            if (this.app.settings.cdn[cdn])
                url = this.app.settings.cdn[cdn] + url.substr(cdn.length);
        }
        return this.proxy.resolve(url);
    };
    Loader.prototype.instantiate = function (url, parent, references) {
        return this.proxy.instantiate(this.resolve(url), parent, references);
    };
    Loader.prototype.init = function (basePath) {
        Object.defineProperty(this.proxy["import"], "jst", this.app.services.transformer.transform);
        this.proxy.init(basePath);
    };
    return Loader;
}());
exports.Loader = Loader;
