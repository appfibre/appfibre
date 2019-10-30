import types from "@appfibre/types";
export declare abstract class App<O, I> implements types.app.IAppLoaded<O, I> {
    main: object | object[];
    defaultState?: Object | undefined;
    stateChanged?: Function | undefined;
    settings: types.app.ISettings & O;
    components: {
        [name: string]: any;
    } | Function;
    services: types.app.IServicesLoaded<types.app.IApp<O, I>>;
    controllers: {
        [index: string]: types.app.IController;
    };
    info: types.app.IInfo & I;
    constructor(app: Required<types.app.IApp<O, I>>);
    protected initApp(): PromiseLike<void> | void;
    abstract run(): PromiseLike<any>;
}
