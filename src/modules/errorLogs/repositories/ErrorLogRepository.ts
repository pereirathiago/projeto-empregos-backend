import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { ICreateErrorLogDTO } from '../dtos/ICreateErrorLogDTO'
import { IErrorLog } from '../models/IErrorLog'
import { IErrorLogRepository } from './interfaces/IErrorLogRepository'

@injectable()
class ErrorLogRepository implements IErrorLogRepository {
  constructor(@inject('KnexConnection') private db: Knex) {}

  async create(data: ICreateErrorLogDTO): Promise<IErrorLog> {
    const [errorLog] = await this.db('error_logs')
      .insert({
        user_id: data.user_id,
        message: data.message,
      })
      .returning('*')

    console.log('[ERROR LOG]', {
      user_id: errorLog.user_id,
      message: errorLog.message,
      timestamp: errorLog.created_at,
    })

    return errorLog
  }
}

export { ErrorLogRepository }
