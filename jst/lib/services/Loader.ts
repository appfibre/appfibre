import { IModuleSystem, IAppLoaded, PromiseConstructor } from '../types';
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
                resolve(output);
            } catch(e) {
                console.log('Error executing script '+url+': ');
                reject(e);
            }
        });
    } 

    /*require(url:string) {
        fetch
    }*/
}