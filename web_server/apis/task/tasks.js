const uuidv4 = require('uuid/v4')

module.exports.api = '/tasks'

module.exports.preHooks = []

module.exports.get = async function(req, res) {
  return {
    tasks: [
      {
        completed: true,
        id: uuidv4(),
        task: 'Learn JavaScript syntax'
      },
      {
        completed: true,
        id: uuidv4(),
        task: 'Learn Vue usage'
      },
      {
        completed: false,
        id: uuidv4(),
        task: 'Learn Vuex usage'
      },
      {
        completed: false,
        id: uuidv4(),
        task: 'Learn Vue Router usage'
      },
      {
        completed: false,
        id: uuidv4(),
        task: 'Learn how ssr works with vue'
      }
    ]
  }
}
