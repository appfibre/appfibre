import appfibre from "@appfibre/types";
interface state {
}
interface properties {
    children: Element[];
    className: string;
    style?: object;
}
declare let Container: (app: appfibre.webapp.IWebAppLoaded) => {
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
export { Container };
//# sourceMappingURL=Container.d.ts.map