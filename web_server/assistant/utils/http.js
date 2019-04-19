module.exports.API_VERBS = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options']

module.exports.jsonResult = function(data, statusCode) {
  const code = statusCode || 200
  return {
    status: code === 200 ? 'success' : 'error',
    ...(data || {})
  }
}
