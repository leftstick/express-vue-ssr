module.exports = function(isDev) {
  return {
    extractCSS: !isDev,
    preserveWhitespace: false
  }
}
