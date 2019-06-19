import fs, { existsSync } from "fs";
import path from "path";
import { expect, assert } from "chai";
import { DeferredLogger } from "./app/services/DeferredLogger";

// Runs file-based-tests by comparing the transoformation output with expected 
export class FBT
{

    deferredLogger?:DeferredLogger;
    load:(file:string)=>any;
    constructor(load:(file:string)=>any, deferredLogger?:DeferredLogger) {
        this.deferredLogger = deferredLogger;
        this.load = load;
    }

    walk (dir:string, filter:RegExp|undefined, filelist:string[]=[]) {
        var files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(file => {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = this.walk(path.join(dir, file), filter, filelist);
            } else if (!filter || filter.test(file))
                filelist.push(path.join(dir, file));
        });
        return filelist;
    }


    async run(seriesName:string, basepath:string, pattern:string, ext_expected:string, ext_actual:string, executor:(input:string, filename:string, options?:any)=>Promise<any>|any, ext_options?:string)
    {
        let re = new RegExp(pattern);
            
        function evalTest(this:FBT, test:string) {          
            it(test.substr(__dirname.length+1), async () => {                   
                let match = re.exec(test)
                if (match == null)
                    throw new Error(`Could not identify input path to replace from pattern ${pattern}`);
                else {  
                    let actual = test.substr(0, match.index) + ext_actual + test.substring(match.index+match.toString().length);
                    let expected = test.substr(0, match.index) + ext_expected + test.substring(match.index+match.toString().length);
                    let optionsfile = test.substr(0, match.index) + ext_options + test.substring(match.index+match.toString().length);
                    let options:any;
                    if (this.deferredLogger) this.deferredLogger.clear();
                    if (existsSync(optionsfile)) 
                        options = JSON.parse(fs.readFileSync(optionsfile, 'utf8'));
                        
                    var output = await executor(this.load(test), test, options);
                    fs.writeFileSync(actual, output);

                    if (fs.existsSync(expected)) {
                        var expectedResult = fs.readFileSync(expected, 'utf8');
                        if (this.deferredLogger /* && output != expectedResult*/) this.deferredLogger.print();
                        //expect(output ? output.replace(/: /g, ":").replace(/; /g, ";").replace(/;"/g, "\"") : "").to.equal(expectedResult.replace(/: /g, ":").replace(/; /g, ";").replace(/;"/g, "\""));
                        expect(output ? output.replace(/\r\n/g, "\n") : "").to.equal(expectedResult.replace(/\r\n/g, "\n"));
                    }
                    else
                        throw new Error('Could not evaluate test as .expected input file does not exist: ' + expected);
                }
            });
        }

        describe(seriesName, () => this.walk(path.join(__dirname, basepath), re).forEach(test => { evalTest.call(this, test);}));  
    }
}