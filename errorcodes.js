module.exports = {
  API_NOT_EXIST: {
    code: 20003,
    message: 'API不存在'
  },

  NO_MATCHED_VIEW: {
    code: 40001,
    message: '没有找到对应的视图'
  },

  // failed
  PARAM_WRONG: {
    code: 20001,
    message: '参数错误'
  },

  RESOURCE_NOT_EXIST: {
    code: 20002,
    message: '资源不存在或者已删除'
  },

  SERVER_ERROR: {
    code: 30001,
    message: '服务暂时不可用'
  },

  URL_MATCH_ERROR: {
    code: 40000,
    message: 'URL在服务器端匹配不正确'
  }
}
