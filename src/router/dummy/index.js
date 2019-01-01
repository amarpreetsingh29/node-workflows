const Controller = require('./controller')
const Router = require('koa-router')
const router = new Router()

router.post('/message', Controller.echo)

module.exports = router
