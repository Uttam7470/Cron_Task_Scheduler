import winston from 'winston';
import fs from 'fs';
import path from 'path';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// Ensure logs directory exists
const logDir = process.env.LOG_DIR || 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Log level from environment variable
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, 'combined.log') }), // Log to file
    new transports.Console({
      format: combine(
        colorize(),  // Add color to the console output
        logFormat
      )
    })
  ]
});

// Initial log entry to confirm initialization
logger.info('Logger initialized successfully.');

export default logger;
