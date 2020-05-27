import types from "@appfibre/types"
import { Parsers } from "./Parsers"

export class Transformer implements types.app.ITransformer {
    type:"Transformer";
    settings:types.app.ITransformSettings;
    constructor(settings?:types.app.ITransformSettings)
    {
        this.type = "Transformer";
        if (settings) {
            settings.parsers = settings.parsers || Parsers;
            this.settings = {...settings, indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || types.app.ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports}
        } else 
            this.settings = { module: types.app.ModuleSystem.ES, parsers: Parsers };

        /*this.settings.parsers[".app"] =  (obj:any, parseSettings:types.app.ITransformOutput, offset:number) => {
            var obj2:{[key:string]:any} = {};
            var keys = Object.keys(obj);
            for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
            return `${this.process.call(this, { ".new": {".require": "@appfibre/webapp#WebApp"}, "arguments": [obj2]}, true, true, offset)}`;
        };*/
    }

    loadModule (tc:types.app.ITransformContext, val:string, depth:number) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (val[0] === "~") {
            return `${this.process({".function":null, arguments: "loader", return: {".code": "loader.load('" + (m[1] === "/" ? '.' : '') + m.substr(1) +"')" + (val.length > m.length ? val.substring(m.length).replace('#','.'):'') + ";"}}, tc, {format: "js", esc: false, et: false, depth})}`;
        }
        if (this.settings.module.toLowerCase() === types.app.ModuleSystem.ES.toLowerCase()) m = val.indexOf('#', m.length+2) > -1 ? val.substr(0, val.indexOf('#', m.length+2)-1) : val;
        
        if (tc.imports.indexOf(m) === -1) tc.imports.push(m);

