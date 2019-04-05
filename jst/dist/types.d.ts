import { IPromise } from "./services/promise";
export interface IApp extends IModule {
    main: object | Array<object>;
    defaultState?: Object;
    stateChanged?: Function;
    disableIntercept?: boolean;
    options?: IOptions;
    services?: IServices;
    context?: IContext;
}
export interface IAppLoaded extends IApp {
    services: IServicesLoaded;
    options: IOptions;
    run(): PromiseLike<any>;
}
export interface Constructable<T> {
    new (app: IAppLoaded): T;
}
export interface IModule {
    modules?: (IModule | string)[];
    components?: Object | Function;
    events?: IEvents;
}
export interface IEvents {
    init: (app: IApp, module: IModule) => void;
}
export interface ILogger {
    type: "Logger";
    log: (logLevel: LogLevel, title?: string, detail?: any, optionalParameters?: any[]) => void;
}
export declare type PromiseConstructor = new <T>(executor: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void) => IPromise<T>;
export interface IServices {
    promise?: PromiseConstructor & {
        all(promises: IPromise<any>[]): IPromise<any>;
    };
    moduleSystem?: IModuleSystem | Constructable<IModuleSystem>;
    transformer?: ITransformer | Constructable<ITransformer>;
    logger?: ILogger | Constructable<ILogger>;
    UI?: IUI | Constructable<IUI>;
}
export interface IServicesLoaded extends IServices {
    promise: PromiseConstructor & {
        all(promises: IPromise<any>[]): IPromise<any>;
    };
    moduleSystem: IModuleSystem;
    transformer: ITransformer;
    logger: ILogger;
    UI: IUI;
    processor: IProcessor;
}
export interface IUI {
    type: "UI";
    render(ui: any, parent?: any, mergeWith?: any): any;
    processElement(tag: any, attributes?: object | undefined, children?: any | undefined): any;
    Component: any;
}
export interface IOptions {
    title?: string;
    web?: IWebOptions;
    logLevel?: LogLevel;
    basePath?: string;
}
export interface IProcessor {
    type: "Processor";
    resolve(fullpath: string): any;
    construct(jstComponent: any): any;
    locate(resource: any, path: string): any;
    process(obj: any): Promise<any>;
    instanciate(url: string, parent?: any): Promise<any>;
}
export interface IWebOptions {
    target?: string | HTMLElement | null;
}
export interface IModuleSystem {
    type: "ModuleSystem";
    load(url: string, parent?: any): PromiseLike<any>;
    exec(source: string, url?: string): any;
}
export interface IContext {
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
    type: "Transformer";
    transform(intput: string | object, name?: string): ITransformOutput;
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
export declare enum ModuleSystem {
    None = "none",
    CommonJS = "commonjs",
    AMD = "amd",
    UMD = "umd",
    ES = "es"
}
export declare enum LogLevel {
    "None" = 0,
    "Exception" = 1,
    "Error" = 2,
    "Warn" = 3,
    "Info" = 4,
    "Trace" = 5
}
