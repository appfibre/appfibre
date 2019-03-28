"use strict";
exports.__esModule = true;
var preact_1 = require("preact");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Exception"] = 1] = "Exception";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Trace"] = 5] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var preact = /** @class */ (function () {
    function preact(app) {
        this.Component = preact_1.Component;
        this.type = 'UI';
        this.app = app;
    }
    preact.prototype.render = function (ui, parent, mergeWith) {
        return preact_1.render(ui, parent, mergeWith);
    };
    preact.prototype.processElement = function (tag, attributes, children) {
        if (typeof tag === "function" && Array.isArray(children)) {
            if (children.length > 1) {
                this.app.services.logger.log.bind(this, LogLevel.Warn, "Class/function tags cannot have more than one direct child elements, wrapping elements in a div tag", children);
                return this.processElement(tag, attributes, this.processElement("div", {}, children));
            }
            else {
                children = children[0];
            }
        }
        return preact_1.h(tag, attributes || null, children ? children : null);
    };
    return preact;
}());
exports["default"] = preact;
