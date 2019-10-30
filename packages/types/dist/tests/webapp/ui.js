"use strict";
exports.__esModule = true;
var a = ["a", {}, "Test"];
var body = ["head", {}, [["table", {}]]];
var table = ["table",
    {},
    [["caption", {}],
        ["colgroup",
            {},
            [
                ["col",
                    {}
                ]
            ]
        ],
        ["thead",
            {},
            []
        ]
    ]
];
console.log('avoiding TS6133', [a, body, table]);
