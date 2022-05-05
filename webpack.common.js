// import modules
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// ### configuration start ### 
module.exports = {
  // resolve config
  resolve: {
    alias: {
      '@client': path.resolve(__dirname, './client')
    }
  },
  // entry and output
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
    publicPath: '/',
    clean: true
  },
  // plugin configurations
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/template/index.html'
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 3301,
      openAnalyzer: false
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  // module loaders
  module: {
    rules: [
      // babel loader
      {
        test: /\.(js|jsx)$/i,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, 
      // css-loader
      {
        test: /\.css$/i,
        use: [

          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[path][name]_[local]-[hash:base64:4]",
              }
            }
          }
        ],
        exclude: [
          /node_modules/,
          path.resolve(__dirname, './client/global.css')
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }
        ],
        include: [
          /node_modules/,
          path.resolve(__dirname, './client/global.css')
        ]
      }
    ]
  },
}
//### configuration end ###