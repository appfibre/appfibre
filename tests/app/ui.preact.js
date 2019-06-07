"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbt_1 = require("../fbt");
const core_1 = require("@appfibre/core");
const webapp_1 = require("@appfibre/webapp");
const services_ui_preact_1 = __importDefault(require("@appfibre/services-ui-preact"));
const enzyme_1 = __importDefault(require("enzyme"));
const enzyme_adapter_preact_1 = require("enzyme-adapter-preact");
const func_1 = require("./ui/func");
const DeferredLogger_1 = require("./services/DeferredLogger");
var escape = function (p) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
};
class UI extends services_ui_preact_1.default {
    constructor(app) {
        super(app);
        this.render = enzyme_1.default.render;
    }
}
let deferredLogger = new DeferredLogger_1.DeferredLogger();
let fbt = new fbt_1.FBT((test) => require(escape('.' + test.substring(__dirname.length))), deferredLogger);
fbt.run('ui - preact', 'app', '.input.json$', '.expected.html', '.preact.html', (input, filename) => {
    return new Promise((resolve, reject) => {
        var app_preact = new webapp_1.WebApp({ main: input, options: { logLevel: webapp_1.types.LogLevel.Trace, baseExecutionPath: filename.substr(0, filename.lastIndexOf('\\')) }, services: { UI: UI, transformer: new core_1.Transformer({ module: webapp_1.types.ModuleSystem.CommonJS }), logger: deferredLogger }, components: { "Tests": { "Test": func_1.Test } } });
        enzyme_1.default.configure({ adapter: new enzyme_adapter_preact_1.Adapter() });
        app_preact.run().then((element) => resolve(element.toString()), (r) => resolve(r.message));
    });
});
