import { expect/*, assert*/ } from 'chai'
import { types } from '@appfibre/types'
import { Transformer } from '../../lib/services/Transformer'
import { Loader } from '@appfibre/core/lib/services/loaders/NodeJs'

let jst = new Transformer({module: types.app.ModuleSystem.CommonJS, compact: true })
let execTemplate = async (jst:Transformer, template:types.jst.template) => { let t = jst.transformTemplate(template); let o = await Loader.import(t.code, './test/services', t.references); return Object.getOwnPropertyDescriptor(o, 'default') != null ? o.default : o; }

execTemplate(jst, {".": "undefined"}); //warm up

describe('templates', () => {

    it('.app', async () => {
        let _jst:types.jst.template = {".app": '["div", {}, "webapp"]'};
        expect((await execTemplate(jst, _jst)).run()).to.equal(123);
    })

})