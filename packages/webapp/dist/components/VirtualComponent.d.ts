export declare class VirtualComponent<P> {
    type: string | {
        render: Function;
        setState?: Function;
        props: P;
        context: any;
        update?: Function;
    };
    props: P & {
        [key: string]: any;
        children?: string | Array<VirtualComponent<any>>;
    };
    context: any;
    element?: HTMLElement | Text;
    document: HTMLDocument;
    construct(props: P & {
        [key: string]: any;
    }, context?: any): this;
    constructor(type: any, props: P & {
        [key: string]: any;
    }, document: HTMLDocument, context?: any);
    setState(inner: Function, fn: any, callback?: () => void): void;
    renderElement(element: string | Text | HTMLElement | VirtualComponent<any>): HTMLElement | Text;
    render(): HTMLElement | Text;
    update(parent: Element | DocumentFragment): Text | HTMLElement;
}
