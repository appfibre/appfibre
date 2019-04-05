import { IModuleSystem, PromiseConstructor } from '../types';
import { IPromise } from "./promise";
export declare class Loader implements IModuleSystem {
    type: "ModuleSystem";
    promise: PromiseConstructor & {
        all(promises: IPromise<any>[]): IPromise<any>;
    };
    basePath?: string;
    static base?: string;
    constructor(promise: PromiseConstructor & {
        all(promises: IPromise<any>[]): IPromise<any>;
    }, basePath?: string);
    private nodeRequire;
    private run;
    load(url: string, parent?: any): Promise<string>;
    exec(source: string, url?: string): Promise<any>;
}