        return `_${tc.imports.indexOf(m)}${val.length>m.length?val.substring(m.length).replace('#','.'):''}`;
    }

    reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];

    private format(this:Transformer, lines: string[], indent:number) {
        var lt = this.settings.compact ? "" : "\n"; 
        var tab = this.settings.compact ? "" : this.settings.indent || "\t";
        return lt + new Array(indent+1).join(tab) + lines.join("," + lt + new Array(indent+1).join(tab)) + lt + new Array(indent).join(tab);
    }

    process(obj:any, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) : types.app.IProcessOutput {    
        var result = {format: "json", output: ''};
        if (Array.isArray(obj))       
            result.output = (context.et ? "" : "[") + this.format.call(this, obj.map( (e) => this.process(e, tc, { format: context.format, esc: context.esc, et: false, depth: context.depth+1}).output), context.depth) + (context.et ? "" : "]");
        else if (obj && typeof obj === "object") {
            var keys = Object.keys(obj);
            var processed = false;
            for (var k in keys)
                if (!processed && keys[k].length > 0 && keys[k].charAt(0) === '.') {
                    if (keys[k].charAt(1) === ".") 
                        obj[keys[k]] = undefined;
                    else if (this.settings.parsers && this.settings.parsers[keys[k]]) {
                        processed = true;
                        let r = this.settings.parsers[keys[k]](obj, this, tc, context);
                        result.output = r.output;
                        result.format = r.format;
                    }
                    else { 
                        //debugger;
                        throw new Error(`Could not locate parser ${keys[k].substr(1)}`)
                    }
                }
            if (!processed) 
                result.output = (context.et ? "" : "{") + this.format.call(this, keys.filter(k => k.length < 2 || k.substr(0, 2) != '..').map((k) => ( this.reservedWords.indexOf(k) > -1 || /[^a-z0-9]/i.test(k) ? this.skey(k) : k ) + ":" + (this.settings.compact ? '' : ' ') + this.process(obj[k], tc, { format: context.format, esc: context.esc, et: false, depth: context.depth+1}).output), context.depth) + (context.et ? "" : "}");
        } else if (typeof obj === "function") // object not JSON...
            result.output = obj.toString();
        else
            result.output = typeof obj === "string" && context.esc ? JSON.stringify(obj) : obj;
        return result;
    }

    private skey(key:string) {
            return JSON.stringify(((key.charAt(0) === "'" && key.charAt(key.length-1) === "'") || (key.charAt(0) === '"' && key.charAt(key.length-1) === '"')) ? key.slice(1, key.length-2) : key);
    }

    private processExports(context:types.app.ITransformOutput, obj:any) {
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
                //for (var req in r) output.code += `${vr} _${r[req]}${sp}=${sp}require('${req}');${nl}`;
                //throw this.process(obj["default"], context, { format: context.format, esc: true, et: false, depth: 0});

                context.output += keys.map((key:string) => `module.exports[${this.skey(key)}]${sp}=${sp}${this.process(obj[key], context, { format: context.format, esc: true, et: false, depth: 0}).output};`).join(nl);
                if (!isDefault)
                    context.output += `${nl}module.exports["default"]${sp}=${sp}{${sp}${keys.map((key:string) => `${this.skey(key)}: ${this.process(obj[key], context, { format: "json", esc: true, et: false, depth: 0}).output}`).join(nl)} };`;
                break;
            case "es":            
                if (isDefault)
                    context.output += `export default${sp}${this.process(obj["default"], context, { format: context.format, esc: true, et: false, depth: 0}).output};`
                else {             
                    context.output += `export default${sp}{${this.format(keys.map((key:string) => validkeys.indexOf(key) === -1 ? `"${key}": ${this.process(obj[key], context, { format: "json", esc: true, et: false, depth: 1}).output}` : `${key}:${sp}${(this.settings.namedExports?key:this.process(obj[key], context, { format: "json", esc: true, et: false, depth: 2}).output)}`), 1)}};`
                    if (this.settings.namedExports && validkeys.length > 0)
                        context.output = validkeys.map((key:number) => `export ${vr} ${key}${sp}=${sp}${this.process(obj[key], context, { format: context.format, esc: true, et: false, depth: 1}).output};`).join(nl) + `${nl + context.output + nl}`;
                }
                break;
            case "raw":
                if (isDefault)
                {
                    //html
                    let result = this.process(obj["default"], context, { format: "json", esc: true, et: false, depth: 1});
                    context.output += result.output;
                    context.format = result.format;
                } else 
                    context.output += `${isDefault ? this.process(obj["default"], context, { format: "json", esc: true, et: false, depth: 1}).output : `{${this.format(keys.map((key:string) => validkeys.indexOf(key) === -1 || /[^a-z0-9]/i.test(key) ? `"${key}": ${this.process(obj[key], context, { format: "json", esc: true, et: false, depth: 1}).output}` : `${key}:${sp}${this.process(obj[key], context, { format: "json", esc: true, et: false, depth: 2}).output}`), 1)}}`}`;
                break;
            default:
                context.output += `return ${isDefault ? this.process(obj["default"], context, { format: "json", esc: true, et: false, depth: 1}).output : `{${this.format(keys.map((key:string) => validkeys.indexOf(key) === -1 || /[^a-z0-9]/i.test(key) ? `"${key}": ${this.process(obj[key], context, { format: "json", esc: true, et: false, depth: 1})}` : `${key}:${sp}${this.process(obj[key], context, { format: "json", esc: true, et: false, depth: 2}).output}`), 1)}}`};`;
        }
    }

    private resolve(relUrl:string, parentUrl:string) {
        const backslashRegEx = /\\/g;

        if (relUrl.indexOf('\\') !== -1)
          relUrl = relUrl.replace(backslashRegEx, '/');
        // protocol-relative
        if (relUrl[0] === '/' && relUrl[1] === '/') {
          return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
        }
        // relative-url
        else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) ||
            relUrl.length === 1  && (relUrl += '/')) ||
            relUrl[0] === '/') {
          const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
          // Disabled, but these cases will give inconsistent results for deep backtracking
          //if (parentUrl[parentProtocol.length] !== '/')
          //  throw new Error('Cannot resolve');
          // read pathname from parent URL
          // pathname taken to be part after leading "/"
          let pathname;
          if (parentUrl[parentProtocol.length + 1] === '/') {
            // resolving to a :// so we need to read out the auth and host
            if (parentProtocol !== 'file:') {
              pathname = parentUrl.slice(parentProtocol.length + 2);
              pathname = pathname.slice(pathname.indexOf('/') + 1);
            }
            else {
              pathname = parentUrl.slice(8);
            }
          }
          else {
            // resolving to :/ so pathname is the /... part
            pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/' ? 1 : 0));
          }
    
          if (relUrl[0] === '/')
            return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;
    
          // join together and split for removal of .. and . segments
          // looping the string instead of anything fancy for perf reasons
          // '../../../../../z' resolved to 'x/y' is just 'z'
          const segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;
    
          const output = [];
          let segmentIndex = -1;
          for (let i = 0; i < segmented.length; i++) {
            // busy reading a segment - only terminate on '/'
            if (segmentIndex !== -1) {
              if (segmented[i] === '/') {
                output.push(segmented.slice(segmentIndex, i + 1));
                segmentIndex = -1;
              }
            }
    
            // new segment - check if it is relative
            else if (segmented[i] === '.') {
              // ../ segment
              if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
                output.pop();
                i += 2;
              }
              // ./ segment
              else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
                i += 1;
              }
              else {
                // the start of a new segment as below
                segmentIndex = i;
              }
            }
            // it is the start of a new segment
            else {
              segmentIndex = i;
            }
          }
          // finish reading out the last segment
          if (segmentIndex !== -1)
            output.push(segmented.slice(segmentIndex));
          return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
        }
        return relUrl;
      }

    private processImports(transform:types.app.ITransformOutput) {
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var'

        var s : any[string] = {};
        var r : any[string] = {};
        var s2 : any[string] = {};
        var r2 : any[string] = {};
        
        if (transform.imports.length > 0) 
            for (var i = 0; i < transform.imports.length; i++) {
                    var ext = transform.imports[i][0] === "~";
                    if (transform.imports[i].indexOf('#') > -1) {
                        var module_name = transform.imports[i].substr(0,transform.imports[i].indexOf('#'));
                        if ((ext?s2:s)[module_name] === undefined)    
                            (ext?s2:s)[module_name] = { };
                        (ext?s2:s)[module_name][transform.imports[i].substr(module_name.length+1)] = i;
                    } else
                        (ext?r2:r)[transform.imports[i]] = i;
            }

        switch (this.settings.module.toLowerCase())
        {
            case "umd": 
            case "commonjs":
            case "cjs":
                for (var req in r) transform.output = `${vr} _${r[req]}${sp}=${sp}require("${req}");${nl}${transform.output}`;
                break;
            case "amd": 
                var exp = Object.keys(r).map((key:string, index:number) => `if (typeof _${index} === "object" && !Array.isArray(_${index})) { _${index}.__esModule = "${this.resolve(key, transform.name||location.href)}"; } else _${index} = {default: _${index}, __esModule: "${this.resolve(key, transform.name||location.href)}"};`).join('\n');
                transform.output = `define(${(Object.keys(r).length > 0 ? `[${Object.keys(r).map((key:string) => `${this.skey(key)}`).join(", ")}], ` : '')}function (${Object.keys(r).map((key:string) => '_'+r[key]).join(", ")}) { \n${exp} ${transform.output} });${nl}`
                break;
            case "es":
                transform.output = Object.keys(s).map((key:string) => `import {${Object.keys(s[key]).map((k:string) => `${k} as _${s[key][k]}` ).join(','+sp)}} from ${this.skey(key)};${nl}`).join('') + Object.keys(r).map((key:string) => `import * as _${r[key]} from ${this.skey(key.substr(key[0] == "~" ? 1 : 0))};${nl}`).join('') + transform.output;
                break;
            default:
                for (var req in r) transform.output = `${vr} _${r[req]}${sp}=${sp}require("${req}");${nl}${transform.output}`;
        }

        if (Object.keys(s2).length > 0 || Object.keys(r2).length > 0) {
            switch (this.settings.runtimeModule ? this.settings.runtimeModule.toLowerCase() : "none")
            {
                case "umd": 
                case "commonjs":
                case "cjs":
                    for (var req in r2) transform.output = `${vr} _${r2[req]}${sp}=${sp}require("${req}");${nl}${transform.output}`;
                    break;
                case "amd": 
                    transform.output = `define(${(Object.keys(r2).length > 0 ? `[${Object.keys(r).map((key:string) => `${this.skey(key)}`).join(", ")}], ` : '')}function (${Object.keys(r2).map((key:string) => '_'+r2[key]).join(", ")}) { ${transform.output} });${nl}`
                    break;
                case "es":
                    transform.output = Object.keys(s2).map((key:string) => `import {${Object.keys(s2[key]).map((k:string) => `${k.substr(1)} as _${s[key][k]}` ).join(','+sp)}} from ${this.skey(key.substr(1))};${nl}`).join('') + Object.keys(r2).map((key:string) => `import * as _${r2[key]} from '${key.substr(1)}';${nl}`).join('') + transform.output;
                    break;
                default:
                    for (var req in r2) transform.output = `${vr} _${r2[req]}${sp}=${sp}require("${req}");${nl}${transform.output}`;
            }
        }
    }

    transformTemplate(template:types.jst.template, name?:string) : types.app.ITransformOutput {
        var output:types.app.ITransformOutput = {name, imports: [], exports: {}, references: {}, compositeObject:false, output:'', format: "json"};
        this.processExports(output, template == undefined || template == null || Array.isArray(template) || typeof(template) !== 'object' || Object.keys(template).filter(k=>k[0]=='.').length > 0 ? {"default": template} : template);
        this.processImports(output);
        return output;
    }

    transform (input:string, name?:string) : types.app.ITransformOutput {
        var template:types.jst.template;
        try
        {
            template = JSON.parse(input);
        }
        catch (e)
        {
            //console.log(JSON.stringify(this.settings));
            if (this.settings.dangerouslyProcessJavaScript || this.settings.dangerouslyProcessJavaScript === undefined) {
                try {
                    template = Function(`return (${input});`)();
                    if (this.settings.dangerouslyProcessJavaScript === undefined) console.warn(`Warning: ${name || ''} is not JSON compliant: ${e.message}.  Set option "dangerouslyProcessJavaScript" to true to hide this message.\r\n${input}`);
                } catch (f)
                {
                    throw new Error(`Unable to process JSON or Javascript ${name || ''}: ${f.message}`);
                }
            } else 
                throw new Error(`Unable to parse JSON ${name || ''}: ${e.message}`);
        }
        try {
            return this.transformTemplate(template == undefined || template == null || Array.isArray(template) || typeof(template) !== 'object' || Object.keys(template).filter(k=>k[0]=='.').length > 0 ? {"default": template} : template, name);
        } catch (e) {
            throw new Error(`Unable to transform js template: ${e.message}\r\n${e.stack}`);
        }
    }
}