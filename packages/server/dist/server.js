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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.server = void 0;
var fastify_1 = __importDefault(require("fastify"));
var core_1 = require("../../core");
var types_1 = __importDefault(require("../../types"));
var http_errors_1 = require("http-errors");
var fs = __importStar(require("fs"));
var services_1 = require("../../core/dist/services");
var processors_1 = require("../../processors");
//import * as path from 'path';
var util = __importStar(require("./util"));
function server(options) {
    services_1.Parsers[".html"] = services_1.Parsers[".shtml"] = services_1.Parsers[".htm"] = processors_1.html;
    var jstRaw = new core_1.Services.Transformer({ module: types_1["default"].app.ModuleSystem.Raw, compact: true, parsers: services_1.Parsers });
    var jstCjs = new core_1.Services.Transformer({ module: types_1["default"].app.ModuleSystem.AMD, compact: true, parsers: services_1.Parsers });
    var fastify = fastify_1["default"]({ logger: options.loglevel ? { level: options.loglevel } : false });
    // let result = jst.transform(source);
    fastify.get('/*', function (request, reply) {
        var uri = util.resolveURI(util.parseURI(request.req.url || ''), options.folder);
        if (uri.jst) {
            var content = fs.readFileSync(uri.jst).toString();
            //reply.send(`{".${uri.extension}": ${content} }`);
            var result = uri.extension != '' ? jstRaw.transform("{\"." + uri.extension + "\": " + content + " }", uri.jst) : jstCjs.transform(content, uri.jst);
            reply.type(result.format);
            reply.send(result.output);
        }
        else if (uri.physicalPath && fs.existsSync(uri.physicalPath)) {
            if (uri.extension)
                reply.type(util.getContentType(uri.extension));
            //sendstatic
            reply.send(fs.readFileSync(uri.physicalPath).toString());
        }
        else if (true) {
            reply.send(JSON.stringify({ uri: uri, options: options }));
        }
        else
            throw new http_errors_1.NotFound();
    });
    return new Promise(function (resolve, reject) {
        fastify.listen(options.port || 0).then(function () {
            var addr = fastify.server.address();
            var port = 0;
            if (addr && typeof addr != 'string')
                port = addr.port;
            resolve({ port: port });
        })["catch"](function (e) {
            //fastify.log.error(e);
            reject(e);
            //process.exit(1)
        });
    });
}
exports.server = server;
