const assert = require('assert');

//var z = ['./transformations/a.jst', './transformations/b.jst'];
//z.forEach(k => require(k));

describe('webpack-plugin-jst', () => {
	it('understand arrays', () => {
        assert.deepEqual(require('./samples/basicArray.jst').default, [1, 2, 3]);
    });

	it('understand objects', () => {
        assert.deepEqual(require('./samples/basicObject.jst').default, {"A": 1, "B": "C"});
    });

    it('loads dependencies', () => {
        assert.deepEqual(require('./samples/require.jst').default, {"A": 1, "B": "C"});
    });

    it('copies assets', () => {
        assert.deepEqual(require('./samples/includeasset.jst').default, ["test", Date.now()]);
    });

}).run();
