const glob = require('glob')

const { resolveFromRoot } = require('./path')

module.exports.scanAPIs = function() {
  return glob.sync('**/*.js', {
    absolute: true,
    cwd: resolveFromRoot('web_server/apis'),
    ignore: ['**/_*.js', '**/_*/*.js']
  })
}
