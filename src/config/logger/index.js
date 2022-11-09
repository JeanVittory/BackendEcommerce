import { loggerConfig } from './logger.js';

let logger = null;

if (process.env.NODE_ENV) {
  logger = loggerConfig();
}

export { logger };
