"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jst_1 = require("@appfibre/jst");
function Loader(input, options) {
    options = options || { module: jst_1.types.ModuleSystem.ES };
    if (this._module)
        options.name = this._module.resource.substring(this.rootContext.length + 1);
    if (!options.name)
        options.name = '';
    if (options.dangerouslyProcessJavaScript === undefined)
        options.dangerouslyProcessJavaScript = true;
    let transformer = new jst_1.Transformer(options);
    return transformer.transform(input, undefined /*TODO*/).code;
}
exports.default = Loader;
