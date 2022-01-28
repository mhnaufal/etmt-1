import fs from 'fs';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

/* logs directory */
const logDir = `${__dirname}/../logs`;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/* Define the log format */
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), logFormat),
  transports: [
    // console log setting
    new winston.transports.Console({ format: winston.format.combine(winston.format.splat(), winston.format.colorize()) }),
    // debug log setting
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/debug`,
      filename: `%DATE%.log`,
      maxFiles: 1, // 1 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`,
      filename: `%DATE%.log`,
      maxFiles: 1, // 1 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

export default logger;
