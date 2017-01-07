'use strict';
/**
 * 打多文件（未测试完成）
 */
let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    app:path.join(__dirname, '../src/index'),
    domrouter:['react-dom','react-router'],
  },
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].js',
    publicPath: './assets/'//设置添加目录，即所有资源的绝度路径为：path+publicPath+资源名
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["domrouter"],//页面上使用的时候[最后的一个]必须最先引用必须最先加载
      // filename:"chunk.js"//忽略则以name为输出文件的名字，
      //否则以此为输出文件名字
      minChunks: 2
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
