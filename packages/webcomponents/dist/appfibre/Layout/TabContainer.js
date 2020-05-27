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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.TabContainer = void 0;
var Styles_1 = __importDefault(require("./Styles"));
;
var TabContainer = function transform(a, c) {
    var className = a.className, placement = a.placement, containerStyle = a.containerStyle, selectedIndex = a.selectedIndex, onSelectedIndexChanged = a.onSelectedIndexChanged, tabStyle = a.tabStyle, tabs = a.tabs, style = a.style, selectedTabStyle = a.selectedTabStyle, tabStripStyle = a.tabStripStyle, className_Tab = a.className_Tab, props = __rest(a, ["className", "placement", "containerStyle", "selectedIndex", "onSelectedIndexChanged", "tabStyle", "tabs", "style", "selectedTabStyle", "tabStripStyle", "className_Tab"]);
    var children = [];
    placement = placement || "top";
    var v = placement === "top" || placement === "bottom" ? true : false;
    var drawTab = function (tab, index) { return Array.isArray(tab) ? tab :
        ["div", { className: (placement === "left" ? Styles_1["default"].TableRow : Styles_1["default"].TableCell) + (' ' + (typeof tab !== "string" && tab.className ? tab.className : className_Tab || '')) + ' ' + Styles_1["default"].Tab + ' ' + (index === selectedIndex ? Styles_1["default"].Tab_Selected : Styles_1["default"].Tab_Normal),
                style: index === selectedIndex ? selectedTabStyle : tabStyle, onClick: function () { return onSelectedIndexChanged ? onSelectedIndexChanged(index) : null; }
            }, typeof tab === "string" ? tab : tab.title]; };
    if (placement === "top" || placement === "left") {
        children.push(["div",
            { style: tabStripStyle, className: Styles_1["default"].TabStrip + ' ' + (placement === "top" ? Styles_1["default"].TableRow : Styles_1["default"].TableCell) },
            [["div", { className: Styles_1["default"].Table + ' ' + Styles_1["default"].Fill }, tabs ? tabs.map(drawTab) : null]]
        ]);
    }
    if (c)
        children.push(["div", { className: (v ? Styles_1["default"].TableRow : Styles_1["default"].TableCell) + ' ' + Styles_1["default"].Fill }, c]);
    if (placement === "bottom" || placement === "right") {
        children.push(["div",
            { style: tabStripStyle, className: Styles_1["default"].TabStrip + ' ' + (placement === "bottom" ? Styles_1["default"].TableRow : Styles_1["default"].TableCell) },
            [["div", { className: Styles_1["default"].Table }, tabs ? tabs.map(drawTab) : null]]
        ]);
    }
    return ["div", __assign({ className: Styles_1["default"].TabContainer + ' ' + Styles_1["default"].Table + (className ? ' ' + className : '') + ' ' + Styles_1["default"].Fill, style: style }, props), children];
};
exports.TabContainer = TabContainer;
