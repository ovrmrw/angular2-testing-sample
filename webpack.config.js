'use strict';

const webpack = require('webpack');
const lodash = require('lodash');

const atlQuery = { // stands for 'awesome-typescript-loader query'
  library: 'es2015', // = 'es6'
  useBabel: true,
  babelOptions: {
    presets: ['es2015'],
    plugins: []
  },
  useCache: true,
};
// console.log(atlQuery);

const atlQueryForTest = (function (query) { // stands for 'awesome-typescript-loader query for test'
  query.babelOptions.plugins = ['babel-plugin-espower'];
  return query;
})(lodash.cloneDeep(atlQuery));
// console.log(atlQueryForTest);


module.exports = [
  {
    entry: ['./src-front/boot.ts'],
    output: {
      filename: './bundles/webpack.bundle.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin() // minify enabled
    ],
    module: {
      loaders: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          // loader: 'babel-loader!ts-loader' // first ts-loader(with tsconfig.json), second babel-loader
          loader: 'awesome-typescript-loader', // babel-loader!ts-loader と同じようなもの 
          query: atlQuery
        },
        {
          test: /\.json$/,
          loader: "json-loader"
        }
      ]
    },
    devtool: 'source-map', // output source map
  },
  {
    entry: ['./test/unittest.boot.ts'],
    output: {
      filename: './bundles/webpack.bundle.spec.espowered.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin() // minify enabled
    ],
    module: {
      loaders: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          // loader: 'babel-loader?presets[]=es2015&plugins[]=babel-plugin-espower!ts-loader', // babel-loaderがbabel-plugin-espowerを読み込む必要がある。
          loader: 'awesome-typescript-loader', // babel-loader!ts-loader と同じようなもの
          query: atlQueryForTest
        },
        {
          test: /\.json$/,
          loader: "json-loader"
        }
      ]
    },
    devtool: 'inline-source-map',
  }
]