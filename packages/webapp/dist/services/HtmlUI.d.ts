import appfibre from "@appfibre/types";
import { VirtualComponent } from "../components/VirtualComponent";
export declare class HtmlUI implements appfibre.app.IUI {
    Component: any;
    private app?;
    protected document: HTMLDocument;
    constructor(app?: appfibre.webapp.IWebAppLoaded, virtualDocument?: HTMLDocument);
    init(): PromiseLike<void> | void;
    render(node: VirtualComponent<any>, parent?: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element | Text;
    processElement(element: any, depth: number, index?: number): any;
}
