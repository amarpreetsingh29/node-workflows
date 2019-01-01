const Consumer = require('./consumer')
const Producer = require('./producer')
const ConnectorMgr = require('../connector/manager')
const CONSTANTS = require('../constants')

const KAFKA = CONSTANTS.KAFKA
const CONNECTORS = CONSTANTS.CONNECTORS

const SOCKET_EVENTS = CONSTANTS.SOCKET.SERVER.EVENTS

class KafkaManager {
  constructor (data, options) {
    this.init()
  }
  init () {
    this.initConsumer()
    this.initProducer()
    this.bindConnectorEvents()
  }
  initConsumer () {
    this.__consumerIns = new Consumer({ mgr: this })
    this.__consumerIns.connect()
  }
  initProducer () {
    this.__producerIns = new Producer({ mgr: this })
    this.__producerIns.connect()
  }
  bindConnectorEvents () {
    try {
      this.register({
        connector: CONNECTORS.SOCKET,
        evt: SOCKET_EVENTS.MESSAGE,
        cb: this.messageFromSocket.bind(this)
      })
    } catch (e) {
      if (e instanceof Error) console.log(e)
    }
  }
  messageFromSocket (data) {
    Logger.info('Processed by KAFKA MODULE', data)
  }
  register ({ connector, evt, cb }) {
    let module__name
    module__name = CONSTANTS.MODULES.KAFKA
    ConnectorMgr.register({ module__name, connector, evt, cb })
  }
  trigger (evt, data) {
    ConnectorMgr.trigger(CONNECTORS.KAFKA, evt, data || {})
  }
}

module.exports = KafkaManager
