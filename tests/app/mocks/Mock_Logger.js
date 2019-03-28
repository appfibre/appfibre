"use strict";
exports.__esModule = true;
var Mock_Logger = /** @class */ (function () {
    function Mock_Logger(callback) {
        this.type = "Logger";
        Mock_Logger.cb = callback;
    }
    Mock_Logger.prototype.log = function (logLevel, message, optionalParameters) { Mock_Logger.cb(logLevel, message, optionalParameters); };
    return Mock_Logger;
}());
exports.Mock_Logger = Mock_Logger;
