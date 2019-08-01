import appfibre from "@appfibre/types";
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
declare type Grid = [appfibre.app.element | appfibre.app.promisedElement, grid_attributes, Array<GridItem>];
declare type GridItem = [appfibre.app.element | appfibre.app.promisedElement, griditem_attributes, Array<appfibre.app.promisedElement | appfibre.app.element> | string | undefined];
declare var Grid: (tag: string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>, a: grid_attributes, c: [string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>, griditem_attributes, string | (string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>)[] | undefined][]) => [string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>, grid_attributes, [string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>, griditem_attributes, string | (string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>)[] | undefined][]];
declare var GridItem: (tag: string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>, a: griditem_attributes, c?: string | (string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>)[] | undefined) => [string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>, griditem_attributes, string | (string | Function | [string | Function, ({
    [key: string]: any;
} | undefined)?, (string | Function | {
    [index: number]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | any | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | undefined)?];
} | {
    [index: string]: [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | any | undefined)?];
    } | any | undefined)?];
} | undefined)?] | {
    [index: number]: string | Function | [string | Function, ({
        [key: string]: any;
    } | undefined)?, (string | Function | {
        [index: number]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | any | {
            [index: string]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | undefined)?];
    } | {
        [index: string]: [string | Function, ({
            [key: string]: any;
        } | undefined)?, (string | Function | {
            [index: number]: [string | Function, ({
                [key: string]: any;
            } | undefined)?, (string | Function | any | any | undefined)?];
        } | any | undefined)?];
    } | undefined)?] | any | Promise<appfibre.app.element>;
} | Promise<appfibre.app.element>)[] | undefined];
export { Grid, GridItem };
//# sourceMappingURL=Grid.d.ts.map