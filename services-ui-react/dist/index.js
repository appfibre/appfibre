"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Exception"] = 1] = "Exception";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Trace"] = 5] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var react = /** @class */ (function () {
    function react(app) {
        this.Component = react_1.Component;
        this.app = app;
    }
    react.prototype.render = function (ui, parent, mergeWith) {
        return react_dom_1.render(ui, parent, mergeWith);
    };
    /*processElement(tag:any, attributes?:object|undefined, children?:any|undefined) : any {
        if (typeof tag === "function" && Array.isArray(children)) {
            if (children.length > 1) {
                this.app.services.logger.log.bind(this, LogLevel.Warn, "Class/function tags cannot have more than one direct child elements, wrapping elements in a div tag", children);
                return this.processElement(tag, attributes, this.processElement("div", {}, children));
            }
            else {
                children = children[0];
            }
        }
    
        return createElement(tag, attributes, children ? children : null);
    }*/
    react.prototype.processElement = function (element, depth, index) {
        if (depth % 2 === 0) {
            if (typeof element !== "string" && !Array.isArray(element)) {
                this.app.services.logger.log.bind(this, LogLevel.Error, "Child element [2] should be either a string or array", element);
                throw new Error("Child element [2] should be either a string or array");
            }
            else if (index !== undefined && Array.isArray(element)) {
                element[1] = element[1] || {};
                if (!element[1].key)
                    element[1].key = index;
            }
        }
        return depth % 2 === 1 || !Array.isArray(element) ? element : react_1.createElement(element[0], element[1], element[2]);
    };
    return react;
}());
exports["default"] = react;
