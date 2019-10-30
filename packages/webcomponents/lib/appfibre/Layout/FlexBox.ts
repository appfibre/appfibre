import {types} from "@appfibre/types";

export interface flex_attributes {
    style?: {
        flexDirection:string

        [index:string]:any
    }
    [index:string]:any
}

export interface flexitem_attributes {
    style?: {
        
        
        [index:string]:any
    }
    [index:string]:any
}

type Flex = [types.app.UI.ElementPromise, flex_attributes, Array<FlexItem>]
type FlexItem = [ types.app.UI.ElementPromise, flexitem_attributes, Array<types.app.UI.ElementPromise>|string|undefined  ]

var Flex = function transform(tag: types.app.UI.ElementPromise, a:flex_attributes, c:Array<FlexItem>):Flex {
    a.className = "flex";
    return [tag, a, c];
}

var FlexItem = function transform(tag: types.app.UI.ElementPromise, a:flexitem_attributes, c?:Array<types.app.UI.ElementPromise>|string):FlexItem {
    return [tag, a, c];
}


export { Flex, FlexItem };