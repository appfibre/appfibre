import {types} from "@appfibre/types"
import {Services} from "@appfibre/core"
import {WebApp} from "../WebApp"

export var Parsers : {[key:string]:types.app.IParser} = {
    ...Services.Parsers,
    /*".app": (transformer:types.app.ITransformer, tc:types.app.ITransformtc, obj:any, offset:number) => {
        var obj2:{[key:string]:any} = {};
        var keys = Object.keys(obj);
        for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = obj[keys[key]];
        console.log(WebApp);
        return `${transformer.process({ ".new": {".import": "@appfibre/webapp#WebApp"}, "arguments": [obj2]}, tc, true, true, offset)}`;
    }*/

    ".app": (jst: any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => {
        if (!tc.references['WebApp']) tc.references['WebApp'] = WebApp;
        var obj2:{[key:string]:any} = {};
        var keys = Object.keys(jst);
        for (var key in keys) obj2[keys[key] == ".app" ? "main" : keys[key]] = jst[keys[key]];
        return transformer.process({ ".new": "WebApp", "arguments": [obj2]}, tc, context);
    }
}