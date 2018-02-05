const { PARAM_WRONG } = require('../../errorcodes')

class InvalidParamsError extends Error {
  constructor(message) {
    super(message)
    this.rawError = PARAM_WRONG
  }
}

module.exports = InvalidParamsError
