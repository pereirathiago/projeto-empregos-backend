import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ICreateCompanyUserDTO } from '../dtos/ICreateCompanyDTO'
import { CreateCompanyUseCase } from '../useCases/CreateCompanyUseCase'

class CompanyController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body as ICreateCompanyUserDTO

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase)

    await createCompanyUseCase.execute(data)

    return res.status(200).json({ message: 'Created' })
  }
}

export { CompanyController }
