import typescript from 'rollup-plugin-typescript2';
import buble from 'rollup-plugin-buble';
import { uglify } from "rollup-plugin-uglify";

export default 
  [
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
