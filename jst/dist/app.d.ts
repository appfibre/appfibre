import { IApp, IAppLoaded, IServicesLoaded, IOptions, IContext, IController } from "./types";
import { IPromise } from "./services/promise";
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
    run(): IPromise<any>;
    private render;
}
