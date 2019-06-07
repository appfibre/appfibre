import { FBT } from '../fbt';
import { Transformer } from '@appfibre/core';
import { types, WebApp } from '@appfibre/webapp';
import preact from "@appfibre/services-ui-preact";
import Enzyme from 'enzyme';
import { Adapter as PreactAdapter } from 'enzyme-adapter-preact';
import { Test } from './ui/func';
import { DeferredLogger } from './services/DeferredLogger';

var escape = function(p:string) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
}

class UI extends preact {
    constructor(app:types.IWebAppLoaded) {
        super(app);
    }
    render = <any>Enzyme.render;
}

let deferredLogger = new DeferredLogger();
let fbt = new FBT((test) => require(escape('.'+test.substring(__dirname.length))),  deferredLogger);
fbt.run('ui - preact', 'app', '.input.json$', '.expected.html', '.preact.html', (input:any, filename:string)=>{ 
    return new Promise((resolve:Function, reject:Function) => {
        var app_preact = new WebApp({main:input, options: {logLevel: types.LogLevel.Trace, baseExecutionPath: filename.substr(0, filename.lastIndexOf('\\'))}, services: {UI: UI, transformer: new Transformer({module: types.ModuleSystem.CommonJS}), logger: deferredLogger}, components: { "Tests": {"Test" : Test} }});
        Enzyme.configure({ adapter: new PreactAdapter() });
        app_preact.run().then((element:any) => resolve(element.toString()), (r:any) => resolve(r.message));
    })
});

