const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { baseConfig, resolveEnv } = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const { isDev, isStage, isProduction } = require('../web_server/assistant/utils/env')

const config = merge(baseConfig, {
  devtool: !isDev ? false : '#cheap-module-source-map',
  entry: {
    app: resolve(__dirname, '..', 'web_app', 'client-entry.js')
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      ...resolveEnv(),
      'process.env.VUE_ENV': '"client"'
    }),

    new VueSSRClientPlugin()
  ]
})

if (isStage || isProduction) {
  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'express-vue-ssr',
      dontCacheBustUrlsMatching: /./,
      filename: 'service-worker.js',
      minify: true,
      runtimeCaching: [
        {
          handler: 'networkFirst',
          urlPattern: '/'
        }
      ],
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/]
    })
  )
}

module.exports = config
