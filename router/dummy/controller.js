const RouterMgr = require('../manager')

class DummyController {
  static echo (ctx, next) {
    ctx.response.body = {
      data: 'success'
    }
    RouterMgr.onEcho(ctx.body)
    next()
  }
}
module.exports = DummyController
