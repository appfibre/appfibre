import { expect/*, assert*/ } from 'chai'
import { types } from '../../types'
import { Services } from '../../core'
import { Parsers } from '@appfibre/core/lib/services/Parsers'
import { Loader } from '../../core/lib/services/loaders/NodeJs'
import { loadsh } from '../lib/lodash'

let jst = new Services.Transformer({module: types.app.ModuleSystem.CommonJS, compact: true, parsers: { ...Parsers, ...loadsh }});
let execTemplate = async (jst:Services.Transformer, template:types.jst.template) => { let t = jst.transformTemplate(template); let o = await Loader.import(t.output, './test', t.references); return Object.getOwnPropertyDescriptor(o, 'default') != null ? o.default : o; }


//execTemplate(jst, {".": "undefined"}); //warm up

describe('lodash Array', () => {

    it('chunk', async () => {
        expect(await execTemplate(jst, {".chunk": ['a', 'b', 'c', 'd'], size: 2})).to.deep.equal([['a', 'b'], ['c', 'd']]);
        expect(await execTemplate(jst, {".chunk": ['a', 'b', 'c', 'd'], size: 3})).to.deep.equal([['a', 'b', 'c'], ['d']]);
    });

    it('compact', async () => {
        expect(await execTemplate(jst, {".compact": [0, 1, false, 2, '', 3]})).to.deep.equal([1, 2, 3]);
    });

    it('concat', async () => {
        expect(await execTemplate(jst, {".concat": [1], values: [2, [3], [[4]]]})).to.deep.equal([1, 2, [3], [[4]]]);
    });

    it('difference', async () => {
        expect(await execTemplate(jst, {".difference": [2, 1], values: [2, 3]})).to.deep.equal([1]);
    });

    /*it('difference2', async () => {
        expect(jst.transform('{".compact":[{".call": {".function": "plus", "arguments": ["a", "b"], "return": "a+b" }, "arguments": [1,1]} ,2,3]}').output).to.equal('var ');
       
        expect(await execTemplate(jst, {".difference": [2, 1], values: [2, 3]})).to.deep.equal([1]);
    });*/

});