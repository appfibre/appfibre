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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var types_1 = __importDefault(require("@appfibre/types"));
var Component_1 = require("../components/Component");
var VirtualComponent_1 = require("../components/VirtualComponent");
/*class FC<P> {
    props: P;
    context: any;
    render(props?: string | readonly [string | Function, ({ [key: string]: any; } | undefined)?, (string | Function | { [index: number]: [string | Function, ({ [key: string]: any; } | undefined)?, any?]; } | { [index: string]: [string | Function, ({ [key: string]: any; } | undefined)?, any?]; } | undefined)?] | Readonly<Function> | Readonly<{ [index: number]: any; }> | Readonly<Promise<appfibre.app.element>> | Readonly<P> | undefined, state?: Readonly<{}> | undefined, context?: any) {
        debugger;
    }
    constructor(props:P, context:any) {
        this.props = props;
        this.context = context;
    }
}*/
var HtmlUI = /** @class */ (function () {
    function HtmlUI(app, virtualDocument) {
        this.app = app;
        this.document = virtualDocument || document;
        this.Component = Component_1.Component;
        //this.app.settings = this.app.settings || {};
    }
    HtmlUI.prototype.init = function () {
    };
    HtmlUI.prototype.render = function (node, parent, mergeWith) {
        return node.update(parent || this.document);
        //return (parent || this.document.body).appendChild(r);
    };
    // ether an element, or array of elements depending on depth == even or odd
    HtmlUI.prototype.processElement = function (element, depth, index) {
        if (depth % 2 === 0) {
            if (typeof element != "string" && !Array.isArray(element)) {
                if (this.app)
                    this.app.services.logger.log.call(this, types_1["default"].LogLevel.Error, "Child element [2] should be either a string or array", [{ element: element }]);
                throw new Error("Child element [2] should be either a string or array");
            }
            else if (Array.isArray(element)) {
                if (index !== undefined && element.length > 0) {
                    element[1] = element[1] || {};
                    if (!element[1].key)
                        element[1].key = index;
                }
                //if (element[1] && element[1].style) 
                //    this.overrideStyles(element[1].style);
            }
            //if (Array.isArray(element) && element[1] && element[1].context && typeof element[1].context.intercept === "function")
            //    element = element[1].context.intercept(element);
        }
        //console.log({element, index, depth, code: JSON.stringify(element)});
        return depth % 2 === 1 || !Array.isArray(element) ? element : new VirtualComponent_1.VirtualComponent(element[0], __assign({}, element[1], { children: element[2] }), document || this.document);
    };
    return HtmlUI;
}());
exports.HtmlUI = HtmlUI;
