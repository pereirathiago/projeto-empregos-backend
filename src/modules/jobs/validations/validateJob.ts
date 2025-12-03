import { NextFunction, Request, Response } from 'express'
import { applyToJobValidation, createJobValidation, searchJobsValidation } from './schema/jobValidation'

async function validateJob(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await createJobValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

async function validateUpdateJob(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await createJobValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

async function validateJobFilters(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await searchJobsValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

async function validateSearchJobs(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await searchJobsValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

async function validateApplyToJob(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await applyToJobValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

export { validateApplyToJob, validateJob, validateJobFilters, validateSearchJobs, validateUpdateJob }
