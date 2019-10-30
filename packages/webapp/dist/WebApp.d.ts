import { App, types } from "@appfibre/core";
export declare class WebApp extends App<types.webapp.ISettings, types.webapp.IInfo> {
    constructor(app?: types.webapp.IWebApp);
    initApp(): PromiseLike<void> | void;
    run(): PromiseLike<Element>;
    private render;
}
