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
            console.log('Error running script from from source' + url || source);
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
