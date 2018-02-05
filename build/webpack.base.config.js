const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const { isDev } = require('../web_server/assistant/utils/env')

module.exports.baseConfig = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      views: path.resolve(__dirname, '..', 'web_app', 'ui', 'views')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueConfig(isDev)
          }
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'].concat(!isDev ? [] : ['eslint-loader']),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: !isDev
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: !isDev ? 'warning' : false
  },
  plugins: !isDev
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [new FriendlyErrorsPlugin()]
}

module.exports.resolveEnv = function() {
  return Object.keys(process.env).reduce((p, c) => {
    p[`process.env.${c}`] = JSON.stringify(process.env[c])
    return p
  }, {})
}
