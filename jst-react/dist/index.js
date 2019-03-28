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
        this.type = 'UI';
        this.app = app;
    }
    react.prototype.render = function (ui, parent, mergeWith) {
        return react_dom_1.render(ui, parent, mergeWith);
    };
    react.prototype.processElement = function (tag, attributes, children) {
        if (typeof tag === "function" && Array.isArray(children)) {
            if (children.length > 1) {
                this.app.services.logger.log.bind(this, LogLevel.Warn, "Class/function tags cannot have more than one direct child elements, wrapping elements in a div tag", children);
                return this.processElement(tag, attributes, this.processElement("div", {}, children));
            }
            else {
                children = children[0];
            }
        }
        return react_1.createElement(tag, attributes, children ? children : null);
    };
    return react;
}());
exports["default"] = react;
