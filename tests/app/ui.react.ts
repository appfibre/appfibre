import { FBT } from '../fbt';
import { App, types, Transformer } from '@appfibre/jst';
import react from "@appfibre/jst-react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ModuleSystem } from '@appfibre/jst/dist/types';
import { Test } from './ui/func';
import { DeferredLogger } from './services/DeferredLogger';

var escape = function(p:string) {
    while (p.indexOf('\\') > -1)
        p = p.replace('\\', '/');
    return p;
}

class UI extends react {
    constructor(app:types.IAppLoaded) {
        super(app);
    }
    render = Enzyme.render;
}

let deferredLogger = new DeferredLogger();
let fbt = new FBT((test) => require(escape('.'+test.substring(__dirname.length))),  deferredLogger);
fbt.run('ui - react', 'app', '.input.json', '.expected.html', '.react.html', (input:any, filename:string)=>{ 
    return new Promise((resolve:Function, reject:Function) => {
        var app_react = new App({main:input, options: {logLevel: types.LogLevel.Trace, basePath: filename.substr(0, filename.lastIndexOf('\\'))}, services: {UI: UI, logger: deferredLogger, transformer: new Transformer({module: ModuleSystem.CommonJS})},  components: { "Tests": {"Test" : Test} }});
        Enzyme.configure({ adapter: new Adapter() });
        app_react.run().then(element => resolve(element.toString()), r => resolve(r.message));
    })
});

