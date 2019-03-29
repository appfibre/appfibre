const fs = require('fs');
const assert = require('assert');
const rollup = require('rollup');
const jst = require('@appfibre/rollup-plugin-jst');
const resolve = require('rollup-plugin-node-resolve');

require('source-map-support').install();

process.chdir(__dirname);

describe('rollup-plugin-jst', () => {
	it('converts json', () => {
		return rollup
			.rollup({
				input: 'samples/basic/main.js',
				plugins: [jst()]
			})
			.then(bundle => bundle.generate({ format: 'cjs' }))
			.then(generated => {
				const fn = new Function('assert', generated.code);
				fn(assert);
			});
	});

	it('handles arrays', () => {
		return rollup
			.rollup({
				input: 'samples/array/main.js',
				plugins: [jst()]
			})
			.then(bundle => bundle.generate({ format: 'cjs' }))
			.then(generated => {
				const fn = new Function('assert', generated.code);
				fn(assert);
			});
	});

	it('handles literals', () => {
		return rollup
			.rollup({
				input: 'samples/literal/main.js',
				plugins: [jst()]
			})
			.then(bundle => bundle.generate({ format: 'cjs' }))
			.then(generated => {
				const fn = new Function('assert', generated.code);
				fn(assert);
			});
	});

	it('generates named exports', () => {
		return rollup
			.rollup({
				input: 'samples/named/main.js',
				plugins: [jst()]
			})
			.then(bundle => bundle.generate({ format: 'cjs' }))
			.then(generated => {
				// rollup@1.0/0.6x compatibility
				const code = generated.output ? generated.output[0].code : generated.code;
				const exports = {};
				const fn = new Function('exports', code);
				fn(exports);

				assert.equal(exports.version, '1.33.7');
				assert.equal(
					code.indexOf('this-should-be-excluded'),
					-1,
					'should exclude unused properties'
				);
			});
	});

	it('resolves extensionless imports in conjunction with the node-resolve plugin', () => {
		return rollup
			.rollup({
				input: 'samples/extensionless/main.js',
				plugins: [resolve({ extensions: ['.js', '.json'] }), jst()]
			})
			.then(bundle => bundle.generate({ format: 'cjs' }))
			.then(generated => {
				const fn = new Function('assert', generated.code);
				fn(assert);
			});
	});

	it('handles JSON objects with no valid keys (#19)', () => {
		return rollup
			.rollup({
				input: 'samples/no-valid-keys/main.js',
				plugins: [jst()]
			})
			.then(bundle => bundle.generate({ format: 'cjs' }))
			.then(generated => {
				const fn = new Function('assert', generated.code);
				fn(assert);
			});
	});

	it('handles garbage', () => {
		return rollup
			.rollup({
				input: 'samples/garbage/main.js',
				plugins: [jst()]
			})
			.then(() => {
				throw new Error('Rollup did not throw');
			})
			.catch(err =>  assert.notEqual(err.message.indexOf('Unexpected token o'), -1));
	});

	it('does not generate an AST', () => {
		assert.equal(jst().transform(read('samples/form/input.json'), 'input.json').ast, undefined);
	});

	it('does not generate source maps', () => {
		assert.deepEqual(
			jst().transform(read('samples/form/input.json'), 'input.json').map,
			{ mappings: '' }
		);
	});

	it('generates properly formatted code', () => {
		//fs.writeFileSync('samples/form/default.jsout', jst().transform(read('samples/form/input.json'), 'input.json').code);
		assert.deepEqual(
			jst().transform(read('samples/form/input.json'), 'input.json').code,
			read('samples/form/default.js')
		);
	});

	it('generates correct code with preferConst', () => {
		//fs.writeFileSync('samples/form/preferConst.jsout', jst({ preferConst: true }).transform(read('samples/form/input.json'), 'input.json').code);
		assert.deepEqual(
			jst({ preferConst: true }).transform(read('samples/form/input.json'), 'input.json').code,
			read('samples/form/preferConst.js')
		);
	});

	it('uses custom indent string', () => {
		//fs.writeFileSync('samples/form/customIndent.jsout', jst({ indent: '  ' }).transform(read('samples/form/input.json'), 'input.json').code);
		assert.deepEqual(
			jst({ indent: '  ' }).transform(read('samples/form/input.json'), 'input.json').code,
			read('samples/form/customIndent.js')
		);
	});

	it('generates correct code with compact=true', () => {
		assert.deepEqual(
			jst({ compact: true }).transform(read('samples/form/input.json'), 'input.json').code + '\n',
			read('samples/form/compact.js')
		);
	});

	it('generates correct code with namedExports=false', () => {
		//fs.writeFileSync('samples/form/namedExports.jsout', jst({ namedExports: false }).transform(read('samples/form/input.json'), 'input.json').code);
		assert.deepEqual(
			jst({ namedExports: false }).transform(read('samples/form/input.json'), 'input.json').code + '\n',
			read('samples/form/namedExports.js')
		);
	});
});

function read (file) {
	return fs.readFileSync(file, 'utf-8');	
}
