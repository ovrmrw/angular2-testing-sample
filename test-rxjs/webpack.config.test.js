'use strict';

const webpack = require('webpack');

const atlQueryForTest = { // stands for 'awesome-typescript-loader query'
  library: 'es2015', // = 'es6'
  useBabel: true,
  babelOptions: {
    presets: ['es2015'],
    plugins: []
  },
  useCache: true,
};


module.exports = [
  {
    entry: ['./test-rxjs/testing.rxjs.boot.js'],
    output: {
      path: 'bundles',
      filename: 'webpack.bundle.spec.rxjs.js',
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
          exclude: [/node_modules/, /typings/],
          // loader: 'babel-loader?presets[]=es2015&plugins[]=babel-plugin-espower!ts-loader', // babel-loaderがbabel-plugin-espowerを読み込む必要がある。
          loader: 'awesome-typescript-loader', // babel-loader!ts-loader と同じようなもの
          query: atlQueryForTest
        },
        // {
        //   test: /\.json$/,
        //   loader: "json-loader"
        // },
        // {
        //   test: /\.html$/,
        //   loader: "html-loader"
        // }
      ]
    },
    devtool: 'inline-source-map',
  }
]