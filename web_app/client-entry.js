import './assistant/polyfill'
import Vue from 'vue'
import api from './assistant/api/client'
import { createApp } from './app'

// a global mixin that calls `preFetch` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { preFetch } = this.$options
    if (preFetch) {
      preFetch({
        route: to,
        store: this.$store
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  store.state.api = api

  // Add router hook for handling preFetch.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })

    const preFetchHooks = activated.map(c => c.preFetch).filter(_ => _)
    if (!preFetchHooks.length) {
      return next()
    }

    Promise.all(preFetchHooks.map(hook => hook({ route: to, store })))
      .then(next)
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#main-app')
})

// service worker
if (location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
