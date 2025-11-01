import { CompanyController } from '@modules/companies/controllers/CompanyController'
import { validateCompany } from '@modules/companies/validations/validateCompany'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureCompanyRole } from '../middleware/ensureCompanyRole'

const router = Router()

const companyController = container.resolve(CompanyController)

router.post('/', validateCompany, companyController.create.bind(companyController))
router.get('/:id', ensureAuthenticated, ensureCompanyRole, companyController.getByUserId.bind(companyController))

export default router
