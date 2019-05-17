import typescript from 'rollup-plugin-typescript2';
import buble from 'rollup-plugin-buble';
import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';


export default 
  [
    { input: 'lib/system.js',
      output: [ { file: 'dist/app-systemjs.js', format: 'iife', sourcemap: true, name: 'sjst', globals: { '@appfibre/jst': 'jst', 'systemjs-plugin-babel': 'babel', 'systemjs-babel-build': 'systemjsBabelBuild'} } ],
      plugins: [  resolve(),
                  cjs(),
                  babel({
                  babelrc: false,
                  presets: [
                    [ '@babel/env', { modules: false, targets: { ie: '9', } } ]
                  ]})
              ]
    }, 
    { input: 'lib/polyfill.js',
      output: [ { file: 'dist/app-systemjs-polyfill.js', format: 'iife', sourcemap: false, name: 'sjst'/*, globals: { '@appfibre/jst': 'jst'}, */} ],
      plugins: [ resolve()
               ,  cjs()
               ,  babel( {
                  babelrc: false,
                  presets:  [ [ '@babel/env', { modules: false, targets: { android: '30', chrome: '35', ie: '9', safari: '5' }, useBuiltIns: 'entry', corejs: '3' } ] ],
                  //plugins: ['external-helpers', 'transform-regenerator'],
                })
              ],
    },
    { input: 'lib/Components/Designer/index.ts',
      plugins: [typescript(/*{ plugin options }*/), buble({namedFunctionExpressions: false})],
      output: {
        file: 'dist/app-components-designer.js',
        format: 'umd',
        name: "Designer"
      }
    },
    { input: 'lib/Components/Designer/index.ts',
      plugins: [typescript(/*{ plugin options }*/), uglify(), buble({namedFunctionExpressions: false})],
      output: {
        file: 'dist/app-components-designer.min.js',
        format: 'umd',
        name: "CodeMirror"
      }
    }

]
