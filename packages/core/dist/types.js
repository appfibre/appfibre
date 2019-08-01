"use strict";
exports.__esModule = true;
/*
using <any> cast instead
export declare class Promise<T>  {
  constructor(resolver: Function);
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
  static all(promises: Promise<any>[]): Promise<any>;
  static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
};
*/
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Exception"] = 1] = "Exception";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Trace"] = 5] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var ModuleSystem;
(function (ModuleSystem) {
    ModuleSystem["None"] = "none";
    ModuleSystem["CommonJS"] = "commonjs";
    ModuleSystem["AMD"] = "amd";
    ModuleSystem["UMD"] = "umd";
    ModuleSystem["ES"] = "es";
})(ModuleSystem = exports.ModuleSystem || (exports.ModuleSystem = {}));
/*
export type Key = string | number;
export type Ref<T> = (instance: T) => void;
export type ComponentChild = VNode<any> | object | string | number | boolean | null;
export type ComponentChildren = ComponentChild[] | ComponentChild;

export interface Attributes {
    key?: Key;
    jsx?: boolean;
}

export interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T>;
}

export type ComponentFactory<P> = ComponentConstructor<P> | FunctionalComponent<P>;
export interface VNode<P = any> {
    nodeName: ComponentFactory<P> | string;
    attributes: P;
    children: Array<VNode<any> | string>;
    key?: Key | null;
}

export type RenderableProps<P, RefType = any> = Readonly<
    P & Attributes & { children?: ComponentChildren; ref?: Ref<RefType> }
>;

export interface FunctionalComponent<P = {}> {
    (props: RenderableProps<P>, context?: any): VNode<any> | null;
    displayName?: string;
    defaultProps?: Partial<P>;
}

export interface ComponentConstructor<P = {}, S = {}> {
    new (props: P, context?: any): Component<P, S>;
    displayName?: string;
    defaultProps?: Partial<P>;
}

// Type alias for a component considered generally, whether stateless or stateful.
export type AnyComponent<P = {}, S = {}> = FunctionalComponent<P> | ComponentConstructor<P, S>;

export interface Component<P = {}, S = {}> {
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    getChildContext?(): object;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    componentDidUpdate?(previousProps: Readonly<P>, previousState: Readonly<S>, previousContext: any): void;
}

export declare abstract class Component<P, S> {
    constructor(props?: P, context?: any);

    static displayName?: string;
    static defaultProps?: any;

    state: Readonly<S>;
    props: RenderableProps<P>;
    context: any;
    base?: HTMLElement;

    setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
    setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;

    forceUpdate(callback?: () => void): void;

    abstract render(props?: RenderableProps<P>, state?: Readonly<S>, context?: any): ComponentChild;
}*/
/*function h(
    node: string,
    params: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null,
    ...children: ComponentChildren[]
): VNode<any>;
function h<P>(
    node: ComponentFactory<P>,
    params: Attributes & P | null,
    ...children: ComponentChildren[]
): VNode<any>;

function render(node: ComponentChild, parent: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
function rerender(): void;
function cloneElement(element: JSX.Element, props: any, ...children: ComponentChildren[]): JSX.Element;

var options: {
    syncComponentUpdates?: boolean;
    debounceRendering?: (render: () => void) => void;
    vnode?: (vnode: VNode<any>) => void;
    event?: (event: Event) => Event;
};*/
