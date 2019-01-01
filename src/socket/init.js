const SocketMgr = require('./manager')
module.exports = server => {
  const ins = new SocketMgr(server)
}
