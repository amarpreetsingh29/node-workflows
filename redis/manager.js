const Publisher = require('./publisher')
const Subscriber = require('./subscriber')
const ConnectorMgr = require('../connector/manager')
const CONSTANTS = require('../constants')

const CONNECTORS = CONSTANTS.CONNECTORS
const SUBSCRIBER_EVENTS = CONSTANTS.REDIS.SUBSCRIBER.EVENTS
const PUBLISHER_EVENTS = CONSTANTS.REDIS.PUBLISHER.EVENTS

class RedisManager {
  constructor (data, options) {
    this.init()
  }
  init () {
    this.initPublisher()
    this.initSubscriber()
    this.bindConnectorEvents()
  }
  initPublisher () {
    this.__pubIns = new Publisher({ mgr: this })
    this.__pubIns.connect()
  }
  initSubscriber () {
    this.__subIns = new Subscriber({ mgr: this })
    this.__subIns.connect()
  }
  bindConnectorEvents () {
    try {
      this.register({
        connector: CONSTANTS.CONNECTORS.SOCKET,
        evt: CONSTANTS.SOCKET.SERVER.EVENTS.MESSAGE,
        cb: this.messageFromSocket.bind(this)
      })
    } catch (e) {
      if (e instanceof Error) console.log(e)
    }
  }
  messageFromSocket (data) {
    Logger.info('Processed by REDIS MODULE', data)
    this.trigger(CONSTANTS.REDIS.SUBSCRIBER.EVENTS.MESSAGE, data)
  }

  /**
   * registers any event for redis module,
   * given a valid connector and event name.
   * @param {*} param0
   */

  register ({ connector, evt, cb }) {
    let module__name
    module__name = CONSTANTS.MODULES.REDIS
    ConnectorMgr.register({ module__name, connector, evt, cb })
  }

  /**
   * triggers any event on redis connector
   * @param {*} evt
   * @param {*} data
   */
  trigger (evt, data) {
    ConnectorMgr.trigger(CONNECTORS.REDIS, evt, data || {})
  }

  /**
   * error handlers
   * triggers event to be handled at app level
   * App level errrors usually handled by errorHandler module
   * @param {*} err
   */
  publisherError (err) {
    this.trigger(PUBLISHER_EVENTS.ERROR, err)
  }
  subscriberError (err) {
    this.trigger(SUBSCRIBER_EVENTS.ERROR, err)
  }
  /**
   * end
   */
}
module.exports = RedisManager
