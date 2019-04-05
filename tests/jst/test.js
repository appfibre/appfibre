"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var fbt_1 = require("../fbt");
var jst_1 = require("@appfibre/jst");
var fbt = new fbt_1.FBT(function (file) { return fs_1["default"].readFileSync(file, 'utf8'); });
fbt.run('jst transformations', 'jst\\transformations', '.input.json', '.expected.js', '.output.js', function (input, filename, options) {
    return new jst_1.Transformer(options || { module: jst_1.types.ModuleSystem.None, compact: true, name: filename }).transform(input).code;
}, '.settings.json');
