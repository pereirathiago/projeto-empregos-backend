import { IApplyToJobDTO } from '@modules/jobs/dtos/IApplyToJobDTO'
import { ICreateJobDTO } from '@modules/jobs/dtos/ICreateJobDTO'
import { IJobCandidateDTO } from '@modules/jobs/dtos/IJobCandidateDTO'
import { IJobDetailsDTO } from '@modules/jobs/dtos/IJobDetailsDTO'
import { IJobFiltersDTO } from '@modules/jobs/dtos/IJobFiltersDTO'
import { IJobListDTO } from '@modules/jobs/dtos/IJobListDTO'
import { ISendFeedbackDTO } from '@modules/jobs/dtos/ISendFeedbackDTO'
import { IUpdateJobDTO } from '@modules/jobs/dtos/IUpdateJobDTO'
import { IUserApplicationDTO } from '@modules/jobs/dtos/IUserApplicationDTO'
import { IJob } from '@modules/jobs/models/IJob'
import { IJobApplication } from '@modules/jobs/models/IJobApplication'

interface IJobsRepository {
  create(data: ICreateJobDTO): Promise<IJob>
  findById(id: number): Promise<IJob | undefined>
  findByIdWithDetails(id: number): Promise<IJobDetailsDTO | undefined>
  findByCompanyId(company_id: number): Promise<IJob[]>
  findByCompanyIdWithFilters(company_id: number, filters: IJobFiltersDTO): Promise<IJobListDTO[]>
  searchAllWithFilters(filters: IJobFiltersDTO): Promise<IJobListDTO[]>
  update(id: number, data: IUpdateJobDTO): Promise<IJob>
  delete(id: number): Promise<void>
  applyToJob(data: IApplyToJobDTO): Promise<IJobApplication>
  sendFeedback(data: ISendFeedbackDTO): Promise<void>
  getUserApplications(user_id: number): Promise<IUserApplicationDTO[]>
  getJobCandidates(job_id: number): Promise<IJobCandidateDTO[]>
}

export { IJobsRepository }
