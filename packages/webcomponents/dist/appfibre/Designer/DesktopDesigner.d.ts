import types from "@appfibre/types";
declare let DesktopDesigner: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: {
        src?: string | undefined;
    }): {
        iframe?: HTMLFrameElement | undefined;
        componentDidMount(): void;
        navigateTo(url: string): void;
        render(): any;
        componentWillMount?(): void;
        componentWillUnmount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<any>, previousState: Readonly<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }>, previousContext: any): void;
        state: Readonly<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }>;
        props: Readonly<any>;
        context: any;
        setState<K extends "url" | "src" | "leftMenuIndex" | "rightMenuIndex">(state: Pick<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K_1 extends "url" | "src" | "leftMenuIndex" | "rightMenuIndex">(fn: (prevState: {
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }, props: any) => Pick<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }, K_1>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { DesktopDesigner };
//# sourceMappingURL=DesktopDesigner.d.ts.map