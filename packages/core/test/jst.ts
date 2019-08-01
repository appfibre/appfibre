import { expect/*, assert*/ } from 'chai'
import { types } from '@appfibre/types'
import { Transformer } from '../lib/services/Transformer'
import { Loader } from '../lib/services/loaders/NodeJs'

let jst = new Transformer({module: types.app.ModuleSystem.CommonJS, compact: true })
let execTemplate = async (jst:Transformer, template:types.jst.template) => { let o = await Loader.import(jst.transformTemplate(template).code, './test'); return Object.getOwnPropertyDescriptor(o, 'default') != null ? o.default : o; }

execTemplate(jst, {".": "undefined"}); //warm up
describe('jst general templating tests', () => {

    it('processes primitives, arrays and objects', async () => {
        let _number:number = 1;
        expect(await execTemplate(jst, _number)).to.equal(_number);

        let _string:string = 'text';
        expect(await execTemplate(jst, _string)).to.equal(_string);

        let _true:boolean = true;
        expect(await execTemplate(jst, _true)).to.equal(_true);

        let _false:boolean = false;
        expect(await execTemplate(jst, _false)).to.equal(_false);

        let _null:null = null;
        expect(await execTemplate(jst, _null)).to.equal(_null);

        let _undefined:undefined = undefined;
        expect(await execTemplate(jst, _undefined)).to.equal(_undefined);

        let _object:types.jst.template = {"a":{"b":"c"}};
        expect(JSON.stringify(await execTemplate(jst, _object))).to.equal(JSON.stringify(_object));

        let _array:types.jst.template = ['1', ['test'], "3"];
        expect(JSON.stringify(await execTemplate(jst, _array))).to.equal(JSON.stringify(_array));
    })

    it('parses javascript objects properly', async () => {
        // convert single-quotes to double quotes and deals with tricking quote scenarios
        let _object : types.jst.template = {'pa\'re"nt': ['c\'hi"ld 1', {"com\\'po\"site": 'chi\'"ld'}]};
        expect(JSON.stringify(await execTemplate(jst, _object))).to.equal(JSON.stringify(_object));

        _object = {'onclick': function() {return "click"}};
        expect((await execTemplate(jst, _object)).onclick()).to.equal("click");
    })

    it('transforms javascript strings (if enabled)', async () => {
        jst.settings.dangerouslyProcessJavaScript = true;
        let js = "{test: function() { return 'o' + \"k\";}}";
        expect((await Loader.import(jst.transform(js).code, './test/services')).test()).to.equal("ok");
        jst.settings.dangerouslyProcessJavaScript = false;
    })

    it('doesn\'t transform javascript strings (when disallowed)', async () => {
        let js = "{test: function() { return 'o' + \"k\";}}";
        //TOOD: catch exception with Chai assertion.
        //expect(jst.transform(js), './test/services').to.throw(/.+/, 'Error: Unable to parse JSON file : Unexpected token t in JSON at position 1');
    })

    it('considers templates contained within json', async () => {
        let template : types.jst.template = { "a": { ".": "1+2", "z": 123 }};
        expect(JSON.stringify(await execTemplate(jst, template))).to.equal(JSON.stringify({"a":3}));

        template =  [{".":"2+2"}];
        expect(JSON.stringify(await execTemplate(jst, template))).to.equal(JSON.stringify([4]));
        
        template =  {"test": {".":"3*3"}};
        expect(JSON.stringify(await execTemplate(jst, template))).to.equal(JSON.stringify({"test":9}));
        

    })

})

