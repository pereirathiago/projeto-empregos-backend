import { JobController } from '@modules/jobs/controllers/JobController'
import { validateJob, validateSearchJobs, validateUpdateJob } from '@modules/jobs/validations/validateJob'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureCompanyRole } from '../middleware/ensureCompanyRole'

const router = Router()

const jobController = container.resolve(JobController)

router.post('/', ensureAuthenticated, ensureCompanyRole, validateJob, jobController.create.bind(jobController))
router.post('/search', ensureAuthenticated, validateSearchJobs, jobController.searchAll.bind(jobController))
router.get('/:id', ensureAuthenticated, jobController.getById.bind(jobController))
router.patch(
  '/:job_id',
  ensureAuthenticated,
  ensureCompanyRole,
  validateUpdateJob,
  jobController.update.bind(jobController),
)

export default router
