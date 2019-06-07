"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fbt_1 = require("../fbt");
const core_1 = require("@appfibre/core");
let fbt = new fbt_1.FBT((file) => fs_1.default.readFileSync(file, 'utf8'));
fbt.run('jst transformations', 'jst\\transformations', '.input.json', '.expected.js', '.output.js', (input, filename, options) => {
    return new core_1.Transformer(options || { module: core_1.types.ModuleSystem.None, compact: true, name: filename }).transform(input).code;
}, '.settings.json');
