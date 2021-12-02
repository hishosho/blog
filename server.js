const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const devProxy = {
  '/api': {
    target: 'http://127.0.0.1:3000/',
    pathRewrite: {
      '^/api': '/'
    },
    changeOrigin: true
  }
}

const port = parseInt(process.env.PORT, 10) || 2000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    if (dev && devProxy) {
      Object.keys(devProxy).forEach(function(context) {
          server.use(createProxyMiddleware(context, devProxy[context]))
      })
    }

    server.all('*', (req, res) => {
      handle(req, res)
    })

    server.listen(port, err => {
      console.log('err=', err)
      if (err) {
        throw err
      }
      console.log(`> Ready on http://127.0.0.1:${port}`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })