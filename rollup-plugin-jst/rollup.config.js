//import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');
//const external = Object.keys(pkg.dependencies);
const nodeResolve = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');

export default {
	input: 'src/rollup.js',
	output: [
		{ file: pkg.main, format: 'cjs', sourcemap: true },
		{ file: pkg.module, format: 'es', sourcemap: true },
		//{ file: 'dist/jst.js', format: 'iife', sourcemap: true, name: 'jst' },
	],
	plugins: [ /*babel()
			 , */nodeResolve({jsnext: true}),
			 cjs()
	],
	//external	
};
