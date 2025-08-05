const pino = require('pino');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}
const logFilePath = path.join(__dirname, '../logs', Date.now() + '.log');

const stream = fs.createWriteStream(logFilePath);

const logger = pino({
  name: 'drone-api',
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: false,
      destination: logFilePath,
    }
  },
  stream: stream
});

module.exports = logger;
