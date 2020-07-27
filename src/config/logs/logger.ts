
import * as winston from 'winston';
import 'winston-daily-rotate-file';
const path = require('path');
const transport = new winston.transports.DailyRotateFile({
  filename: `${process.env.HTTPLOGFILE}-%DATE%.log`,
  datePattern: 'DD-MM-HH',
  zippedArchive: true,
  maxSize: process.env.MAXSIZE,
  maxFiles: '14d',
  frequency: process.env.FREQUENCY,
  level: process.env.LEVELNAME,
  dirname: process.env.LOGGERPATH,
  // dirname: path.join(__dirname, '../../logs'),
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sss' }),
    winston.format.json()
),
});
console.log(path.join(__dirname));
transport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
  console.log(oldFilename);
  console.log(newFilename);
});
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
        filename: process.env.ERRORFILENAME,
        level: 'error',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    }),
      new winston.transports.File({
        filename: process.env.INFOFILENAME,
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    }),
    transport
  ],
});

export default logger;