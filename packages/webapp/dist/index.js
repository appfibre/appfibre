"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.WebApp = exports.Services = exports.App = void 0;
var core_1 = require("@appfibre/core");
exports.App = core_1.App;
var WebApp_1 = require("./WebApp");
exports.WebApp = WebApp_1.WebApp;
//import { HtmlUI } from './services/HtmlUI';
var services_1 = __importDefault(require("./services"));
exports.Services = services_1["default"];
