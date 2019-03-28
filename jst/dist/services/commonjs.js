"use strict";
exports.__esModule = true;
var CommonJS = /** @class */ (function () {
    function CommonJS(app) {
        this.require = function (url) {
            return "ZZZZZ";
        };
        this.app = app;
    }
    CommonJS.prototype.load = function (url, parent) {
        return fetch(url, { credentials: 'same-origin' })
            .then(function (res) {
            if (!res.ok)
                throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
            return res.text();
        });
    };
    CommonJS.prototype.exec = function (source, url) {
        /*var fn = new Function(
            'exports',
            'require',
            'module',
            '__filename',
            '__dirname',
            source
            )(exports,require,module,__filename,__dirname); */
        console.log(this.require);
        try {
            return this.require;
            //return new Function(`var __dirname__ = global.process.cwd(); global.process.chdir(global.process.env.INIT_CWD); var require = global.require || global.process.mainModule.constructor._load; var module = global.module || global.process.mainModule; ${source}; global.process.chdir(__dirname__); console.log(_0);\n//# sourceURL=' + ${url}`)();
            //return new Function(`var require = global.require || global.process.mainModule.constructor._load; var module = global.module || global.process.mainModule; ${source}; console.log(_0);\n//# sourceURL=' + ${url}`)();
            //(0, eval)(source+ '\n//# sourceURL=' + url);
        }
        catch (f) {
            console.log(f);
        }
        return null;
    };
    CommonJS.prototype.instanciate = function (url, parent) {
        var app = this.app;
        return this.load(url, parent)
            .then(function (source) {
            return app.services.transformer.transform(url, source);
        })
            .then(this.exec);
    };
    return CommonJS;
}());
exports.CommonJS = CommonJS;
