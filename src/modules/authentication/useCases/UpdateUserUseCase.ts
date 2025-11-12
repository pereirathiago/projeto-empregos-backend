import { NotFoundError } from '@shared/errors'
import { hash } from 'bcrypt'
import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { IUser } from '../models/IUser'
import { IUserRepository } from '../repositories/interfaces/IUserRepository'

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('KnexConnection') private db: Knex,
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(id: number, userData: IUpdateUserDTO, trx?: Knex.Transaction): Promise<Omit<IUser, 'password'>> {
    const user = await (trx || this.db).transaction(async (trx) => {
      const userExists = await this.userRepository.findById(id, trx)

      if (!userExists) {
        throw new NotFoundError('User not found')
      }

      const updateData: any = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      }

      if (userData.password && userData.password !== '') {
        updateData.password = await hash(userData.password, 8)
      } else {
        updateData.password = userExists.password
      }

      const newUser = await this.userRepository.update(id, updateData, trx)

      return newUser
    })

    delete user.password

    return user
  }
}

export { UpdateUserUseCase }
