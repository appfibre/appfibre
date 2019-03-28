"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
function getArguments(path) {
    var args = null;
    if (path.parentPath.node.type === "ObjectExpression") {
        var props = path.parentPath.node.properties;
        for (var prop of props)
            if (prop.type === "ObjectProperty") {
                if (core_1.types.isStringLiteral(prop.key) && (prop.key.value == "arguments" || prop.key.value == "args"))
                    args = core_1.types.isArrayExpression(prop.value) ? prop.value.elements : [prop.value];
                else if (core_1.types.isIdentifier(prop.key) && (prop.key.name == "arguments" || prop.key.name == "args"))
                    args = core_1.types.isArrayExpression(prop.value) ? prop.value.elements : [prop.value];
            }
        if (args && path.parentPath.key == ".function")
            for (var arg of args)
                if (arg && arg.type === "StringLiteral")
                    args[arg.value] = core_1.types.identifier(arg.value);
    }
    return args;
}
;
function req(val, id) {
    var parts = [];
    var expr = null;
    if (core_1.types.isStringLiteral(val)) {
        if (id)
            expr = core_1.types.identifier(val.value);
        else {
            var uri = val.value.split('#');
            var async = uri[0].startsWith('~');
            if (async)
                uri[0] = uri[0].substring(1);
            for (var index = 0; index < uri.length; index++) {
                if (index == 0)
                    expr = async ? core_1.types.identifier("obj") : core_1.types.callExpression(core_1.types.identifier('require'), [core_1.types.stringLiteral(uri[index])]);
                else if (expr)
                    expr = core_1.types.memberExpression(expr, core_1.types.identifier(uri[index]));
            }
            //var prefix = name.indexOf('/') > -1 ? name.substring(0, name.lastIndexOf('/')+1) : "";
            //expr = t.callExpression(t.identifier("__proxy"), [ keywords.indexOf(uri[0]) > -1 ? t.identifier(uri[0]) : async ? t.identifier("obj") : t.callExpression(t.identifier('require'), [t.stringLiteral(uri[0])]), uri.length > 1 ? t.stringLiteral(uri[1]) : t.identifier("null"), t.stringLiteral(prefix + uri[0])]);
            if (async && expr)
                expr = core_1.types.callExpression(core_1.types.memberExpression(core_1.types.callExpression(core_1.types.identifier('import'), [core_1.types.stringLiteral('.' + uri[0])]), core_1.types.identifier('then')), [core_1.types.arrowFunctionExpression([core_1.types.identifier('obj')], expr)]);
        }
    }
    else if (core_1.types.isArrayExpression(val)) {
        for (var v of val.elements)
            if (v && v.type != "SpreadElement") {
                if (!expr)
                    expr = v.type === "StringLiteral" ? req(v) : v;
                else if (v.type === "StringLiteral")
                    expr = core_1.types.memberExpression(expr, core_1.types.identifier(v.value));
                else
                    throw new Error(`Unexpected arra expression element: ${v}`);
            }
        for (var element of val.elements)
            if (element && element.type !== "YieldExpression" && element.type != "SpreadElement") {
                if (!expr)
                    expr = element && element.type === "StringLiteral" ? req(element) : element;
                else if (core_1.types.isStringLiteral(element))
                    expr = core_1.types.memberExpression(expr, core_1.types.identifier(element.value));
            }
    }
    else if (core_1.types.isObjectExpression(val))
        expr = val;
    else if (Array.isArray(val))
        expr = core_1.types.callExpression(core_1.types.identifier("require"), val);
    if (!expr)
        throw new Error(`Unresolved dependancy ${id}: $(val)`);
    return expr;
}
function toObj(node) {
    var props = node.properties;
    var obj = {};
    for (var prop of props)
        if (prop.type === "ObjectProperty")
            obj[core_1.types.isStringLiteral(prop.key) ? prop.key.value : prop.key.name] = prop.value;
    return obj;
}
function _require(ref, path, name) {
    //var h = require("./helpers.js").apply(this, arguments);
    //var args = h.args();
    //return args == null ? h.req(path.node.value) : h.t.callExpression(h.req(path.node.value), args); 
    var args = getArguments(path);
    return args == null ? req(path.node.value) : core_1.types.callExpression(req(path.node.value), args);
}
exports._require = _require;
// {".app": [], "ui": {".require": "jst-preact"}, "target": {".call" : "document.getElementByTagName", args["body"]}, "title": "Title", "editor": {".require": "jst-editor"}, "loading": [...]}
function _app(ref, path, name) {
    if (path.parentPath.node.type !== "ObjectExpression")
        throw new Error(`Expecting parent ObjectExpression, actual: ${path.parentPath.type}`);
    var obj = toObj(path.parentPath.node);
    var props = [];
    for (var prop in obj)
        props.push(core_1.types.objectProperty(core_1.types.stringLiteral(prop === ".app" ? "main" : prop), obj[prop]));
    if (name)
        props.push(core_1.types.objectProperty(core_1.types.stringLiteral("file"), core_1.types.stringLiteral(name)));
    //var parent = path.findParent((path) => path.isProgram());
    //if (parent) parent.unshiftContainer('body', types.ifStatement(types.identifier("module.hot"), types.expressionStatement( types.callExpression(types.identifier("module.hot.accept"), [])) )); 
    return core_1.types.callExpression(core_1.types.memberExpression(core_1.types.newExpression(core_1.types.memberExpression(core_1.types.callExpression(core_1.types.identifier("require"), [core_1.types.stringLiteral("@appfibre/jst")]), core_1.types.identifier("App")), [core_1.types.objectExpression(props)]), core_1.types.identifier("run")), []);
}
exports._app = _app;
