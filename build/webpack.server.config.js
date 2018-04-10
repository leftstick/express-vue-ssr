const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { baseConfig, resolveEnv } = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const { isDev } = require('../web_server/assistant/utils/env')

module.exports = merge(baseConfig, {
  devtool: !isDev ? undefined : '#source-map',
  entry: resolve(__dirname, '..', 'web_app', 'server-entry.js'),
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    whitelist: [/\.css$/, /\?vue&type=style/]
  }),
  node: {
    __dirname: true
  },
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      ...resolveEnv(),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ],
  target: 'node'
})
