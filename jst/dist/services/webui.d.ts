import { IUI, IAppLoaded } from "../types";
export declare class WebUI implements IUI {
    Component: any;
    app: IAppLoaded;
    renderInternal: any;
    processElementInternal: any;
    type: "UI";
    constructor(app: IAppLoaded);
    render(ui: any, parent?: any, mergeWith?: any): any;
    processElement(element: any, depth: number, index?: number): any;
}
