const { jsonResult } = require('../../assistant/utils/http')

/**
 * @method get
 * @api /descriptions
 */
module.exports.getDescriptions = async function(req, res) {
  return res.json(
    jsonResult({
      descriptions: [
        '这是一个基于express的，vue-ssr脚手架。',
        '脚手架中，约定了视图、API、服务器配置等功能的写法，这些都是提高开发效率的必备能量'
      ]
    })
  )
}
