import { ICreateJobDTO } from '@modules/jobs/dtos/ICreateJobDTO'
import { IJobDetailsDTO } from '@modules/jobs/dtos/IJobDetailsDTO'
import { IJobFiltersDTO } from '@modules/jobs/dtos/IJobFiltersDTO'
import { IJobListDTO } from '@modules/jobs/dtos/IJobListDTO'
import { IUpdateJobDTO } from '@modules/jobs/dtos/IUpdateJobDTO'
import { IJob } from '@modules/jobs/models/IJob'

interface IJobsRepository {
  create(data: ICreateJobDTO): Promise<IJob>
  findById(id: number): Promise<IJob | undefined>
  findByIdWithDetails(id: number): Promise<IJobDetailsDTO | undefined>
  findByCompanyId(company_id: number): Promise<IJob[]>
  findByCompanyIdWithFilters(company_id: number, filters: IJobFiltersDTO): Promise<IJobListDTO[]>
  searchAllWithFilters(filters: IJobFiltersDTO): Promise<IJobListDTO[]>
  update(id: number, data: IUpdateJobDTO): Promise<IJob>
}

export { IJobsRepository }
