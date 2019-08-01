import {types} from "@appfibre/types";

const basePath = '';
function nodeRequire(url:string) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basePath);
}

function run(source:string, url?:string/*, basePath?:string*/) {
    let  m = { exports: {}};
    try{
        new Function('require', 'module', `${source};\n//# sourceURL=' + ${url}`)(nodeRequire, m); 
    } catch(f) {
        console.log('Error running script from from source'+url||source);
        throw f;
    }
    return m.exports; 
}

const Loader:types.app.IModuleSystem = {

    instantiate: async (url:string, parent?:any) => {
        const res = await fetch(url, { credentials: 'same-origin' });
        if (!res.ok)
            throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
        return res.text();
    },

    import: async (source:string, url?:string) => {
        try {
            var output = run(source, url/*, basePath*/);
            return output;
        } catch(e) {
            console.log('Error executing script '+url+': ');
            throw (e);
        }
    },

    resolve (name: string): string {
        return name; 
    },

    init: (/*basePath: string*/) => void {

    }
}

export default Loader;