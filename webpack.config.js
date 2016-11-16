var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'sourcemaps',
  entry: [
    'babel-polyfill',
    './admin/src/index'
  ],
  output: {
    path: path.join(__dirname, 'admin','build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'admin', 'src')
    },
    {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1',
        'postcss-loader'
      ]
    }]
  }
};
