import { NextFunction, Request, Response } from 'express'
import { createJobValidation } from './schema/jobValidation'

async function validateJob(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await createJobValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

export { validateJob }
