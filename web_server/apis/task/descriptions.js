module.exports.api = '/descriptions'

module.exports.preHooks = []

module.exports.get = async function() {
  return {
    descriptions: [
      '这是一个基于express的，vue-ssr脚手架。',
      '脚手架中，约定了视图、API、服务器配置等功能的写法，这些都是提高开发效率的必备能量'
    ]
  }
}
