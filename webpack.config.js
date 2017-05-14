const path = require('path');
const webpack = require('webpack');

const webpackBaseConfig = require('./webpack.base.config.js');
const packageJson = require('./package.json');


const plugins = webpackBaseConfig.plugins || [];


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'source-map',
  output: Object.assign({}, webpackBaseConfig.output, {
    publicPath: '',
    sourceMapFilename: "bundle/[name].bundle.js.map",
    filename: 'bundle/[name].bundle.js'
  }),
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env': { APP_VERSION: JSON.stringify(packageJson.version) },
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      mangle: false,
    }),
  ],
});
