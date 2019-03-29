"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var webpack_plugin_jst_1 = __importDefault(require("@appfibre/webpack-plugin-jst"));
var fbt_1 = require("../fbt");
var fs_1 = __importDefault(require("fs"));
var jst_1 = require("@appfibre/jst");
var fbt = new fbt_1.FBT(function (file) { return fs_1["default"].readFileSync(file, 'utf8'); });
fbt.run('jst transformations', 'jst\\transformations', '.input.json', '.expected.js', '.output.js', function (input, filename, options) {
    return webpack_plugin_jst_1["default"](input, options || { module: jst_1.types.ModuleSystem.None, compact: true, name: filename });
}, '.settings.json');
//console.log(Loader("{test: function test() { alert('test'); } }"));
