import { ref } from "./types";
import { NodePath } from "@babel/traverse";
import { types } from "@babel/core";
import { ObjectProperty, ObjectExpression } from "@babel/types";

function getArguments (path:NodePath<ObjectProperty>) {
    var args:any[]|null = null;
    if (path.parentPath.node.type === "ObjectExpression") {
        var props = path.parentPath.node.properties; 
        for (var prop of props)
            if (prop.type === "ObjectProperty") {
                if (types.isStringLiteral(prop.key) && (prop.key.value == "arguments" || prop.key.value == "args")) 
                    args = types.isArrayExpression(prop.value) ? prop.value.elements : [prop.value];
                else if (types.isIdentifier(prop.key) && (prop.key.name == "arguments" || prop.key.name == "args"))
                    args = types.isArrayExpression(prop.value) ? prop.value.elements : [prop.value];
            }
        if (args && path.parentPath.key == ".function")
            for(var arg of args)
                if (arg && arg.type === "StringLiteral") 
                    args[arg.value] = types.identifier(arg.value);
    }
    return args;
};

function req(val:types.Expression|types.PatternLike|object, id?:string) : types.Expression
{
    var parts = [];
    var expr:types.Expression|null=null;
    if (types.isStringLiteral(val)) {        
      if (id)
        expr = types.identifier(val.value);
      else
      {
        var uri = val.value.split('#');
        var async = uri[0].startsWith('~');
        if (async) uri[0] = uri[0].substring(1);
        
        for (var index = 0; index < uri.length; index++) {
          if (index == 0) 
            expr = async ? types.identifier("obj") : types.callExpression(types.identifier('require'), [types.stringLiteral(uri[index])]);
          else if (expr)
            expr = types.memberExpression(expr, types.identifier(uri[index]));
        }
        //var prefix = name.indexOf('/') > -1 ? name.substring(0, name.lastIndexOf('/')+1) : "";
        //expr = t.callExpression(t.identifier("__proxy"), [ keywords.indexOf(uri[0]) > -1 ? t.identifier(uri[0]) : async ? t.identifier("obj") : t.callExpression(t.identifier('require'), [t.stringLiteral(uri[0])]), uri.length > 1 ? t.stringLiteral(uri[1]) : t.identifier("null"), t.stringLiteral(prefix + uri[0])]);
          
        if (async && expr) expr = types.callExpression(types.memberExpression(types.callExpression(types.identifier('import'), [types.stringLiteral('.' + uri[0])]), types.identifier('then')), [types.arrowFunctionExpression([types.identifier('obj')], expr) ]);
      }
    } else if (types.isArrayExpression(val)) {
        for (var v of val.elements)
            if (v && v.type != "SpreadElement") {
                if (!expr)
                    expr = v.type === "StringLiteral" ? req(v) : v;
                else  if (v.type === "StringLiteral")
                    expr = types.memberExpression(expr, types.identifier(v.value))
                else 
                    throw new Error(`Unexpected arra expression element: ${v}`);
            }
      for (var element of val.elements) 
        if (element && element.type !== "YieldExpression" && element.type != "SpreadElement") {
            if (!expr) 
                expr = element && element.type === "StringLiteral" ? req(element) : element;
            else if (types.isStringLiteral(element))
                expr = types.memberExpression(expr, types.identifier(element.value));
        }
  
    } 
    else if (types.isObjectExpression(val))
        expr = val;
    else if (Array.isArray(val))
        expr = types.callExpression(types.identifier("require"), val);
    
    if (!expr) throw new Error(`Unresolved dependancy ${id}: $(val)`)
    return expr;
}

function toObj(node:ObjectExpression):{[key:string]:types.Expression|types.PatternLike} {
    var props = node.properties;
    var obj:{[key:string]:types.Expression|types.PatternLike} = {};
    for (var prop of props) 
        if (prop.type === "ObjectProperty")
            obj[types.isStringLiteral(prop.key) ? prop.key.value : prop.key.name] = prop.value;
    
    return obj;
}


export function _require (this:any, ref: ref, path:NodePath<types.ObjectProperty>, name?:string): types.Node {
    //var h = require("./helpers.js").apply(this, arguments);
    //var args = h.args();
    //return args == null ? h.req(path.node.value) : h.t.callExpression(h.req(path.node.value), args); 
    var args = getArguments(path);
    return args == null ? req(path.node.value) : types.callExpression(req(path.node.value), args);

}

// {".app": [], "ui": {".require": "jst-preact"}, "target": {".call" : "document.getElementByTagName", args["body"]}, "title": "Title", "editor": {".require": "jst-editor"}, "loading": [...]}
export function _app (this:any, ref: ref, path:NodePath<types.ObjectProperty>, name?:string): types.Node {
    if (path.parentPath.node.type !== "ObjectExpression") throw new Error(`Expecting parent ObjectExpression, actual: ${path.parentPath.type}`)
    var obj = toObj(path.parentPath.node);
    var props = [];
    for (var prop in obj)
        props.push(types.objectProperty(types.stringLiteral(prop === ".app" ? "main" : prop), obj[prop]));
    if (name)
        props.push(types.objectProperty(types.stringLiteral("file"), types.stringLiteral(name)));

    //var parent = path.findParent((path) => path.isProgram());
    //if (parent) parent.unshiftContainer('body', types.ifStatement(types.identifier("module.hot"), types.expressionStatement( types.callExpression(types.identifier("module.hot.accept"), [])) )); 
      
    return types.callExpression(types.memberExpression(types.newExpression(types.memberExpression(types.callExpression(types.identifier("require"), [types.stringLiteral("@appfibre/jst")]), types.identifier("App")), [types.objectExpression(props)]), types.identifier("run")), []);
    
}