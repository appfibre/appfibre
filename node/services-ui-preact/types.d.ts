export interface Constructable<T, U = any> {
    new (arg: U): T;
}
export declare enum LogLevel {
    "None" = 0,
    "Exception" = 1,
    "Error" = 2,
    "Warn" = 3,
    "Info" = 4,
    "Trace" = 5
}
export declare enum ModuleSystem {
    None = "none",
    CommonJS = "commonjs",
    AMD = "amd",
    UMD = "umd",
    ES = "es"
}
export interface ILogger {
    log: (logLevel: LogLevel, title?: string, optionalParameters?: any[]) => string | void;
}
export interface IApp<O, I> {
    main: object | Array<object>;
    options?: (IOptions & O)|undefined|null;
    info?: (IInfo & I)|undefined|null;
    services?: IServices<IAppLoaded<O, I>>;
    controllers?: {
        [index: number]: IController | Constructable<IController, IApp<O, I>>;
    };
    components?: {
        [name: string]: any;
    } | Function;
}
export interface IAppLoaded<O = {}, I = {}> extends IApp<O, I> {
    services: IServicesLoaded<IAppLoaded<O, I>>;
    controllers: {
        [name: string]: IController;
    };
    options: IOptions & O;
    info: IInfo & I;
    run(): PromiseLike<any>;
}
export interface IEventType {
    type: string;
    correlationId?: string;
}
export interface IEventData<T> extends IEventType {
    data: T;
}
export interface IInfo {
}
export interface IController {
    path: string;
    match: {
        test: (url: string) => boolean;
    };
    resolve(args: {
        [key: string]: string;
        [index: number]: string;
    }): any;
    container?: string;
}
export interface IServices<T> {
    moduleSystem?: IModuleSystem | Constructable<IModuleSystem, T>;
    transformer?: ITransformer | Constructable<ITransformer, T>;
    logger?: ILogger | Constructable<ILogger, T>;
    UI?: IUI | Constructable<IUI, T>;
    navigation?: INavigation | Constructable<INavigation, T>;
    data?: IData | Constructable<IData, T>;
    events?: IEvents | Constructable<IEvents, T>;
}
export interface IServicesLoaded<T> extends IServices<T> {
    moduleSystem: IModuleSystem;
    transformer: ITransformer;
    logger: ILogger;
    UI: IUI;
    navigation: INavigation;
    processor: IProcessor;
    events: IEvents;
}
export interface IEvents {
    subscribe<T>(eventType: IEventType, callback: (data: IEventData<T>) => any): void;
    unsubscribe<T>(eventType: IEventType, callback: (data: IEventData<T>) => any): void;
    publish<T>(data: IEventData<T> & {
        data: T;
    }, target?: {
        postMessage: (message: any, targetOrigin: string) => void;
    }): any[];
}
export interface IUI {
    render(node: ComponentChild, parent: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
    processElement(element: any, depth: number, index?: number): any;
    Component:typeof Component;
}
export interface INavigation {
    current: {
        path: string;
    };
    resolve(container?: string): any;
    a: Function;
    Container: Function;
}
export interface IData {
    bind: Function;
    format: Function;
}
export interface IOptions {
    title?: string;
    logLevel?: LogLevel;
    baseExecutionPath?: string;
}
export interface IProcessor {
    resolve(fullpath: string): any;
    locate(resource: any, path: string): any;
    process(obj: any): PromiseLike<any>;
    processElement(obj: element | promisedElement, index?: number): any;
    init(obj: {
        default: element | promisedElement;
    }): element | promisedElement;
}
export interface IModuleSystem {
    import(moduleName: string, normalizedParentName?: string): PromiseLike<any>;
    instantiate(url: string, parent?: any): Promise<any>;
    init(basePath?: string): void;
}
export interface ITransformSettings {
    async?: boolean;
    indent?: string;
    compact?: boolean;
    namedExports?: boolean;
    preferConst?: boolean;
    module: ModuleSystem | ModuleSystem.None;
    parsers?: {
        [key: string]: IParser;
    };
    dangerouslyProcessJavaScript?: boolean;
    runtimeModule?: ModuleSystem;
}
export interface ITransformer {
    transform(intput: string | object, name?: string): ITransformOutput;
    _process(obj: any, esc: boolean, et: boolean, parseSettings: ITransformOutput, offset: number): string;
    settings: ITransformSettings;
}
export interface ITransformOutput {
    code: string;
    imports: any[string];
    exports: {
        [key: string]: string;
    };
    compositeObject: boolean;
    name?: string;
}
export declare type IParser = (obj: any, output: ITransformOutput, offset: number, resolve?: Function, reject?: Function) => string | undefined;
export declare type elementBase = [string | Function, {
    [key: string]: any;
}?, (string | Function | {
    [index: number]: elementBase;
} | {
    [index: string]: elementBase;
})?];
export declare type element = elementBase | string | Function | undefined | {
    [index: number]: element | Promise<element>;
};
export declare type promisedElement = Promise<element>;
export declare type IComponent<P, S> = {
    props: P & {
        children?: element | promisedElement;
    };
    state?: S;
    new?(props: P): IComponent<P, S>;
    render(e?: element | promisedElement): any;
    setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
    setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
    forceUpdate(callback?: (() => void) | undefined): void;
};
export declare type Key = string | number;
export declare type Ref<T> = (instance: T) => void;
export declare type ComponentChild = VNode<any> | object | string | number | boolean | null;
export declare type ComponentChildren = ComponentChild[] | ComponentChild;
export interface Attributes {
    key?: Key;
    jsx?: boolean;
}
export interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T>;
}
export declare type ComponentFactory<P> = ComponentConstructor<P> | FunctionalComponent<P>;
/**
 * Define the contract for a virtual node in preact.
 *
 * A virtual node has a name, a map of attributes, an array
 * of child {VNode}s and a key. The key is used by preact for
 * internal purposes.
 */
export interface VNode<P = any> {
    nodeName: ComponentFactory<P> | string;
    attributes: P;
    children: Array<VNode<any> | string>;
    key?: Key | null;
}
export declare type RenderableProps<P, RefType = any> = Readonly<P & Attributes & {
    children?: ComponentChildren;
    ref?: Ref<RefType>;
}>;
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
export declare type AnyComponent<P = {}, S = {}> = FunctionalComponent<P> | ComponentConstructor<P, S>;
export interface Component<P = {}, S = {}> {
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
}
