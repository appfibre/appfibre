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
var fbt_1 = require("../fbt");
var jst_1 = require("@appfibre/jst");
var jst_react_1 = __importDefault(require("@appfibre/jst-react"));
var enzyme_1 = __importDefault(require("enzyme"));
var enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
var types_1 = require("@appfibre/jst/dist/types");
var func_1 = require("./ui/func");
var DeferredLogger_1 = require("./services/DeferredLogger");
var jst_preact_1 = __importDefault(require("@appfibre/jst-preact"));
var enzyme_adapter_preact_1 = require("enzyme-adapter-preact");
var escape = function (p) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
};
var reactUI = /** @class */ (function (_super) {
    __extends(reactUI, _super);
    function reactUI(app) {
        var _this = _super.call(this, app) || this;
        _this.render = enzyme_1["default"].render;
        return _this;
    }
    return reactUI;
}(jst_react_1["default"]));
var preactUI = /** @class */ (function (_super) {
    __extends(preactUI, _super);
    function preactUI(app) {
        var _this = _super.call(this, app) || this;
        _this.render = enzyme_1["default"].render;
        return _this;
    }
    return preactUI;
}(jst_preact_1["default"]));
var deferredLogger = new DeferredLogger_1.DeferredLogger();
var fbt = new fbt_1.FBT(function (test) { return require(escape('.' + test.substring(__dirname.length))); }, deferredLogger);
fbt.run('ui - react', 'app', '.input.json', '.expected.html', '.react.html', function (input, filename) {
    return new Promise(function (resolve, reject) {
        enzyme_1["default"].configure({ adapter: new enzyme_adapter_react_16_1["default"]() });
        var app_react = new jst_1.App({ main: input, options: { logLevel: jst_1.types.LogLevel.Trace, basePath: filename.substr(0, filename.lastIndexOf('\\')) }, services: { UI: reactUI, logger: deferredLogger, transformer: new jst_1.Transformer({ module: types_1.ModuleSystem.CommonJS }) }, components: { "Tests": { "Test": func_1.Test } } });
        app_react.run().then(function (element) { return resolve(element.toString()); }, function (r) { return resolve(r.message); });
    });
}).then(function () {
    fbt.run('ui - preact', 'app', '.input.json', '.expected.html', '.preact.html', function (input, filename) {
        return new Promise(function (resolve, reject) {
            enzyme_1["default"].configure({ adapter: new enzyme_adapter_preact_1.Adapter() });
            var app_preact = new jst_1.App({ main: input, options: { logLevel: jst_1.types.LogLevel.Trace, basePath: filename.substr(0, filename.lastIndexOf('\\')) }, services: { UI: preactUI, transformer: new jst_1.Transformer({ module: types_1.ModuleSystem.CommonJS }), logger: deferredLogger }, components: { "Tests": { "Test": func_1.Test } } });
            app_preact.run().then(function (element) { return resolve(element.toString()); }, function (r) { return resolve(r.message); });
        });
    });
});
/*
class T extends react.Component {
    render() {
        return react.createElement("div", null, "ABCDEFG");
    }
}

Enzyme.configure({ adapter: new Adapter() });

describe ("test", () => {
    it("reacts", () => {

        var z = Enzyme.render(react.createElement(T, null, "hello world"));
        console.log('|||||||||||||||||||');
        console.log(z.toString());
        console.log('^^^^^^^^^^^^^^^^^^^');

    });
})*/
