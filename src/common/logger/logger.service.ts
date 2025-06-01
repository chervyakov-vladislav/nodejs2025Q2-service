import {
  LoggerService,
  Injectable,
  type LogLevel,
  ConsoleLogger,
} from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';

const LOG_LEVELS = [
  'fatal',
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
] as const;

const enum LEVEL {
  LOG = 'log',
  FATAL = 'fatal',
  ERROR = 'error',
  WARN = 'warn',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

@Injectable()
export class Logger implements LoggerService {
  private readonly logLevel: number;
  private readonly consoleLogger = new ConsoleLogger();

  constructor() {
    this.logLevel = Number(process.env.LOG_LEVEL) ?? 3;
  }

  private shouldLog(logLevel: LogLevel): boolean {
    const idx = LOG_LEVELS.indexOf(logLevel);
    return idx <= this.logLevel;
  }

  private async writeToFile(
    logLevel: LogLevel,
    message: any,
    context?: string,
    stack?: string,
  ) {
    const time = new Date().toISOString();
    const log = `[${time}] [${logLevel}] ${context ? ` [${context}]` : ``} ${message} ${stack ? `\n [STACKTRACE]: ${stack}` : ''}\n`;
    const logFile = this.getLogFile(logLevel);

    const logDir = path.dirname(logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.promises.appendFile(logFile, log);
  }

  private getLogFile(level: LogLevel): string {
    const date = new Date().toISOString().slice(0, 10);
    const logDir = process.env.LOG_DIR || path.join(process.cwd(), 'logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const baseName =
      level === 'error' || level === 'fatal'
        ? `ERROR_LOG-${date}-home_library`
        : `${date}-home_library`;

    let counter = 0;
    let logFile = path.join(logDir, `${baseName}.log`);
    const MAX_SIZE_IN_KB = Number(process.env.LOG_MAX_SIZE_IN_KB) || 1024;

    while (fs.existsSync(logFile)) {
      const { size } = fs.statSync(logFile);
      if (size / 1024 < MAX_SIZE_IN_KB) {
        break;
      }
      counter += 1;
      logFile = path.join(logDir, `${baseName}-${counter}.log`);
    }

    return logFile;
  }

  log(message: any, context = '') {
    if (this.shouldLog(LEVEL.LOG)) {
      this.writeToFile(LEVEL.LOG, message, context);
      this.consoleLogger.log(message, context);
    }
  }

  fatal(message: any, context = '') {
    if (this.shouldLog(LEVEL.FATAL)) {
      this.writeToFile(LEVEL.FATAL, message, context);
      this.consoleLogger.log(message, context);
    }
  }

  error(message: any, stack?: string, context = '') {
    if (this.shouldLog(LEVEL.ERROR)) {
      this.writeToFile(LEVEL.ERROR, message, context, stack);
      this.consoleLogger.log(message, context);
    }
  }

  warn(message: any, context = '') {
    if (this.shouldLog(LEVEL.WARN)) {
      this.writeToFile(LEVEL.WARN, message, context);
      this.consoleLogger.log(message, context);
    }
  }

  debug(message: any, context = '') {
    if (this.shouldLog(LEVEL.DEBUG)) {
      this.writeToFile(LEVEL.DEBUG, message, context);
      this.consoleLogger.log(message, context);
    }
  }

  verbose(message: any, context = '') {
    if (this.shouldLog(LEVEL.VERBOSE)) {
      this.writeToFile(LEVEL.VERBOSE, message, context);
      this.consoleLogger.log(message, context);
    }
  }
}
