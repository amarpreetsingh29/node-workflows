const redis = require('redis')

class Publisher {
  constructor (data, options) {
    this.__mgr = data.mgr
  }
  connect () {
    // connect to redis server using redis client imported above
  }
}
module.exports = Publisher
