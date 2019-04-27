import path from "path";
//import conditional from "express-conditional-middleware";
import webpack from "webpack";
import fs from "fs";
import CleanWebpackPlugin from "clean-webpack-plugin";
module.exports = {
  entry: {app:'./lib/app.jst'/*, tests: './src/tests/app.js', designer: './src/tests/design.jst'*/}
  , module: { 
      rules: [
        {
            exclude: /node_modules/,
            test: /.jst$/,
            use: [
                {
                    loader:  '@appfibre/webpack-plugin-jst' /*, options: { "parse": { "function": {parseAst: () => console.log(123) }} } */
                    /*, query: {
                      presets: ['es2015', "stage-0"],
                      plugins: ['@babel/transform-class-properties', '@babel/transform-classes']
                  }*/
                }
            ]
        },
        /*{
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'sass-loader'
            ]
          })
        }*/
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    publicPath: '/',
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    /*before(app){
      app.use(bodyParser.text({"type": "application/jst"}));
      app.use(conditional( req => req.headers["content-type"] === 'application/jst', 
        function (req, res, next) {
          var filename = req.originalUrl;
          while (filename.indexOf('/') > -1)
            filename = filename.replace('/', '\\');

          if (req.method == "GET")
            res.sendFile(__dirname + filename);
          else if (req.method == "POST") {
            fs.writeFile(__dirname + filename, req.body, err => console.log(err)); 
            res.sendFile(__dirname + filename);
          }
          else if (req.method == "DELETE") {
            fs.unlink(__dirname + filename, err => console.log(err));
            res.status(204).send();
          }
        }
      ));
    }*/
  },
  plugins: [
    new CleanWebpackPlugin(/*['dist']*/),
    //new ExtractTextPlugin("styles.css"),
    /*new CopyWebpackPlugin([{ from: 'src/assets', to: '' }]),
    new CopyWebpackPlugin([{ from: 'cdn', to: 'cdn' }]),
    new HtmlWebpackPlugin({chunks: ['app'], filename: 'index.html', template: './src/index.html', inject: "head"}),
    new HtmlWebpackPlugin({chunks: ['tests'], filename: 'tests.html'}),
    new HtmlWebpackPlugin({chunks: ['designer'], filename: 'designer.html'}),*/
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};