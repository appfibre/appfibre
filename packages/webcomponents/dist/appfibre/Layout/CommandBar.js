"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.CommandBar = void 0;
;
var CommandBar = function transform(props, children) {
    var c = [];
    if (props.sections)
        for (var _i = 0, _a = props.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            c.push(["div", { style: __assign(__assign({}, props.section_style), { display: "table-cell" }), className: 'Section' },
                [["div",
                        { style: { height: '80px' }, className: 'Section-Commands' }, section.commands ? section.commands.map(function (s) { return ["div", __assign({ className: s.className }, s.style), [["div", { title: s.title, onClick: s.onClick }, s.title]]]; }) : null
                    ], ["div", { className: 'Section-Title', style: { color: 'gray', textAlign: "center" } }, section.title]]
            ]);
        }
    return ["div",
        { className: 'Full CommandBar', style: { display: "table" } },
        c];
};
exports.CommandBar = CommandBar;
