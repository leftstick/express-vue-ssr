const cookieParser = require('cookie-parser')

module.exports.initCookieParser = function(app) {
  app.use(cookieParser('app_next_version'))
}
