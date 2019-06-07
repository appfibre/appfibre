const resolve = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

export default {
	input: 'src/polyfill.js',
	output: [
		{ file: 'dist/systemjs-jst-polyfill.js', format: 'iife', sourcemap: false, name: 'sjst'/*, globals: { '@appfibre/jst': 'jst'}, */},
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
							android: '30',
							chrome: '35',
							ie: '9',
							safari: '5'
						},
						useBuiltIns: 'entry', //enables babel and import babel into your inputFile.js
						corejs: '3'
					}
				]
			],
			//plugins: ['external-helpers', 'transform-regenerator'],
		})
	],
	//external	
};
