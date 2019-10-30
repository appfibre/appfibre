import types from "@appfibre/types";
declare let BaseComponent: <P, S>(app: types.app.IAppLoaded<{}, {}>) => {
    new (props: Readonly<P>, context: any): {
        props: Readonly<P & {
            children?: types.app.UI.ElementPromise[] | undefined;
        }> & {
            key?: string | undefined;
        };
        key: string;
        renderInternal(e: Readonly<any> | [Readonly<any>, Readonly<any>, (Readonly<Readonly<any>> | Readonly<{
            [index: number]: types.app.UI.Element<any, any, any>;
        }> | undefined)?] | Promise<types.app.UI.Element<any, any, any>> | undefined, index?: number | undefined): any;
        render(props?: Readonly<any> | [Readonly<any>, Readonly<any>, (Readonly<Readonly<any>> | Readonly<{
            [index: number]: types.app.UI.Element<any, any, any>;
        }> | undefined)?] | Promise<types.app.UI.Element<any, any, any>> | Readonly<P & {
            children?: types.app.UI.ElementPromise[] | undefined;
        }> | undefined): any;
        state: Readonly<S>;
        context: any;
        setState<K extends keyof S>(state: Pick<S, K>, callback?: (() => void) | undefined): void;
        setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { BaseComponent };
