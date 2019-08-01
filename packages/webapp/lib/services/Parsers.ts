import {types} from "@appfibre/types"
import {Services} from "@appfibre/core"
import {WebApp} from "../WebApp"

export var Parsers : {[key:string]:types.app.IParser} = {
    ...Services.Parsers,
    /*".app": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => {
        var obj2:{[key:string]:any} = {};
        var keys = Object.keys(obj);
        for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
        console.log(WebApp);
        return `${transformer.process({ ".new": {".import": "@appfibre/webapp#WebApp"}, "arguments": [obj2]}, context, true, true, offset)}`;
    }*/

    ".app": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => {
        if (!context.references['WebApp']) context.references['WebApp'] = WebApp;
        var obj2:{[key:string]:any} = {};
        var keys = Object.keys(obj);
        for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
        return `${transformer.process({ ".new": "WebApp", "arguments": [obj2]}, context, true, true, offset)}`;
    }
}