const EventEmitter = require('events')

/**
 * Common Connector,can be used to create multiple connectors.
 * additional methods if needed, to be implemented in this class
 */
class Connector extends EventEmitter {
  constructor (data, options) {
    super()
  }
}

module.exports = Connector
