import { IUpdateJobDTO } from '@modules/jobs/dtos/IUpdateJobDTO'
import { IJob } from '@modules/jobs/models/IJob'
import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { ForbiddenError, NotFoundError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateJobUseCase {
  constructor(@inject('JobsRepository') private jobsRepository: IJobsRepository) {}

  async execute(job_id: number, user_id: string, data: IUpdateJobDTO): Promise<IJob> {
    const job = await this.jobsRepository.findById(job_id)

    if (!job) {
      throw new NotFoundError('Job not found')
    }

    if (job.company_id !== Number(user_id)) {
      throw new ForbiddenError()
    }

    const updatedJob = await this.jobsRepository.update(job_id, data)

    return updatedJob
  }
}

export { UpdateJobUseCase }
