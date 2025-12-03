import { inject, injectable } from 'tsyringe'

import { NotFoundError } from '@shared/errors'
import { ForbiddenError } from '@shared/errors/http'

import { ICompanyRepository } from '@modules/companies/repositories/interfaces/ICompanyRepository'
import { IJobCandidateDTO } from '../dtos/IJobCandidateDTO'
import { IJobsRepository } from '../repositories/interfaces/IJobsRepository'

@injectable()
class GetJobCandidatesUseCase {
  constructor(
    @inject('JobsRepository')
    private jobsRepository: IJobsRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(job_id: number, company_id: number): Promise<IJobCandidateDTO[]> {
    const job = await this.jobsRepository.findById(job_id)
    if (!job) {
      throw new NotFoundError('Vaga não encontrada')
    }

    const company = await this.companyRepository.findById(company_id)
    if (!company || company.user_id !== job.company_id) {
      throw new ForbiddenError()
    }

    const candidates = await this.jobsRepository.getJobCandidates(job_id)

    return candidates
  }
}

export { GetJobCandidatesUseCase }
