const bodyParser = require('body-parser')

module.exports.initRequestBodyParser = function(app) {
  app.use(bodyParser.json())
}
