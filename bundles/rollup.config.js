import typescript from 'rollup-plugin-typescript2';
//import postcss from 'rollup-plugin-postcss-modules';
//import autoprefixer from 'autoprefixer'
import buble from 'rollup-plugin-buble';
//import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';


export default 
  [
    { input: 'lib/system.js',
      output: [ { file: 'dist/webapp-systemjs.js'
                , format: 'iife'
                , sourcemap: true
                , name: 'webapp'
                , globals: { "@appfibre/core": 'core','@appfibre/webapp': 'webapp', 'systemjs-plugin-babel': 'babel', 'systemjs-babel-build': 'systemjsBabelBuild'} 
                }
              ],
      plugins: [  resolve({mainFields: ['main']}),
                  cjs(),
                  babel({
                  babelrc: false,
                  presets: [
                    [ '@babel/env', { modules: false, targets: { ie: '9', } } ]
                  ]})
              ]
    }, 
    { input: 'lib/polyfill.js',
      output: [ { file: 'dist/webapp-systemjs-polyfill.js', format: 'iife', sourcemap: false, name: 'appfibre_polyfill'/*, globals: { '@appfibre/core': 'core'}, */} ],
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
      plugins: [ //postcss({extract: true, plugins: [autoprefixer()], writeDefinitions: true })
                 typescript()
               , buble({namedFunctionExpressions: false})
               ],
      output: {
        file: 'dist/webapp-components-designer.js',
        format: 'umd',
        name: "Designer",
        globals: { '@appfibre/webapp': 'webapp', '@appfibre/types': 'appfibre' }
      }, external: ['@appfibre/webapp', '@appfibre/types']
    }/*,
    { input: 'lib/Components/Designer/index.ts',
      plugins:  [ //postcss({extract: true, plugins: [autoprefixer()], writeDefinitions: true })
                , typescript()
                , uglify()
                , buble({namedFunctionExpressions: false})
                ],
      output: {
        file: 'dist/webapp-components-designer.min.js',
        format: 'umd',
        name: "Designer",
        globals: { '@appfibre/webapp': 'webapp' }
      }
    }*/

]
