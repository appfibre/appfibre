"use strict";
exports.__esModule = true;
module.exports = {
    entry: './webpack-plugin-jst/test.js',
    output: {
        //path: __dirname,
        filename: 'webpack-plugin-jst-tests.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /.jst$/,
                use: [
                    {
                        loader: '@appfibre/webpack-plugin-jst', options: { runtimeModule: "cjs" }
                        /*, options: { "parse": { "function": {parseAst: () => console.log(123) }} } */
                        /*, query: {
                          presets: ['es2015', "stage-0"],
                          plugins: ['@babel/transform-class-properties', '@babel/transform-classes']
                      }*/
                    }
                ]
            }
        ]
    },
    mode: 'development'
};
