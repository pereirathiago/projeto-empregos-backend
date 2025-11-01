import { ForbiddenError } from '@shared/errors'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ICreateCompanyUserDTO } from '../dtos/ICreateCompanyDTO'
import { IUpdateCompanyUserDTO } from '../dtos/IUpdateCompanyDTO'
import { CreateCompanyUseCase } from '../useCases/CreateCompanyUseCase'
import { GetCompanyUseCase } from '../useCases/GetCompanyUseCase'
import { UpdateCompanyUseCase } from '../useCases/UpdateCompanyUseCase'

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

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user = req.user
    const data = req.body as IUpdateCompanyUserDTO

    if (user.id !== id) {
      throw new ForbiddenError()
    }

    const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase)

    await updateCompanyUseCase.execute(Number(id), data)

    return res.status(200).json({ message: 'Updated' })
  }
}

export { CompanyController }
