const session = require('express-session')

const { ONE_WEEK_MILLI_SECONDS } = require('../assistant/utils/time')

module.exports.initSession = function(app) {
  app.set('trust proxy', 1)

  app.use(
    session({
      cookie: {
        maxAge: ONE_WEEK_MILLI_SECONDS
      },
      resave: false,
      saveUninitialized: true,
      secret: 'app_next_version'
    })
  )
}
