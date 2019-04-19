const uuidv4 = require('uuid/v4')
const { jsonResult } = require('../../assistant/utils/http')

/**
 * @method get
 * @api /tasks
 */
module.exports.getTasks = async function(req, res) {
  return res.json(
    jsonResult({
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
    })
  )
}
