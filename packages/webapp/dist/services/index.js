"use strict";
exports.__esModule = true;
var core_1 = require("@appfibre/core");
var Transformer_1 = require("./Transformer");
var Parsers_1 = require("./Parsers");
core_1.Services.Transformer = Transformer_1.Transformer;
core_1.Services.Parsers = Parsers_1.Parsers;
exports["default"] = core_1.Services;
