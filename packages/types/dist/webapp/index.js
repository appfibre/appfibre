"use strict";
exports.__esModule = true;
exports.webapp = void 0;
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
})(webapp = exports.webapp || (exports.webapp = {}));
