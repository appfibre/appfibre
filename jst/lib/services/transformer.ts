import {ITransformer, ModuleSystem, ITransformSettings, IParseSettings} from '../types'

export class Transformer implements ITransformer {
    type:"Transformer";
    settings:ITransformSettings;
    constructor(settings?:ITransformSettings)
    {
        this.type = "Transformer";
        this.settings = settings ? { indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports, preferConst: settings.preferConst } : { module: ModuleSystem.ES};
        this.settings.parsers = this.settings.parsers || {};
        this.settings.parsers[".require"] = this.settings.parsers[".import"] = (obj:any, parseSettings:IParseSettings, offset:number) => this.loadModule(obj[".import"] || obj[".require"], parseSettings);
        this.settings.parsers[".function"] = (obj:any, parseSettings:IParseSettings, offset:number) => { return `function ${obj[".function"]?obj[".function"]:""}(${obj["arguments"] ? this.process(obj["arguments"], false, true, parseSettings, offset) : ""}){ return ${this.process(obj["return"], true, false, parseSettings, offset)} }`;};
        this.settings.parsers[".map"] = (obj:any, parseSettings:IParseSettings, offset:number) => { return `${this.process(obj[".map"], false, false, parseSettings, offset)}.map(function(${obj["arguments"]}) {return ${settings && settings.indent ? new Array(offset).join(' ') :""}${this.process(obj["return"], true, false, parseSettings, offset)} })` };
        this.settings.parsers[".filter"] = (obj:any, parseSettings:IParseSettings, offset:number) => { return `${this.process(obj[".filter"], false, false, parseSettings, offset)}.filter(function(${obj["arguments"]}) {return ${this.process(obj["condition"], true, false, parseSettings, offset)} })` };
        this.settings.parsers[".call"] = (obj:any, parseSettings:IParseSettings, offset:number) => { return `${this.process(obj[".call"], false, false, parseSettings, offset)}.call(${obj["arguments"] ? this.process(obj["arguments"], false, true, parseSettings, offset) : ""})` }
        this.settings.parsers[".exec"] = (obj:any, parseSettings:IParseSettings, offset:number) => { return `${this.process(obj[".exec"], true, false, parseSettings, offset)}(${obj["arguments"] ? this.process(obj["arguments"], true, true, parseSettings, offset) : ""})` }
        this.settings.parsers[".new"] = (obj:any, parseSettings:IParseSettings, offset:number) => { return `new ${this.process(obj[".new"], true, false, parseSettings, offset)}(${obj["arguments"] ? this.process(obj["arguments"], true, true, parseSettings, offset) : ""})` }
        this.settings.parsers[".id"] = this.settings.parsers[".code"] = (obj:any, parseSettings:IParseSettings, offset:number) => obj[".code"] || obj[".id"];
        this.settings.parsers[".app"] =  (obj:any, parseSettings:IParseSettings, offset:number) => {
            var obj2:{[key:string]:any} = {};
            var keys = Object.keys(obj);
            for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
            return `${this.process({ ".new": {".require": "@appfibre/jst#App"}, "arguments": [obj2]}, true, true, parseSettings, offset)}.run()`;
        };
        this.settings.parsers["."] = (obj:any, parseSettings:IParseSettings, offset?:number) => obj["."];
    }

