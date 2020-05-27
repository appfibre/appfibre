"use strict";
exports.__esModule = true;
exports.WebUI = void 0;
var types_1 = require("@appfibre/types");
var ui_1 = require("../components/ui");
var WebUI = /** @class */ (function () {
    function WebUI(app) {
        this.type = "UI";
        this.app = app;
        this.app.settings = this.app.settings || {};
    }
    WebUI.prototype.init = function () {
        if (typeof window === "object") {
            var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React"));
            if (obj) {
                this.createElement = obj.value.h || obj.value.createElement;
                this.Component = obj.value.Component;
                this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM") || { value: null }).value.render;
            }
            else {
                this.createElement = ui_1.createElement;
                this.Component = ui_1.Component;
                this.renderInternal = ui_1.render;
            }
        }
    };
    WebUI.prototype.render = function (ui, parent, mergeWith) {
        if (this.renderInternal) {
            this.app.services.logger.log.call(this, types_1.types.app.LogLevel.Trace, "WebUI.render", [ui]);
            return this.renderInternal(ui, parent, mergeWith);
        }
        else
            this.app.services.logger.log.call(this, types_1.types.app.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    };
    return WebUI;
}());
exports.WebUI = WebUI;
