import { CompanyController } from '@modules/companies/controllers/CompanyController'
import { validateCompany } from '@modules/companies/validations/validateCompany'
import { Router } from 'express'
import { container } from 'tsyringe'

const router = Router()

const companyController = container.resolve(CompanyController)

router.post('/', validateCompany, companyController.create.bind(companyController))

export default router
