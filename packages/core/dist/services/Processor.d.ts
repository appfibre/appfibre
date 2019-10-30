import { types } from "@appfibre/types";
export declare class Promise<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
export declare class Processor implements types.app.IProcessor {
    app: types.app.IAppLoaded;
    cache: any;
    type: "Processor";
    constructor(app: types.app.IAppLoaded<any, any>);
    private async;
    private Async;
    createClass(B: any, d: any): {
        new (): {
            [x: string]: any;
        };
        [x: string]: any;
    };
    locate(resource: any, path: string): any;
    getFunctionName(obj: any): string;
    processElementInternal(element: any, parentkey: string, depth: number, index?: number): any;
    private parse;
    resolve(fullpath: string): any;
    unwrapDefault(obj: any): any;
    chars: string;
    generateKey(index?: number): string;
    processElement(obj: types.app.UI.ElementPromise, parentkey?: string, index?: number): any;
    process(obj: any): PromiseLike<any>;
}
