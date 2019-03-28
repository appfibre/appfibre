import { IModuleSystem, IAppLoaded } from '../types';

export class Loader implements IModuleSystem {
    type:"ModuleSystem"
    static app:IAppLoaded;
    constructor(app:IAppLoaded)
    {
        this.type = "ModuleSystem";
        Loader.app = app;
    }

    load(url:string, parent?:any):Promise<string> {
        return fetch(url, {credentials: 'same-origin'})
        .then(function(res) {
            if (!res.ok)
                throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
            return res.text();
          });
    }

    require(url:string) {
        return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, Loader.app.options.basePath);
    }

    private run(source:string, url?:string) {
        let  m = { exports: {}};
        try{
            new Function('require', 'module', `${source};\n//# sourceURL=' + ${url}`)(this.require, m); 
        } catch(f) {
            console.log('Error running script from from source'+url||source);
            throw f;
        }
        return m.exports; 
    }

    exec(source:string, url?:string):Promise<any> {
        return new Loader.app.services.promise((resolve:Function, reject:Function) => {
            try {
                var output = this.run(source, url);
                resolve(output);
            } catch(e) {
                console.log('Error executing script '+url+': ');
                reject(e);
            }
        });
    }

    instanciate(url:string, parent?:any):any {
        const app = Loader.app;
        return this.load(url, parent) 
          .then(function (source) {
            return app.services.transformer.transform(url, source);
          })
          .then(this.exec);
    }
}