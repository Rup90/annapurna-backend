// const winston = require('winston');
import { createLogger,  transports, format } from 'winston';
import { json } from 'express';

const logger = createLogger({
  transports: [
    new transports.File({
        filename: 'error.log',
        level: 'error',
        format: format.combine(format.timestamp(), format.json())
    }),
      new transports.File({
        filename: 'info.log',
        level: 'info',
        format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
        filename: 'requests.log',
        level: 'http',
        format: format.combine(format.timestamp(), format.json())
    })
  ],
});

export default logger;