import { UI as _UI } from './UI';
import { jst } from '../jst';
export declare namespace app {
    export import UI = _UI;
    interface Constructable<T, U = any> {
        new (arg: U): T;
    }
    interface ILogger {
        log: (logLevel: LogLevel, title?: string, optionalParameters?: any[]) => string | void;
    }
    interface IApp<O, I> {
        main: object | Array<object>;
        settings?: ISettings & O;
        info?: IInfo & I;
        services?: IServices<IAppLoaded<O, I>>;
        controllers?: {
            [name: string]: IController | Constructable<IController, IApp<O, I>>;
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
        settings: ISettings & O;
        info: IInfo & I;
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
        path?: string;
        match?: {
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
        UI?: IUI<any> | Constructable<IUI<any>, T>;
        navigation?: INavigation | Constructable<INavigation, T>;
        data?: IData | Constructable<IData, T>;
        events?: IEvents | Constructable<IEvents, T>;
        externals?: {
            [index: string]: object;
        };
    }
    interface IServicesLoaded<T> extends IServices<T> {
        moduleSystem: IModuleSystem;
        transformer: ITransformer;
        logger: ILogger;
        UI: IUI<any>;
        navigation: INavigation;
        processor: IProcessor;
        events: IEvents;
        externals: {
            [index: string]: object;
        };
    }
    interface IEvents {
        subscribe<T>(eventType: IEventType, callback: (data: IEventData<T>) => any): void;
        unsubscribe<T>(eventType: IEventType, callback: (data: IEventData<T>) => any): void;
        publish<T = {}>(data: IEventData<T> & {
            data?: T;
        }, target?: {
            postMessage: (message: any, targetOrigin: string) => void;
        }): any[];
    }
    interface IUI<BaseElement> {
        init?(): PromiseLike<void> | void;
        createElement<P>(node: UI.ComponentFactory<P>, params: P | null, ...children: UI.ComponentChildren[]): UI.VNode<any>;
        render(node: UI.ComponentChild, parent: BaseElement): BaseElement;
        Component: typeof UI.Component;
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
    interface ISettings {
        title?: string;
        logLevel?: LogLevel;
        baseExecutionPath?: string;
        cdn?: {
            [index: string]: string;
        };
    }
    interface IProcessor {
        resolve(fullpath: string): any;
        locate(resource: any, path: string): any;
        process(obj: any): PromiseLike<any>;
        processElement(obj: UI.ElementPromise, parentkey?: string, index?: number): any;
        unwrapDefault(obj: any): UI.ElementPromise;
    }
    interface filedetail {
        text: string;
        contentType: string;
    }
    interface IModuleSystem {
        register(source: string, target: string): void;
        fetch(url: string, headers?: Record<string, string>): PromiseLike<app.filedetail>;
        import(moduleName: string, normalizedParentName?: string, references?: {
            [name: string]: any;
        }): PromiseLike<any>;
        instantiate(url: string, parent?: any, references?: {
            [name: string]: any;
        }): Promise<any>;
        init(basePath?: string): void;
        resolve(name: string): string;
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
        transform(input: jst.template, name?: string): ITransformOutput;
        process(obj: any, tc: ITransformContext, context: ITransformProcessingContext): IProcessOutput;
        loadModule(context: ITransformContext, val: string, depth: number): string;
        settings: ITransformSettings;
    }
    interface ITransformProcessingContext {
        depth: number;
        esc: boolean;
        et: boolean;
        format: "json" | "javascript" | "xml" | "html" | string;
    }
    interface ITransformContext {
        references: {
            [key: string]: any;
        };
        imports: any[string];
        exports: {
            [key: string]: string;
        };
        compositeObject: boolean;
        name?: string;
    }
    interface IProcessOutput {
        output: string;
        format: "json" | "javascript" | "xml" | "html" | string;
    }
    interface ITransformOutput extends ITransformContext, IProcessOutput {
    }
    type IParser = (obj: any, transformer: ITransformer, transform: ITransformContext, context: ITransformProcessingContext) => IProcessOutput;
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
        ES = "es",
        Raw = "raw"
    }
}
//# sourceMappingURL=index.d.ts.map