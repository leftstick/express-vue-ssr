export function isEmpty(obj) {
  return obj === null || obj === undefined
}

export function isNumber(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]'
}

export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function isBoolean(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]'
}
