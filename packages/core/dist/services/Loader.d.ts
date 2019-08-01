import { types } from "@appfibre/types";
export declare class Promise<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
export declare class Loader implements types.app.IModuleSystem {
    proxy: types.app.IModuleSystem;
    private app;
    constructor(app: types.app.IAppLoaded<any, any>);
    import(moduleName: string, normalizedParentName?: string, _references?: {
        [name: string]: any;
    }): PromiseLike<any>;
    resolve(url: string): string;
    instantiate(url: string, parent?: any, references?: {
        [name: string]: any;
    }): any;
    init(basePath: string): void;
}
