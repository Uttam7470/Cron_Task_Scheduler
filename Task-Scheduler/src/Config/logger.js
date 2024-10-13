import winston from 'winston';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir); // Create the logs directory if it doesn't exist
}

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/combined.log', level: 'info' }), // You can change the level if needed
    new transports.Console()
  ]
});

export default logger;
