import { inject, injectable } from 'tsyringe'

import { NotFoundError } from '@shared/errors'
import { ForbiddenError } from '@shared/errors/http'

import { IUserRepository } from '@modules/authentication/repositories/interfaces/IUserRepository'
import { ICompanyRepository } from '@modules/companies/repositories/interfaces/ICompanyRepository'
import { ISendFeedbackDTO } from '../dtos/ISendFeedbackDTO'
import { IJobsRepository } from '../repositories/interfaces/IJobsRepository'

@injectable()
class SendFeedbackUseCase {
  constructor(
    @inject('JobsRepository')
    private jobsRepository: IJobsRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(job_id: number, company_id: number, data: ISendFeedbackDTO): Promise<void> {
    const job = await this.jobsRepository.findById(job_id)
    if (!job) {
      throw new NotFoundError('Vaga não encontrada')
    }

    const company = await this.companyRepository.findById(company_id)
    if (!company || company.user_id !== job.company_id) {
      throw new ForbiddenError()
    }

    const user = await this.userRepository.findById(data.user_id)
    if (!user) {
      throw new NotFoundError('Usuário não encontrado')
    }

    await this.jobsRepository.sendFeedback({
      job_id,
      user_id: data.user_id,
      message: data.message,
    })
  }
}

export { SendFeedbackUseCase }
