import appfibre from "@appfibre/types";

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

type Flex = [appfibre.app.element|appfibre.app.promisedElement, flex_attributes, Array<FlexItem>]
type FlexItem = [ appfibre.app.element|appfibre.app.promisedElement, flexitem_attributes, Array<appfibre.app.promisedElement|appfibre.app.element>|string|undefined  ]

var Flex = function transform(tag: appfibre.app.element|appfibre.app.promisedElement, a:flex_attributes, c:Array<FlexItem>):Flex {
    a.className = "flex";
    return [tag, a, c];
}

var FlexItem = function transform(tag: appfibre.app.element|appfibre.app.promisedElement, a:flexitem_attributes, c?:Array<appfibre.app.promisedElement|appfibre.app.element>|string):FlexItem {
    return [tag, a, c];
}


export { Flex, FlexItem };