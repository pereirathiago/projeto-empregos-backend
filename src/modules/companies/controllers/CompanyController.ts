import { ForbiddenError } from '@shared/errors'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ICreateCompanyUserDTO } from '../dtos/ICreateCompanyDTO'
import { CreateCompanyUseCase } from '../useCases/CreateCompanyUseCase'
import { GetCompanyUseCase } from '../useCases/GetCompanyUseCase'

class CompanyController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body as ICreateCompanyUserDTO

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase)

    await createCompanyUseCase.execute(data)

    return res.status(200).json({ message: 'Created' })
  }

  async getByUserId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user = req.user

    if (user.id !== id) {
      throw new ForbiddenError()
    }

    const getCompanyUseCase = container.resolve(GetCompanyUseCase)

    const company = await getCompanyUseCase.execute(Number(id))

    return res.status(200).json(company)
  }
}

export { CompanyController }
