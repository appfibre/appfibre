import { IApp, IAppLoaded, IServicesLoaded, IOptions, IContext, IController } from "./types";
declare class Promise<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
}
export declare class App implements IAppLoaded {
    main: object | object[];
    defaultState?: Object | undefined;
    stateChanged?: Function | undefined;
    disableIntercept?: boolean | undefined;
    options: IOptions;
    context?: IContext | undefined;
    components?: {
        [name: string]: any;
    } | Function | undefined;
    services: IServicesLoaded;
    controllers: {
        [index: string]: IController;
    };
    constructor(app?: IApp);
    private initApp;
    run(): Promise<any>;
    private render;
}
export {};
