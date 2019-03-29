import Loader from '@appfibre/webpack-plugin-jst';
import { FBT } from '../fbt';
import fs from "fs";
import { types } from '@appfibre/jst';

let fbt = new FBT((file) => fs.readFileSync(file, 'utf8'));
fbt.run('jst transformations', 'jst\\transformations', '.input.json', '.expected.js', '.output.js', (input:any, filename:string, options?:any)=>{ 
    return Loader(input, options ||  {module: types.ModuleSystem.None, compact: true, name: filename });
}, '.settings.json');


//console.log(Loader("{test: function test() { alert('test'); } }"));