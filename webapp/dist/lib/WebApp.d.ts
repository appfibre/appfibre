import { App } from "@appfibre/core";
import * as types from "./types";
declare class Promise<T> implements PromiseLike<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
export declare class WebApp extends App<types.webapp.IOptions, types.webapp.IInfo> {
    constructor(app?: types.webapp.IWebApp, context?: object);
    run(): Promise<{}>;
    private render;
}
export {};
