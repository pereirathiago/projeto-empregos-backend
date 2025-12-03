import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { IApplyToJobDTO } from '../dtos/IApplyToJobDTO'
import { ICreateJobDTO } from '../dtos/ICreateJobDTO'
import { IJobCandidateDTO } from '../dtos/IJobCandidateDTO'
import { IJobDetailsDTO } from '../dtos/IJobDetailsDTO'
import { IJobFiltersDTO } from '../dtos/IJobFiltersDTO'
import { IJobListDTO } from '../dtos/IJobListDTO'
import { ISendFeedbackDTO } from '../dtos/ISendFeedbackDTO'
import { IUpdateJobDTO } from '../dtos/IUpdateJobDTO'
import { IUserApplicationDTO } from '../dtos/IUserApplicationDTO'
import { IJob } from '../models/IJob'
import { IJobApplication } from '../models/IJobApplication'
import { IJobsRepository } from './interfaces/IJobsRepository'

@injectable()
class JobsRepository implements IJobsRepository {
  constructor(@inject('KnexConnection') private db: Knex) {}

  async create(data: ICreateJobDTO): Promise<IJob> {
    const [createdJob] = await this.db('jobs')
      .insert({
        company_id: data.company_id,
        title: data.title,
        area: data.area,
        description: data.description,
        state: data.state,
        city: data.city,
        salary: data.salary || null,
      })
      .returning('*')

    return createdJob
  }

  async findById(id: number): Promise<IJob | undefined> {
    const job = await this.db('jobs').where({ id }).first()

    return job
  }
  async findByIdWithDetails(id: number): Promise<IJobDetailsDTO | undefined> {
    const job = await this.db('jobs as j')
      .join('companies as c', 'j.company_id', 'c.user_id')
      .join('users as u', 'c.user_id', 'u.id')
      .select(
        'j.id as job_id',
        'j.title',
        'j.area',
        'j.description',
        'u.name as company',
        'j.state',
        'j.city',
        'u.email as contact',
        this.db.raw('CAST(j.salary AS DOUBLE PRECISION) as salary'),
      )
      .where('j.id', id)
      .first()

    if (!job) return undefined

    return {
      ...job,
      salary: job.salary !== null ? Number(job.salary) : null,
    }
  }

  async findByCompanyId(company_id: number): Promise<IJob[]> {
    const jobs = await this.db('jobs').where({ company_id })

    return jobs
  }

  async findByCompanyIdWithFilters(company_id: number, filters: IJobFiltersDTO): Promise<IJobListDTO[]> {
    let query = this.db('jobs as j')
      .join('companies as c', 'j.company_id', 'c.user_id')
      .join('users as u', 'c.user_id', 'u.id')
      .select(
        'j.id as job_id',
        'j.title',
        'j.area',
        'u.name as company',
        'j.description',
        'j.state',
        'j.city',
        this.db.raw('CAST(j.salary AS DOUBLE PRECISION) as salary'),
        'u.email as contact',
      )
      .where('j.company_id', company_id)

    if (filters.title) {
      query = query.whereILike('j.title', `%${filters.title}%`)
    }

    if (filters.area) {
      query = query.where('j.area', filters.area)
    }

    if (filters.company) {
      query = query.whereILike('u.name', `%${filters.company}%`)
    }

    if (filters.state) {
      query = query.where('j.state', filters.state.toUpperCase())
    }

    if (filters.city) {
      query = query.whereILike('j.city', `%${filters.city}%`)
    }

    if (filters.salary_range) {
      if (filters.salary_range.min !== null && filters.salary_range.min !== undefined) {
        query = query.where('j.salary', '>=', filters.salary_range.min)
      }
      if (filters.salary_range.max !== null && filters.salary_range.max !== undefined) {
        query = query.where('j.salary', '<=', filters.salary_range.max)
      }
    }

    const jobs = await query

    return jobs.map((job) => ({
      ...job,
      salary: job.salary !== null ? Number(job.salary) : null,
    }))
  }

  async searchAllWithFilters(filters: IJobFiltersDTO): Promise<IJobListDTO[]> {
    let query = this.db('jobs as j')
      .join('companies as c', 'j.company_id', 'c.user_id')
      .join('users as u', 'c.user_id', 'u.id')
      .select(
        'j.id as job_id',
        'j.title',
        'j.area',
        'u.name as company',
        'j.description',
        'j.state',
        'j.city',
        this.db.raw('CAST(j.salary AS DOUBLE PRECISION) as salary'),
        'u.email as contact',
      )

    if (filters.title) {
      query = query.whereILike('j.title', `%${filters.title}%`)
    }

    if (filters.area) {
      query = query.where('j.area', filters.area)
    }

    if (filters.company) {
      query = query.whereILike('u.name', `%${filters.company}%`)
    }

    if (filters.state) {
      query = query.where('j.state', filters.state.toUpperCase())
    }

    if (filters.city) {
      query = query.whereILike('j.city', `%${filters.city}%`)
    }

    if (filters.salary_range) {
      if (filters.salary_range.min !== null && filters.salary_range.min !== undefined) {
        query = query.where('j.salary', '>=', filters.salary_range.min)
      }
      if (filters.salary_range.max !== null && filters.salary_range.max !== undefined) {
        query = query.where('j.salary', '<=', filters.salary_range.max)
      }
    }

    const jobs = await query

    return jobs.map((job) => ({
      ...job,
      salary: job.salary !== null ? Number(job.salary) : null,
    }))
  }

  async update(id: number, data: IUpdateJobDTO): Promise<IJob> {
    const [updatedJob] = await this.db('jobs')
      .where({ id })
      .update({
        title: data.title,
        area: data.area,
        description: data.description,
        state: data.state,
        city: data.city,
        salary: data.salary || null,
        updated_at: this.db.fn.now(),
      })
      .returning('*')

    return updatedJob
  }

  async delete(id: number): Promise<void> {
    await this.db('jobs').where({ id }).delete()
  }

  async applyToJob(data: IApplyToJobDTO): Promise<IJobApplication> {
    const [application] = await this.db('job_applications')
      .insert({
        job_id: data.job_id,
        user_id: data.user_id,
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        education: data.education,
        experience: data.experience,
      })
      .returning('*')

    return application
  }

  async sendFeedback(data: ISendFeedbackDTO): Promise<void> {
    await this.db('job_applications').where({ job_id: data.job_id, user_id: data.user_id }).update({
      feedback: data.message,
      updated_at: this.db.fn.now(),
    })
  }

  async getUserApplications(user_id: number): Promise<IUserApplicationDTO[]> {
    const applications = await this.db('job_applications as ja')
      .join('jobs as j', 'ja.job_id', 'j.id')
      .join('companies as c', 'j.company_id', 'c.user_id')
      .join('users as u', 'c.user_id', 'u.id')
      .select(
        'j.id as job_id',
        'j.title',
        'j.area',
        'u.name as company',
        'j.description',
        'j.state',
        'j.city',
        this.db.raw('CAST(j.salary AS DOUBLE PRECISION) as salary'),
        'u.email as contact',
        'ja.feedback',
      )
      .where('ja.user_id', user_id)

    return applications.map((app) => ({
      ...app,
      salary: app.salary !== null ? Number(app.salary) : null,
    }))
  }

  async getJobCandidates(job_id: number): Promise<IJobCandidateDTO[]> {
    const candidates = await this.db('job_applications as ja')
      .select('ja.user_id', 'ja.name', 'ja.email', 'ja.phone', 'ja.education', 'ja.experience', 'ja.feedback')
      .where('ja.job_id', job_id)

    return candidates
  }
}

export { JobsRepository }
