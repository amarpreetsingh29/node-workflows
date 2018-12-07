module.exports = {
  REDIS: {
    PUBLISHER: {
      EVENTS: {
        ERROR: 'ERROR'
      }
    },
    SUBSCRIBER: {
      EVENTS: {
        MESSAGE: 'MESSAGE'
      },
      ERRORS: {}
    }
  },
  SOCKET: {
    SERVER: {
      EVENTS: {
        CONNECT: 'CONNECT',
        DISCONNECT: 'DISCONNECT',
        MESSAGE: 'MESSAGE',
        ERROR: 'ERROR',
        PUBLISH_REDIS: 'PUBLISH_REDIS'
      }
    }
  },
  KAFKA: {
    PRODUCER: {
      EVENTS: {
        ERROR: 'ERROR',
        READY: 'READY'
      },
      ERRORS: {
        KAFKA_PRODUCER_CONNECT_ERROR: 'KAFKA_PRODUCER_CONNECT_ERROR',
        KAFKA_PRODUCER_PUBLISHING_ERROR: 'KAFKA_PRODUCER_PUBLISHING_ERROR'
      }
    },
    CONSUMER: {
      EVENTS: {
        MESSAGE: 'MESSAGE'
      },
      ERRORS: {
        KAFKA_CONSUMER_CONNECT_ERROR: 'KAFKA_CONSUMER_CONNECT_ERROR'
      }
    }
  },
  ROUTES: {
    EVENTS: {
      MESSAGE: 'MESSAGE'
    }
  },
  DB: {
    EVENTS: {
      ERROR: 'ERROR'
    }
  },
  CONNECTORS: {
    KAFKA: 'KAFKA',
    REDIS: 'REDIS',
    SOCKET: 'SOCKET',
    ROUTES: 'ROUTES',
    DB: 'DB',
    ERROR: 'ERROR'
  },
  MODULES: {
    KAFKA: 'KAFKA',
    REDIS: 'REDIS',
    SOCKET: 'SOCKET',
    ROUTES: 'ROUTES',
    DB: 'DB',
    ERROR_HANDLER: 'ERROR_HANDLER'
  }
}
