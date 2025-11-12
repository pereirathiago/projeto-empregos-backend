import { UpdateUserUseCase } from '@modules/authentication/useCases/UpdateUserUseCase'
import { ConflictError } from '@shared/errors'
import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { IUpdateCompanyUserDTO } from '../dtos/IUpdateCompanyDTO'
import { ICompany } from '../models/ICompany'
import { ICompanyRepository } from '../repositories/interfaces/ICompanyRepository'

@injectable()
class UpdateCompanyUseCase {
  constructor(
    @inject('KnexConnection') private db: Knex,
    @inject('CompanyRepository') private companyRepository: ICompanyRepository,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async execute(userId: number, data: IUpdateCompanyUserDTO): Promise<ICompany> {
    const companyProfile = await this.db.transaction(async (trx) => {
      const companyWithSameName = await this.companyRepository.findByName(data.name, trx)

      if (companyWithSameName && companyWithSameName.user_id !== userId) {
        throw new ConflictError('Company name already exists')
      }

      const updateUserData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }

      if (!updateUserData.password || updateUserData.password === '') {
        delete updateUserData.password
      }

      const updateUser = await this.updateUserUseCase.execute(userId, updateUserData as any, trx)

      const updatedCompany = await this.companyRepository.update(
        userId,
        {
          business: data.business,
          street: data.street,
          number: data.number,
          city: data.city,
          state: data.state,
        },
        trx,
      )

      return updatedCompany
    })

    return companyProfile
  }
}

export { UpdateCompanyUseCase }
