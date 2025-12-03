import { inject, injectable } from 'tsyringe'

import { ForbiddenError } from '@shared/errors/http'

import { IUserApplicationDTO } from '../dtos/IUserApplicationDTO'
import { IJobsRepository } from '../repositories/interfaces/IJobsRepository'

@injectable()
class GetUserApplicationsUseCase {
  constructor(
    @inject('JobsRepository')
    private jobsRepository: IJobsRepository,
  ) {}

  async execute(user_id: number, authenticated_user_id: number): Promise<IUserApplicationDTO[]> {
    if (user_id !== authenticated_user_id) {
      throw new ForbiddenError()
    }

    const applications = await this.jobsRepository.getUserApplications(user_id)

    return applications
  }
}

export { GetUserApplicationsUseCase }
