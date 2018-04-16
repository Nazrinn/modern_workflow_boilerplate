const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: ["babel-polyfill", "./src"],
  output: {
    filename: 'script.min.js',
    chunkFilename: '[name].min.js'
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use:  [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader', options: {importLoaders: 1}},
          {loader: 'postcss-loader'}
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
         options: {
           outputPath: 'images/'
         }
       }]
     },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
         loader: 'file-loader',
         options: {
           outputPath: 'fonts/'
         }
       }]
     },
     {
       test: /\.(mp4|webm|ogg)$/,
       use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'videos/'
        }
      }]
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      parallel: true,
      uglifyOptions: {
        ecma: 8,
        warnings: false,
        output: {
          comments: false,
          beautify: false,
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      }
    }),
    new MiniCssExtractPlugin({
      filename: "style.min.css",
      chunkFilename: "[name].min.css"
    }),
    new CSSSplitWebpackPlugin({size: 4000}),
    new DashboardPlugin()
  ]
};
