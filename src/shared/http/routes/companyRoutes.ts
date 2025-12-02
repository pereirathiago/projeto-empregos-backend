import { CompanyController } from '@modules/companies/controllers/CompanyController'
import { validateCompany, validateUpdateCompany } from '@modules/companies/validations/validateCompany'
import { JobController } from '@modules/jobs/controllers/JobController'
import { validateJobFilters } from '@modules/jobs/validations/validateJob'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureCompanyRole } from '../middleware/ensureCompanyRole'

const router = Router()

const companyController = container.resolve(CompanyController)
const jobController = container.resolve(JobController)

router.post('/', validateCompany, companyController.create.bind(companyController))
router.get('/:id', ensureAuthenticated, ensureCompanyRole, companyController.getByUserId.bind(companyController))
router.patch(
  '/:id',
  ensureAuthenticated,
  ensureCompanyRole,
  validateUpdateCompany,
  companyController.update.bind(companyController),
)
router.delete('/:id', ensureAuthenticated, ensureCompanyRole, companyController.delete.bind(companyController))

router.post(
  '/:company_id/jobs',
  ensureAuthenticated,
  ensureCompanyRole,
  validateJobFilters,
  jobController.getByCompanyId.bind(jobController),
)

export default router
