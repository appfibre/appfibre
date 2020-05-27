import { expect/*, assert*/ } from 'chai'
import { types } from '@appfibre/types'
import { Services } from '@appfibre/core'
import { Loader } from '@appfibre/core/dist/services/Loaders/NodeJs'
import { WebApp } from '../lib/WebApp'
import { Parsers } from '../lib/services/Parsers'

let jst = new Services.Transformer({module: types.app.ModuleSystem.CommonJS, compact: true, parsers: Parsers })
let execTemplate = async (jst:Services.Transformer, template:types.jst.template) => { let t = jst.transformTemplate(template); let o = await Loader.import(t.output, './test', t.references); return Object.getOwnPropertyDescriptor(o, 'default') != null ? o.default : o; }

execTemplate(jst, {".": "undefined"}); //warm up

describe('templates', () => {

    it('.app', async () => {
        let _jst:types.jst.template = {".app": '[]'};
        
        expect((await execTemplate(jst, _jst))).instanceOf(WebApp);
    })

})