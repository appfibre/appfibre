import { types } from "@appfibre/types";
export declare class WebUI implements types.app.IUI<Element> {
    Component: any;
    private app;
    renderInternal: any;
    createElement: any;
    type: "UI";
    constructor(app: types.webapp.IWebAppLoaded);
    init(): PromiseLike<void> | void;
    render(ui: any, parent?: any, mergeWith?: any): any;
}
