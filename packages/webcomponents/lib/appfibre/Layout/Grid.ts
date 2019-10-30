import { types } from "@appfibre/types";

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

type Grid = [types.app.UI.ElementPromise, grid_attributes, Array<GridItem>]
type GridItem = [ types.app.UI.ElementPromise, griditem_attributes, Array<types.app.UI.ElementPromise>|string|undefined  ]

var Grid = function transform(tag: types.app.UI.ElementPromise, a:grid_attributes, c:Array<GridItem>):Grid {
    return [tag, a, c];
}

var GridItem = function transform(tag: types.app.UI.ElementPromise, a:griditem_attributes, c?:Array<types.app.UI.ElementPromise>|string):GridItem {
    return [tag, a, c];
}



export { Grid, GridItem };