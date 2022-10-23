// https://github.com/rainbow-me/rainbow/blob/0ae3218255baef535b1e15fb218614b9a75f1477/src/logger/index.ts

import { IS_TEST, IS_DEV, LOG_LEVEL, LOG_DEBUG } from '@env';
import format from 'date-fns/format';



export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

type Transport = (level: LogLevel, message: string | MLTError) => void;

const enabledLogLevels: {
  [key in LogLevel]: LogLevel[];
} = {
  [LogLevel.Debug]: [LogLevel.Debug, LogLevel.Info, LogLevel.Warn, LogLevel.Error],
  [LogLevel.Info]: [LogLevel.Info, LogLevel.Warn, LogLevel.Error],
  [LogLevel.Warn]: [LogLevel.Warn, LogLevel.Error],
  [LogLevel.Error]: [LogLevel.Error],
};

/**
 * Color handling copied from Kleur
 *
 * @see https://github.com/lukeed/kleur/blob/fa3454483899ddab550d08c18c028e6db1aab0e5/colors.mjs#L13
 */
const colors: {
  [key: string]: [number, number];
} = {
  default: [0, 0],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39],
};

function withColor([x, y]: [number, number]) {
  const rgx = new RegExp(`\\x1b\\[${y}m`, 'g');
  const open = `\x1b[${x}m`,
    close = `\x1b[${y}m`;

  return function (txt: string) {
    if (txt == null) return txt;
    // eslint-disable-next-line no-extra-boolean-cast
    return open + (~('' + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}

/**
 * Used in dev mode to nicely log to the console
 */
export const consoleTransport: Transport = (level, message) => {
  const timestamp = format(new Date(), 'HH:mm:ss');
  const color = {
    [LogLevel.Debug]: colors.magenta,
    [LogLevel.Info]: colors.default,
    [LogLevel.Warn]: colors.yellow,
    [LogLevel.Error]: colors.red,
  }[level];
  // needed for stacktrace formatting
  const log = level === LogLevel.Error ? console.error : console.log;

  log(`${timestamp} ${withColor(color)(`[${level.toUpperCase()}]`)} ${message.toString()}`);
};

export class MLTError extends Error {}

/**
 * Main class. Defaults are provided in the constructor so that subclasses are
 * technically possible, if we need to go that route in the future.
 */
export class Logger {
  LogLevel = LogLevel;

  enabled: boolean;
  level: LogLevel;
  transports: Transport[] = [];

  protected debugContextRegexes: RegExp[] = [];

  constructor({
    enabled = (IS_TEST === '1'),
    level = LOG_LEVEL as LogLevel,
    debug = LOG_DEBUG || '',
  }: {
    enabled?: boolean;
    level?: LogLevel;
    debug?: string;
  } = {}) {
    this.enabled = enabled !== false;
    this.level = debug ? LogLevel.Debug : level ?? LogLevel.Warn;
    this.debugContextRegexes = (debug || '').split(',').map((context) => {
      return new RegExp(context.replace(/[^\w:*]/, '').replace(/\*/g, '.*'));
    });
  }

  debug(message: string) {
    this.transport(LogLevel.Debug, message);
  }

  info(message: string) {
    this.transport(LogLevel.Info, message);
  }

  warn(message: string) {
    this.transport(LogLevel.Warn, message);
  }

  error(error: MLTError) {
    if (error instanceof MLTError) {
      this.transport(LogLevel.Error, error);
    } else {
      this.transport(
        LogLevel.Error,
        new MLTError(`logger.error was not provided a MLTError`)
      );
    }
  }

  addTransport(transport: Transport) {
    this.transports.push(transport);
    return () => {
      this.transports.splice(this.transports.indexOf(transport), 1);
    };
  }

  protected transport(level: LogLevel, message: string | MLTError) {
    if (!this.enabled) return;
    if (!enabledLogLevels[this.level].includes(level)) return;
    consoleTransport(level, message);
  }
}

/**
 * Rainbow's logger. See `@/logger/README` for docs.
 *
 * Basic usage:
 *
 *   `logger.debug(message)`
 *   `logger.info(message)`
 *   `logger.warn(message)`
 *   `logger.error(error)`
 */
export const logger = new Logger();

/**
 * Report to console in dev, Sentry in prod, nothing in test.
 */
if (IS_DEV === '0') {
  logger.addTransport(consoleTransport);
}
