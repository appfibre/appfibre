"use strict";
exports.__esModule = true;
exports.Parsers = {
    ".": function (_transformer, _context, obj, _offset) { return obj["."]; },
    ".import": function (transformer, context, obj, offset) { return transformer.loadModule(context, transformer.process(obj[".import"], context, false, false, offset), offset); },
    ".function": function (transformer, context, obj, offset) { return "function " + (obj[".function"] ? obj[".function"] : "") + "(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, false, true, offset) : "") + "){ return " + transformer.process(obj["return"], context, true, false, offset) + " }"; },
    ".map": function (transformer, context, obj, offset) { return transformer.process(obj[".map"], context, false, false, offset) + ".map(function(" + obj["arguments"] + ") {return " + (transformer.settings && transformer.settings.indent ? new Array(offset).join(' ') : "") + transformer.process(obj["return"], context, true, false, offset) + " })"; },
    ".filter": function (transformer, context, obj, offset) { return transformer.process(obj[".filter"], context, false, false, offset) + ".filter(function(" + obj["arguments"] + ") {return " + transformer.process(obj["condition"], context, true, false, offset) + " })"; },
    ".call": function (transformer, context, obj, offset) { return transformer.process(obj[".call"], context, false, false, offset) + ".call(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, false, true, offset) : "") + ")"; },
    ".exec": function (transformer, context, obj, offset) { return transformer.process(obj[".exec"], context, false, false, offset) + "(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, true, true, offset) : "") + ")"; },
    ".new": function (transformer, context, obj, offset) { return "new " + transformer.process(obj[".new"], context, false, false, offset) + "(" + (obj["arguments"] ? transformer.process(obj["arguments"], context, true, true, offset) : "") + ")"; }
};
