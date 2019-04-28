"use strict";
exports.__esModule = true;
var Loader = /** @class */ (function () {
    function Loader(basePath) {
        try {
            //nodeJS does not regocnise "window"
            if (window) {
                var systemjs = Object.getOwnPropertyDescriptor(window, "System");
                if (systemjs)
                    this.proxy = { "import": systemjs.value["import"].bind(systemjs.value), instantiate: systemjs.value.instantiate.bind(systemjs.value), init: function (basePath) { return void {}; } };
                else
                    this.proxy = require('../browser/loader')["default"];
            }
        }
        catch (_a) {
        }
        if (this['proxy'] == null)
            this.proxy = require('../nodeJS/loader')["default"];
        this.proxy.init(basePath);
    }
    Loader.prototype["import"] = function (moduleName, normalizedParentName) {
        return this.proxy["import"](moduleName, normalizedParentName);
    };
    Loader.prototype.instantiate = function (url, parent) {
        return this.proxy.instantiate(url, parent);
    };
    Loader.prototype.init = function (basePath) {
    };
    return Loader;
}());
exports.Loader = Loader;
