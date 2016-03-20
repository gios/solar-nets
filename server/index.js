'use strict';

const path = require('path')
const app = require('koa')()
const router = require('koa-router')()
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const favicon = require('koa-favicon')
const send = require('koa-send')
const tracer = require('tracer').colorConsole()

app.use(function *(next) {
  yield send(this, path.resolve(__dirname, '/../public/', 'index.html'))
  yield next
})

app.use(function *(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = { code: this.status, message: err.message || 'Internal server error' }

    if (400 < this.status && this.status < 500) {
      tracer.warn(err)
    } else {
      tracer.error(err)
    }
    this.app.emit('error', err, this)
  }
})

app.use(logger())
app.use(helmet())
app.use(bodyParser())
app.use(serve(__dirname + '/../public'))
app.use(favicon(__dirname + '/../public/favicon.ico'))
app.use(router.routes())
app.use(router.allowedMethods())

// Routes
require('./src/routes/testRoute.js')(router)

app.listen(process.env.PORT || 5000)
tracer.info('Solar Nets is running on port', process.env.PORT || 5000)
