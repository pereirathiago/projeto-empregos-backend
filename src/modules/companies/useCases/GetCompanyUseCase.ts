import { NotFoundError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'
import { IUserCompany } from '../models/ICompany'
import { ICompanyRepository } from '../repositories/interfaces/ICompanyRepository'

@injectable()
class GetCompanyUseCase {
  constructor(@inject('CompanyRepository') private companyRepository: ICompanyRepository) {}

  async execute(id: number): Promise<IUserCompany> {
    const company = await this.companyRepository.getByUserId(id)

    if (!company) {
      throw new NotFoundError('Company not found')
    }

    return company
  }
}

export { GetCompanyUseCase }
