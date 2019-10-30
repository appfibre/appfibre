"use strict";
exports.__esModule = true;
var UI_1 = require("./UI");
var app;
(function (app) {
    app.UI = UI_1.UI;
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["None"] = 0] = "None";
        LogLevel[LogLevel["Exception"] = 1] = "Exception";
        LogLevel[LogLevel["Error"] = 2] = "Error";
        LogLevel[LogLevel["Warn"] = 3] = "Warn";
        LogLevel[LogLevel["Info"] = 4] = "Info";
        LogLevel[LogLevel["Trace"] = 5] = "Trace";
    })(LogLevel = app.LogLevel || (app.LogLevel = {}));
    var ModuleSystem;
    (function (ModuleSystem) {
        ModuleSystem["None"] = "none";
        ModuleSystem["CommonJS"] = "commonjs";
        ModuleSystem["AMD"] = "amd";
        ModuleSystem["UMD"] = "umd";
        ModuleSystem["ES"] = "es";
    })(ModuleSystem = app.ModuleSystem || (app.ModuleSystem = {}));
    var LicenseType;
    (function (LicenseType) {
        LicenseType[LicenseType["MIT"] = 0] = "MIT";
        LicenseType[LicenseType["GNU"] = 1] = "GNU";
    })(LicenseType = app.LicenseType || (app.LicenseType = {}));
})(app = exports.app || (exports.app = {}));
