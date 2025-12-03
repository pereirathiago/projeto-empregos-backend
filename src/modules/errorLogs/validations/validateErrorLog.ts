import { NextFunction, Request, Response } from 'express'
import { errorLogValidation } from './schema/errorLogValidation'

async function validateErrorLog(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await errorLogValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

export { validateErrorLog }
