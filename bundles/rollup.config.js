//import typescript from 'rollup-plugin-typescript2';
//import postcss from 'rollup-plugin-postcss-modules';
//import autoprefixer from 'autoprefixer'
//import buble from 'rollup-plugin-buble';
//import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);


export default 
  [
    { input: 'lib/system.js',
      output: [ { file: 'webapp-systemjs.js', format: 'iife', sourcemap: true, name: 'webapp', globals: { "@appfibre/core": 'core','@appfibre/webapp': 'webapp', 'systemjs-plugin-babel': 'babel', 'systemjs-babel-build': 'systemjsBabelBuild'} }
              , { file: 'webapp-systemjs.cjs.js', format: 'cjs', sourcemap: true, name: 'webapp', globals: { "@appfibre/core": 'core','@appfibre/webapp': 'webapp', 'systemjs-plugin-babel': 'babel', 'systemjs-babel-build': 'systemjsBabelBuild'} }
              , { file: 'webapp-systemjs.umd.js', format: 'umd', sourcemap: true, name: 'webapp', globals: { "@appfibre/core": 'core','@appfibre/webapp': 'webapp', 'systemjs-plugin-babel': 'babel', 'systemjs-babel-build': 'systemjsBabelBuild'} }
              , { file: 'webapp-systemjs.es.js', format: 'es', sourcemap: true, name: 'webapp', globals: { "@appfibre/core": 'core','@appfibre/webapp': 'webapp', 'systemjs-plugin-babel': 'babel', 'systemjs-babel-build': 'systemjsBabelBuild'} }
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
      output: [ { file: 'webapp-systemjs-polyfill.js', format: 'iife', sourcemap: true, name: 'appfibre_polyfill'} 
              , { file: 'webapp-systemjs-polyfill.cjs.js', format: 'cjs', sourcemap: true, name: 'appfibre_polyfill'} 
              , { file: 'webapp-systemjs-polyfill.umd.js', format: 'umd', sourcemap: true, name: 'appfibre_polyfill'} 
              , { file: 'webapp-systemjs-polyfill.es.js', format: 'es', sourcemap: true, name: 'appfibre_polyfill'} 
              ],
      plugins: [ resolve()
               ,  cjs()
               ,  babel( {
                  babelrc: false,
                  presets:  [ [ '@babel/env', { modules: false, targets: { android: '30', chrome: '35', ie: '9', safari: '5' }, useBuiltIns: 'entry', corejs: '3' } ] ],
                })
              ],
    },
    {
      input: 'lib/rollup.js',
      output: [ { file: 'rollup-plugin-jst.js', format: 'iife', sourcemap: true, name: 'appfibre_rollup', globals: { "@appfibre/core": 'core' } }
              , { file: 'rollup-plugin-jst.es.js', format: 'es', sourcemap: true, name: 'appfibre_rollup', globals: { "@appfibre/core": 'core' } }
              , { file: 'rollup-plugin-jst.cjs.js', format: 'cjs', sourcemap: true, name: 'appfibre_rollup', globals: { "@appfibre/core": 'core' } }
              , { file: 'rollup-plugin-jst.es.js', format: 'es', sourcemap: true, name: 'appfibre_rollup', globals: { "@appfibre/core": 'core' } }
              ],
      plugins: [ resolve({jsnext: true})
               , cjs()
               ],
      external	
    },
    { input: '@appfibre/webcomponents/dist/appfibre',
      plugins: [ //postcss({extract: true, plugins: [autoprefixer()], writeDefinitions: true })
               , resolve({mainFields: ['main']})
               , cjs()
               //s, buble({namedFunctionExpressions: false})
               ],
      output: [ { file: 'webcomponents-appfibre.js', format: 'iife', sourcemap: true, name: "appfibre_webcomponents", globals: { '@appfibre/types': 'appfibre' } }
              , { file: 'webcomponents-appfibre.umd.js', format: 'umd', sourcemap: true, name: "appfibre_webcomponents", globals: { '@appfibre/types': 'appfibre' } }
              , { file: 'webcomponents-appfibre.cjs.js', format: 'cjs', sourcemap: true, name: "appfibre_webcomponents", globals: { '@appfibre/types': 'appfibre' } }
              , { file: 'webcomponents-appfibre.es.js', format: 'es', sourcemap: true, name: "appfibre_webcomponents", globals: { '@appfibre/types': 'appfibre' } }
              ]
      //, external: ['@appfibre/webapp', '@appfibre/types']
    }/*,
    { input: 'lib/Components/Designer/index.ts',
      plugins:  [ //postcss({extract: true, plugins: [autoprefixer()], writeDefinitions: true })
                , typescript()
                , uglify()
                , buble({namedFunctionExpressions: false})
                ],
      output: {
        file: 'webapp-components-designer.min.js',
        format: 'umd',
        name: "Designer",
        globals: { '@appfibre/webapp': 'webapp' }
      }
    }*/

]
