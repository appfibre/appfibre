"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const chai_1 = require("chai");
// Runs file-based-tests by comparing the transoformation output with expected 
class FBT {
    constructor(load, deferredLogger) {
        this.deferredLogger = deferredLogger;
        this.load = load;
    }
    walk(dir, filter, filelist = []) {
        var files = fs_1.default.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(file => {
            if (fs_1.default.statSync(path_1.default.join(dir, file)).isDirectory()) {
                filelist = this.walk(path_1.default.join(dir, file), filter, filelist);
            }
            else if (!filter || filter.test(file))
                filelist.push(path_1.default.join(dir, file));
        });
        return filelist;
    }
    run(seriesName, basepath, pattern, ext_expected, ext_actual, executor, ext_options) {
        return __awaiter(this, void 0, void 0, function* () {
            let re = new RegExp(pattern);
            function evalTest(test) {
                it(test.substr(__dirname.length + 1), () => __awaiter(this, void 0, void 0, function* () {
                    let match = re.exec(test);
                    if (match == null)
                        throw new Error(`Could not identify input path to replace from pattern ${pattern}`);
                    else {
                        let actual = test.substr(0, match.index) + ext_actual + test.substring(match.index + match.toString().length);
                        let expected = test.substr(0, match.index) + ext_expected + test.substring(match.index + match.toString().length);
                        let optionsfile = test.substr(0, match.index) + ext_options + test.substring(match.index + match.toString().length);
                        let options;
                        if (this.deferredLogger)
                            this.deferredLogger.clear();
                        if (fs_1.existsSync(optionsfile))
                            options = JSON.parse(fs_1.default.readFileSync(optionsfile, 'utf8'));
                        var output = yield executor(this.load(test), test, options);
                        fs_1.default.writeFileSync(actual, output);
                        if (fs_1.default.existsSync(expected)) {
                            var expectedResult = fs_1.default.readFileSync(expected, 'utf8');
                            if (this.deferredLogger /* && output != expectedResult*/)
                                this.deferredLogger.print();
                            //expect(output ? output.replace(/: /g, ":").replace(/; /g, ";").replace(/;"/g, "\"") : "").to.equal(expectedResult.replace(/: /g, ":").replace(/; /g, ";").replace(/;"/g, "\""));
                            chai_1.expect(output ? output.replace(/\r\n/g, "\n") : "").to.equal(expectedResult.replace(/\r\n/g, "\n"));
                        }
                        else
                            throw new Error('Could not evaluate test as .expected input file does not exist: ' + expected);
                    }
                }));
            }
            describe(seriesName, () => this.walk(path_1.default.join(__dirname, basepath), re).forEach(test => { evalTest.call(this, test); }));
        });
    }
}
exports.FBT = FBT;
