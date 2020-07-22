
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  filename: `${process.env.HTTPLOGFILE}-%DATE%.log`,
  datePattern: 'DD-MM-HH-mm',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
  frequency: '2m',
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sss' }),
    winston.format.json()
),
});
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