import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { ICreateJobDTO } from '../dtos/ICreateJobDTO'
import { IJobDetailsDTO } from '../dtos/IJobDetailsDTO'
import { IJobFiltersDTO } from '../dtos/IJobFiltersDTO'
import { IJobListDTO } from '../dtos/IJobListDTO'
import { IJob } from '../models/IJob'
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
      .join('companies as c', 'j.company_id', 'c.id')
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
        'j.salary',
      )
      .where('j.id', id)
      .first()

    return job
  }

  async findByCompanyId(company_id: number): Promise<IJob[]> {
    const jobs = await this.db('jobs').where({ company_id })

    return jobs
  }

  async findByCompanyIdWithFilters(company_id: number, filters: IJobFiltersDTO): Promise<IJobListDTO[]> {
    let query = this.db('jobs as j')
      .join('companies as c', 'j.company_id', 'c.id')
      .join('users as u', 'c.user_id', 'u.id')
      .select(
        'j.id as job_id',
        'j.title',
        'j.area',
        'u.name as company',
        'j.description',
        'j.state',
        'j.city',
        'j.salary',
        'u.email as contact',
      )
      .where('u.id', company_id)

    if (filters.title) {
      query = query.whereILike('j.title', `%${filters.title}%`)
    }

    if (filters.area) {
      query = query.where('j.area', filters.area)
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

    return jobs
  }

  async searchAllWithFilters(filters: IJobFiltersDTO): Promise<IJobListDTO[]> {
    let query = this.db('jobs as j')
      .join('companies as c', 'j.company_id', 'c.id')
      .join('users as u', 'c.user_id', 'u.id')
      .select(
        'j.id as job_id',
        'j.title',
        'j.area',
        'u.name as company',
        'j.description',
        'j.state',
        'j.city',
        'j.salary',
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

    return jobs
  }
}

export { JobsRepository }
