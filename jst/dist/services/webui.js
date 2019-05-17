"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var WebUI = /** @class */ (function () {
    function WebUI(app) {
        this.type = "UI";
        this.app = app;
        this.app.options = this.app.options || {};
        try {
            if (window) {
                var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React"));
                if (obj) {
                    this.processElementInternal = obj.value.h || obj.value.createElement;
                    this.Component = obj.value.Component;
                    this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM") || { value: null }).value.render;
                }
            }
        }
        catch (_a) {
            debugger;
            //TODO: find a workaround. in NodeJS ReferenceError: window is not defined
        }
    }
    WebUI.prototype.render = function (ui, parent, mergeWith) {
        if (this.renderInternal) {
            this.app.services.logger.log.call(this, types_1.LogLevel.Trace, "WebUI.render", [ui]);
            return this.renderInternal(ui, parent, mergeWith);
        }
        else
            this.app.services.logger.log.call(this, types_1.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    // ether an element, or array of elements depending on depth == even or odd
    WebUI.prototype.processElement = function (element, depth, index) {
        if (depth % 2 === 0) {
            if (typeof element != "string" && !Array.isArray(element)) {
                debugger;
                this.app.services.logger.log.call(this, types_1.LogLevel.Error, "Child element [2] should be either a string or array", [{ element: element }]);
                //throw new Error("Child element [2] should be either a string or array");
                return element;
            }
            else if (index !== undefined && Array.isArray(element)) {
                element[1] = element[1] || {};
                if (!element[1].key)
                    element[1].key = index;
            }
        }
        //console.log({element, index, depth, code: JSON.stringify(element)});
        return depth % 2 === 1 || !this.processElementInternal || !Array.isArray(element) ? element : this.processElementInternal.apply(this, element);
    };
    return WebUI;
}());
exports.WebUI = WebUI;
