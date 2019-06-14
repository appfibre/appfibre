import fs from "fs"
import { FBT } from '../fbt'
import { Transformer } from '@appfibre/core'
import appfibre from "@appfibre/types"

let fbt = new FBT((file) => fs.readFileSync(file, 'utf8'));
fbt.run('jst transformations', 'jst\\transformations', '.input.json', '.expected.js', '.output.js', (input:any, filename:string, settings?:any)=>{ 
    return new Transformer(settings ||  {module: appfibre.ModuleSystem.None, compact: true, name: filename }).transform(input).code;
}, '.settings.json');
