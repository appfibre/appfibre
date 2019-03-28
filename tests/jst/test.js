"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var webpack_plugin_jst_1 = __importDefault(require("@appfibre/webpack-plugin-jst"));
/*let fbt = new FBT((file) => fs.readFileSync(file, 'utf8'));
fbt.run('jst transformations', 'jst\\transformations', '.input.json', '.expected.js', '.output.js', (input:any, filename:string, options?:any)=>{
    return Loader(input, options ||  {module: types.ModuleSystem.None, compact: true, name: filename });
}, '.settings.json');

fbt.run('jst babel transformations', 'jst\\transformations', '.input.json', '.expected.babel.js', '.output.babel.js', (input:any, filename:string, options?:any)=>{
    try {
     return Loader(input, options ||  {module: types.ModuleSystem.None, compact: true, name: filename });
    } catch (e)
    {
        return e.message;
    }
}, '.settings.json');

*/
console.log(webpack_plugin_jst_1["default"]("{test: function test() { alert('test'); } }"));
