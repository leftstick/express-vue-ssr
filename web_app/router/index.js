import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const HomeView = () => import(/* webpackChunkName: "home" */ 'views/HomeView.vue')
const FeaturesView = () => import(/* webpackChunkName: "features" */ 'views/FeaturesView.vue')

export function createRouter() {
  return new Router({
    base: __dirname,
    mode: 'history',
    routes: [{ component: HomeView, path: '/' }, { component: FeaturesView, path: '/features' }],
    scrollBehavior: () => ({ y: 0 })
  })
}
