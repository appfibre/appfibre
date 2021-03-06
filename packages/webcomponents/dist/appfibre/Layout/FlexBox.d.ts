import { types } from "@appfibre/types";
export interface flex_attributes {
    style?: {
        flexDirection: string;
        [index: string]: any;
    };
    [index: string]: any;
}
export interface flexitem_attributes {
    style?: {
        [index: string]: any;
    };
    [index: string]: any;
}
declare type Flex = [types.app.UI.ElementPromise, flex_attributes, Array<FlexItem>];
declare type FlexItem = [types.app.UI.ElementPromise, flexitem_attributes, Array<types.app.UI.ElementPromise> | string | undefined];
declare var Flex: (tag: types.app.UI.ElementPromise, a: flex_attributes, c: [types.app.UI.ElementPromise, flexitem_attributes, string | types.app.UI.ElementPromise[] | undefined][]) => [types.app.UI.ElementPromise, flex_attributes, [types.app.UI.ElementPromise, flexitem_attributes, string | types.app.UI.ElementPromise[] | undefined][]];
declare var FlexItem: (tag: types.app.UI.ElementPromise, a: flexitem_attributes, c?: string | types.app.UI.ElementPromise[] | undefined) => [types.app.UI.ElementPromise, flexitem_attributes, string | types.app.UI.ElementPromise[] | undefined];
export { Flex, FlexItem };
//# sourceMappingURL=FlexBox.d.ts.map