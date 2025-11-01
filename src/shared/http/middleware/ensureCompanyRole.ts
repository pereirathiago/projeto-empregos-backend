import { ForbiddenError } from '@shared/errors'
import { NextFunction, Request, Response } from 'express'

async function ensureCompanyRole(req: Request, res: Response, next: NextFunction) {
  const user = req.user

  if (!user) {
    throw new ForbiddenError()
  }

  if (user.role !== 'company') {
    throw new ForbiddenError()
  }

  next()
}

export { ensureCompanyRole }
