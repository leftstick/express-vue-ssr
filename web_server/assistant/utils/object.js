module.exports.isEmpty = function(obj) {
  return obj === null || obj === undefined
}

module.exports.isNumber = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]'
}

module.exports.isString = function(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

module.exports.isBoolean = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]'
}

module.exports.pick = function(obj, ...keys) {
  return keys.reduce((prev, key) => {
    if (obj[key] !== undefined) {
      prev[key] = obj[key]
    }
    return prev
  }, {})
}
