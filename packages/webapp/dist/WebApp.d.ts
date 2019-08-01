import { App } from "@appfibre/core";
import appfibre from "@appfibre/types";
export declare class WebApp extends App<appfibre.webapp.ISettings, appfibre.webapp.IInfo> {
    constructor(app?: appfibre.webapp.IWebApp, context?: object);
    initApp(): PromiseLike<void> | void;
    run(): PromiseLike<Element>;
    private render;
}
