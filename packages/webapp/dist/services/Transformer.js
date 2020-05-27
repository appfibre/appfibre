"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Transformer = void 0;
var types_1 = require("@appfibre/types");
var core_1 = require("@appfibre/core");
var Parsers_1 = require("../services/Parsers");
var Transformer = /** @class */ (function (_super) {
    __extends(Transformer, _super);
    function Transformer(settings) {
        var _this = this;
        if (settings && !settings.parsers)
            settings.parsers = Parsers_1.Parsers;
        _this = _super.call(this, settings || { module: types_1.types.app.ModuleSystem.AMD, parsers: Parsers_1.Parsers }) || this;
        return _this;
    }
    return Transformer;
}(core_1.Services.Transformer));
exports.Transformer = Transformer;
