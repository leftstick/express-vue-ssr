const logger = require('../logger')
const uuidv4 = require('uuid/v4')

module.exports.renderErrorHandler = function({ req, res, err }) {
  const errorID = uuidv4()

  // Render Error Page or Redirect
  res.status(500).send(`500 | Internal Server Error。<br/>你可以联系我们的工作人员，并把这个错误ID给他：${errorID}`)
  logger.error(`During render [${errorID}]: ${req.url} || ${err.stack || err.message}`)
}
