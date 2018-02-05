const { RESOURCE_NOT_EXIST } = require('../../errorcodes')

class NonExistError extends Error {
  constructor(message) {
    super(message)
    this.rawError = RESOURCE_NOT_EXIST
  }
}

module.exports = NonExistError
