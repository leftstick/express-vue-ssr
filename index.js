const express = require('express')

const logger = require('./web_server/assistant/logger')

const { isDev } = require('./web_server/assistant/utils/env')

const { initRenderer, render } = require('./web_server/setup/ssr')
const { initStaticAssetsHandler } = require('./web_server/setup/staticAssets')
const { initViewCaching } = require('./web_server/setup/viewCaching')
const { initSession } = require('./web_server/setup/session')
const { initRequestBodyParser } = require('./web_server/setup/requestBody')
const { initCookieParser } = require('./web_server/setup/cookie')
const { initAPIHandlers } = require('./web_server/setup/apis')
const { initServerRunner } = require('./web_server/setup/serverRunner')

const app = express()

initStaticAssetsHandler(app)
initViewCaching(app)
initRequestBodyParser(app)
initCookieParser(app)
initSession(app)

initAPIHandlers(app)

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
