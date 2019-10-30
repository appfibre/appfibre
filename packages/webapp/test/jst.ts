import { expect/*, assert*/ } from 'chai'
import { types } from '@appfibre/types'
import { Transformer } from '../lib/services/Transformer'
import { Loader } from '@appfibre/core/lib/services/loaders/NodeJs'
import { WebApp } from '../lib/WebApp';

let jst = new Transformer({module: types.app.ModuleSystem.CommonJS, compact: true })
let execTemplate = async (jst:Transformer, template:types.jst.template) => { let t = jst.transformTemplate(template); let o = await Loader.import(t.code, './test', t.references); return Object.getOwnPropertyDescriptor(o, 'default') != null ? o.default : o; }

execTemplate(jst, {".": "undefined"}); //warm up

describe('templates', () => {

    it('.app', async () => {
        let _jst:types.jst.template = {".app": '[]'};
        
        expect((await execTemplate(jst, _jst))).instanceOf(WebApp);
    })

})