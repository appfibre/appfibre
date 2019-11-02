import types from "@appfibre/types";
declare let Async: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: any, context: any): {
        state: {
            value?: any;
        };
        render(): any;
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillUnmount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            value?: any;
        }>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            value?: any;
        }>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<{}>, previousState: Readonly<{
            value?: any;
        }>, previousContext: any): void;
        props: Readonly<{}>;
        context: any;
        setState<K extends "value">(state: Pick<{
            value?: any;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K_1 extends "value">(fn: (prevState: {
            value?: any;
        }, props: {}) => Pick<{
            value?: any;
        }, K_1>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { Async };
