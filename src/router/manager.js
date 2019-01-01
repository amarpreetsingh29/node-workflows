const ConnectorMgr = require('../connector/manager')
const CONSTANTS = require('../constants')
const CONNECTORS = CONSTANTS.CONNECTORS
const EVENTS = CONSTANTS.ROUTES.EVENTS
class RoutesManager {
  constructor (server) {
    this.bindConnectorEvents()
  }
  bindConnectorEvents () {}
  onEcho (data) {
    this.trigger(EVENTS.MESSAGE, data)
  }
  register (connector, evt, cb) {
    let module__name
    module__name = CONSTANTS.MODULES.ROUTES
    ConnectorMgr.register({ module__name, connector, evt, cb })
  }
  trigger (evt, data) {
    ConnectorMgr.trigger(CONNECTORS.ROUTES, evt, data || {})
  }
}

module.exports = new RoutesManager()
