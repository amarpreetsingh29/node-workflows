const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
var bodyParser = require('koa-bodyparser')

global.Logger = require('./services/logger')

const app = new Koa()
app.use(cors())
app.use(bodyParser())
app.listen(3000, () => {
  Logger.info('Application Started')
})
const server = http.Server(app.callback())

require('./errorHandler/init')()
require('./kafka/init')()
require('./redis/init')()
require('./socket/init')({ server })
require('./db/init')()
app.use(require('./router/init').routes())
