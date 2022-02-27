const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")

module.exports = merge(common, {
  // runtime mode
   mode: 'development',

  // devtools
   devtool: 'inline-source-map',

  // dev-plugins
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      quiet: true
    }),
  ],
  stats: 'errors-only',
  devServer: {
  }
})