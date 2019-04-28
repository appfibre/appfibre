import { IAppLoaded, IProcessor } from "../types";
declare class Promise<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
}
export declare class Processor implements IProcessor {
    app: IAppLoaded;
    cache: any;
    type: "Processor";
    constructor(app: IAppLoaded);
    construct(jstComponent: any): any;
    locate(resource: any, path: string): any;
    getFunctionName(obj: any): string;
    private parse;
    resolve(fullpath: string): any;
    process(obj: any): Promise<any>;
}
export {};
