import {types} from "@appfibre/types"

export declare class Promise<T>  {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

export class Loader implements types.app.IModuleSystem {
    proxy: types.app.IModuleSystem;
    
    private app:types.app.IAppLoaded
    constructor(app:types.app.IAppLoaded<any, any>)
    {
        this.app = app;
        if (typeof window === "object") {
            let systemjs = Object.getOwnPropertyDescriptor(window, "System");
            if (systemjs) {
                systemjs.value.constructor.prototype.jst = (input:string, name?:string) => this.app.services.transformer.transform(input, name);
                this.proxy = { import: systemjs.value.import.bind(systemjs.value), register: systemjs.value.register.bind(systemjs.value), resolve: (name:string)=>name, instantiate: systemjs.value.instantiate.bind(systemjs.value), init: (/*basePath: string*/) => void {}, fetch: this.fetch};
                systemjs.value.constructor.prototype.instantiate = this.instantiate.bind(this);
                systemjs.value.constructor.prototype.import = this.import.bind(this);
            }
            else 
                this.proxy = require('./loaders/Browser')["Loader"];
        } 
        if (this['proxy'] == null) 
            this.proxy = require('./loaders/NodeJs')["Loader"];
    }

    import(moduleName: string, normalizedParentName?: string, _references?:{[name:string]:any}): PromiseLike<any> {
        let u = moduleName.indexOf('#') > -1 ? moduleName.slice(0, moduleName.indexOf('#')) : moduleName;
        let b = u.length + 1 < moduleName.length ? moduleName.slice(u.length+1).split('#') : [];
        return new Promise( (r:(value:any)=>any, rj:(reason:any)=>any) => this.proxy.import(u /*this.resolve(u)*/, normalizedParentName).then( x => {
            if (x.default) x = x.default;
            for (var i = 0; i < b.length; i++)
                if ((x = x[b[i]]) === undefined) {
                    //debugger;
                    rj(`Could not resolve property ${b[i]} on ${moduleName}`);
                };
            r({default: x, __esModule: moduleName});

        }, rj));
    }
    
    resolve(url:string) {
        if (url[0] == '@' && this.app.settings.cdn) {
            let cdn = url.slice(0, url.indexOf('/'));
            if (this.app.settings.cdn[cdn])
                url = this.app.settings.cdn[cdn] + url.substr(cdn.length);
        }
        return this.proxy.resolve(url);
    }

    register(source:string, target:string) {
        this.proxy.register(source, target);
    }

    instantiate(url:string, parent?:any, references?:{[name:string]:any}):any {
        return this.proxy.instantiate(this.resolve(url), parent, references);
    }

    init(basePath:string) {
        Object.defineProperty(this.proxy.import, "jst", this.app.services.transformer.transform);
        this.proxy.init(basePath);
    }

    fetch(url:string, headers?:{[header:string]:string}) : Promise<types.app.filedetail> {
        return new Promise(((resolve:any, reject:any) => {
            let rq = new XMLHttpRequest();
            rq.open('GET', url);
            //rq.credentials = 'same-origin';
            if (headers) Object.keys(headers).forEach(h => rq.setRequestHeader(h, headers[h]));
            rq.onload = function() { if (rq.status == 200) resolve({text: rq.responseText, contentType: (rq.getResponseHeader('content-type')||'text/plain').split(';')[0].toLowerCase()}); else reject(rq.status + ':' + rq.statusText)}
            rq.onerror = function() {reject(rq.status + ': ' + rq.statusText);}
            rq.send();
          }));
    }

}
