import { expect/*, assert*/ } from 'chai'
import { types } from '../../types'
import { Services } from '../../core'
import { Parsers } from '@appfibre/core/lib/services/Parsers'
import { html } from '../lib/html'

Parsers[".html"] = html;
let jst = new Services.Transformer({module: types.app.ModuleSystem.Raw, compact: true, parsers: Parsers});

let execTemplate = async (jst:Services.Transformer, template:types.jst.template) => { let t = jst.transformTemplate(template); return t.output }


//execTemplate(jst, {".": "undefined"}); //warm up

describe('parsing html', () => {

    it('html', async () => {
        expect(await execTemplate(jst, {".html": [ 'html']})).to.deep.equal("<html  />\n");
    });

    
});