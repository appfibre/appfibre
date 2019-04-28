import { IModuleSystem } from "../types";

export class Loader implements IModuleSystem {
    proxy: IModuleSystem;
    
    constructor(basePath?:string)
    {
        try {
            //nodeJS does not regocnise "window"
            if (window) {
                var systemjs = Object.getOwnPropertyDescriptor(window, "System");
                if (systemjs)
                    this.proxy = { import: systemjs.value.import.bind(systemjs.value), instantiate: systemjs.value.instantiate.bind(systemjs.value), init: (basePath: string) => void {}};
                else 
                    this.proxy = require('../browser/loader').default;
            } 
        } catch
        {
        }
        if (this['proxy'] == null) 
            this.proxy = require('../nodeJS/loader').default;
        this.proxy.init(basePath);
    }

    import(moduleName: string, normalizedParentName?: string): PromiseLike<any> {
        return this.proxy.import(moduleName, normalizedParentName);
    }

    instantiate(url:string, parent?:any):any {
        return this.proxy.instantiate(url, parent);
    }

    init(basePath:string) {

    }

}
