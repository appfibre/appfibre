import { IModuleSystem } from '../types';
import path from 'path';

let basepath:string|undefined;
function nodeRequire(url:string) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basepath||'');
}

function run(source:string, url?:string) {
    let  m = { exports: {}};
    try{
        new Function('require', 'module', `${source};\n//# sourceURL=' + ${url}`)(nodeRequire, m); 
    } catch(f) {
        console.log('Error running script from source "'+(url||source)+'"', f);
        throw f;
    }
    return m.exports; 
}

const Loader:IModuleSystem = {
    
    instantiate: async (url:string, parent?:any) => {
        const res = await fetch(url, { credentials: 'same-origin' });
        if (!res.ok)
            throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
        return res.text();
    },

    import: async (source:string, url?:string) => {
        try {
            var output = run(source, url);
            return output;
        } catch(e) {
            console.log('Error executing script "'+url+'": '+e);
            throw (e);
        }
    },

    init(basePath: string) {
        basepath = basePath;
    }
}

export default Loader;