    loadModule (val:string, parseSettings:IParseSettings) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (this.settings.module.toLowerCase() === ModuleSystem.ES.toLowerCase()) m = val.indexOf('#', m.length+2) > -1 ? val.substr(0, val.indexOf('#', m.length+2)-1) : val;
        if (parseSettings.imports.indexOf(m) === -1) parseSettings.imports.push(m);
        return `_${parseSettings.imports.indexOf(m)}${val.length>m.length?val.substring(m.length).replace('#','.'):''}`;
    }

    reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];

    format(lines: string[], parseSettings:IParseSettings, indent:number) {
        var lt = this.settings.compact ? "" : "\n"; 
        var tab = this.settings.compact ? "" : this.settings.indent || "\t";
        return lt + new Array(indent+1).join(tab) + lines.join("," + lt + new Array(indent+1).join(tab)) + lt + new Array(indent).join(tab);
    }

    process(obj:any, esc:boolean, et:boolean, parseSettings:IParseSettings, offset:number) : string {
        var output;
        if (obj === null)
            output = "null";
        else if (Array.isArray(obj))       
            output = (et ? "" : "[") + this.format(obj.map( (e, i) => this.process(e, esc, false, parseSettings, offset+1)), parseSettings, offset) + (et ? "" : "]");
        else if (typeof obj === "object") {
            var keys = Object.keys(obj);
            var processed = false;
            for (var k in keys)
                if (!processed && keys[k].length > 0 && keys[k].charAt(0) == '.') {
                    if (this.settings.parsers && this.settings.parsers[keys[k]]) {
                        processed = true;
                        output = this.settings.parsers[keys[k]](obj, parseSettings, offset) || '';
                    }
                    else 
                        throw new Error(`Could not locate parser ${keys[k].substr(1)}`)
                }
            if (!processed) 
                output = (et ? "" : "{") + this.format(keys.filter(k => k.length < 2 || k.substr(0, 2) != '..').map((k,i) => ( this.reservedWords.indexOf(k) > -1 ? "\"" + k + "\"" : k ) + ":" + (this.settings.compact ? '' : ' ') + this.process(obj[k], esc, false, parseSettings, offset+1)), parseSettings, offset) + (et ? "" : "}");
        } else if (typeof obj === "function") // object not JSON...
            output = obj.toString();
        else
            output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
        return output;
    }

    bundleModule(obj:any, parseSettings:IParseSettings) : string {
        var output = '';
        var keys : any[string] = Object.keys(obj);
        var validkeys : any[string] = keys.filter((k:string) => k.indexOf(' ') === -1 && k.indexOf('/') === -1 && k.indexOf('-') === -1 && this.reservedWords.indexOf(k) === -1 );
        var isDefault = keys.length === 1 && keys[0] === 'default';
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var'

        switch (this.settings.module.toLowerCase())
        {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r) output += `${vr} _${r[req]}${sp}=${sp}require('${req}');${nl}`;
                output += keys.map((key:number) => `module.exports['${key}']${sp}=${sp}${this.process(obj[key], true, false, parseSettings, 0)};`).join(nl);
                if (!isDefault)
                    output += `${nl}module.exports['default']${sp}=${sp}{${sp}${keys.map((key:number) => `${key}: ${this.process(obj[key], true, false, parseSettings, 0)}`).join(nl)} };`;
                if (parseSettings.name) output += `${nl}module.exports['__jst'] = '${name};`;
                break;
            case "es":            
                if (isDefault)
                    output += `export default${sp}${this.process(obj["default"], true, false, parseSettings, 0)};`
                else {             
                    output += `export default${sp}{${this.format(keys.map((key:string) => validkeys.indexOf(key) === -1 ? `"${key}": ${this.process(obj[key], true, false, parseSettings, 0)}` : `${key}:${sp}${(this.settings.namedExports?key:this.process(obj[key], true, false, parseSettings, 2))}`), parseSettings, 1)}};`
                    if (this.settings.namedExports && validkeys.length > 0)
                        output = validkeys.map((key:number) => `export ${vr} ${key}${sp}=${sp}${this.process(obj[key], true, false, parseSettings, 1)};`).join(nl) + `${nl + output + nl}`;
                }
                break;
            default:
                if (parseSettings.name)
                    output += `return ${isDefault ? "{'default' : " + this.process(obj["default"], true, false, parseSettings, 1) + ", '__jst': '" + parseSettings.name + "'}" : `{${this.format(keys.map((key:string) => validkeys.indexOf(key) === -1 ? `"${key}": ${this.process(obj[key], true, false, parseSettings, 1)}` : `${key}:${sp}${this.process(obj[key], true, false, parseSettings, 2)}`), parseSettings, 1)}}, '__jst': '${parseSettings.name}'`};`;
                else
                    output += `return ${isDefault ? this.process(obj["default"], true, false, parseSettings, 1) : `{${this.format(keys.map((key:string) => validkeys.indexOf(key) === -1 ? `"${key}": ${this.process(obj[key], true, false, parseSettings, 1)}` : `${key}:${sp}${this.process(obj[key], true, false, parseSettings, 2)}`), parseSettings, 1)}}`};`;
        }

        var s : any[string] = {};
        var r : any[string] = {};
        
        if (parseSettings.imports.length > 0) 
            for (var i = 0; i < parseSettings.imports.length; i++)
                if (parseSettings.imports[i].indexOf('#') > -1) {
                    var name = parseSettings.imports[i].substr(0,parseSettings.imports[i].indexOf('#'));
                    if (s[name] === undefined)    
                        s[name] = { };
                    s[name][parseSettings.imports[i].substr(name.length+1)] = i;
                } else
                    r[parseSettings.imports[i]] = i;

        switch (this.settings.module.toLowerCase())
        {
            case "umd": 
            case "commonjs":
            case "cjs":
                for (var req in r) output = `${vr} _${r[req]}${sp}=${sp}require("${req}");${nl}${output}`;
                break;
            case "amd": 
                output = `define([${Object.keys(r).map((key:string) => `'${key}'`).join(", ")}], function (${Object.keys(r).map((key:string) => '_'+r[key]).join(", ")}) { ${output} });${nl}`
                break;
            case "es":
                output = Object.keys(s).map((key:string) => (key.charAt(0) === '~' ? `var {${Object.keys(s[key]).map((k:string) => `${k}: _${s[key][k]}`)}}  = await import('${key.substr(1)}');${nl}` : `import {${Object.keys(s[key]).map((k:string) => `${k} as _${s[key][k]}` ).join(','+sp)}} from '${key}';${nl}`)).join('') + Object.keys(r).map((key:string) => (key.charAt(0) === '~' ? `var _${r[key]} = await import('${key.substr(1)}');${nl}` : `import * as _${r[key]} from '${key}';${nl}`)).join('') + output;
                break;
            default:
                for (var req in r) output = `${vr} _${r[req]}${sp}=${sp}require("${req}");${nl}${output}`;
        }
        return output;
    }


    transform (obj:any, name?:string) : string {
        return this.bundleModule(Array.isArray(obj) || typeof(obj) != 'object' || Object.keys(obj).filter(k=>k[0]=='.').length > 0 ? {"default": obj} : obj, {name:name, imports: [], exports: {}, compositeObject:false});
    }

}