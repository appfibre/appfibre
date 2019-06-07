import * as types from "./types";
export declare abstract class App<O, I> implements types.IAppLoaded<O, I> {
    main: object | object[];
    defaultState?: Object | undefined;
    stateChanged?: Function | undefined;
    options: types.IOptions & O;
    components?: {
        [name: string]: any;
    } | Function | undefined;
    services: types.IServicesLoaded<types.IApp<O, I>>;
    controllers: {
        [index: string]: types.IController;
    };
    info: types.IInfo & I;
    constructor(app: Required<types.IApp<O, I>>);
    protected initApp(): void;
    abstract run(): PromiseLike<any>;
}
