import * as types from "../types";
declare let BaseComponent: <P, S>(app: types.IAppLoaded<{}, {}>) => {
    new (props: P, context: any): {
        props: P & {
            children?: any;
        };
        renderInternal(e: string | Function | [TimerHandler, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | {
                [index: string]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | undefined)?];
        } | {
            [index: string]: [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | any | undefined)?];
        } | undefined)?] | {
            [index: number]: string | Function | [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | {
                    [index: string]: [TimerHandler, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | undefined)?];
            } | {
                [index: string]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | {
                    [index: number]: [TimerHandler, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | any | undefined)?];
            } | undefined)?] | any | Promise<types.element>;
        } | Promise<types.element> | undefined, index?: number | undefined): any;
        render(e?: string | Function | [TimerHandler, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | {
                [index: string]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | undefined)?];
        } | {
            [index: string]: [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | any | undefined)?];
            } | any | undefined)?];
        } | undefined)?] | {
            [index: number]: string | Function | [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | Function | {
                [index: number]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | any | {
                    [index: string]: [TimerHandler, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | undefined)?];
            } | {
                [index: string]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | Function | {
                    [index: number]: [TimerHandler, ({
                        [key: string]: any;
                    } | undefined)?, (string | Function | any | any | undefined)?];
                } | any | undefined)?];
            } | undefined)?] | any | Promise<types.element>;
        } | Promise<types.element> | undefined): any;
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
