const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const vueConfig = require('./vue-loader.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const { isDev } = require('../web_server/assistant/utils/env')

module.exports.baseConfig = {
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        test: /\.(js|vue)$/
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
        use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
        test: /\.styl(us)?$/
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader']
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
        use: (!isDev ? [MiniCssExtractPlugin.loader] : ['vue-style-loader']).concat(['css-loader'])
      }
    ]
  },
  output: {
    chunkFilename: '[name].[chunkhash].bundle.js',
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/'
  },
  performance: {
    hints: !isDev ? 'warning' : false,
    maxEntrypointSize: 300000
  },
  plugins: [new VueLoaderPlugin()].concat(
    !isDev
      ? [
          new MiniCssExtractPlugin({
            filename: 'extractedcss.[name].css'
          })
        ]
      : [new FriendlyErrorsPlugin()]
  ),
  resolve: {
    alias: {
      views: path.resolve(__dirname, '..', 'web_app', 'ui', 'views')
    }
  }
}

module.exports.resolveEnv = function() {
  return Object.keys(process.env).reduce((p, c) => {
    p[`process.env.${c}`] = JSON.stringify(process.env[c])
    return p
  }, {})
}
