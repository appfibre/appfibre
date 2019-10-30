import { types } from "@appfibre/types";
//import path from 'path';

let basepath:string|undefined;
function nodeRequire(url?:string) {
    let tmpdir = basepath || global.process.env.INIT_CWD; 
    var __dirname__ = global.process.cwd(); 
    if (tmpdir && __dirname__ != tmpdir) 
        global.process.chdir(tmpdir); 
    var _exp = ((<any>global).require || (global.process.mainModule ? (<any>global.process.mainModule.constructor)._load : url))(url); 
    if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); 
    return _exp;

    //return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basepath||'');
}

function run(source:string, url?:string, references?:{[name:string]:any}) {
    let  m = { exports: {}};
    try{
        if (url) basepath = url;//path.resolve(url);
        let refkeys = references ? Object.keys(references) : [];
        let refs = references ? Object.values(references) : [];
        Function(...refkeys, 'require', 'module', `${source};\n//# sourceURL=' + ${url}`)(...refs, nodeRequire, m); 
    } catch(f) {
        console.log('Error running script from source "'+(url||source)+'"', f);
        throw f;
    }
    return m.exports; 
}

const Loader:types.app.IModuleSystem = {
    
    instantiate: async (url:string, parent?:any, _references?:{[name:string]:any}) => {
        const res = await fetch(url, { credentials: 'same-origin' });
        if (!res.ok)
            throw new Error('Fetch error: ' + res.status + ' ' + res.statusText + (parent ? ' loading from  ' + parent : ''));
        return res.text();
    },

    import: async (source:string, url?:string, references?:{[name:string]:any}) => {
        try {
            var output = run(source, url, references);
            return output;
        } catch(e) {
            console.log('Error executing script "'+url+'": '+e+'\n "'+source + '"');
            throw (e);
        }
    },

    resolve(name:string) {
        return name;
    },

    init(basePath: string) {
        basepath = basePath;
    },

    fetch: async (url:string, headers?:Record<string, string>) => {
        const res = await fetch(url, {headers: headers, credentials: 'same-origin'});
        return { text: await res.text(), contentType: (res.headers.get('content-type')||'text/plain').split(';')[0].toLowerCase() };
    },

    register(_source:string, _target:string) {

    }
}

export { Loader }