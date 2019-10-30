import { types } from "@appfibre/types";
declare type tab = string | {
    title?: string;
    className?: string;
};
export interface props {
    placement?: "top" | "bottom" | "left" | "right";
    className?: string;
    className_Tab?: string;
    tabs?: Array<tab>;
    selectedIndex?: number;
    style?: object;
    tabStyle?: object;
    tabStripStyle?: object;
    selectedTabStyle?: object;
    containerStyle?: object;
    onSelectedIndexChanged?: (index: number) => void;
}
declare let TabContainer: (this: types.app.IAppLoaded<{}, {}>, a: props, c: any[]) => ["div", props, any[]];
export { TabContainer };
//# sourceMappingURL=TabContainer.d.ts.map