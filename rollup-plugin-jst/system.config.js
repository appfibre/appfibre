const resolve = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

export default {
	input: 'src/system.js',
	output: [
		{ file: 'dist/systemjs-jst.js', format: 'iife', sourcemap: true, name: 'sjst', globals: { '@appfibre/jst': 'jst', 'systemjs-plugin-babel': 'babel', 'systemjs-babel-build': 'systemjsBabelBuild'} },
	],
	plugins: [ /*babel()
			 , */resolve(),
			 cjs(),
			 babel({
			babelrc: false,
			presets: [
				[ '@babel/env',
					{
						modules: false,
						targets: {
							ie: '9',
						},
					}
				]
			]})
	],
	//external	
};
