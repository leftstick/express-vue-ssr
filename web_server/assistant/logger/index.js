const fs = require('fs')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const { resolveFromRoot } = require('../utils/path')

const logPath = resolveFromRoot('logs')
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath)
}

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug'
    }),

    new DailyRotateFile({
      filename: `${logPath}/info.log`,
      level: 'info'
    }),

    new DailyRotateFile({
      filename: `${logPath}/error.log`,
      level: 'error'
    })
  ]
})
