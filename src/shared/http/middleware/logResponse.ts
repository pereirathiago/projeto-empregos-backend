import { logService } from '@shared/services/LogService'
import { NextFunction, Request, Response } from 'express'

const logResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send.bind(res)
  const startTime = Date.now()

  let responseBody: unknown

  res.send = (body: unknown): Response => {
    responseBody = body
    return originalSend(body)
  }

  res.on('finish', () => {
    if (req.url.includes('/health') || req.url.includes('/api/health')) {
      return
    }

    const duration = Date.now() - startTime
    const statusCode = res.statusCode
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info'

    let bodyToLog: string

    if (typeof responseBody === 'object') {
      bodyToLog = JSON.stringify(responseBody)
    } else if (responseBody) {
      bodyToLog = String(responseBody)
    } else {
      bodyToLog = '[No Body]'
    }

    if (bodyToLog.length > 300) {
      bodyToLog = bodyToLog.substring(0, 300) + '... [truncated]'
    }

    logService.log(level, `RESPONSE: ${req.method} ${req.url} - ${statusCode} (${duration}ms)`, {
      body: bodyToLog,
      duration: `${duration}ms`,
    })

    console.log(`RESPONSE - ${req.method} ${req.url} - ${res.statusCode} - Body: ${bodyToLog}`)
  })

  next()
}

export { logResponse }
