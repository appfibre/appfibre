"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.lodash = void 0;
var _ = __importStar(require("lodash"));
exports.lodash = {
    /*".": (obj:any, _transformer:types.app.ITransformer, _tc:types.app.ITransformContext, _context:types.app.ITransformProcessingContext) => { return {format: "json", output: obj["."]} },
    ".import": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return { format: "json", output: transformer.loadModule(tc, transformer.process(obj[".import"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output, context.depth) } },
    ".function": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `function ${obj[".function"]?obj[".function"]:""}(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: false, et: true, depth: context.depth, format: "json"}).output : ""}){ return ${transformer.process(obj["return"], tc,{esc: true, et: false, depth: context.depth, format: "json"}).output} }` } },
    ".map": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".map"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}.map(function(${obj["arguments"]}) {return ${transformer.settings && transformer.settings.indent ? new Array(context.depth).join(' ') :""}${transformer.process(obj["return"], tc, {esc: true, et: false, depth: context.depth, format: "json"}).output} })` } },
    ".filter": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".filter"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}.filter(function(${obj["arguments"]}) {return ${transformer.process(obj["condition"], tc, {esc: true, et: false, depth: context.depth, format: "json"}).output} })` } },
    ".call": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".call"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}.call(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: false, et: true, depth: context.depth, format: "json"}).output : ""})` } },
    ".exec": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `${transformer.process(obj[".exec"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: true, et: true, depth: context.depth, format: "json"}).output : ""})` } },
    ".new": (obj:any, transformer:types.app.ITransformer, tc:types.app.ITransformContext, context:types.app.ITransformProcessingContext) => { return {format: "json", output: `new ${transformer.process(obj[".new"], tc, {esc: false, et: false, depth: context.depth, format: "json"}).output}(${obj["arguments"] ? transformer.process(obj["arguments"], tc, {esc: true, et: true, depth: context.depth, format: "json"}).output : ""})`} }*/
    //_.chunk(array, [size=1])
    ".chunk": function (obj, transformer, tc, context) { return transformer.process(_.chunk(obj[".chunk"], obj["size"]), tc, context); },
    //_.compact(array)
    ".compact": function (obj, transformer, tc, context) { return transformer.process(_.compact(obj[".compact"]), tc, context); },
    //_.concat(array, [values])
    ".concat": function (obj, transformer, tc, context) { return transformer.process(_.concat(obj[".concat"], obj["values"]), tc, context); },
    //_.difference(array, [values])
    ".difference": function (obj, transformer, tc, context) { return transformer.process(_.difference(obj[".difference"], obj["values"]), tc, context); }
};
