const path = require('path');
const webpack = require("webpack");
require('dotenv').config();
var PACKAGE = require('./package.json');

module.exports = {
  watch: true,
  devtool: 'source-map',
  entry: path.join(__dirname, "src", "master-files/default.js"),

  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify(PACKAGE.version),
      BUILDTIME: JSON.stringify(new Date().getTime()),
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV)
    }),
  ],
}
