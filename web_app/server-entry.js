import { NO_MATCHED_VIEW, URL_MATCH_ERROR } from '../errorcodes'
import { createAPI } from './assistant/api/server'
import { createApp } from './app'

import logger from '../web_server/assistant/logger'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url, cookie } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject(URL_MATCH_ERROR)
    }
    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // no matched routes
      if (!matchedComponents.length) {
        return reject(NO_MATCHED_VIEW)
      }

      store.state.api = createAPI(cookie)

      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(
        matchedComponents.map(
          ({ preFetch }) =>
            preFetch &&
            preFetch({
              fromServer: true,
              route: router.currentRoute,
              store
            })
        )
      )
        .then(() => {
          logger.info(`Data pre-fetch cost : ${Date.now() - s}ms, URL : ${url}`)

          // After all preFetch hooks are resolved, our store is now
          // filled with the state needed to render the app.
          // Expose the state on the render context, and let the request handler
          // inline the state in the HTML response. This allows the client-side
          // store to pick-up the server-side state without having to duplicate
          // the initial data fetching on the client.
          store.state.fromServer = true
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
