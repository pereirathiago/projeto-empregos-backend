import { IJobDetailsDTO } from '@modules/jobs/dtos/IJobDetailsDTO'
import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { NotFoundError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetJobDetailsUseCase {
  constructor(@inject('JobsRepository') private jobsRepository: IJobsRepository) {}

  async execute(job_id: number): Promise<IJobDetailsDTO> {
    const job = await this.jobsRepository.findByIdWithDetails(job_id)

    if (!job) {
      throw new NotFoundError('Job not found')
    }

    return job
  }
}

export { GetJobDetailsUseCase }
