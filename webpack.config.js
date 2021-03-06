const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendorCode = ["react", "react-dom"];

module.exports = {
  entry: {
    bundle: "./index.js",
    vendor: vendorCode
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[chunkhash].js"
    // publicPath: "build/"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "./index.html"
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin("css/style.css")
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};
