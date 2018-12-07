const SocketServer = require('./server')
const ConnectorMgr = require('../connector/manager')
const CONSTANTS = require('../constants')

const CONNECTORS = CONSTANTS.CONNECTORS

class SocketIOManager {
  constructor (data, options) {
    this.init(data)
    this.bindConnectorEvents()
  }
  init (data) {
    this.__socketServerIns = new SocketServer({
      server: data.server,
      mgr: this
    })
    this.__socketServerIns.init()
  }

  /**
   * bind handlers to events on various connectors
   */
  bindConnectorEvents () {
    try {
      this.register({
        connector: CONNECTORS.ROUTES,
        evt: CONSTANTS.ROUTES.EVENTS.MESSAGE,
        cb: this.messageHandler.bind(this)
      })
    } catch (e) {
      /**
       * e is an instance of Error
       * Also, specific error types available on ConnectorManager can also be checked
       */
      if (e instanceof Error) console.log(e)
    }
  }

  messageHandler (data) {
    Logger.info('Processed by SOCKET MODULE', data)
    this.trigger(CONSTANTS.SOCKET.SERVER.EVENTS.MESSAGE, data)
  }

  /**
   * registers any event for socket module,
   * given a valid connector and event name.
   * @param {*} param0
   */
  register ({ connector, evt, cb }) {
    let module__name
    module__name = CONSTANTS.MODULES.SOCKET
    ConnectorMgr.register({ module__name, connector, evt, cb })
  }

  /**
   * triggers any event on socket connector
   * @param {*} evt
   * @param {*} data
   */
  trigger (evt, data) {
    ConnectorMgr.trigger(CONNECTORS.SOCKET, evt, data || {})
  }
}

module.exports = SocketIOManager
