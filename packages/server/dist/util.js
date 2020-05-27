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
exports.getContentType = exports.resolveURI = exports.parseURI = void 0;
var fs = __importStar(require("fs"));
function getContentType(extension) {
    switch (extension.toLowerCase()) {
        case "jpg":
        case "png":
        case "gif":
            return "image/" + extension;
            break;
        default:
            return "text/" + extension;
            break;
    }
}
exports.getContentType = getContentType;
function parseURI(url) {
    var querystring = url.indexOf('?') > -1 ? url.substr(url.indexOf('?')) : '';
    var relativePath = url.substr(1, url.length - querystring.length - 1);
    var extension = '';
    if (relativePath.indexOf('.') > -1 && relativePath.lastIndexOf('.') > relativePath.lastIndexOf('/')) {
        extension = relativePath.substr(relativePath.lastIndexOf('.') + 1);
    }
    return { querystring: querystring, extension: extension, relativePath: relativePath };
}
exports.parseURI = parseURI;
function resolveURI(uri, root) {
    var physicalPath = (root === undefined ? './' : root) + uri.relativePath;
    var jst = physicalPath.substring(0, physicalPath.length - uri.extension.length);
    if (jst.endsWith('.'))
        jst = jst.substr(0, jst.length - 1);
    try {
        if (!fs.statSync(jst).isFile())
            jst = undefined;
    }
    catch (_a) {
        jst = undefined;
    }
    return __assign(__assign({}, uri), { jst: jst, physicalPath: physicalPath });
}
exports.resolveURI = resolveURI;
