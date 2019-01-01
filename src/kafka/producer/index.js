const kafka = require('kafka-node')

class KafkaProducer {
  constructor (data, options) {
    this.__mgr = data.mgr
  }

  connect () {
    // connect to kafka server using kafka client imported above
  }
}

module.exports = KafkaProducer
