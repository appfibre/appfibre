import appfibre from "@appfibre/types";
import { Component } from "../components/Component";
export declare class HtmlUI implements appfibre.app.IUI {
    Component: any;
    private app;
    protected document: HTMLDocument;
    constructor(app: appfibre.webapp.IWebAppLoaded, virtualDocument?: HTMLDocument);
    init(): PromiseLike<void> | void;
    render(node: Element, parent?: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
    processElementInternal(tag: string | Function, attributes?: {
        [index: string]: any;
    }, children?: string | Array<Element | Component<any, any>>): any;
    processElement(element: any, depth: number, index?: number): any;
}
