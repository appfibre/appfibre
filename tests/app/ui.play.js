"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var preact_1 = __importDefault(require("preact"));
var enzyme_1 = __importDefault(require("enzyme"));
var enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
var enzyme_adapter_preact_1 = require("enzyme-adapter-preact");
var r = /** @class */ (function (_super) {
    __extends(r, _super);
    function r() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    r.prototype.render = function () {
        //return react.createElement("div", {}, [ react.createElement("span", {key: 1}, "TEST")]);
        return react_1["default"].Fragment({ children: "Testing" });
    };
    return r;
}(react_1["default"].Component));
var p = /** @class */ (function (_super) {
    __extends(p, _super);
    function p() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    p.prototype.render = function () {
        //return preact.h("div", {}, [ preact.h("span", {key: 1}, "TEST")]);
        return preact_1["default"].h("Testing", {});
    };
    return p;
}(preact_1["default"].Component));
console.log('react');
enzyme_1["default"].configure({ adapter: new enzyme_adapter_react_16_1["default"]() });
console.log(enzyme_1["default"].render(react_1["default"].createElement(r)).toString());
console.log('preact');
enzyme_1["default"].configure({ adapter: new enzyme_adapter_preact_1.Adapter() });
console.log(enzyme_1["default"].render(preact_1["default"].h(p, {}, [])).toString());
//console.log(Enzyme.render(react.createElement("div", null, "test")).toString());
