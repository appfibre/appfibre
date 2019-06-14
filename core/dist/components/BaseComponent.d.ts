import appfibre from "@appfibre/types";
declare let BaseComponent: <P, S>(app: appfibre.app.IAppLoaded<{}, {}>) => {
    new (props: P, context: any): {
        props: P & {
            children?: any;
        };
        renderInternal(e: string | Function | [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | {
                [index: string]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | undefined)?];
        } | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | any | undefined)?];
        } | undefined)?] | {
            [index: number]: string | Function | [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | {
                    [index: string]: [string | Function, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | undefined)?];
            } | {
                [index: string]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | {
                    [index: number]: [string | Function, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | any | undefined)?];
            } | undefined)?] | any | Promise<appfibre.app.element>;
        } | Promise<appfibre.app.element> | undefined, index?: number | undefined): any;
        render(e?: string | Function | [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | {
                [index: string]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | undefined)?];
        } | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | any | undefined)?];
        } | undefined)?] | {
            [index: number]: string | Function | [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | {
                    [index: string]: [string | Function, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | undefined)?];
            } | {
                [index: string]: [string | Function, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | {
                    [index: number]: [string | Function, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | any | undefined)?];
            } | undefined)?] | any | Promise<appfibre.app.element>;
        } | Promise<appfibre.app.element> | undefined): any;
        state: Readonly<S>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends keyof S>(state: Pick<S, K>, callback?: (() => void) | undefined): void;
        setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { BaseComponent };
