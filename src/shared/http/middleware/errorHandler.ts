import { ValidationError } from '@shared/errors'
import { AppError } from '@shared/errors/app-error'
import { logService } from '@shared/services/LogService'
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logService.error(`ERROR: ${req.method} ${req.url} - ${err.message}`, {
    stack: err.stack,
  })
  console.error(err)

  if (err instanceof Yup.ValidationError) {
    const details = err.inner.map((err: Yup.ValidationError) => {
      let errorMessage = 'invalid'
      switch (err.type) {
        case 'required':
          errorMessage = 'required'
          break
        case 'min':
          errorMessage = 'too_short'
          break
        case 'max':
          errorMessage = 'too_long'
          break
        case 'matches':
        case 'email':
          errorMessage = 'invalid_format'
          break
        default:
          errorMessage = err.message || 'invalid'
      }

      return { field: err.path, error: errorMessage }
    })

    return res.status(422).json({
      message: 'Validation error',
      code: 'UNPROCESSABLE',
      details,
    })
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: 'UNPROCESSABLE',
      details: err.details,
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  })
}

export { errorHandler }
