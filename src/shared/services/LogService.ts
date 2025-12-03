interface ILogEntry {
  timestamp: Date
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  metadata?: Record<string, unknown>
}

class LogService {
  private static instance: LogService
  private logs: ILogEntry[] = []
  private maxLogs: number = 1000

  private constructor() {}

  static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService()
    }
    return LogService.instance
  }

  log(level: ILogEntry['level'], message: string, metadata?: Record<string, unknown>): void {
    const entry: ILogEntry = {
      timestamp: new Date(),
      level,
      message,
      metadata,
    }

    this.logs.push(entry)

    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    const timestamp = entry.timestamp.toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`

    switch (level) {
      case 'error':
        console.error(`${prefix} ${message}`, metadata || '')
        break
      case 'warn':
        console.warn(`${prefix} ${message}`, metadata || '')
        break
      case 'debug':
        console.debug(`${prefix} ${message}`, metadata || '')
        break
      default:
        console.log(`${prefix} ${message}`, metadata || '')
    }
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.log('info', message, metadata)
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.log('warn', message, metadata)
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    this.log('error', message, metadata)
  }

  debug(message: string, metadata?: Record<string, unknown>): void {
    this.log('debug', message, metadata)
  }

  getLogs(limit: number = 100): ILogEntry[] {
    return this.logs.slice(-limit)
  }

  clearLogs(): void {
    this.logs = []
  }
}

const logService = LogService.getInstance()

export { ILogEntry, LogService, logService }
