"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var Transformer = /** @class */ (function () {
    function Transformer(settings) {
        var _this = this;
        this.reservedWords = ['function', 'for', 'var', 'this', 'self', 'null'];
        this.type = "Transformer";
        this.settings = settings ? { indent: settings.indent || '\t', compact: settings.compact || false, module: settings.module || types_1.ModuleSystem.None, namedExports: settings.namedExports === undefined ? true : settings.namedExports, preferConst: settings.preferConst } : { module: types_1.ModuleSystem.ES };
        this.settings.parsers = this.settings.parsers || {};
        this.settings.parsers[".require"] = this.settings.parsers[".import"] = function (obj, parseSettings, offset) { return _this.loadModule(obj[".import"] || obj[".require"], parseSettings); };
        this.settings.parsers[".function"] = function (obj, parseSettings, offset) { return "function " + (obj[".function"] ? obj[".function"] : "") + "(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + "){ return " + _this.process(obj["return"], true, false, parseSettings, offset) + " }"; };
        this.settings.parsers[".map"] = function (obj, parseSettings, offset) { return _this.process(obj[".map"], false, false, parseSettings, offset) + ".map(function(" + obj["arguments"] + ") {return " + (settings && settings.indent ? new Array(offset).join(' ') : "") + _this.process(obj["return"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".filter"] = function (obj, parseSettings, offset) { return _this.process(obj[".filter"], false, false, parseSettings, offset) + ".filter(function(" + obj["arguments"] + ") {return " + _this.process(obj["condition"], true, false, parseSettings, offset) + " })"; };
        this.settings.parsers[".call"] = function (obj, parseSettings, offset) { return _this.process(obj[".call"], false, false, parseSettings, offset) + ".call(" + (obj["arguments"] ? _this.process(obj["arguments"], false, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".exec"] = function (obj, parseSettings, offset) { return _this.process(obj[".exec"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".new"] = function (obj, parseSettings, offset) { return "new " + _this.process(obj[".new"], true, false, parseSettings, offset) + "(" + (obj["arguments"] ? _this.process(obj["arguments"], true, true, parseSettings, offset) : "") + ")"; };
        this.settings.parsers[".id"] = this.settings.parsers[".code"] = function (obj, parseSettings, offset) { return obj[".code"] || obj[".id"]; };
        this.settings.parsers[".app"] = function (obj, parseSettings, offset) {
            var obj2 = {};
            var keys = Object.keys(obj);
            for (var key in keys)
                obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
            return _this.process({ ".new": { ".require": "@appfibre/jst#App" }, "arguments": [obj2] }, true, true, parseSettings, offset) + ".run()";
        };
        this.settings.parsers["."] = function (obj, parseSettings, offset) { return obj["."]; };
    }
    Transformer.prototype.loadModule = function (val, parseSettings) {
        var m = val.indexOf('#') > 0 ? val.substr(0, val.indexOf('#')) : val;
        if (this.settings.module.toLowerCase() === types_1.ModuleSystem.ES.toLowerCase())
            m = val.indexOf('#', m.length + 2) > -1 ? val.substr(0, val.indexOf('#', m.length + 2) - 1) : val;
        if (parseSettings.imports.indexOf(m) === -1)
            parseSettings.imports.push(m);
        return "_" + parseSettings.imports.indexOf(m) + (val.length > m.length ? val.substring(m.length).replace('#', '.') : '');
    };
    Transformer.prototype.format = function (lines, parseSettings, indent) {
        var lt = this.settings.compact ? "" : "\n";
        var tab = this.settings.compact ? "" : this.settings.indent || "\t";
        return lt + new Array(indent + 1).join(tab) + lines.join("," + lt + new Array(indent + 1).join(tab)) + lt + new Array(indent).join(tab);
    };
    Transformer.prototype.process = function (obj, esc, et, parseSettings, offset) {
        var _this = this;
        var output;
        if (obj === null)
            output = "null";
        else if (Array.isArray(obj))
            output = (et ? "" : "[") + this.format(obj.map(function (e, i) { return _this.process(e, esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "]");
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
                        throw new Error("Could not locate parser " + keys[k].substr(1));
                }
            if (!processed)
                output = (et ? "" : "{") + this.format(keys.filter(function (k) { return k.length < 2 || k.substr(0, 2) != '..'; }).map(function (k, i) { return (_this.reservedWords.indexOf(k) > -1 ? "\"" + k + "\"" : k) + ":" + (_this.settings.compact ? '' : ' ') + _this.process(obj[k], esc, false, parseSettings, offset + 1); }), parseSettings, offset) + (et ? "" : "}");
        }
        else if (typeof obj === "function") // object not JSON...
            output = obj.toString();
        else
            output = typeof obj === "string" && esc ? JSON.stringify(obj) : obj;
        return output;
    };
    Transformer.prototype.bundleModule = function (obj, parseSettings) {
        var _this = this;
        var output = '';
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
                for (var req in r)
                    output += vr + " _" + r[req] + sp + "=" + sp + "require('" + req + "');" + nl;
                output += keys.map(function (key) { return "module.exports['" + key + "']" + sp + "=" + sp + _this.process(obj[key], true, false, parseSettings, 0) + ";"; }).join(nl);
                if (!isDefault)
                    output += nl + "module.exports['default']" + sp + "=" + sp + "{" + sp + keys.map(function (key) { return key + ": " + _this.process(obj[key], true, false, parseSettings, 0); }).join(nl) + " };";
                if (parseSettings.name)
                    output += nl + "module.exports['__jst'] = '" + name + ";";
                break;
            case "es":
                if (isDefault)
                    output += "export default" + sp + this.process(obj["default"], true, false, parseSettings, 0) + ";";
                else {
                    output += "export default" + sp + "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, parseSettings, 0) : key + ":" + sp + (_this.settings.namedExports ? key : _this.process(obj[key], true, false, parseSettings, 2)); }), parseSettings, 1) + "};";
                    if (this.settings.namedExports && validkeys.length > 0)
                        output = validkeys.map(function (key) { return "export " + vr + " " + key + sp + "=" + sp + _this.process(obj[key], true, false, parseSettings, 1) + ";"; }).join(nl) + ("" + (nl + output + nl));
                }
                break;
            default:
                if (parseSettings.name)
                    output += "return " + (isDefault ? "{'default' : " + this.process(obj["default"], true, false, parseSettings, 1) + ", '__jst': '" + parseSettings.name + "'}" : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, parseSettings, 1) : key + ":" + sp + _this.process(obj[key], true, false, parseSettings, 2); }), parseSettings, 1) + "}, '__jst': '" + parseSettings.name + "'") + ";";
                else
                    output += "return " + (isDefault ? this.process(obj["default"], true, false, parseSettings, 1) : "{" + this.format(keys.map(function (key) { return validkeys.indexOf(key) === -1 ? "\"" + key + "\": " + _this.process(obj[key], true, false, parseSettings, 1) : key + ":" + sp + _this.process(obj[key], true, false, parseSettings, 2); }), parseSettings, 1) + "}") + ";";
        }
        var s = {};
        var r = {};
        if (parseSettings.imports.length > 0)
            for (var i = 0; i < parseSettings.imports.length; i++)
                if (parseSettings.imports[i].indexOf('#') > -1) {
                    var name = parseSettings.imports[i].substr(0, parseSettings.imports[i].indexOf('#'));
                    if (s[name] === undefined)
                        s[name] = {};
                    s[name][parseSettings.imports[i].substr(name.length + 1)] = i;
                }
                else
                    r[parseSettings.imports[i]] = i;
        switch (this.settings.module.toLowerCase()) {
            case "umd":
            case "commonjs":
            case "cjs":
                for (var req in r)
                    output = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output;
                break;
            case "amd":
                output = "define([" + Object.keys(r).map(function (key) { return "'" + key + "'"; }).join(", ") + "], function (" + Object.keys(r).map(function (key) { return '_' + r[key]; }).join(", ") + ") { " + output + " });" + nl;
                break;
            case "es":
                output = Object.keys(s).map(function (key) { return (key.charAt(0) === '~' ? "var {" + Object.keys(s[key]).map(function (k) { return k + ": _" + s[key][k]; }) + "}  = await import('" + key.substr(1) + "');" + nl : "import {" + Object.keys(s[key]).map(function (k) { return k + " as _" + s[key][k]; }).join(',' + sp) + "} from '" + key + "';" + nl); }).join('') + Object.keys(r).map(function (key) { return (key.charAt(0) === '~' ? "var _" + r[key] + " = await import('" + key.substr(1) + "');" + nl : "import * as _" + r[key] + " from '" + key + "';" + nl); }).join('') + output;
                break;
            default:
                for (var req in r)
                    output = vr + " _" + r[req] + sp + "=" + sp + "require(\"" + req + "\");" + nl + output;
        }
        return output;
    };
    Transformer.prototype.transform = function (obj, name) {
        return this.bundleModule(Array.isArray(obj) || typeof (obj) != 'object' || Object.keys(obj).filter(function (k) { return k[0] == '.'; }).length > 0 ? { "default": obj } : obj, { name: name, imports: [], exports: {}, compositeObject: false });
    };
    return Transformer;
}());
exports.Transformer = Transformer;
