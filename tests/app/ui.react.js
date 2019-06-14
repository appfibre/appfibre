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
const types_1 = __importDefault(require("@appfibre/types"));
var escape = function (p) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
};
class UI extends services_ui_react_1.default {
    constructor(app) {
        super(app);
        this.render = enzyme_1.default.render;
    }
}
let deferredLogger = new DeferredLogger_1.DeferredLogger();
let fbt = new fbt_1.FBT((test) => require(escape('.' + test.substring(__dirname.length))), deferredLogger);
fbt.run('ui - react', 'app', '.input.json', '.expected.html', '.react.html', (input, filename) => {
    return new Promise((resolve, reject) => {
        var app_react = new webapp_1.WebApp({ main: input, settings: { logLevel: types_1.default.LogLevel.Trace, baseExecutionPath: filename.substr(0, filename.lastIndexOf('\\')) }, services: { UI: UI, logger: deferredLogger, transformer: new core_1.Transformer({ module: types_1.default.ModuleSystem.CommonJS }) }, components: { "Tests": { "Test": func_1.Test } } });
        enzyme_1.default.configure({ adapter: new enzyme_adapter_react_16_1.default() });
        app_react.run().then(element => resolve(element.toString()), r => resolve(r.message));
    });
});
