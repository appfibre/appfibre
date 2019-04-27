"use strict";
exports.__esModule = true;
var Loader = /** @class */ (function () {
    function Loader(promise, basePath) {
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
    /*load(url: string, parent?: any): PromiseLike<any> {
        return this.proxy.load(url, parent);
    }
    exec(source: string, url?: string | undefined) {
        return this.proxy.exec(source, url);
    }*/
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
