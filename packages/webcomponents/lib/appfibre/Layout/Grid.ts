import appfibre from "@appfibre/types";

export interface grid_attributes {
    style?: {
        display:"grid"|"inline-grid"
        "gridTemplateColumns"?:string
        "gridTemplateRows"?:string

        [index:string]:any
    }
    [index:string]:any
}

export interface griditem_attributes {
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

type Grid = [appfibre.app.element|appfibre.app.promisedElement, grid_attributes, Array<GridItem>]
type GridItem = [ appfibre.app.element|appfibre.app.promisedElement, griditem_attributes, Array<appfibre.app.promisedElement|appfibre.app.element>|string|undefined  ]

var Grid = function transform(tag: appfibre.app.element|appfibre.app.promisedElement, a:grid_attributes, c:Array<GridItem>):Grid {
    return [tag, a, c];
}

var GridItem = function transform(tag: appfibre.app.element|appfibre.app.promisedElement, a:griditem_attributes, c?:Array<appfibre.app.promisedElement|appfibre.app.element>|string):GridItem {
    return [tag, a, c];
}



export { Grid, GridItem };