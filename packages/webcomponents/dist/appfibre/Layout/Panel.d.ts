import appfibre from "@appfibre/types";
interface state {
}
interface properties {
}
declare let Panel: (app: appfibre.webapp.IWebAppLoaded) => {
    new (props: properties): {
        render(): any;
        state: Readonly<state>;
        props: Readonly<properties>;
        context: any;
        setState<K extends never>(state: Pick<state, K>, callback?: (() => void) | undefined): void;
        setState<K extends never>(fn: (prevState: state, props: properties) => Pick<state, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { Panel };
//# sourceMappingURL=Panel.d.ts.map