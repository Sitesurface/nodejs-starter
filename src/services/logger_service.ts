import winston from 'winston';
import config from '@/config/config';
import DailyRotateFile from 'winston-daily-rotate-file';

// Create an array to store the transports that will be used by the logger
const transports = [];

// Determine which transports to use based on the environment specified in the config file
if (config.environment === 'development') {
  // If the environment is development, log to the console
  transports.push(new winston.transports.Console());
} else {
  // If the environment is not development, log to a rotating file
  transports.push(
    new DailyRotateFile({
      // Specify the file name and pattern for the rotating log file
      filename: 'logs/rotate-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      // Specify how many days' worth of logs to keep
      maxFiles: '14d',
    }),
  );
}

// Create the logger instance
const Logger = winston.createLogger({
  // Specify the minimum log level that should be logged
  level: config.logs.level,
  // Specify the logging levels to use
  levels: winston.config.npm.levels,
  // Specify the format of the log messages
  format: winston.format.combine(
    // Add a timestamp to each log message
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // Include any errors and their stack traces in the log message
    winston.format.errors({ stack: true }),
    // Allow for interpolation of variables in the log message
    winston.format.splat(),
    // Output the log message in JSON format
    winston.format.json(),
  ),
  // Specify which transports to use for logging
  transports,
});

// Export the logger instance
export default Logger;
