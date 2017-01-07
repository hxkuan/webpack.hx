/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

const args = require('minimist')(process.argv.slice(2));

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}
let dev_entry=args.pro?'./src/'+args.pro+'/index':'./src/index';
let dist_entry=args.pro?'../src/'+args.pro+'/index':'../src/index';
let output=args.pro?'/../dist/'+args.pro+'/assets':'/../dist/assets';
let contentBase=args.pro?'./src/'+args.pro:'./src';

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',  //仅仅用于dev开发，发布开发见releasePublic
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  //发布时将编译后的js文件中的加载资源（如图片..）地址设为绝对地址，否者html 和js分开放置时，引用资源位置出错
  //分本地调试 和 OSS（线上调试，发布）
  // releasePublic:'http://192.168.5.23:8081/hunterplan/dist/assets/',
  // releasePublic:'http://daily.a.caibaopay.com/hunterplan/dist/assets/',
  releasePublic:'./assets/',
  processArgs:args,
  dev_entry:dev_entry,
  dist_entry:dist_entry,
  output:output,
  contentBase:contentBase,//webpack-dev-server的根目录
};
