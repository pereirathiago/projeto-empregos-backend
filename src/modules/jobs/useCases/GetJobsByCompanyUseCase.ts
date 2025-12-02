import { IJobFiltersDTO } from '@modules/jobs/dtos/IJobFiltersDTO'
import { IJobListDTO } from '@modules/jobs/dtos/IJobListDTO'
import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetJobsByCompanyUseCase {
  constructor(@inject('JobsRepository') private jobsRepository: IJobsRepository) {}

  async execute(company_id: number, filters: IJobFiltersDTO): Promise<IJobListDTO[]> {
    const jobs = await this.jobsRepository.findByCompanyIdWithFilters(company_id, filters)

    return jobs
  }
}

export { GetJobsByCompanyUseCase }
