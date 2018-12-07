const CONSTANTS = require('../constants')
const ConnectorMgr = require('../connector/manager')
const CONNECTORS = CONSTANTS.CONNECTORS

/**
 * App level error handler.
 * Errors can be handled with in module and also at app level, depending upon use case.
 */
class ErrorManager {
  constructor (data, options) {
    this.bindConnectorEvents()
  }

  /**
   * register to listen for error events on all connectors
   */
  bindConnectorEvents () {
    try {
      let evt
      evt = 'ERROR'
      this.register({
        connector: CONNECTORS.KAFKA,
        cb: this.kafkaError,
        evt
      })
      this.register({
        connector: CONNECTORS.REDIS,
        cb: this.redisError,
        evt
      })
      this.register({
        connector: CONNECTORS.SOCKET,
        cb: this.socketError,
        evt
      })
      this.register({
        connector: CONNECTORS.DB,
        cb: this.databaseError,
        evt
      })
    } catch (e) {
      console.log(e)
    }
  }
  register ({ connector, evt, cb }) {
    let module__name
    module__name = CONSTANTS.MODULES.ERROR_HANDLER
    ConnectorMgr.register({ module__name, connector, evt, cb })
  }
  kafkaError (err) {
    console.log(err)
  }
  redisError (err) {
    console.log(err)
  }
  messageProcessorError (err) {
    console.log(err)
  }
  socketError (err) {
    console.log(err)
  }
  databaseError (err) {
    console.log(err)
  }
}
module.exports = ErrorManager
