declare let Designer: ((app: import("@appfibre/types/dist/webapp").webapp.IWebAppLoaded) => {
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
}) | ((app: import("@appfibre/types/dist/app").app.IAppLoaded<{}, {}>) => {
    new (props: {
        src?: string | undefined;
    }): {
        iframe?: HTMLFrameElement | undefined;
        componentDidMount(): void;
        navigateTo(url: string): void;
        render(): any;
        state: Readonly<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }>;
        props: Readonly<any>;
        context: any;
        setState<K extends "src" | "url" | "leftMenuIndex" | "rightMenuIndex">(state: Pick<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "src" | "url" | "leftMenuIndex" | "rightMenuIndex">(fn: (prevState: {
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }, props: any) => Pick<{
            src?: string | undefined;
            url?: string | undefined;
            leftMenuIndex: number;
            rightMenuIndex: number;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
});
export { Designer };
//# sourceMappingURL=index.d.ts.map