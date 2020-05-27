"use strict";
exports.__esModule = true;
exports.types = void 0;
var app_1 = require("./app");
var webapp_1 = require("./webapp");
var registry_1 = require("./registry");
var types;
(function (types) {
    types.app = app_1.app;
    types.registry = registry_1.registry;
    types.webapp = webapp_1.webapp;
})(types = exports.types || (exports.types = {}));
exports["default"] = types;
