import { ICreateJobDTO } from '@modules/jobs/dtos/ICreateJobDTO'
import { IJob } from '@modules/jobs/models/IJob'
import { IJobsRepository } from '@modules/jobs/repositories/interfaces/IJobsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateJobUseCase {
  constructor(@inject('JobsRepository') private jobsRepository: IJobsRepository) {}

  async execute(data: ICreateJobDTO): Promise<IJob> {
    const newJob = await this.jobsRepository.create(data)

    return newJob
  }
}

export { CreateJobUseCase }
