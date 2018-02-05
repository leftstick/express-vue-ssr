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

    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),

    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

if (isStage || isProduction) {
  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'express-vue-ssr',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        }
      ]
    })
  )
}

module.exports = config
