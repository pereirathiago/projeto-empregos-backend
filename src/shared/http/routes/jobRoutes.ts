import { JobController } from '@modules/jobs/controllers/JobController'
import { validateApplyToJob, validateJob, validateSearchJobs, validateUpdateJob } from '@modules/jobs/validations/validateJob'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureCompanyRole } from '../middleware/ensureCompanyRole'
import { ensureUserRole } from '../middleware/ensureUserRole'

const router = Router()

const jobController = container.resolve(JobController)

router.post('/', ensureAuthenticated, ensureCompanyRole, validateJob, jobController.create.bind(jobController))
router.post('/search', ensureAuthenticated, validateSearchJobs, jobController.searchAll.bind(jobController))
router.post('/:job_id', ensureAuthenticated, ensureUserRole, validateApplyToJob, jobController.apply.bind(jobController))
router.get('/:id', ensureAuthenticated, jobController.getById.bind(jobController))
router.patch('/:job_id', ensureAuthenticated, ensureCompanyRole, validateUpdateJob, jobController.update.bind(jobController))
router.delete('/:job_id', ensureAuthenticated, ensureCompanyRole, jobController.delete.bind(jobController))

export default router
