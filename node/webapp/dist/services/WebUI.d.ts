import * as types from "../types";
export declare class WebUI implements types.IUI {
    Component: any;
    private app;
    renderInternal: any;
    processElementInternal: any;
    type: "UI";
    constructor(app: types.IAppLoaded<types.IOptions, types.IInfo>);
    render(ui: any, parent?: any, mergeWith?: any): any;
    private overrideStyles;
    processElement(element: any, depth: number, index?: number): any;
}
