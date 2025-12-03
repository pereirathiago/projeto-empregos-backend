import { IJobFiltersDTO } from '@modules/jobs/dtos/IJobFiltersDTO'
import { IJobListDTO } from '@modules/jobs/dtos/IJobListDTO'
import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { NotFoundError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchAllJobsUseCase {
  constructor(@inject('JobsRepository') private jobsRepository: IJobsRepository) {}

  async execute(filters: IJobFiltersDTO): Promise<IJobListDTO[]> {
    console.log(filters.salary_range)
    const jobs = await this.jobsRepository.searchAllWithFilters(filters)

    if (jobs.length === 0) {
      throw new NotFoundError('Job not found')
    }

    return jobs
  }
}

export { SearchAllJobsUseCase }
