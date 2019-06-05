import { types } from "@appfibre/webapp";

interface grid_attributes {
    style?: {
        display:"grid"|"inline-grid"
        "gridTemplateColumns"?:string
        "gridTemplateRows"?:string

        [index:string]:any
    }
    [index:string]:any
}

interface griditem_attributes {
    style?: {
        "gridColumnStart"?: string
        "gridColumnEnd"?: string
        "gridRowStart"?: string
        "gridRowEnd"?: string
        "gridArea"?: string
        [index:string]:any
    }
    [index:string]:any
}

type Grid = [types.element|types.promisedElement, grid_attributes, Array<GridItem>]
type GridItem = [ types.element|types.promisedElement, griditem_attributes, Array<types.promisedElement|types.element>|string|undefined  ]

var Grid = function transform(tag: types.element|types.promisedElement, a:grid_attributes, c:Array<GridItem>):Grid {
    return [tag, a, c];
}

var GridItem = function transform(tag: types.element|types.promisedElement, a:griditem_attributes, c?:Array<types.promisedElement|types.element>|string):GridItem {
    return [tag, a, c];
}



export { Grid, GridItem };