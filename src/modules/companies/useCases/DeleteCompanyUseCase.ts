import { IUserRepository } from '@modules/authentication/repositories/interfaces/IUserRepository'
import { NotFoundError } from '@shared/errors'
import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { ICompanyRepository } from '../repositories/interfaces/ICompanyRepository'

@injectable()
class DeleteCompanyUseCase {
  constructor(
    @inject('KnexConnection') private db: Knex,
    @inject('CompanyRepository') private companyRepository: ICompanyRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(userId: number): Promise<void> {
    await this.db.transaction(async (trx) => {
      const user = await this.userRepository.findById(userId, trx)

      if (!user) {
        throw new NotFoundError('User not found')
      }

      const company = await this.companyRepository.getByUserId(userId, trx)

      if (!company) {
        throw new NotFoundError('Company not found')
      }

      // const activeJobs = await this.jobRepository.countActiveJobsByCompanyId(userId, trx)
      // if (activeJobs > 0) {
      //   throw new ConflictError('Cannot delete company with active jobs')
      // }

      await this.companyRepository.deleteByUserId(userId, trx)

      await this.userRepository.delete(userId, trx)
    })
  }
}

export { DeleteCompanyUseCase }
