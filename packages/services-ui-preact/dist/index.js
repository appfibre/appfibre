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
        this.app = app;
    }
    preact.prototype.render = function (ui, parent, mergeWith) {
        return preact_1.render(ui, parent, mergeWith);
    };
    preact.prototype.processElement = function (element, depth, index) {
        if (depth % 2 === 0 && typeof element !== "string" && !Array.isArray(element)) {
            this.app.services.logger.log.bind(this, LogLevel.Error, "Child element [2] should be either a string or array", element);
            throw new Error("Child element [2] should be either a string or array");
        }
        return depth % 2 === 1 || !Array.isArray(element) ? element : preact_1.h(element[0], element[1], element[2]);
    };
    return preact;
}());
exports["default"] = preact;
