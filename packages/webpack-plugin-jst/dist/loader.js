"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@appfibre/core");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const types_1 = __importDefault(require("@appfibre/types"));
function Loader(input, options) {
    if (this._module)
        for (var loader in this._module.loaders)
            if (this._module.request.startsWith(this._module.loaders[loader].loader))
                options = this._module.loaders[loader].options || { module: types_1.default.app.ModuleSystem.ES };
    if (!options)
        options = { module: types_1.default.app.ModuleSystem.ES };
    if (!options.module)
        options.module = types_1.default.app.ModuleSystem.ES;
    if (this._module)
        options.name = this._module.resource.substring(this.rootContext.length + 1);
    if (!options.name)
        options.name = '';
    if (options.dangerouslyProcessJavaScript === undefined)
        options.dangerouslyProcessJavaScript = true;
    let transformer = new core_1.Services.Transformer(options);
    var t = transformer.transform(input, undefined /*TODO*/);
    t.imports.forEach((f) => {
        if (f[0] == "~")
            this.emitFile(f.substr(1, f.indexOf('#') > -1 ? f.indexOf('#') - 1 : f.length - 1), fs_1.default.readFileSync(path_1.default.join(path_1.default.dirname(this.resourcePath), f.substr(1, f.indexOf('#') > -1 ? f.indexOf('#') - 1 : f.length - 1))), null);
    });
    return t.output;
}
exports.default = Loader;
