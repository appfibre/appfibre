import { types } from '@appfibre/types'

export var Parsers : {[key:string]:types.app.IParser} = {
    ".": (_transformer:types.app.ITransformer, _context:types.app.ITransformContext, obj:any, _offset:number) => obj["."],
    ".import": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => transformer.loadModule(context, transformer.process(obj[".import"], context, false, false, offset), offset),
    ".function": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => `function ${obj[".function"]?obj[".function"]:""}(${obj["arguments"] ? transformer.process(obj["arguments"], context, false, true, offset) : ""}){ return ${transformer.process(obj["return"], context, true, false, offset)} }`,
    ".map": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => `${transformer.process(obj[".map"], context, false, false, offset)}.map(function(${obj["arguments"]}) {return ${transformer.settings && transformer.settings.indent ? new Array(offset).join(' ') :""}${transformer.process(obj["return"], context, true, false, offset)} })`,
    ".filter": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => `${transformer.process(obj[".filter"], context, false, false, offset)}.filter(function(${obj["arguments"]}) {return ${transformer.process(obj["condition"], context, true, false,offset)} })`,
    ".call": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => `${transformer.process(obj[".call"], context, false, false, offset)}.call(${obj["arguments"] ? transformer.process(obj["arguments"], context, false, true, offset) : ""})`,
    ".exec": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => `${transformer.process(obj[".exec"], context, false, false, offset)}(${obj["arguments"] ? transformer.process(obj["arguments"], context, true, true, offset) : ""})`,
    ".new": (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => `new ${transformer.process(obj[".new"], context, false, false, offset)}(${obj["arguments"] ? transformer.process(obj["arguments"], context, true, true, offset) : ""})`
} 
