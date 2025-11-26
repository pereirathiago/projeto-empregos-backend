import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { ICreateJobDTO } from '../dtos/ICreateJobDTO'
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

  async findByCompanyId(company_id: number): Promise<IJob[]> {
    const jobs = await this.db('jobs').where({ company_id })

    return jobs
  }
}

export { JobsRepository }
