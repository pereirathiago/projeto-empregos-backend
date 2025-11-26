import { ICreateJobDTO } from '@modules/jobs/dtos/ICreateJobDTO'
import { IJob } from '@modules/jobs/models/IJob'

interface IJobsRepository {
  create(data: ICreateJobDTO): Promise<IJob>
  findById(id: number): Promise<IJob | undefined>
  findByCompanyId(company_id: number): Promise<IJob[]>
}

export { IJobsRepository }
