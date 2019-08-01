import { types } from '../..'

//let a: types.webapp.UI.htmlElement<"table"> = [ "table", { cellSpacing: "1" }, [] ];

let a: types.webapp.UI.html<"a"> = ["a", {}, "Test"];
let body: types.webapp.UI.head = [ "head", {}, [ [ "table", {} ]  ]  ];

let table: types.webapp.UI.table =  [ "table"
                                    , {} 
                                    ,   [   [ "caption", {} ]
                                        ,   [ "colgroup" 
                                            , {}
                                            ,   [
                                                    [ "col"
                                                    , {}
                                                    ]
                                                ]
                                            ]
                                        ,   [ "thead"
                                            , {}
                                            ,   [

                                                ]
                                            ]
                                        ]
                                    ]


console.log('avoiding TS6133', [a, body, table] );

//let a1:types.webapp.UI.div = ["div", {}, "Test"];

/*
let dom:types.webapp.UI.body = 
    [ "body"
    , {}
    , [ <types.webapp.UI.table>
        [ "table"
        , {}
        ,   [
                [ "tr"
                , {}
                ,   [   
                        [ "td"
                        , {}
                        ,   [
                                [
                                    "div"
                                ,   {}
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
      ]
    ];


let table:types.webapp.UI.table = 
    [ "table"
    , {}
    ,   [
            [ "tr"
            , {}
            ]
        ]
    ]

let a:types.webapp.UI.htmlBodyElement = ["abbr", {title: "test"} ]

let comment:types.webapp.UI.comment =
    [
        "!"
        , {}
        
    ]
*/