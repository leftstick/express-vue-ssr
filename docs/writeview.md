# 如何编写一个视图

一个视图，从路由开始。有了`URL`，才有了后面的一切。

## 声明一个路由

打开`web_app/router/indexjs`，看到如下代码：

```javascript
// 引入依赖
import Vue from 'vue'
import Router from 'vue-router'

// 注册路由管理器
Vue.use(Router)

// 首页懒加载
const HomeView = () => import(/* webpackChunkName: "home" */ 'views/HomeView.vue')

// 404页面懒加载
const NotFoundView = () => import(/* webpackChunkName: "notfound" */ 'views/NotFoundView.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    base: __dirname,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      // 以下是各路由注册
      { path: '/', component: HomeView },
      { path: '*', component: NotFoundView }
    ]
  })
}
```

> 新加页面的话，只要新增一条懒加载，再注册好就可以了

## 视图编写

每个视图都包含了数据需求，但在同构体系里，这个部分需要稍微注意一下。关于同构设计体系详情，可以参考[data-pre-fetching](https://ssr.vuejs.org/en/data.html)

在我们的框架里，我们约定：

1. 所有视图模块放在`web_app/ui/views`目录下，其他非视图组件放到`web_app/ui/components`下
2. 所有的视图模块，可以实现一个`preFetch`方法(如果该视图有数据需求)，并且`preFetch`必须返回一个`Promise`