describe('jst transformers', () => {
    it('.import', async () => {
        let _template : types.jst.template = [{".import": "./test#abc"},{".import": "./test#def"},{".import": "./test"}];
        let _js = [require("./test").abc, require("./test").def, require("./test")];
        expect(JSON.stringify(await execTemplate(jst, _template))).to.equal(JSON.stringify(_js));
    })

    it('.export', async () => {
        let _default:types.jst.template = [];
        expect(JSON.stringify(await execTemplate(jst, _default))).to.equal(JSON.stringify([]));

        let _composite:types.jst.template = {a: 1};
        expect(JSON.stringify(await execTemplate(jst, _composite))).to.equal(JSON.stringify({a: 1}));
    })

    it('.function', async () => {
        let _const : types.jst.template = {".function": "add", "return": "test"};
        expect((await execTemplate(jst, _const))()).to.equal("test");

        let _function : types.jst.template = {".function": "add", arguments: ["a", "b"], "return": {".": "a+b"}};
        expect((await execTemplate(jst, _function))(1, 2)).to.equal(3);
    })

    it('.=', async () => {
        let _template : types.jst.template = {".": "1+1"};
        expect(await execTemplate(jst, _template)).to.equal(2);
    })

    it('.call', async () => {
        let _template : types.jst.template = {".call": {".": "Array.prototype.reverse"}, "arguments": [ [1, 2] ] };
        expect(JSON.stringify(await execTemplate(jst, _template))).to.equal(JSON.stringify ([2, 1]));
    })

    it('.exec', async () => {
        let _template : types.jst.template = {".exec": {".function": null, "arguments": ["a", "b"], "return": {".": "a+b"}}, "arguments": [ 1, 2 ] };
        expect(JSON.stringify(await execTemplate(jst, _template))).to.equal(JSON.stringify (3));
    })

    it('.new', async () => {
        let _template : types.jst.template = {".new": {".": "Date"}, "arguments": [2020, 1, 2]};
        expect((await execTemplate(jst, _template)).toUTCString()).to.equal("Sun, 02 Feb 2020 00:00:00 GMT");
    })
    
})

describe('module formats', () => {

    it ('AMD', () => {
        let jst = new Transformer( { module: types.app.ModuleSystem.AMD, compact: true } );
        expect(jst.transform('[]').code).to.equal('define(function () { return []; });');
        expect(jst.transform('{"A":1}').code).to.equal('define(function () { return {A:1}; });');

        expect(jst.transform('[{".import": "./test#abc"},{".import": "./test#def"},{".import": "./test"}]').code).to.equal('define(["./test"], function (_0) { return [_0.abc,_0.def,_0]; });');
    })

    it ('UMD', () => {
        let jst = new Transformer( { module: types.app.ModuleSystem.UMD, compact: true } );
        expect(jst.transform('[]').code).to.equal('module.exports["default"]=[];');
        expect(jst.transform('{"A":1}').code).to.equal('module.exports["A"]=1;module.exports["default"]={"A": 1 };');

        expect(jst.transform('[{".import": "./test#abc"},{".import": "./test#def"},{".import": "./test"}]').code).to.equal('var _0=require("./test");module.exports["default"]=[_0.abc,_0.def,_0];');
    })

    it('ES', () => {
        let jst = new Transformer( { module: types.app.ModuleSystem.ES, compact: true } );
        expect(jst.transform('[]').code).to.equal('export default[];');
        expect(jst.transform('{"A":1}').code).to.equal('export var A=1;export default{A:A};');

        expect(jst.transform('[{".import": "./test#abc"},{".import": "./test#def"},{".import": "./test"}]').code).to.equal('import {abc as _0,def as _1} from "./test";import * as _2 from "./test";export default[_0,_1,_2];');
    })

    it('None', () => {
        let jst = new Transformer( { module: types.app.ModuleSystem.None, compact: true } );
        expect(jst.transform('[]').code).to.equal('return [];');
        expect(jst.transform('{"A":1}').code).to.equal('return {A:1};');

        expect(jst.transform('[{".import": "./test#abc"},{".import": "./test#def"},{".import": "./test"}]').code).to.equal('var _0=require("./test");return [_0.abc,_0.def,_0];');
    })

    it('CommonJS', () => {
        let jst = new Transformer( { module: types.app.ModuleSystem.CommonJS, compact: true } );
        expect(jst.transform('[]').code).to.equal('module.exports["default"]=[];');
        expect(jst.transform('{"A":1}').code).to.equal('module.exports["A"]=1;module.exports["default"]={"A": 1 };');

        expect(jst.transform('[{".import": "./test#abc"},{".import": "./test#def"},{".import": "./test"}]').code).to.equal('var _0=require("./test");module.exports["default"]=[_0.abc,_0.def,_0];');
    })

})