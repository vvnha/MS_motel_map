const convict = require('convict');
require('dotenv').config();
const path = require('path');

const config = convict({
  env: {
    doc: 'Application Enviroment',
    env: 'NODE_ENV',
    format: ['production', 'staging', 'development'],
    default: 'development',
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    db: process.env.REDIS_DB,
  },
  rabittMQ: {
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: 'MOTEL',
    QUEUE_NAME: 'MOTEL_QUEUE',
    MOTEL_BINDING_KEY: 'MOTEL_SERVICE',
    USER_BINDING_KEY: 'USERL_SERVICE',
  },
});

if (process.env.NODE_ENV != null) {
  const env = config.get('env');
  config.loadFile(path.resolve(`src/config/${env.trim()}.json`));
} else {
  config.loadFile(path.resolve('src/config/development.json'));
}

module.exports = config;
