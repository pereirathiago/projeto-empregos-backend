import { ForbiddenError } from '@shared/errors'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IJobFiltersDTO } from '../dtos/IJobFiltersDTO'
import { CreateJobUseCase } from '../useCases/CreateJobUseCase'
import { GetJobDetailsUseCase } from '../useCases/GetJobDetailsUseCase'
import { GetJobsByCompanyUseCase } from '../useCases/GetJobsByCompanyUseCase'
import { SearchAllJobsUseCase } from '../useCases/SearchAllJobsUseCase'
import { UpdateJobUseCase } from '../useCases/UpdateJobUseCase'

class JobController {
  async create(req: Request, res: Response): Promise<Response> {
    const user = req.user
    const data = req.body

    const createJobUseCase = container.resolve(CreateJobUseCase)

    await createJobUseCase.execute({
      company_id: Number(user.id),
      title: data.title,
      area: data.area,
      description: data.description,
      state: data.state,
      city: data.city,
      salary: data.salary,
    })

    return res.status(201).json({ message: 'Created' })
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const getJobDetailsUseCase = container.resolve(GetJobDetailsUseCase)

    const job = await getJobDetailsUseCase.execute(Number(id))

    return res.status(200).json(job)
  }

  async getByCompanyId(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.params
    const user = req.user
    const filters: IJobFiltersDTO[] = req.body.filters || []

    if (user.id != company_id) {
      throw new ForbiddenError()
    }

    const getJobsByCompanyUseCase = container.resolve(GetJobsByCompanyUseCase)

    const jobs = await getJobsByCompanyUseCase.execute(Number(company_id), user.id, filters[0] || {})

    return res.status(200).json({ items: jobs })
  }

  async searchAll(req: Request, res: Response): Promise<Response> {
    const filters: IJobFiltersDTO[] = req.body.filters || []
    const searchAllJobsUseCase = container.resolve(SearchAllJobsUseCase)

    const jobs = await searchAllJobsUseCase.execute(filters[0] || {})

    return res.status(200).json({ items: jobs })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { job_id } = req.params
    const user = req.user
    const data = req.body

    const updateJobUseCase = container.resolve(UpdateJobUseCase)

    await updateJobUseCase.execute(Number(job_id), user.id, {
      title: data.title,
      area: data.area,
      description: data.description,
      state: data.state,
      city: data.city,
      salary: data.salary,
    })

    return res.status(200).json({ message: 'Job updated successfully' })
  }
}

export { JobController }
