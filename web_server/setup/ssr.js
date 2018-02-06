const fs = require('fs')
const uuidv4 = require('uuid/v4')
const { createBundleRenderer } = require('vue-server-renderer')
const logger = require('../assistant/logger')
const { isDev } = require('../assistant/utils/env')

const { resolveFromRoot } = require('../assistant/utils/path')

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      // this is only needed when vue-server-renderer is npm-linked
      basedir: resolveFromRoot('dist'),

      // recommended for performance
      runInNewContext: false
    })
  )
}

module.exports.initRenderer = function(app) {
  const templatePath = resolveFromRoot('web_app', 'index.template.html')

  if (!isDev) {
    // In production: create server renderer using template and built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('../../dist/vue-ssr-server-bundle.json')

    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require('../../dist/vue-ssr-client-manifest.json')
    const renderer = createRenderer(bundle, {
      clientManifest,
      template
    })
    return {
      readyPromise: Promise.resolve(),
      renderer
    }
  }

  const ssr = {}
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  ssr.readyPromise = require('../../build/setup-dev-server')(app, templatePath, (bundle, options) => {
    ssr.renderer = createRenderer(bundle, options)
  })
  return ssr
}

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

module.exports.render = function(req, res, ssr) {
  const s = Date.now()

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const context = {
    cookie: req.headers.cookie || '',
    url: req.url
  }

  ssr.renderer.renderToString(context, (err, html) => {
    if (err) {
      return renderErrorHandler({ err, req, res })
    }
    res.send(html)
    logger.info(`Whole request cost : ${Date.now() - s}ms, URL : ${req.url}`)
  })
}

function renderErrorHandler({ err, req, res }) {
  const errorID = uuidv4()

  // Render Error Page or Redirect
  res.status(500).send(`500 | Internal Server Error。<br/>你可以联系我们的工作人员，并把这个错误ID给他：${errorID}`)
  logger.error(`During render [${errorID}]: ${req.url} || ${err.stack || err.message}`)
}
