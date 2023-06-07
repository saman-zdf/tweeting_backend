import { createLogger, format, transports } from 'winston';

/* eslint-disable no-console */
const COLORS = {
  red: '\u001b[31m',
  green: '\u001b[32m',
  blue: '\u001b[34m',
  yellow: '\u001b[33m',
  reset: '\u001b[0m',
};

const { combine, timestamp, json, errors, printf } = format;

const productionLogger = () => {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
};

const developmentLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || COLORS.blue + message + COLORS.reset}`;
  });

  return createLogger({
    format: combine(
      format.colorize(),

      timestamp({ format: 'HH:mm' }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: [new transports.Console()],
  });
};

const testEnvLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    format: combine(logFormat),
    transports: [new transports.Console()],
    silent: true,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let logger: any | null = null;

if (process.env.NODE_ENV === 'production') {
  logger = productionLogger();
} else if (process.env.NODE_ENV === 'test') {
  logger = testEnvLogger();
} else {
  logger = developmentLogger();
}

export default logger;
