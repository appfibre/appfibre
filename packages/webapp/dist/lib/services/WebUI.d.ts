import { fibre } from "@appfibre/core";
import * as types from "../types";
export declare class WebUI implements fibre.app.IUI {
    Component: any;
    private app;
    renderInternal: any;
    processElementInternal: any;
    type: "UI";
    constructor(app: fibre.app.IAppLoaded<types.webapp.IOptions, types.webapp.IInfo>);
    render(ui: any, parent?: any, mergeWith?: any): any;
    private overrideStyles;
    processElement(element: any, depth: number, index?: number): any;
}
