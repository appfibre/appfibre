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
var VirtualComponent = /** @class */ (function () {
    function VirtualComponent(type, props, document, context) {
        var _this = this;
        this.props = props;
        this.context = context;
        this.document = document;
        if (typeof type === "function") {
            if (type.prototype && type.prototype.render) {
                this.type = new type(props, context);
                this.construct.call(this.type, props, context);
            }
            else {
                this.type = this; // new FC(props, context);
                this.type.constructor = type;
                this.type.render = this.type.constructor(props, context);
            }
            if (typeof this.type === "object" && this.type.setState) {
                this.setState = this.setState.bind(this);
                var setState_1 = this.type.setState;
                this.type.setState = function (fn, callback) { return _this.setState(setState_1, fn, callback); };
            }
        }
        else
            this.type = type;
    }
    VirtualComponent.prototype.construct = function (props, context) {
        this.props = props;
        this.context = context;
    };
    VirtualComponent.prototype.setState = function (inner, fn, callback) {
        inner.call(this.type, fn, callback);
        if (this.element && this.element.parentElement) {
            this.element = this.element.parentElement.replaceChild(this.render(), this.element);
        }
    };
    ;
    VirtualComponent.prototype.render = function () {
        var _this = this;
        if (this.type === "textarea")
            debugger;
        if (typeof this.type === "string") {
            var element_1 = this.document.createElement(this.type);
            this.element = this.element || element_1;
            if (this.props)
                Object.keys(this.props).forEach(function (key) {
                    //if (key === "onChange") debugger;
                    if (key == "style") {
                        Object.keys(_this.props.style).forEach(function (skey) {
                            element_1.style.setProperty(skey, _this.props.style[skey]);
                        });
                    }
                    else if (key != "key" && key != "children")
                        element_1.setAttribute(key === "className" ? "class" : key.toLowerCase(), _this.props[key]);
                });
            if (typeof this.props.children === "string")
                element_1.textContent = this.props.children;
            else if (Array.isArray(this.props.children)) {
                //new ComponentManager(children).renderAll(el);
                this.props.children.forEach(function (child) {
                    if (child) {
                        if (child.nodeType) {
                            element_1.appendChild(child);
                        }
                        else {
                            //element.appendChild(this.renderInternal(el, c));
                            //let c = <Component<any,any>>child;
                            debugger;
                            //element.appendChild(this.renderInternal(c.render()));
                        }
                    }
                    else
                        debugger;
                });
            }
            return element_1;
        }
        else if (typeof this.type === "object") {
            var element_2 = undefined;
            var e = this.type.render();
            if (!e || typeof e === "string")
                element_2 = this.document.createTextNode(e || "");
            else if (Array.isArray(e)) {
                element_2 = this.document.createElement("div");
                e.forEach(function (c) {
                    if (element_2) {
                        element_2.appendChild(c);
                    }
                });
            }
            else if (e instanceof HTMLCollection) {
                element_2 = this.document.createElement("div");
                for (var i = 0; i < e.length; i++)
                    element_2.appendChild(e[i]);
            }
            else if (e instanceof HTMLElement)
                element_2 = e;
            else
                debugger;
            if (!this.element)
                this.element = element_2;
            if (element_2)
                return element_2;
        }
        throw new Error("Tag " + this.type + " not supported");
    };
    return VirtualComponent;
}());
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
        return (parent || this.document.body).appendChild(node);
    };
    HtmlUI.prototype.processElementInternal = function (tag, attributes, children) {
        return new VirtualComponent(tag, __assign({}, attributes, { children: children }), document || this.document).render();
    };
    // ether an element, or array of elements depending on depth == even or odd
    HtmlUI.prototype.processElement = function (element, depth, index) {
        if (depth % 2 === 0) {
            if (typeof element != "string" && !Array.isArray(element)) {
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
        return depth % 2 === 1 || !Array.isArray(element) ? element : this.processElementInternal.apply(this, element);
    };
    return HtmlUI;
}());
exports.HtmlUI = HtmlUI;
