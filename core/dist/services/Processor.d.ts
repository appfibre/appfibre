import appfibre from "@appfibre/types";
export declare class Promise<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
export declare class Processor implements appfibre.app.IProcessor {
    app: appfibre.app.IAppLoaded;
    cache: any;
    type: "Processor";
    constructor(app: appfibre.app.IAppLoaded<any, any>);
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
    private parse;
    resolve(fullpath: string): any;
    init(obj: {
        default: any;
    }): any;
    processElement(obj: appfibre.app.element | appfibre.app.promisedElement, index?: number): any;
    process(obj: any): PromiseLike<any>;
}
