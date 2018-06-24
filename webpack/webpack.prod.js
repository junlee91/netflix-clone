const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
  build: path.join(__dirname, "../dist")
};

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(PATHS.build, {
      root: process.cwd()
    }),
    new ExtractTextPlugin("styles.css")
  ]
};
