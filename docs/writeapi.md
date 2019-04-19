# 如何编写一个 restful api

什么是`restful api`？来，先看一个基本的概念[What is REST?](https://restfulapi.net/)

简言之，在`rest`的指导下，我们`面向资源编程`，每一个`API`都是针对一个资源的`增、删、改、查`。那么，我们就来一起看看，在`rest`的规范下，我们的框架里是如何编写一个`API`的。

首先，我们在`web_server/apis`下，新建一个目录，这个目录仅作为代码组织用途，意思是，它仅具备代码分类的意义。譬如：`web_server/apis/user`这个目录，表示这个目录下的`API`都是和`user`相关的。这种约定，在代码维护阶段会显得非常重要，你可以对代码文件进行归类、整理。

然后，在新建的目录下，新增文件，文件名随意，但不可以`_`作为文件首字母(详情，参考[API 扫描](#api-scan))。

一个文件代表一个“资源”，所以我们不推荐“很多个”方法写在一个文件里的场景。而针对一个资源，也有且仅有`http`协议支持的几种操作方法：`get`、 `post`、 `put`、 `patch`、`delete`、 `head`、 `options`。通过“声明式”的编码范式，一个`API`的书写是这个样子的，我们就以`web_server/apis/user/currentUser.js`举例说明：

```javascript
// 引入外部依赖
const AuthProxy = require('../../proxy/mixin/auth')
const { jsonResult } = require('../../assistant/utils/http')

/**
 *
 * @method get
 * @api /user/currentUser
 *
 **/
module.exports.getUser = async function(req, res) {
  // 既然是获取当前登录用户的信息，那么如果该用户已经登录(在session中)
  // 直接返回登录状态为true，并附上用户信息
  if (req.session && req.session.user) {
    return res.json(
      jsonResult({
        valid: true,
        userInfo: req.session.user
      })
    )
  }

  // 如果session中不存在用户信息，那么尝试通过存在cookie中的token获取用户信息
  // 如果token在有效期，则返回用户信息，反之返回null
  const userInfo = await AuthProxy.getUserInfoByLoginToken(req, res)

  // 当前面获取到的用户信息为null时，直接返回用户未登录状态
  if (!userInfo) {
    return res.json(jsonResult({ valid: false }))
  }

  // 如果用户信息存在，存入session
  req.session.user = userInfo

  // 返回登录状态为true，并附上用户信息
  return res.json(
    jsonResult({
      valid: true,
      userInfo
    })
  )
}

/**
 *
 * @method delete
 * @api /user/currentUser
 *
 **/
module.exports.delete = async function(req, res) {
  const result = await AuthProxy.signout(req, res)
  return res.json(jsonResult(result))
}
```

## API-Scan

所有在`web_server/apis`目录下的文件，都会在框架启动时被系统扫描器自动加载，并注册入路由表。以下情况除外：

1. 以`_`开头的目录，该目录下的所有文件都不会被加载
2. 以`_`开头的文件，该文件不会被加载
