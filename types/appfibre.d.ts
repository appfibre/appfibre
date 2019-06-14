export declare module appfibre {
    namespace app {
        interface Constructable<T, U = any> {
            new (arg: U): T;
        }
        interface ILogger {
            log: (logLevel: LogLevel, title?: string, optionalParameters?: any[]) => string | void;
        }
        interface IApp<O, I> {
            main: object | Array<object>;
            options?: IOptions & O;
            info?: IInfo & I;
            services?: IServices<IAppLoaded<O, I>>;
            controllers?: {
                [index: number]: IController | Constructable<IController, IApp<O, I>>;
            };
            components?: {
                [name: string]: any;
            } | Function;
        }
        interface IAppLoaded<O = {}, I = {}> extends IApp<O, I> {
            services: IServicesLoaded<IAppLoaded<O, I>>;
            controllers: {
                [name: string]: IController;
            };
            options: IOptions & O;
            info: IInfo & I;
            run(): PromiseLike<any>;
        }
        interface IEventType {
            type: string;
            correlationId?: string;
        }
        interface IEventData<T> extends IEventType {
            data: T;
        }
        interface IInfo {
        }
        interface IController {
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
        interface IServices<T> {
            moduleSystem?: IModuleSystem | Constructable<IModuleSystem, T>;
            transformer?: ITransformer | Constructable<ITransformer, T>;
            logger?: ILogger | Constructable<ILogger, T>;
            UI?: IUI | Constructable<IUI, T>;
            navigation?: INavigation | Constructable<INavigation, T>;
            data?: IData | Constructable<IData, T>;
            events?: IEvents | Constructable<IEvents, T>;
        }
        interface IServicesLoaded<T> extends IServices<T> {
            moduleSystem: IModuleSystem;
            transformer: ITransformer;
            logger: ILogger;
            UI: IUI;
            navigation: INavigation;
            processor: IProcessor;
            events: IEvents;
        }
        interface IEvents {
            subscribe<T>(eventType: IEventType, callback: (data: IEventData<T>) => any): void;
            unsubscribe<T>(eventType: IEventType, callback: (data: IEventData<T>) => any): void;
            publish<T>(data: IEventData<T> & {
                data: T;
            }, target?: {
                postMessage: (message: any, targetOrigin: string) => void;
            }): any[];
        }
        interface IUI {
            render(node: any, parent?: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
            processElement(element: any, depth: number, index?: number): any;
            Component: typeof Component;
        }
        interface INavigation {
            current: {
                path: string;
            };
            resolve(container?: string): any;
            a: Function;
            Container: Function;
        }
        interface IData {
            bind: Function;
            format: Function;
        }
        interface IOptions {
            title?: string;
            logLevel?: LogLevel;
            baseExecutionPath?: string;
        }
        interface IProcessor {
            resolve(fullpath: string): any;
            locate(resource: any, path: string): any;
            process(obj: any): PromiseLike<any>;
            processElement(obj: element | promisedElement, index?: number): any;
            init(obj: {
                default: element | promisedElement;
            }): element | promisedElement;
        }
        interface IModuleSystem {
            import(moduleName: string, normalizedParentName?: string): PromiseLike<any>;
            instantiate(url: string, parent?: any): Promise<any>;
            init(basePath?: string): void;
        }
        interface ITransformSettings {
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
        interface ITransformer {
            transform(intput: string | object, name?: string): ITransformOutput;
            _process(obj: any, esc: boolean, et: boolean, parseSettings: ITransformOutput, offset: number): string;
            settings: ITransformSettings;
        }
        interface ITransformOutput {
            code: string;
            imports: any[string];
            exports: {
                [key: string]: string;
            };
            compositeObject: boolean;
            name?: string;
        }
        type IParser = (obj: any, output: ITransformOutput, offset: number, resolve?: Function, reject?: Function) => string | undefined;
        type elementBase = [string | Function, {
            [key: string]: any;
        }?, (string | Function | {
            [index: number]: elementBase;
        } | {
            [index: string]: elementBase;
        })?];
        type element = elementBase | string | Function | {
            [index: number]: element | Promise<element>;
        };
        type promisedElement = Promise<element>;
        abstract class Component<P, S> {
            constructor(props?: P, context?: any);
            static displayName?: string;
            static defaultProps?: any;
            state: Readonly<S>;
            props: Readonly<P>;
            context: any;
            base?: HTMLElement;
            setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
            setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
            forceUpdate(callback?: () => void): void;
            render(props?: Readonly<P | element | promisedElement>, state?: Readonly<S>, context?: any): any;
        }
    }
    namespace webapp {
        enum browserType {
            "Opera" = 0,
            "FireFox" = 1,
            "Safari" = 2,
            "IE" = 3,
            "Edge" = 4,
            "Chrome" = 5,
            "Blink" = 6,
            "Unknown" = 7
        }
        interface IInfo extends app.IInfo {
            browser: browserType;
        }
        interface IOptions extends app.IOptions {
            target?: string | HTMLElement | null;
            fullHeight?: boolean;
        }
        interface IWebApp extends app.IApp<IOptions, IInfo> {
        }
        interface IWebAppLoaded extends app.IAppLoaded<IOptions, IInfo> {
        }
        namespace HTML {
            type element = div | table;
            type div = ["div", Partial<HTMLDivElement>?, (string | {
                [index: number]: HTML.element;
            })?];
            type table = ["table", Partial<HTMLTableElement>?, Array<HTML.tr>?];
            type tr = ["tr", Partial<HTMLTableRowElement>?, Array<HTML.td>?];
            type td = ["td", Partial<HTMLTableCellElement>?, (string | {
                [index: number]: HTML.element;
            })?];
        }
    }
    enum LogLevel {
        "None" = 0,
        "Exception" = 1,
        "Error" = 2,
        "Warn" = 3,
        "Info" = 4,
        "Trace" = 5
    }
    enum ModuleSystem {
        None = "none",
        CommonJS = "commonjs",
        AMD = "amd",
        UMD = "umd",
        ES = "es"
    }
}
export default appfibre;
