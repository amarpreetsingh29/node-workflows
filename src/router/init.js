const Router = require('koa-router')
const router = new Router()

const logger = require('./middlewares/logger')
const DummyRouter = require('./dummy')

router.use(logger())
router.use(DummyRouter.routes())

module.exports = router
