import appfibre from "@appfibre/types";
export declare class WebUI implements appfibre.app.IUI {
    Component: any;
    private app;
    renderInternal: any;
    processElementInternal: any;
    type: "UI";
    constructor(app: appfibre.webapp.IWebAppLoaded);
    init(): PromiseLike<void> | void;
    render(ui: any, parent?: any, mergeWith?: any): any;
    private overrideStyles;
    processElement(element: any, depth: number, index?: number): any;
}
