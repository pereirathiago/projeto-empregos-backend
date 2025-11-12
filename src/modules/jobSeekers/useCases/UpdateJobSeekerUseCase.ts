import { UpdateUserUseCase } from '@modules/authentication/useCases/UpdateUserUseCase'
import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { IUpdateJobSeekerUserDTO } from '../dtos/IUpdateJobSeekerDTO'
import { IJobSeeker } from '../models/IJobSeeker'
import { IJobSeekerRepository } from '../repositories/interfaces/IJobSeekerRepository'

@injectable()
class UpdateJobSeekerUseCase {
  constructor(
    @inject('KnexConnection') private db: Knex,
    @inject('JobSeekerRepository') private jobSeekerRepository: IJobSeekerRepository,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async execute(userId: number, data: IUpdateJobSeekerUserDTO): Promise<IJobSeeker> {
    const jobSeekerProfile = await this.db.transaction(async (trx) => {
      const updateUserData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }

      if (!updateUserData.password || updateUserData.password === '') {
        delete updateUserData.password
      }

      const updateUser = await this.updateUserUseCase.execute(userId, updateUserData as any, trx)

      const updatedJobSeeker = await this.jobSeekerRepository.update(
        userId,
        {
          experience: data.experience,
          education: data.education,
        },
        trx,
      )

      return updatedJobSeeker
    })

    return jobSeekerProfile
  }
}

export { UpdateJobSeekerUseCase }
