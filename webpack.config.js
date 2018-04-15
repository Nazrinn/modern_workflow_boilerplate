const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: ["babel-polyfill", "./src"],
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
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new DashboardPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
