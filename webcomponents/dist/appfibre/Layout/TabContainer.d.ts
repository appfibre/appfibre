import appfibre from "@appfibre/types";
export interface attr {
    placement?: "top" | "bottom" | "left" | "right";
    tabs: Array<string>;
    selectedIndex?: number;
}
declare let TabContainer: (app: appfibre.app.IAppLoaded<{}, {}>) => {
    new (props: attr): {
        render(): any;
        state: never;
        props: Readonly<attr & {
            children?: appfibre.app.element[] | undefined;
        }>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends string | number | symbol>(state: Pick<never, K>, callback?: (() => void) | undefined): void;
        setState<K extends string | number | symbol>(fn: (prevState: never, props: attr & {
            children?: appfibre.app.element[] | undefined;
        }) => Pick<never, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { TabContainer };
//# sourceMappingURL=TabContainer.d.ts.map