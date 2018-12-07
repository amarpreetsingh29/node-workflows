const ConnectorMgr = require('../connector/manager')
const CONSTANTS = require('../constants')
class DbManager {
  constructor (data, options) {
    this.connectToDb()
    this.bindConnectorEvents(data)
  }

  connectToDb () {
    // connect to db server using any ORM or sql client
  }

  bindConnectorEvents () {
    try {
      this.register({
        connector: CONSTANTS.CONNECTORS.REDIS,
        evt: CONSTANTS.REDIS.SUBSCRIBER.EVENTS.MESSAGE,
        cb: this.messageFromRedis.bind(this)
      })
    } catch (e) {
      if (e instanceof Error) console.log(e)
    }
  }

  /**
   *
   * throws error, which will be handled by errorHandler module
   * @param {*} data
   */
  messageFromRedis (data) {
    try {
      throw new Error('Error processing by DB module')
    } catch (e) {
      this.trigger(CONSTANTS.DB.EVENTS.ERROR, e)
    }
  }
  /**
   * trigger only on db  connector
   * @param {*} evt
   * @param {*} data
   */
  register ({ connector, evt, cb }) {
    let module__name
    module__name = CONSTANTS.MODULES.DB
    ConnectorMgr.register({ module__name, connector, evt, cb })
  }
  trigger (evt, data) {
    ConnectorMgr.trigger(CONSTANTS.CONNECTORS.DB, evt, data || {})
  }
}
module.exports = DbManager
