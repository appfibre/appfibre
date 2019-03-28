const path = require('path');

module.exports = {
  entry: {app:'./src/index.js'}
  , module: { 
      rules: [
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map'
  , plugins: [],
  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};