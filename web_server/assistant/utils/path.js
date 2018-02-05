const path = require('path')

module.exports.resolveFromRoot = function(...sections) {
  return path.resolve(__dirname, '..', '..', '..', ...sections)
}
