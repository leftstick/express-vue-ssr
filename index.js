const express = require('express')
const { withExpressApp } = require('express-api-loader')

const logger = require('./web_server/assistant/logger')

const { isDev } = require('./web_server/assistant/utils/env')
const { resolveFromRoot } = require('./web_server/assistant/utils/path')

const { initRenderer, render } = require('./web_server/setup/ssr')
const { initStaticAssetsHandler } = require('./web_server/setup/staticAssets')
const { initViewCaching } = require('./web_server/setup/viewCaching')
const { initSession } = require('./web_server/setup/session')
const { initRequestBodyParser } = require('./web_server/setup/requestBody')
const { initCookieParser } = require('./web_server/setup/cookie')
const { initServerRunner } = require('./web_server/setup/serverRunner')

const app = express()

initStaticAssetsHandler(app)
initViewCaching(app)
initRequestBodyParser(app)
initCookieParser(app)
initSession(app)

withExpressApp(app)({
  scanOpts: {
    cwd: resolveFromRoot('web_server/apis'),
    pattern: '**/*.js',
    ignore: ['**/_*.js']
  },
  apiPrefix: '/api'
})

const ssr = initRenderer(app)

app.get(
  '*',
  !isDev
    ? (req, res) => render(req, res, ssr)
    : (req, res) => {
        ssr.readyPromise.then(() => {
          render(req, res, ssr)
        })
      }
)

initServerRunner(app)
  .then(message => {
    logger.info(message)
  })
  .catch(err => {
    logger.error(err.stack || err)
    process.exit(-1)
  })
