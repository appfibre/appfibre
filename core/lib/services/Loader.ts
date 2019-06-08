import * as types from "../types";

export declare class Promise<T>  {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

export class Loader implements types.IModuleSystem {
    proxy: types.IModuleSystem;
    
    private app:types.IAppLoaded
    constructor(app:types.IAppLoaded<any, any>)
    {
        this.app = app;
        if (typeof window === "object") {
            var systemjs = Object.getOwnPropertyDescriptor(window, "System");
            if (systemjs) {
                systemjs.value.constructor.prototype.jst = (input:string, name?:string) => this.app.services.transformer.transform(input, name);
                this.proxy = { import: systemjs.value.import.bind(systemjs.value), instantiate: systemjs.value.instantiate.bind(systemjs.value), init: (basePath: string) => void {}};
            }
            else 
                this.proxy = require('../browser/loader').default;
        } 
        if (this['proxy'] == null) 
            this.proxy = require('../nodeJS/loader').default;
    }

    import(moduleName: string, normalizedParentName?: string): PromiseLike<any> {
        let u = moduleName.indexOf('#') > -1 ? moduleName.slice(0, moduleName.indexOf('#')) : moduleName;
        let b = u.length + 1 < moduleName.length ? moduleName.slice(u.length+1).split('#') : [];
        return new Promise( (r:(value:any)=>any, rj:(reason:any)=>any) => this.proxy.import(u, normalizedParentName).then( x => {
            if (x.default) x = x.default;
            for (var i = 0; i < b.length; i++)
                if ((x = x[b[i]]) === undefined) {
                    debugger;
                    rj(`Could not resolve property ${b[i]} on ${moduleName}`);
                };
            r({default: x, __esModule: moduleName});

        }, rj));
    }

    instantiate(url:string, parent?:any):any {
        return this.proxy.instantiate(url, parent);
    }

    init(basePath:string) {
        Object.defineProperty(this.proxy.import, "jst", this.app.services.transformer.transform);
        this.proxy.init(basePath);
    }

}
