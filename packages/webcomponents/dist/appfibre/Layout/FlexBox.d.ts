import appfibre from "@appfibre/types";
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
declare type Flex = [appfibre.app.element | appfibre.app.promisedElement, flex_attributes, Array<FlexItem>];
declare type FlexItem = [appfibre.app.element | appfibre.app.promisedElement, flexitem_attributes, Array<appfibre.app.promisedElement | appfibre.app.element> | string | undefined];
declare var Flex: (tag: string | Function | [string | Function, ({
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
} | Promise<appfibre.app.element>, a: flex_attributes, c: [string | Function | [string | Function, ({
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
} | Promise<appfibre.app.element>, flexitem_attributes, string | (string | Function | [string | Function, ({
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
} | Promise<appfibre.app.element>, flex_attributes, [string | Function | [string | Function, ({
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
} | Promise<appfibre.app.element>, flexitem_attributes, string | (string | Function | [string | Function, ({
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
declare var FlexItem: (tag: string | Function | [string | Function, ({
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
} | Promise<appfibre.app.element>, a: flexitem_attributes, c?: string | (string | Function | [string | Function, ({
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
} | Promise<appfibre.app.element>, flexitem_attributes, string | (string | Function | [string | Function, ({
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
export { Flex, FlexItem };
//# sourceMappingURL=FlexBox.d.ts.map