import { Knex } from 'knex'
import { inject, injectable } from 'tsyringe'
import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO'
import { ICompany } from '../models/ICompany'
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
}

export { CompanyRepository }
