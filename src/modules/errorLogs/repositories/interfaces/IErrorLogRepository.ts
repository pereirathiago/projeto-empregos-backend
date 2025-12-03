import { ICreateErrorLogDTO } from '@modules/errorLogs/dtos/ICreateErrorLogDTO'
import { IErrorLog } from '@modules/errorLogs/models/IErrorLog'

interface IErrorLogRepository {
  create(data: ICreateErrorLogDTO): Promise<IErrorLog>
}

export { IErrorLogRepository }
