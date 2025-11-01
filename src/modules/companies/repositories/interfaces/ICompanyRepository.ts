import { ICreateCompanyDTO } from '@modules/companies/dtos/ICreateCompanyDTO'
import { ICompany, IUserCompany } from '@modules/companies/models/ICompany'
import { Knex } from 'knex'

interface ICompanyRepository {
  create(companyData: ICreateCompanyDTO, trx: Knex.Transaction): Promise<ICompany>
  findByName(name: string, trx?: Knex.Transaction): Promise<ICompany | undefined>
}

export { ICompanyRepository }
