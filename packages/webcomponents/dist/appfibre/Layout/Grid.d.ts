import { types } from "@appfibre/types";
export interface grid_attributes {
    style?: {
        display: "grid" | "inline-grid";
        "gridTemplateColumns"?: string;
        "gridTemplateRows"?: string;
        [index: string]: any;
    };
    [index: string]: any;
}
export interface griditem_attributes {
    style?: {
        "gridColumnStart"?: string;
        "gridColumnEnd"?: string;
        "gridRowStart"?: string;
        "gridRowEnd"?: string;
        "gridArea"?: string;
        [index: string]: any;
    };
    [index: string]: any;
}
declare type Grid = [types.app.UI.ElementPromise, grid_attributes, Array<GridItem>];
declare type GridItem = [types.app.UI.ElementPromise, griditem_attributes, Array<types.app.UI.ElementPromise> | string | undefined];
declare var Grid: (tag: types.app.UI.ElementPromise, a: grid_attributes, c: [types.app.UI.ElementPromise, griditem_attributes, string | types.app.UI.ElementPromise[] | undefined][]) => [types.app.UI.ElementPromise, grid_attributes, [types.app.UI.ElementPromise, griditem_attributes, string | types.app.UI.ElementPromise[] | undefined][]];
declare var GridItem: (tag: types.app.UI.ElementPromise, a: griditem_attributes, c?: string | types.app.UI.ElementPromise[] | undefined) => [types.app.UI.ElementPromise, griditem_attributes, string | types.app.UI.ElementPromise[] | undefined];
export { Grid, GridItem };
//# sourceMappingURL=Grid.d.ts.map