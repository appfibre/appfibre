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
exports.__esModule = true;
var core_1 = require("@appfibre/core");
var WebApp_1 = require("../WebApp");
exports.Parsers = __assign(__assign({}, core_1.Services.Parsers), { 
    /*".app": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => {
        var obj2:{[key:string]:any} = {};
        var keys = Object.keys(obj);
        for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
        console.log(WebApp);
        return `${transformer.process({ ".new": {".import": "@appfibre/webapp#WebApp"}, "arguments": [obj2]}, context, true, true, offset)}`;
    }*/
    ".app": function (transformer, context, obj, offset) {
        if (!context.references['WebApp'])
            context.references['WebApp'] = WebApp_1.WebApp;
        var obj2 = {};
        var keys = Object.keys(obj);
        for (var key in keys)
            obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
        return "" + transformer.process({ ".new": "WebApp", "arguments": [obj2] }, context, true, true, offset);
    } });
