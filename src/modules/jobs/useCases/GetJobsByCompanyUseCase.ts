import { ICompanyRepository } from '@modules/companies/repositories/interfaces/ICompanyRepository'
import { IJobFiltersDTO } from '@modules/jobs/dtos/IJobFiltersDTO'
import { IJobListDTO } from '@modules/jobs/dtos/IJobListDTO'
import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { NotFoundError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetJobsByCompanyUseCase {
  constructor(
    @inject('JobsRepository') private jobsRepository: IJobsRepository,
    @inject('CompanyRepository') private companyRepository: ICompanyRepository,
  ) {}

  async execute(company_id: number, user_id: string, filters: IJobFiltersDTO): Promise<IJobListDTO[]> {
    const company = await this.companyRepository.findById(company_id)

    if (!company) {
      throw new NotFoundError('Job not found')
    }

    const jobs = await this.jobsRepository.findByCompanyIdWithFilters(company_id, filters)

    if (jobs.length === 0) {
      throw new NotFoundError('Job not found')
    }

    return jobs
  }
}

export { GetJobsByCompanyUseCase }
