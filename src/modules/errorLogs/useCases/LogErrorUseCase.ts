import { ICreateErrorLogDTO } from '@modules/errorLogs/dtos/ICreateErrorLogDTO'
import { IErrorLog } from '@modules/errorLogs/models/IErrorLog'
import { IErrorLogRepository } from '@modules/errorLogs/repositories/interfaces/IErrorLogRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class LogErrorUseCase {
  constructor(@inject('ErrorLogRepository') private errorLogRepository: IErrorLogRepository) {}

  async execute(data: ICreateErrorLogDTO): Promise<IErrorLog> {
    const errorLog = await this.errorLogRepository.create(data)

    return errorLog
  }
}

export { LogErrorUseCase }
