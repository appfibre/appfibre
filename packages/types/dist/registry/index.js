"use strict";
exports.__esModule = true;
exports.registry = void 0;
var registry;
(function (registry) {
    var itemType;
    (function (itemType) {
        itemType[itemType["Service"] = 0] = "Service";
        itemType[itemType["Component"] = 1] = "Component";
    })(itemType = registry.itemType || (registry.itemType = {}));
    var licenseType;
    (function (licenseType) {
        licenseType[licenseType["MIT"] = 0] = "MIT";
        licenseType[licenseType["GNU"] = 1] = "GNU";
    })(licenseType = registry.licenseType || (registry.licenseType = {}));
})(registry = exports.registry || (exports.registry = {}));
