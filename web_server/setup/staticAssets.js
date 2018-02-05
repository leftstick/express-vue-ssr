const express = require('express')
const favicon = require('serve-favicon')
const { isDev } = require('../assistant/utils/env')
const { resolveFromRoot } = require('../assistant/utils/path')
const { ONE_MONTH_MILLI_SECONDS } = require('../assistant/utils/time')

const serve = function(staticPath, cache) {
  return express.static(resolveFromRoot(staticPath), {
    maxAge: cache && !isDev ? ONE_MONTH_MILLI_SECONDS : 0
  })
}

module.exports.initStaticAssetsHandler = function(app) {
  app.use(favicon(resolveFromRoot('public/assets/icons/favicon.ico')))
  app.use('/dist', serve('dist', true))
  app.use('/public', serve('public', true))
  app.use('/manifest.json', serve('manifest.json', true))
  app.use('/service-worker.js', serve('dist/service-worker.js'))
}
