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
                var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "react"));
                if (obj) {
                    this.processElement = obj.value.h;
                    this.Component = obj.value.Component;
                    this.renderInternal = obj.value.render;
                }
            }
        }
        catch (_a) {
            //TODO: find a workaround. in NodeJS ReferenceError: window is not defined
        }
    }
    WebUI.prototype.render = function (ui, parent, mergeWith) {
        if (this.renderInternal)
            return this.renderInternal(ui, parent, mergeWith);
        else
            this.app.services.logger.log.call(this, types_1.LogLevel.Error, "Unable to render UI - No UI framework detected.", "Ensure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    WebUI.prototype.processElement = function (tag, attributes, children) {
        // expected to be implemented.
        this.app.services.logger.log.call(this, types_1.LogLevel.Error, "Unable to process UI element - No UI framework detected.", "Ensure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    return WebUI;
}());
exports.WebUI = WebUI;
