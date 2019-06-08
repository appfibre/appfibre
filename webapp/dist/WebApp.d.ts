import { App } from "@appfibre/core";
import * as types from "./types";
export declare class WebApp extends App<types.IOptions, types.IInfo> {
    constructor(app?: types.IWebApp, context?: object);
    initApp(): void;
    run(): PromiseLike<Element>;
    private render;
}
