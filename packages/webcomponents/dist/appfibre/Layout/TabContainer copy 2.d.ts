import { types } from "@appfibre/types";
export interface attr {
    placement?: "top" | "bottom" | "left" | "right";
    tabs: Array<string | object>;
    selectedIndex?: number;
    style?: object;
    tabStyle?: object;
    selectedTabStyle?: object;
    onSelectedIndexChanged?: (index: number) => void;
}
declare let TabContainer: (app: types.app.IAppLoaded<{}, {}>) => {
    new (props: attr): {
        select(index: number): void;
        render(): any;
        state: never;
        props: Readonly<attr & {
            children?: types.app.UI.ElementPromise[] | undefined;
        }>;
        context: any;
        setState<K extends string | number | symbol>(state: Pick<never, K>, callback?: (() => void) | undefined): void;
        setState<K extends string | number | symbol>(fn: (prevState: never, props: attr & {
            children?: types.app.UI.ElementPromise[] | undefined;
        }) => Pick<never, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName?: string | undefined;
    defaultProps?: any;
};
export { TabContainer };
//# sourceMappingURL=TabContainer copy 2.d.ts.map