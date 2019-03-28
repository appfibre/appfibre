"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel = __importStar(require("@babel/core"));
const jst_1 = require("@appfibre/jst");
const emit_1 = __importDefault(require("./emit"));
const parse_1 = __importDefault(require("./parse"));
const parsers_1 = require("./parsers");
function Loader(input, options) {
    options = options || { module: jst_1.types.ModuleSystem.ES };
    if (this._module)
        options.name = this._module.resource.substring(this.rootContext.length + 1);
    if (!options.name)
        options.name = '';
    var json = null;
    try {
        if (!options.forceBabel)
            json = JSON.parse(input);
    }
    catch (e) {
        console.warn(`Warning: ${options.name} is not JSON compliant: ${e.message}`);
        try {
            json = eval(`(${input});`);
        }
        catch (f) {
            console.warn(`Warning: ${options.name} is not JS compliant: ${f.message}`);
        }
    }
    if (json != null) {
        let transformer = new jst_1.Transformer(options);
        return transformer.transform(json, undefined /*TODO*/);
    }
    else {
        //settings.parsers[".require"] = this.settings.parsers[".import"] = (obj:any, parseSettings:IParseSettings, offset:number) => this.loadModule(obj[".import"] || obj[".require"], parseSettings);
        var opt = { parsers: {} };
        opt.parsers['.require'] = opt.parsers['.import'] = parsers_1._require;
        opt.parsers['.app'] = parsers_1._app;
        var settings = { plugins: [
                [parse_1.default, opt],
                [emit_1.default, { name: options.name }]
            ] };
        var t = babel.transform('export default { "__name": \"' + options.name.replace('\"', '\\\"') + '\", "__jst": ' + (input ? input : null) + '}', settings);
        return t ? t.code : null;
    }
}
exports.default = Loader;
