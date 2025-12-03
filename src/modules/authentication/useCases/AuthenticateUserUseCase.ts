import { config } from '@config/index'
import { UnauthorizedError } from '@shared/errors'
import { AppError } from '@shared/errors/app-error'
import { logService } from '@shared/services/LogService'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IAuthenticateUserDTO } from '../dtos/IUserSessionDTO'
import { IUserRepository } from '../repositories/interfaces/IUserRepository'
import { IUserSessionRepository } from '../repositories/interfaces/IUserSessionRepository'

interface IAuthenticateUserResponse {
  token: string
  expires_in: number
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserSessionRepository') private userSessionRepository: IUserSessionRepository,
  ) {}

  async execute(data: IAuthenticateUserDTO): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByUsername(data.username)

    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const passwordMatch = await compare(data.password, user.password)

    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const expiresInSeconds = this.parseExpiresIn(config.auth.expires_in_token)
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000)

    const token = sign(
      {
        username: user.username,
        role: user.role,
      },
      config.auth.secret_token,
      {
        subject: String(user.id),
        expiresIn: Math.floor(expiresAt.getTime() / 1000),
        algorithm: 'HS256',
      },
    )

    await this.userSessionRepository.create({
      user_id: user.id,
      token,
      expires_at: expiresAt,
    })

    logService.info(`Usuário logado: ${user.name} (@${user.username})`, {
      userId: user.id,
      role: user.role,
    })

    return {
      token,
      expires_in: expiresInSeconds,
    }
  }

  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([mhd])$/)

    if (!match) {
      throw new AppError('Invalid expires_in format')
    }

    const value = parseInt(match[1], 10)
    const unit = match[2]

    switch (unit) {
      case 'm':
        return value * 60
      case 'h':
        return value * 60 * 60
      case 'd':
        return value * 60 * 60 * 24
      default:
        throw new AppError('Invalid time unit')
    }
  }
}

export { AuthenticateUserUseCase }
