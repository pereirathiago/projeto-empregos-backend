import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { ForbiddenError, NotFoundError } from '@shared/errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteJobUseCase {
  constructor(@inject('JobsRepository') private jobsRepository: IJobsRepository) {}

  async execute(job_id: number, user_id: string): Promise<void> {
    const job = await this.jobsRepository.findById(job_id)

    if (!job) {
      throw new NotFoundError('Job not found')
    }

    if (job.company_id !== Number(user_id)) {
      throw new ForbiddenError()
    }

    await this.jobsRepository.delete(job_id)
  }
}

export { DeleteJobUseCase }
