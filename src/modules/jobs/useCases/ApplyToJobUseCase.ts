import { IApplyToJobDTO } from '@modules/jobs/dtos/IApplyToJobDTO'
import { IJobApplication } from '@modules/jobs/models/IJobApplication'
import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { NotFoundError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class ApplyToJobUseCase {
  constructor(@inject('JobsRepository') private jobsRepository: IJobsRepository) {}

  async execute(data: IApplyToJobDTO): Promise<IJobApplication> {
    const job = await this.jobsRepository.findById(data.job_id)

    if (!job) {
      throw new NotFoundError('Job not found')
    }

    const application = await this.jobsRepository.applyToJob(data)

    return application
  }
}

export { ApplyToJobUseCase }
