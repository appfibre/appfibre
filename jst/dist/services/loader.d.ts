import { IModuleSystem } from "../types";
export declare class Loader implements IModuleSystem {
    proxy: IModuleSystem;
    constructor(basePath?: string);
    import(moduleName: string, normalizedParentName?: string): PromiseLike<any>;
    instantiate(url: string, parent?: any): any;
    init(basePath: string): void;
}
