import { RegisterUserUseCase } from '@modules/authentication/useCases/RegisterUserUseCase'
import { ConflictError } from '@shared/errors'
import { AppError } from '@shared/errors/app-error'
import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { ICreateCompanyUserDTO } from '../dtos/ICreateCompanyDTO'
import { ICompany } from '../models/ICompany'
import { ICompanyRepository } from '../repositories/interfaces/ICompanyRepository'

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('KnexConnection') private db: Knex,
    @inject('CompanyRepository') private companyRepository: ICompanyRepository,
    private registerUserUseCase: RegisterUserUseCase,
  ) {}

  async execute(data: ICreateCompanyUserDTO): Promise<ICompany> {
    const companyProfile = await this.db.transaction(async (trx) => {
      const companyExists = await this.companyRepository.findByName(data.name, trx)

      if (companyExists) {
        throw new ConflictError('Company name already exists')
      }

      const newUser = await this.registerUserUseCase.execute(
        {
          name: data.name,
          username: data.username,
          password: data.password,
          phone: data.phone,
          email: data.email,
          role: 'company',
        },
        trx,
      )

      if (!newUser.id) {
        throw new AppError('User not created', 500)
      }

      const newCompany = await this.companyRepository.create(
        {
          user_id: newUser.id,
          business: data.business,
          street: data.street,
          number: data.number,
          city: data.city,
          state: data.state,
        },
        trx,
      )

      if (!newCompany.id) {
        throw new AppError('Company not created', 500)
      }

      return newCompany
    })

    return companyProfile
  }
}

export { CreateCompanyUseCase }
