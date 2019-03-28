"use strict";
exports.__esModule = true;
var Resolver = /** @class */ (function () {
    function Resolver(loader) {
        this.cache = Object();
        this.loader = loader;
    }
    Resolver.prototype.resolve = function (fullpath) {
        /*if (this.cache[fullpath])  return this.cache[fullpath];
        if (fullpath.substring(0, 1) == "~") {
            var parts = fullpath.substring(1, fullpath.length).split('#');
            //var obj = AppContext.xhr(parts[0], true);
            var obj = jstContext.load(parts[0], true);
            if (parts.length == 1)
                return obj;
            
            return obj.then(x => this.locate(x, parts.slice(1, parts.length).join(".")));
        } else {
            let path = fullpath.split('.');
            let obj:any = app.components || Object;
            let jst = false;
            let prop = "default";
            
            for (var part = 0; part < path.length; part++) {
                if (typeof obj === "function" && this.getFunctionName(obj) === "inject")
                        //obj = obj( Inject( app.designer ? class Component extends app.ui.Component { render(obj) { return parse(jst ? [require("@appfibre/jst/intercept.js").default, {"file": jst, "method": prop}, obj] : obj); }}:obj));
                        obj = obj(Inject(app, _context, Resolve, _construct(app.ui.Component), jstContext, _render));
                
                if (obj[path[part]] !== undefined) {
                    if (part == path.length-1) jst = obj.__jst;
                    obj = obj[path[part]];
                }
                else if (path.length == 1 && path[0].toLowerCase() == path[0])
                    obj = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj:any):any { return ["pre", {"style":{"color":"red"}}, obj[1].stack ? obj[1].stack : obj[1]]; }
                    else {
                        console.error('Cannot load ' + fullpath);
                        return class extends app.ui.Component { render () { return parse(["span", {"style":{"color":"red"}}, `${fullpath} not found!`]) }};
                    }
                }
            }

            if (obj.default) {
                if (obj.__jst) jst = obj.__jst;
                obj = obj.default;
            }
            else if (jst)
                prop = path[path.length-1];

            if (typeof obj == "function" && this.getFunctionName(obj) === "inject")
                obj = obj(Inject(app, _context, Resolve, jst ? class Component extends app.ui.Component { render(obj:any):any { return parse(!app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, _construct(app.ui.Component)] : obj); }} : _construct(app.ui.Component), jstContext, _render));

            return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends app.ui.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return parse(jst && !app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
        } */
    };
    Resolver.prototype.locate = function (resource, path) {
        var parts = path.split('.');
        var jst = false;
        var obj = resource;
        for (var part = 0; part < parts.length; part++)
            if (obj[parts[part]] !== undefined) {
                if (part == path.length - 1)
                    jst = obj.__jst;
                obj = obj[path[part]];
            }
            else
                obj = null;
        return obj;
    };
    Resolver.prototype.getFunctionName = function (obj) {
        if (obj.name)
            return obj.name;
        var name = obj.toString();
        if (name.indexOf('(') > -1)
            name = name.substr(0, name.indexOf('('));
        if (name.indexOf('function') > -1)
            name = name.substr(name.indexOf('function') + 'function'.length);
        return name.trim();
    };
    return Resolver;
}());
exports.Resolver = Resolver;
