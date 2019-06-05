"use strict";
/*export declare namespace fibre {
    export import app = types.app
}*/
//import fibre from './types';
//export import fibre = fibre;
//export default fibre;
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
//export default fibre.app;
var app = __importStar(require("./app"));
var UI = __importStar(require("./UI"));
var fibre = __assign({}, app, UI);
module.exports = fibre;
