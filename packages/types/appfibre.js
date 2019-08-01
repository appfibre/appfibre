"use strict";
exports.__esModule = true;
var appfibre;
(function (appfibre) {
    var app;
    (function (app) {
    })(app = appfibre.app || (appfibre.app = {}));
    var webapp;
    (function (webapp) {
        var browserType;
        (function (browserType) {
            browserType[browserType["Opera"] = 0] = "Opera";
            browserType[browserType["FireFox"] = 1] = "FireFox";
            browserType[browserType["Safari"] = 2] = "Safari";
            browserType[browserType["IE"] = 3] = "IE";
            browserType[browserType["Edge"] = 4] = "Edge";
            browserType[browserType["Chrome"] = 5] = "Chrome";
            browserType[browserType["Blink"] = 6] = "Blink";
            browserType[browserType["Unknown"] = 7] = "Unknown";
        })(browserType = webapp.browserType || (webapp.browserType = {}));
    })(webapp = appfibre.webapp || (appfibre.webapp = {}));
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["None"] = 0] = "None";
        LogLevel[LogLevel["Exception"] = 1] = "Exception";
        LogLevel[LogLevel["Error"] = 2] = "Error";
        LogLevel[LogLevel["Warn"] = 3] = "Warn";
        LogLevel[LogLevel["Info"] = 4] = "Info";
        LogLevel[LogLevel["Trace"] = 5] = "Trace";
    })(LogLevel = appfibre.LogLevel || (appfibre.LogLevel = {}));
    var ModuleSystem;
    (function (ModuleSystem) {
        ModuleSystem["None"] = "none";
        ModuleSystem["CommonJS"] = "commonjs";
        ModuleSystem["AMD"] = "amd";
        ModuleSystem["UMD"] = "umd";
        ModuleSystem["ES"] = "es";
    })(ModuleSystem = appfibre.ModuleSystem || (appfibre.ModuleSystem = {}));
})(appfibre = exports.appfibre || (exports.appfibre = {}));
exports["default"] = appfibre;
