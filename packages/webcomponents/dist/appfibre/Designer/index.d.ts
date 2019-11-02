declare let Designer: ((app: import("@appfibre/types/dist/app").app.IAppLoaded<{}, {}>) => {
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
}) | ((app: import("@appfibre/types/dist/webapp").webapp.IWebAppLoaded) => {
    new (props: {}): {
        context: any;
        base?: HTMLElement | undefined;
        props: {};
        state: {
            content: any;
        };
        componentWillMount(): void;
        window_click(ev: Event): void;
        componentWillUnmount(): void;
        designer_Load(ev: import("@appfibre/types/dist/app").app.IEventData<import("./types").Designer_Load>): void;
        render(): any;
        componentDidMount?(): void;
        getChildContext?(): object;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            content: any;
        }>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{
            content: any;
        }>, nextContext: any): void;
        componentDidUpdate?(previousProps: Readonly<{}>, previousState: Readonly<{
            content: any;
        }>, previousContext: any): void;
        setState<K_2 extends "content">(state: Pick<{
            content: any;
        }, K_2>, callback?: (() => void) | undefined): void;
        setState<K_3 extends "content">(fn: (prevState: {
            content: any;
        }, props: {}) => Pick<{
            content: any;
        }, K_3>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
});
export { Designer };
//# sourceMappingURL=index.d.ts.map