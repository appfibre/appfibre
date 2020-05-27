//import typescript from 'rollup-plugin-typescript2';
//import postcss from 'rollup-plugin-postcss-modules';
//import autoprefixer from 'autoprefixer'
//import buble from 'rollup-plugin-buble';
//import { uglify } from "rollup-plugin-uglify";
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
//import babel from '@rollup-plugin-babel';
//import postcss from 'rollup-plugin-postcss';
//import copy from 'rollup-plugin-copy';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default
  [
    { input: 'lib/index.js',
      output: [ { file: 'dist/designer.js', format: 'iife', sourcemap: true, name: 'designer', globals: { } }
              , { file: 'dist/designer.cjs.js', format: 'cjs', sourcemap: true, name: 'designer', globals: {} }
              , { file: 'dist/designer.umd.js', format: 'umd', sourcemap: true, name: 'designer', globals: { } }
              , { file: 'dist/designer.es.js', format: 'es', sourcemap: true, name: 'designer', globals: { } }
              ],
      plugins: [  resolve({mainFields: ['index']}),
                  cjs()
              ]
    }
]



