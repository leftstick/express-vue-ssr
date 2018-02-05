const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { baseConfig, resolveEnv } = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const { isDev } = require('../web_server/assistant/utils/env')

module.exports = merge(baseConfig, {
  target: 'node',
  node: {
    __dirname: true
  },
  devtool: !isDev ? undefined : '#source-map',
  entry: resolve(__dirname, '..', 'web_app', 'server-entry.js'),
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },

  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      ...resolveEnv(),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
