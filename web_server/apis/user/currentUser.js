module.exports.api = '/user/currentUser'

module.exports.preHooks = []

module.exports.get = async function(req, res) {
  return {
    userInfo: {
      name: 'nanfeng'
    },
    valid: true
  }
}
