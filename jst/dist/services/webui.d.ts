import { IUI, IAppLoaded } from "../types";
export declare class WebUI implements IUI {
    Component: any;
    app: IAppLoaded;
    renderInternal: any;
    type: "UI";
    constructor(app: IAppLoaded);
    render(ui: any, parent?: any, mergeWith?: any): any;
    processElement(tag: any, attributes?: object | undefined, children?: any): void;
}
