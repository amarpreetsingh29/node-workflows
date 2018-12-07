const { KafkaStreams } = require('kafka-streams')

class KafkaConsumer {
  constructor (data, options) {
    /**
     * Manager ref.
     */
    this.__mgr = data.mgr
  }

  connect () {
    // connect to kafka server using kafka client imported above
  }
}

module.exports = KafkaConsumer
