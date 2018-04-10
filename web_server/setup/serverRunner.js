const { port } = require('../config')

module.exports.initServerRunner = function(app) {
  return new Promise(resolve => {
    const server = app.listen(port, '0.0.0.0', () => {
      return resolve(`server started at ${port}`)
    })
    // fix slow network issue
    server.keepAliveTimeout = 60000 * 2
  })
}
