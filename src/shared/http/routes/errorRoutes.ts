import { ErrorLogController } from '@modules/errorLogs/controllers/ErrorLogController'
import { validateErrorLog } from '@modules/errorLogs/validations/validateErrorLog'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const router = Router()

const errorLogController = container.resolve(ErrorLogController)

router.post('/', ensureAuthenticated, validateErrorLog, errorLogController.create.bind(errorLogController))

export default router
