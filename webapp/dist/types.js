"use strict";
exports.__esModule = true;
var core_1 = require("@appfibre/core");
exports.Component = core_1.types.Component;
//export import Key = types.Key
exports.LogLevel = core_1.types.LogLevel;
exports.ModuleSystem = core_1.types.ModuleSystem;
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
})(browserType = exports.browserType || (exports.browserType = {}));
//var z:HTML.table = ["table", { align: "center", onclick: function() {} }, [["tr", {}, [[ "td", {}, [["div"]] ]]]] ];
