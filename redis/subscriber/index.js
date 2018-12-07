const redis = require('redis')

const CustomError = require('../../errorHandler/types/customError')

class Subscriber {
  constructor (data, options) {
    this.__mgr = data.mgr
  }
  connect () {
    // connect to redis server using redis client imported above
  }
}
module.exports = Subscriber
