import { JobController } from '@modules/jobs/controllers/JobController'
import { validateJob } from '@modules/jobs/validations/validateJob'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureCompanyRole } from '../middleware/ensureCompanyRole'

const router = Router()

const jobController = container.resolve(JobController)

router.post('/', ensureAuthenticated, ensureCompanyRole, validateJob, jobController.create.bind(jobController))

export default router
