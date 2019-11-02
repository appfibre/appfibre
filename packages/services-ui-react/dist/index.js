"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Exception"] = 1] = "Exception";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Trace"] = 5] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class react {
    constructor(app) {
        this.Component = react_1.Component;
        this.app = app;
    }
    render(ui, parent, mergeWith) {
        return react_dom_1.render(ui, parent, mergeWith);
    }
    processElement(element, depth, index) {
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
    }
}
exports.default = react;
