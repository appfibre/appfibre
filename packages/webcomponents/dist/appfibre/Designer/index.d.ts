declare let Designer: ((app: import("@appfibre/types").appfibre.webapp.IWebAppLoaded) => {
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
        designer_Load(ev: import("@appfibre/types").appfibre.app.IEventData<import("./types").Designer_Load>): void;
        render(): any;
        setState<K extends "content">(state: Pick<{
            content: any;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "content">(fn: (prevState: {
            content: any;
        }, props: {}) => Pick<{
            content: any;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
}) | ((app: import("@appfibre/types").appfibre.app.IAppLoaded<{}, {}>) => {
    new (props: {
        src?: string | undefined;
    }): {
        iframe?: HTMLFrameElement | undefined;
        componentWillMount(): void;
        componentWillUnmount(): void;
        designer_relay<T>(ev: import("@appfibre/types").appfibre.app.IEventData<T>): void;
        componentDidMount(): void;
        navigateTo(url: string): void;
        onRedirect(event: import("@appfibre/types").appfibre.app.IEventData<any>): void;
        render(): any;
        state: Readonly<any>;
        props: Readonly<any>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends string | number | symbol>(state: Pick<any, K>, callback?: (() => void) | undefined): void;
        setState<K extends string | number | symbol>(fn: (prevState: any, props: any) => Pick<any, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
});
export { Designer };
//# sourceMappingURL=index.d.ts.map