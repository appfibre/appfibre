import { types } from "@appfibre/webapp";

interface flex_attributes {
    style?: {
        flexDirection:string

        [index:string]:any
    }
    [index:string]:any
}

interface flexitem_attributes {
    style?: {
        
        
        [index:string]:any
    }
    [index:string]:any
}

type Flex = [types.element|types.promisedElement, flex_attributes, Array<FlexItem>]
type FlexItem = [ types.element|types.promisedElement, flexitem_attributes, Array<types.promisedElement|types.element>|string|undefined  ]

var Flex = function transform(tag: types.element|types.promisedElement, a:flex_attributes, c:Array<FlexItem>):Flex {
    a.className = "flex";
    return [tag, a, c];
}

var FlexItem = function transform(tag: types.element|types.promisedElement, a:flexitem_attributes, c?:Array<types.promisedElement|types.element>|string):FlexItem {
    return [tag, a, c];
}


export { Flex, FlexItem };