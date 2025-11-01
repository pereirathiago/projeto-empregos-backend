import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO'
import { IUpdateCompanyDTO } from '../dtos/IUpdateCompanyDTO'
import { ICompany, IUserCompany } from '../models/ICompany'
import { ICompanyRepository } from './interfaces/ICompanyRepository'

@injectable()
class CompanyRepository implements ICompanyRepository {
  constructor(@inject('KnexConnection') private db: Knex) {}

  async create(companyData: ICreateCompanyDTO, trx: Knex.Transaction): Promise<ICompany> {
    const [createdCompany] = await trx('companies')
      .insert({
        user_id: companyData.user_id,
        business: companyData.business,
        street: companyData.street,
        number: companyData.number,
        city: companyData.city,
        state: companyData.state,
      })
      .returning('*')

    return createdCompany
  }

  async findByName(name: string, trx?: Knex.Transaction): Promise<ICompany | undefined> {
    const connection = trx || this.db

    const company = await connection('companies as c')
      .join('users as u', 'c.user_id', 'u.id')
      .select('c.*')
      .where('u.name', name)
      .first()

    return company
  }

  async getByUserId(userId: number, trx?: Knex.Transaction): Promise<IUserCompany | undefined> {
    const connection = trx || this.db

    const company = await connection('companies as c')
      .join('users as u', 'c.user_id', 'u.id')
      .select('u.name', 'u.username', 'u.email', 'u.phone', 'c.business', 'c.street', 'c.number', 'c.city', 'c.state')
      .where('u.id', userId)
      .first()

    return company
  }

  async update(userId: number, updateData: IUpdateCompanyDTO, trx: Knex.Transaction): Promise<ICompany> {
    const connection = trx || this.db

    const [updatedCompany] = await connection('companies')
      .where({ user_id: userId })
      .update({
        business: updateData.business,
        street: updateData.street,
        number: updateData.number,
        city: updateData.city,
        state: updateData.state,
      })
      .returning('*')

    return updatedCompany
  }
}

export { CompanyRepository }
