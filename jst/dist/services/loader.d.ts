import { IModuleSystem, PromiseConstructor } from "../types";
import { IPromise } from "./promise";
export declare class Loader implements IModuleSystem {
    proxy: IModuleSystem;
    constructor(promise: PromiseConstructor & {
        all(promises: IPromise<any>[]): IPromise<any>;
    }, basePath?: string);
    import(moduleName: string, normalizedParentName?: string): PromiseLike<any>;
    instantiate(url: string, parent?: any): any;
    init(basePath: string): void;
}
