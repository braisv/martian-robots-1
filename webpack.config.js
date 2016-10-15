const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';

/*
 * entry, output pattern via: 
 * https://github.com/webpack/webpack/issues/1189#issuecomment-156576084
 */

module.exports = {
  devtool: 'source-map',
  entry: {
    '_build/js/app': './src/js/app', 
    'tests/tests': './tests/tests'
  },
  output: {
    path: './', 
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ]
};