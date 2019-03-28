import { FBT } from '../fbt';
import { App, types, Transformer } from '@appfibre/jst';
import preact from "@appfibre/jst-preact";
import Enzyme from 'enzyme';
import { Adapter as PreactAdapter } from 'enzyme-adapter-preact';
import { ModuleSystem } from '@appfibre/jst/dist/types';
import { Test } from './ui/func';
import { DeferredLogger } from './services/DeferredLogger';

var escape = function(p:string) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
}

class UI extends preact {
    constructor(app:types.IAppLoaded) {
        super(app);
    }
    render = Enzyme.render;
}

let deferredLogger = new DeferredLogger();
let fbt = new FBT((test) => require(escape('.'+test.substring(__dirname.length))),  deferredLogger);
fbt.run('ui - preact', 'app', '.input.json$', '.expected.html', '.preact.html', (input:any, filename:string)=>{ 
    return new Promise((resolve:Function, reject:Function) => {
        var app_preact = new App({main:input, options: {logLevel: types.LogLevel.Trace, basePath: filename.substr(0, filename.lastIndexOf('\\'))}, services: {UI: UI, transformer: new Transformer({module: ModuleSystem.CommonJS}), logger: deferredLogger}, components: { "Tests": {"Test" : Test} }});
        Enzyme.configure({ adapter: new PreactAdapter() });
        app_preact.run().then(element => resolve(element.toString()), r => resolve(r.message));
    })
});

