import { types } from '@appfibre/types'
import * as _ from 'lodash'

export var lodash : {[key:string]:types.app.IParser} = {
    /*".": (obj:any, _transformer:types.app.ITransformer, _tc:types.app.ITransformContext, _context:types.app.ITransformProcessingContext) => { return {format: "json", output: obj["."]} },
    ".import": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return { format: "json", output: transformer.loadModule(tc, transformer.process(obj[".import"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output, context.depth) } },
    ".function": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `function ${obj[".function"]?obj[".function"]:""}(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: false, et: true, depth: context.depth, format: "json"}).output : ""}){ return ${transformer.process(obj["return"], tc,{esc: true, et: false, depth: context.depth, format: "json"}).output} }` } },
    ".map": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".map"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}.map(function(${obj["arguments"]}) {return ${transformer.settings && transformer.settings.indent ? new Array(context.depth).join(' ') :""}${transformer.process(obj["return"], tc, {esc: true, et: false, depth: context.depth, format: "json"}).output} })` } },
    ".filter": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".filter"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}.filter(function(${obj["arguments"]}) {return ${transformer.process(obj["condition"], tc, {esc: true, et: false, depth: context.depth, format: "json"}).output} })` } },
    ".call": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".call"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}.call(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: false, et: true, depth: context.depth, format: "json"}).output : ""})` } },
    ".exec": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".exec"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: true, et: true, depth: context.depth, format: "json"}).output : ""})` } },
    ".new": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `new ${transformer.process(obj[".new"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: true, et: true, depth: context.depth, format: "json"}).output : ""})`} }*/

    //_.chunk(array, [size=1])
    ".chunk": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return transformer.process(_.chunk(obj[".chunk"], obj["size"] ), tc, context)  },

    //_.compact(array)
    ".compact": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return transformer.process(_.compact(obj[".compact"] ), tc, context) },

    //_.concat(array, [values])
    ".concat": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return transformer.process(_.concat(obj[".concat"], obj["values"] ), tc, context)  },

    //_.difference(array, [values])
    ".difference": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return transformer.process(_.difference(obj[".difference"], obj["values"] ), tc, context)  },
} 
