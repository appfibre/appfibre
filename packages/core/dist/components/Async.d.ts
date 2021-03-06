import types from "@appfibre/types";
declare let Async: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: any, context: any): {
        state: {
            value?: any;
        };
        render(): any;
        props: Readonly<{}>;
        context: any;
        setState<K extends "value">(state: Pick<{
            value?: any;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "value">(fn: (prevState: {
            value?: any;
        }, props: {}) => Pick<{
            value?: any;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { Async };
