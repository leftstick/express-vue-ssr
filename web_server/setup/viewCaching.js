const microcache = require('route-cache')
const { isDev } = require('../assistant/utils/env')

const BLACK_LIST = []

module.exports.initViewCaching = function(app) {
  if (isDev) {
    return
  }

  app.use(
    microcache.cacheSeconds(1000, req => {
      if (BLACK_LIST.some(b => req.originalUrl.includes(b))) {
        return false
      }
      return req.originalUrl
    })
  )
}
