const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')

const session = require('koa-session');
const passport = require('koa-passport');


const app = new Koa()
const router = new Router()

app.keys = ['newcookie!key', 'oldcookie!key'];
app.use(session(app));

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: false,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

require('./services/auth');
app.use(passport.initialize());
app.use(passport.session());

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
