const Server = require('socket.io')

class SocketServer {
  constructor (data, options) {
    this.__httpserver = data.server
    this.__mgr = data.mgr
  }

  init () {
    this.io = new Server(this.__httpserver, this.options())
  }

  options () {
    return {
      path: '/chat',
      handlePreflightRequest: this.handlePreflightRequest.bind(this),
      pingInterval: 10000,
      pingTimeout: 120000
    }
  }

  handlePreflightRequest (req, res) {
    var headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': true
    }
    res.writeHead(200, headers)
    res.end()
  }
}

module.exports = SocketServer
