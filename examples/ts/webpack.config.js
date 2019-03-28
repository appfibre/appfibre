"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
//import conditional from "express-conditional-middleware";
var webpack_1 = __importDefault(require("webpack"));
var clean_webpack_plugin_1 = __importDefault(require("clean-webpack-plugin"));
module.exports = {
    entry: { app: './lib/app.jst' /*, tests: './src/tests/app.js', designer: './src/tests/design.jst'*/ },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /.jst$/,
                use: [
                    {
                        loader: '@appfibre/webpack-plugin-jst' /*, options: { "parse": { "function": {parseAst: () => console.log(123) }} } */
                        /*, query: {
                          presets: ['es2015', "stage-0"],
                          plugins: ['@babel/transform-class-properties', '@babel/transform-classes']
                      }*/
                    }
                ]
            },
        ]
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        publicPath: '/',
        contentBase: './dist',
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new clean_webpack_plugin_1["default"]( /*['dist']*/),
        //new ExtractTextPlugin("styles.css"),
        /*new CopyWebpackPlugin([{ from: 'src/assets', to: '' }]),
        new CopyWebpackPlugin([{ from: 'cdn', to: 'cdn' }]),
        new HtmlWebpackPlugin({chunks: ['app'], filename: 'index.html', template: './src/index.html', inject: "head"}),
        new HtmlWebpackPlugin({chunks: ['tests'], filename: 'tests.html'}),
        new HtmlWebpackPlugin({chunks: ['designer'], filename: 'designer.html'}),*/
        new webpack_1["default"].HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name]_bundle.js',
        path: path_1["default"].resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
