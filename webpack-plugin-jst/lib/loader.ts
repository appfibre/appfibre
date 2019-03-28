import * as babel from '@babel/core';
import { Transformer, types } from '@appfibre/jst';
import { PluginObj, transform } from '@babel/core';
import emit from './emit';
import parse from './parse';
import {_require, _app} from './parsers';
import {ITransformPluginArgs, ILoaderPluginArgs} from './types';

export default function Loader(this:any, input:string, options?:ILoaderPluginArgs) {
    options = options || { module: types.ModuleSystem.ES};
    if (this._module) options.name = this._module.resource.substring(this.rootContext.length+1);
    if (!options.name) options.name = '';

    var json = null;
    try
    {
        if (!options.forceBabel)
            json = JSON.parse(input);
    }
    catch (e)
    {
        console.warn(`Warning: ${options.name} is not JSON compliant: ${e.message}`);
        try {
            json = eval(`(${input});`);
        } catch (f)
        {
            console.warn(`Warning: ${options.name} is not JS compliant: ${f.message}`);
        }
    }
    
    if (json != null) {
        let transformer = new Transformer(options);
        return transformer.transform(json, undefined /*TODO*/);
    } else {

        //settings.parsers[".require"] = this.settings.parsers[".import"] = (obj:any, parseSettings:IParseSettings, offset:number) => this.loadModule(obj[".import"] || obj[".require"], parseSettings);
        
        var opt:ITransformPluginArgs = {parsers:{}};
        opt.parsers['.require'] = opt.parsers['.import'] = _require;
        opt.parsers['.app'] = _app;

        var settings:babel.TransformOptions =   { plugins: [ 
                                                    [parse, opt]
                                                  , [emit, {name: options.name}]
                                                ]};

        var t = babel.transform('export default { "__name": \"' + options.name.replace('\"', '\\\"') + '\", "__jst": ' + (input ? input : null) + '}', settings);
        return t ? t.code : null;
    }  
        
}