import { Services } from '@appfibre/core';
import { ILoaderPluginArgs } from './types';
import { loader } from 'webpack';
import fs from 'fs';
import path from 'path';
import appfibre from "@appfibre/types";

function Loader(this:loader.LoaderContext, input:string, options?:ILoaderPluginArgs) {
    if (this._module)
        for (var loader in this._module.loaders)
            if (this._module.request.startsWith(this._module.loaders[loader].loader))   
                options = this._module.loaders[loader].options || { module: appfibre.app.ModuleSystem.ES};

    if (!options) options = { module: appfibre.app.ModuleSystem.ES}; 
    if (!options.module) options.module = appfibre.app.ModuleSystem.ES; 

    if (this._module) options.name = this._module.resource.substring(this.rootContext.length+1);
    if (!options.name) options.name = '';
    if (options.dangerouslyProcessJavaScript === undefined) options.dangerouslyProcessJavaScript = true;

    let transformer = new Services.Transformer(options);
    var t = transformer.transform(input, undefined /*TODO*/);

    t.imports.forEach((f:string) => {
        if (f[0] == "~") this.emitFile(f.substr(1, f.indexOf('#') > -1 ? f.indexOf('#') - 1 : f.length-1), fs.readFileSync(path.join(path.dirname(this.resourcePath), f.substr(1, f.indexOf('#') > -1 ? f.indexOf('#') - 1 : f.length-1))), null);
    });

    return t.output;
}

export default Loader;