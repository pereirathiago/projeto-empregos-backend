import { NextFunction, Request, Response } from 'express'
import { createJobValidation, jobFiltersValidation, searchJobsValidation } from './schema/jobValidation'

async function validateJob(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await createJobValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

async function validateJobFilters(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await jobFiltersValidation.validate(req.body, {
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

export { validateJob, validateJobFilters, validateSearchJobs }
