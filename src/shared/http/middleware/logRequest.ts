import { logService } from '@shared/services/LogService'
import { NextFunction, Request, Response } from 'express'

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  if (req.url.includes('/health') || req.url.includes('/api/health')) {
    return next()
  }

  const message = `${req.method} ${req.url}`
  const metadata: Record<string, unknown> = {}

  if (req.body && Object.keys(req.body).length > 0) {
    const safeBody = { ...req.body }
    if (safeBody.password) safeBody.password = '***'
    if (safeBody.senha) safeBody.senha = '***'
    metadata.body = safeBody
  }

  if (req.headers.authorization) {
    metadata.authenticated = true
  }

  logService.info(`REQUEST: ${message}`, Object.keys(metadata).length > 0 ? metadata : undefined)

  console.log(`REQUEST - ${req.method} ${req.url} - ${req.body ? JSON.stringify(req.body) : 'no body'}`)
  next()
}

export { logRequest }
