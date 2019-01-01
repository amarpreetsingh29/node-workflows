const Connector = require('./connector')
const Constants = require('../constants')
const Logger = require('../services/logger')
class ConnectorManager {
  constructor () {
    this.connectors = {}
    this.init()
  }

  init () {
    for (var connector in Constants.CONNECTORS) {
      this.connectors[connector] = new Connector()
    }
  }

  /**
   * wrapper for centralized event registration on particular connector
   * @param {*} connector
   * @param {*} evt
   * @param {*} cb
   */
  register ({ module__name, connector, evt, cb }) {
    let listenerCount
    Logger.info({
      message: `${module__name} module registering event`.toUpperCase(),
      event: evt,
      connector: connector,
      callback: cb
    })
    if (connector && evt && cb && module__name) {
      if (this.connectors[connector]) {
        listenerCount = this.connectors[connector].listenerCount(evt)
        if (listenerCount < this.connectors[connector].getMaxListeners()) {
          this.connectors[connector].on(evt, cb)
          Logger.info({
            message: `Event Registered successfully`.toUpperCase()
          })
          console.log('\n')
        } else {
          throw new this.MaxListenerExceededError(connector, evt)
        }
      } else {
        throw new this.InvalidConnectorError('register')
      }
    } else {
      throw new this.InvalidArgumentsError('register')
    }
  }

  /**
   * wrapper for centralized event trigger on particular connector
   * @param {*} connector
   * @param {*} evt
   * @param {*} data
   */
  trigger (connector, evt, data) {
    if (connector && evt) {
      if (this.connectors[connector]) {
        Logger.info({
          message: `${connector} module emitting event`.toUpperCase(),
          event: evt,
          connector: connector,
          data: data
        })

        /**
         * setImmediate is very essential here while emitting event
         * Omitting  setImmediate can lead to stack overflow.
         * Event will be executed in check phase.
         * For more info on Node.js lifecycle : https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
         */

        setImmediate(() => {
          this.connectors[connector].emit(evt, data)
        })
        Logger.info(
          `=========${evt} EVENT ON ${connector} CONNECTOR POLLED FOR EMITTING - WILL BE EXECUTED IN CHECK PHASE========`
        )
        console.log('\n')
      } else {
        throw new this.InvalidConnectorError('trigger')
      }
    } else {
      throw new this.InvalidArgumentsError('trigger')
    }
  }
}

// expose errors on ConnectorManager
ConnectorManager.prototype.MaxListenerExceededError = MaxListenerExceededError
ConnectorManager.prototype.InvalidConnectorError = InvalidConnectorError
ConnectorManager.prototype.InvalidArgumentsError = InvalidArgumentsError

// custom errors
function MaxListenerExceededError (connector, event) {
  this.connector = connector
  this.event = event
  this.message = `Failed to register event due to maximum listener count exceeded on ${connector} connector for event ${event}`
  Error.captureStackTrace(this)
}
function InvalidConnectorError (message) {
  this.message = `Failed to ${message} event due to invalid connector passed`
  Error.captureStackTrace(this)
}

function InvalidArgumentsError (message) {
  this.message = `Failed to ${message} event due to invalid arguments passed`
  Error.captureStackTrace(this)
}

// set prototype of Custom Errors to Error class
Object.setPrototypeOf(MaxListenerExceededError.prototype, Error.prototype)
Object.setPrototypeOf(InvalidConnectorError.prototype, Error.prototype)
Object.setPrototypeOf(InvalidArgumentsError.prototype, Error.prototype)

module.exports = new ConnectorManager()
