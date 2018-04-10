const { scanAPIs } = require('../assistant/utils/scanner')
const { API_VERBS } = require('../assistant/utils/http')
const logger = require('../assistant/logger')

const ERRORS = require('../../errorcodes')

function getAPIModules() {
  return scanAPIs()
    .map(file => {
      const mod = require(file)
      return {
        file,
        mod
      }
    })
    .filter(skipApiWithoutApiField)
    .map(scannedValue => scannedValue.mod)
}

function skipApiWithoutApiField(scannedValue) {
  if (scannedValue.mod.api) {
    return true
  }
  logger.error(`[WARN - api] miss api field in [${scannedValue.file}]`)
  return false
}

function wapperRouteHandler(handler, verb, mod) {
  return function(req, res) {
    handler(req, res)
      .then(data => {
        return res.json({
          status: 'success',
          ...(data || {})
        })
      })
      .catch(function(err) {
        if (err && err.rawError) {
          return res.json({ error: { ...err.rawError, rawMessage: err.message }, status: 'failed' })
        }
        err.message = `[ERROR - api] [${mod.api}] = ${err.stack || err.message}`
        logger.error(err.message)
        res.json({ error: ERRORS.SERVER_ERROR, status: 'failed' })
      })
  }
}

module.exports.initAPIHandlers = function(app) {
  getAPIModules().forEach(mod => {
    const fullApi = mod.api.startsWith('/') ? `/api${mod.api}` : `/api/${mod.api}`
    const router = app.route(fullApi)

    Object.keys(mod)
      .filter(verb => API_VERBS.indexOf(verb) > -1)
      .forEach(verb => {
        const preHooks = mod.preHooks || []
        router[verb](...preHooks, wapperRouteHandler(mod[verb], verb, mod))
      })
  })

  app.get(/^\/api\//, function response(req, res) {
    res.json({ error: ERRORS.API_NOT_EXIST, status: 'failed' })
  })
}
