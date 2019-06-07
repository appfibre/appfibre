import fs from "fs";
import { FBT } from '../fbt';
import { types, Transformer } from '@appfibre/core';

let fbt = new FBT((file) => fs.readFileSync(file, 'utf8'));
fbt.run('jst transformations', 'jst\\transformations', '.input.json', '.expected.js', '.output.js', (input:any, filename:string, options?:any)=>{ 
    return new Transformer(options ||  {module: types.ModuleSystem.None, compact: true, name: filename }).transform(input).code;
}, '.settings.json');
