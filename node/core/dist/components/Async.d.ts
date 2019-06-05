import * as types from "../types";
declare let Async: (app: types.IAppLoaded<{}, {}>) => {
    new (props: any): {
        render(): any;
        props: any;
        state?: any;
        setState<K extends string | number | symbol>(state: Pick<any, K>, callback?: (() => void) | undefined): void;
        setState<K extends string | number | symbol>(fn: (prevState: any, props: any) => Pick<any, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
};
export { Async };
