"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var chai_1 = require("chai");
// Runs file-based-tests by comparing the transoformation output with expected 
var FBT = /** @class */ (function () {
    function FBT(load, deferredLogger) {
        this.deferredLogger = deferredLogger;
        this.load = load;
    }
    FBT.prototype.walk = function (dir, filter, filelist) {
        var _this = this;
        if (filelist === void 0) { filelist = []; }
        var files = fs_1["default"].readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function (file) {
            if (fs_1["default"].statSync(path_1["default"].join(dir, file)).isDirectory()) {
                filelist = _this.walk(path_1["default"].join(dir, file), filter, filelist);
            }
            else if (!filter || filter.test(file))
                filelist.push(path_1["default"].join(dir, file));
        });
        return filelist;
    };
    FBT.prototype.run = function (seriesName, basepath, pattern, ext_expected, ext_actual, executor, ext_options) {
        return __awaiter(this, void 0, void 0, function () {
            function evalTest(test) {
                var _this = this;
                it(test.substr(__dirname.length + 1), function () { return __awaiter(_this, void 0, void 0, function () {
                    var match, actual, expected, optionsfile, options, output, expectedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                match = re.exec(test);
                                if (!(match == null)) return [3 /*break*/, 1];
                                throw new Error("Could not identify input path to replace from pattern " + pattern);
                            case 1:
                                actual = test.substr(0, match.index) + ext_actual + test.substring(match.index + match.toString().length);
                                expected = test.substr(0, match.index) + ext_expected + test.substring(match.index + match.toString().length);
                                optionsfile = test.substr(0, match.index) + ext_options + test.substring(match.index + match.toString().length);
                                options = void 0;
                                if (this.deferredLogger)
                                    this.deferredLogger.clear();
                                if (fs_1.existsSync(optionsfile))
                                    options = JSON.parse(fs_1["default"].readFileSync(optionsfile, 'utf8'));
                                return [4 /*yield*/, executor(this.load(test), test, options)];
                            case 2:
                                output = _a.sent();
                                fs_1["default"].writeFileSync(actual, output);
                                if (fs_1["default"].existsSync(expected)) {
                                    expectedResult = fs_1["default"].readFileSync(expected, 'utf8');
                                    if (this.deferredLogger /* && output != expectedResult*/)
                                        this.deferredLogger.print();
                                    chai_1.expect(output ? output.replace(/: /g, ":").replace(/; /g, ";").replace(/;"/g, "\"") : "").to.equal(expectedResult.replace(/: /g, ":").replace(/; /g, ";").replace(/;"/g, "\""));
                                }
                                else
                                    throw new Error('Could not evaluate test as .expected input file does not exist: ' + expected);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
            var re;
            var _this = this;
            return __generator(this, function (_a) {
                re = new RegExp(pattern);
                describe(seriesName, function () { return _this.walk(path_1["default"].join(__dirname, basepath), re).forEach(function (test) { evalTest.call(_this, test); }); });
                return [2 /*return*/];
            });
        });
    };
    return FBT;
}());
exports.FBT = FBT;
