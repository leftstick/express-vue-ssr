import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const HomeView = () => import(/* webpackChunkName: "home" */ 'views/HomeView.vue')

export function createRouter() {
  return new Router({
    base: __dirname,
    mode: 'history',
    routes: [{ component: HomeView, path: '/' }],
    scrollBehavior: () => ({ y: 0 })
  })
}
