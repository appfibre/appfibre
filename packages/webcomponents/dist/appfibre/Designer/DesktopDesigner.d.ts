import types from "@appfibre/types";
declare let DesktopDesigner: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: {
        src?: string | undefined;
    }): {
        iframe?: HTMLFrameElement | undefined;
        componentWillMount(): void;
        componentWillUnmount(): void;
        designer_relay<T>(ev: types.app.IEventData<T>): void;
        componentDidMount(): void;
        navigateTo(url: string): void;
        onRedirect(event: types.app.IEventData<any>): void;
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
};
export { DesktopDesigner };
//# sourceMappingURL=DesktopDesigner.d.ts.map