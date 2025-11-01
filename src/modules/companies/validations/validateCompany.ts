import { NextFunction, Request, Response } from 'express'
import { createCompanyValidation, updateCompanyValidation } from './schema/companyValidation'

async function validateCompany(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await createCompanyValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

async function validateUpdateCompany(req: Request, _res: Response, next: NextFunction) {
  const validatedData = await updateCompanyValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  req.body = validatedData
  next()
}

export { validateCompany, validateUpdateCompany }
