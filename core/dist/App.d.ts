import appfibre from "@appfibre/types";
export declare abstract class App<O, I> implements appfibre.app.IAppLoaded<O, I> {
    main: object | object[];
    defaultState?: Object | undefined;
    stateChanged?: Function | undefined;
    settings: appfibre.app.ISettings & O;
    components?: {
        [name: string]: any;
    } | Function | undefined;
    services: appfibre.app.IServicesLoaded<appfibre.app.IApp<O, I>>;
    controllers: {
        [index: string]: appfibre.app.IController;
    };
    info: appfibre.app.IInfo & I;
    constructor(app: Required<appfibre.app.IApp<O, I>>);
    protected initApp(): void;
    abstract run(): PromiseLike<any>;
}
