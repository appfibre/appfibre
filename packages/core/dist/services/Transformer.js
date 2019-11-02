"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var types_1 = __importDefault(require("@appfibre/types"));
var Parsers_1 = require("./Parsers");
var Transformer = /** @class */ (function () {
    function Transformer(settings) {
        this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
        this.type = "Transformer";
        if (settings) {
            settings.parsers = settings.parsers || Parsers_1.Parsers;
            this.settings = __assign(__assign({}, settings), { indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || types_1["default"].app.ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports });
        }
        else
            this.settings = { module: types_1["default"].app.ModuleSystem.ES, parsers: Parsers_1.Parsers };
        /*this.settings.parsers[".app"] =  (obj:any, parseSettings:types.app.ITransformOutput, offset:number) => {
            var obj2:{[key:string]:any} = {};
            var keys = Object.keys(obj);
            for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
            return `${this.process.call(this, { ".new": {".require": "@appfibre/webapp#WebApp"}, "arguments": [obj2]}, true, true, offset)}`;
        };*/
    }
    Transformer.prototype.loadModule = function (context, val, offset) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (val[0] === "~") {
            return "" + this.process({ ".function": null, arguments: "loader", "return": { ".code": "loader.load('" + (m[1] === "/" ? '.' : '') + m.substr(1) + "')" + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '') + ";" } }, context, false, false, offset);
        }
        if (this.settings.module.toLowerCase() === types_1["default"].app.ModuleSystem.ES.toLowerCase())
            m = val.indexOf('#', m.length + 2) > -1 ? val.substr(0, val.indexOf('#', m.length + 2) - 1) : val;
        if (context.imports.indexOf(m) === -1)
            context.imports.push(m);
        return "_" + context.imports.indexOf(m) + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '');
    };
    // @ts-ignore
    Transformer.prototype.format = function (lines, indent) {
        var lt = this.settings.compact ? "" : "\n";
        var tab = this.settings.compact ? "" : this.settings.indent || "\t";
        return lt + new Array(indent + 1).join(tab) + lines.join("," + lt + new Array(indent + 1).join(tab)) + lt + new Array(indent).join(tab);
    };
    Transformer.prototype.process = function (obj, context, esc, et, offset) {
        var _this = this;
        var output;
        if (obj === null)
            output = "null";
        else if (Array.isArray(obj))
            output = (et ? "" : "[") + this.format.call(this, obj.map(function (e) { return _this.process(e, context, esc, false, offset + 1); }), offset) + (et ? "" : "]");
        else if (typeof obj === "object") {
            var keys = Object.keys(obj);
            var processed = false;
            for (var k in keys)
                if (!processed && keys[k].length > 0 && keys[k].charAt(0) === '.') {
                    if (keys[k].charAt(1) === ".")
                        obj[keys[k]] = undefined;
                    else if (this.settings.parsers && this.settings.parsers[keys[k]]) {
                        processed = true;
                        output = this.settings.parsers[keys[k]](this, context, obj, offset) || '';
                    }
                    else {
                        debugger;
                        throw new Error("Could not locate parser " + keys[k].substr(1));
                    }
                }
            if (!processed)
                output = (et ? "" : "{") + this.format.call(this, keys.filter(function (k) { return k.length < 2 || k.substr(0, 2) != '..'; }).map(function (k) { return (_this.reservedWords.indexOf(k) > -1 || /[^a-z0-9]/i.test(k) ? _this.skey(k) : k) + ":" + (_this.settings.compact ? '' : ' ') + _this.process(obj[k], context, esc, false, offset + 1); }), offset) + (et ? "" : "}");
        }
        else if (typeof obj === "function") // object not JSON...
            output = obj.toString();
        else
            output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
        return output;
    };
    Transformer.prototype.skey = function (key) {
        return JSON.stringify(((key.charAt(0) === "'" && key.charAt(key.length - 1) === "'") || (key.charAt(0) === '"' && key.charAt(key.length - 1) === '"')) ? key.slice(1, key.length - 2) : key);
    };
    Transformer.prototype.processExports = function (context, obj) {
        var _this = this;
        var keys = Object.keys(obj);
        var validkeys = keys.filter(function (k) { return k.indexOf(' ') === -1 && k.indexOf('/') === -1 && k.indexOf('-') === -1 && _this.reservedWords.indexOf(k) === -1; });
        var isDefault = keys.length === 1 && keys[0] === 'default';
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var';
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                //for (var req in r) output.code += `${vr} _${r[req]}${sp}=${sp}require('${req}');${nl}`;
                context.code += keys.map(function (key) { return "module.exports[" + _this.skey(key) + "]" + sp + "=" + sp + _this.process(obj[key], context, true, false, 0) + ";"; }).join(nl);
                if (!isDefault)
                    context.code += nl + "module.exports[\"default\"]" + sp + "=" + sp + "{" + sp + keys.map(function (key) { return _this.skey(key) + ": " + _this.process(obj[key], context, true, false, 0); }).join(nl) + " };";
                break;
            case "es":
                if (isDefault)
                    context.code += "export default" + sp + this.process(obj["default"], context, true, false, 0) + ";";
                else {
                    context.code += "export default" + sp + "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], context, true, false, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], context, true, false, 2)); }), 1) + "};";
                    if (this.settings.namedExports && validkeys.length > 0)
                        context.code = validkeys.map(function (key) { return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], context, true, false, 1) + ";"; }).join(nl) + ("" + (nl + context.code + nl));
                }
                break;
            default:
                context.code += "return " + (isDefault ? this.process(obj["default"], context, true, false, 1) : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 || /[^a-z0-9]/i.test(key) ? "\"" + key + "\": " + _this.process(obj[key], context, true, false, 1) : key + ":" + sp + _this.process(obj[key], context, true, false, 2); }), 1) + "}") + ";";
        }
    };
    Transformer.prototype.resolve = function (relUrl, parentUrl) {
        var backslashRegEx = /\\/g;
        if (relUrl.indexOf('\\') !== -1)
            relUrl = relUrl.replace(backslashRegEx, '/');
        // protocol-relative
        if (relUrl[0] === '/' && relUrl[1] === '/') {
            return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
        }
        // relative-url
        else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) ||
            relUrl.length === 1 && (relUrl += '/')) ||
            relUrl[0] === '/') {
            var parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
            // Disabled, but these cases will give inconsistent results for deep backtracking
            //if (parentUrl[parentProtocol.length] !== '/')
            //  throw new Error('Cannot resolve');
            // read pathname from parent URL
            // pathname taken to be part after leading "/"
            var pathname = void 0;
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
            var segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;
            var output = [];
            var segmentIndex = -1;
            for (var i = 0; i < segmented.length; i++) {
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
    };
    Transformer.prototype.processImports = function (output) {
        var _this = this;
        var nl = this.settings.compact ? '' : '\n';
        var sp = this.settings.compact ? '' : ' ';
        var vr = this.settings.preferConst ? 'const' : 'var';
        var s = {};
        var r = {};
        var s2 = {};
        var r2 = {};
        if (output.imports.length > 0)
            for (var i = 0; i < output.imports.length; i++) {
                var ext = output.imports[i][0] === "~";
                if (output.imports[i].indexOf('#') > -1) {
                    var module_name = output.imports[i].substr(0, output.imports[i].indexOf('#'));
                    if ((ext ? s2 : s)[module_name] === undefined)
                        (ext ? s2 : s)[module_name] = {};
                    (ext ? s2 : s)[module_name][output.imports[i].substr(module_name.length + 1)] = i;
                }
                else
                    (ext ? r2 : r)[output.imports[i]] = i;
            }
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                break;
            case "amd":
                var exp = Object.keys(r).map(function (key, index) { return "if (typeof _" + index + " === \"object\" && !Array.isArray(_" + index + ")) { _" + index + ".__esModule = \"" + _this.resolve(key, output.name || location.href) + "\"; } else _" + index + " = {default: _" + index + ", __esModule: \"" + _this.resolve(key, output.name || location.href) + "\"};"; }).join('\n');
                output.code = "define(" + (Object.keys(r).length > 0 ? "[" + Object.keys(r).map(function (key) { return "" + _this.skey(key); }).join(", ") + "], " : '') + "function (" + Object.keys(r).map(function (key) { return '_' + r[key]; }).join(", ") + ") { \n" + exp + " " + output.code + " });" + nl;
                break;
            case "es":
                output.code = Object.keys(s).map(function (key) { return "import {" + Object.keys(s[key]).map(function (k) { return k + " as _" + s[key][k]; }).join(',' + sp) + "} from " + _this.skey(key) + ";" + nl; }).join('') + Object.keys(r).map(function (key) { return "import * as _" + r[key] + " from " + _this.skey(key.substr(key[0] == "~" ? 1 : 0)) + ";" + nl; }).join('') + output.code;
                break;
            default:
                for (var req in r)
                    output.code = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
        }
        if (Object.keys(s2).length > 0 || Object.keys(r2).length > 0) {
            switch (this.settings.runtimeModule ? this.settings.runtimeModule.toLowerCase() : "none") {
                case "umd":
                case "commonjs":
                case "cjs":
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
                    break;
                case "amd":
                    output.code = "define(" + (Object.keys(r2).length > 0 ? "[" + Object.keys(r).map(function (key) { return "" + _this.skey(key); }).join(", ") + "], " : '') + "function (" + Object.keys(r2).map(function (key) { return '_' + r2[key]; }).join(", ") + ") { " + output.code + " });" + nl;
                    break;
                case "es":
                    output.code = Object.keys(s2).map(function (key) { return "import {" + Object.keys(s2[key]).map(function (k) { return k.substr(1) + " as _" + s[key][k]; }).join(',' + sp) + "} from " + _this.skey(key.substr(1)) + ";" + nl; }).join('') + Object.keys(r2).map(function (key) { return "import * as _" + r2[key] + " from '" + key.substr(1) + "';" + nl; }).join('') + output.code;
                    break;
                default:
                    for (var req in r2)
                        output.code = vr + " _" + r2[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output.code;
            }
        }
    };
    Transformer.prototype.transformTemplate = function (template, name) {
        var output = { name: name, imports: [], exports: {}, references: {}, compositeObject: false, code: '' };
        this.processExports(output, template == undefined || template == null || Array.isArray(template) || typeof (template) !== 'object' || Object.keys(template).filter(function (k) { return k[0] == '.'; }).length > 0 ? { "default": template } : template);
        this.processImports(output);
        return output;
    };
    Transformer.prototype.transform = function (input, name) {
        var template;
        try {
            template = JSON.parse(input);
        }
        catch (e) {
            //console.log(JSON.stringify(this.settings));
            if (this.settings.dangerouslyProcessJavaScript || this.settings.dangerouslyProcessJavaScript === undefined) {
                try {
                    template = Function("return (" + input + ");")();
                    if (this.settings.dangerouslyProcessJavaScript === undefined)
                        console.warn("Warning: " + (name || '') + " is not JSON compliant: " + e.message + ".  Set option \"dangerouslyProcessJavaScript\" to true to hide this message.\r\n" + input);
                }
                catch (f) {
                    throw new Error("Unable to process JSON or Javascript " + (name || '') + ": " + f.message);
                }
            }
            else
                throw new Error("Unable to parse JSON " + (name || '') + ": " + e.message);
        }
        try {
            return this.transformTemplate(template == undefined || template == null || Array.isArray(template) || typeof (template) !== 'object' || Object.keys(template).filter(function (k) { return k[0] == '.'; }).length > 0 ? { "default": template } : template, name);
        }
        catch (e) {
            throw new Error("Unable to transform js template: " + e.message + "\r\n" + e.stack);
        }
    };
    return Transformer;
}());
exports.Transformer = Transformer;
