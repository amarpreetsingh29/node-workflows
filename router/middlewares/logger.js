const logger = require('../../services/logger')
module.exports = () => {
  return async (ctx, next) => {
    try {
      let startTime, endTime
      startTime = new Date()
      logger.info({
        message: 'Request Received',
        method: ctx.method,
        url: ctx.url
      })
      await next()
      endTime = new Date()
      logger.info({
        message: 'Response Sent',
        method: ctx.method,
        url: ctx.url,
        status: ctx.status,
        time: `${endTime - startTime}ms`
      })
    } catch (e) {
      ctx.throw(500)
    }
  }
}
