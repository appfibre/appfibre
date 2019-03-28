import { FBT } from '../fbt';
import { App, types, Transformer } from '@appfibre/jst';
import react from "@appfibre/jst-react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModuleSystem } from '@appfibre/jst/dist/types';
import { Test } from './ui/func';
import { DeferredLogger } from './services/DeferredLogger';

import preact from "@appfibre/jst-preact";
import { Adapter as PreactAdapter } from 'enzyme-adapter-preact';

var escape = function(p:string) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
}

class reactUI extends react {
    constructor(app:types.IAppLoaded) {
        super(app);
    }
    render = Enzyme.render;
}

class preactUI extends preact {
    constructor(app:types.IAppLoaded) {
        super(app);
    }
    render = Enzyme.render;
}


let deferredLogger = new DeferredLogger();
let fbt = new FBT((test) => require(escape('.'+test.substring(__dirname.length))),  deferredLogger);
fbt.run('ui - react', 'app', '.input.json', '.expected.html', '.react.html', (input:any, filename:string)=>{ 
    return new Promise((resolve:Function, reject:Function) => {
        Enzyme.configure({ adapter: new Adapter() });
        var app_react = new App({main:input, options: {logLevel: types.LogLevel.Trace, basePath: filename.substr(0, filename.lastIndexOf('\\'))}, services: {UI: reactUI, logger: deferredLogger, transformer: new Transformer({module: ModuleSystem.CommonJS})},  components: { "Tests": {"Test" : Test} }});
        app_react.run().then(element => resolve(element.toString()), r => resolve(r.message));
    })
}).then(() => {
    fbt.run('ui - preact', 'app', '.input.json', '.expected.html', '.preact.html', (input:any, filename:string)=>{ 
        return new Promise((resolve:Function, reject:Function) => {
            Enzyme.configure({ adapter: new PreactAdapter()});            
            var app_preact = new App({main:input, options: {logLevel: types.LogLevel.Trace, basePath: filename.substr(0, filename.lastIndexOf('\\'))}, services: {UI: preactUI, transformer: new Transformer({module: ModuleSystem.CommonJS}), logger: deferredLogger}, components: { "Tests": {"Test" : Test} }});
            app_preact.run().then(element => resolve(element.toString()), r => resolve(r.message));
        })
    });
});






















/*
class T extends react.Component {
    render() {
        return react.createElement("div", null, "ABCDEFG");
    }
}

Enzyme.configure({ adapter: new Adapter() });

describe ("test", () => {
    it("reacts", () => {

        var z = Enzyme.render(react.createElement(T, null, "hello world"));
        console.log('|||||||||||||||||||');
        console.log(z.toString());
        console.log('^^^^^^^^^^^^^^^^^^^');

    });
})*/
