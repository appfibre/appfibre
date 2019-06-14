"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbt_1 = require("../fbt");
const core_1 = require("@appfibre/core");
const webapp_1 = require("@appfibre/webapp");
const services_ui_react_1 = __importDefault(require("@appfibre/services-ui-react"));
const enzyme_1 = __importDefault(require("enzyme"));
const enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
const func_1 = require("./ui/func");
const DeferredLogger_1 = require("./services/DeferredLogger");
const services_ui_preact_1 = __importDefault(require("@appfibre/services-ui-preact"));
const enzyme_adapter_preact_1 = require("enzyme-adapter-preact");
const types_1 = __importDefault(require("@appfibre/types"));
var escape = function (p) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
};
class reactUI extends services_ui_react_1.default {
    constructor(app) {
        super(app);
        this.render = enzyme_1.default.render;
    }
}
class preactUI extends services_ui_preact_1.default {
    constructor(app) {
        super(app);
        this.render = enzyme_1.default.render;
    }
}
let deferredLogger = new DeferredLogger_1.DeferredLogger();
let fbt = new fbt_1.FBT((test) => require(escape('.' + test.substring(__dirname.length))), deferredLogger);
fbt.run('ui - react', 'app', '.input.json', '.expected.html', '.react.html', (input, filename) => {
    return new Promise((resolve, reject) => {
        enzyme_1.default.configure({ adapter: new enzyme_adapter_react_16_1.default() });
        var app_react = new webapp_1.WebApp({ main: input, settings: { logLevel: types_1.default.LogLevel.Trace, baseExecutionPath: filename.substr(0, filename.lastIndexOf('\\')) }, services: { UI: reactUI, logger: deferredLogger, transformer: new core_1.Transformer({ module: types_1.default.ModuleSystem.CommonJS }) }, components: { "Tests": { "Test": func_1.Test } } });
        app_react.run().then(element => resolve(element.toString()), r => resolve(r.message));
    });
}).then(() => {
    fbt.run('ui - preact', 'app', '.input.json', '.expected.html', '.preact.html', (input, filename) => {
        return new Promise((resolve, reject) => {
            enzyme_1.default.configure({ adapter: new enzyme_adapter_preact_1.Adapter() });
            var app_preact = new webapp_1.WebApp({ main: input, settings: { logLevel: types_1.default.LogLevel.Trace, baseExecutionPath: filename.substr(0, filename.lastIndexOf('\\')) }, services: { UI: preactUI, transformer: new core_1.Transformer({ module: types_1.default.ModuleSystem.CommonJS }), logger: deferredLogger }, components: { "Tests": { "Test": func_1.Test } } });
            app_preact.run().then(element => resolve(element.toString()), r => resolve(r.message));
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
