import { IApp, IModule, IAppLoaded, IServicesLoaded, IOptions, IContext, IEvents } from "./types";
import { IPromise } from "./services/promise";
export declare class App implements IAppLoaded {
    main: object | object[];
    defaultState?: Object | undefined;
    stateChanged?: Function | undefined;
    disableIntercept?: boolean | undefined;
    options: IOptions;
    context?: IContext | undefined;
    modules?: (string | IModule)[] | undefined;
    components?: Object | Function | undefined;
    events?: IEvents | undefined;
    services: IServicesLoaded;
    constructor(app?: IApp);
    loadModule(module: IModule): void;
    initModule(this: any, module: IModule): void;
    private initApp;
    run(): IPromise<any>;
    private render;
}
