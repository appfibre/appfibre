import { Transformer, types } from '@appfibre/jst';
import {ILoaderPluginArgs} from './types';

export default function Loader(this:any, input:string, options?:ILoaderPluginArgs) {
    options = options || { module: types.ModuleSystem.ES};
    if (this._module) options.name = this._module.resource.substring(this.rootContext.length+1);
    if (!options.name) options.name = '';
    if (options.dangerouslyProcessJavaScript === undefined) options.dangerouslyProcessJavaScript = true;

    let transformer = new Transformer(options);
    var t = transformer.transform(input, undefined /*TODO*/);
    return t.code;
}