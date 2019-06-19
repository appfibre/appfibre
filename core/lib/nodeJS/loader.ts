import appfibre from "@appfibre/types";

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

const Loader:appfibre.app.IModuleSystem = {
    
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

    resolve(name:string) {
        return name;
    },

    init(basePath: string) {
        basepath = basePath;
    }
}

export default Loader;