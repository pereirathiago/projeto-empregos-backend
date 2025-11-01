import { ICreateCompanyDTO } from '@modules/companies/dtos/ICreateCompanyDTO'
import { IUpdateCompanyDTO } from '@modules/companies/dtos/IUpdateCompanyDTO'
import { ICompany, IUserCompany } from '@modules/companies/models/ICompany'
import { Knex } from 'knex'

interface ICompanyRepository {
  create(companyData: ICreateCompanyDTO, trx: Knex.Transaction): Promise<ICompany>
  findByName(name: string, trx?: Knex.Transaction): Promise<ICompany | undefined>
  getByUserId(userId: number, trx?: Knex.Transaction): Promise<IUserCompany | undefined>
  update(userId: number, updateData: IUpdateCompanyDTO, trx: Knex.Transaction): Promise<ICompany>
  deleteByUserId(userId: number, trx?: Knex.Transaction): Promise<void>
}

export { ICompanyRepository }
