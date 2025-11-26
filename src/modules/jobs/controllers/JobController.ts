import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateJobUseCase } from '../useCases/CreateJobUseCase'

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
}

export { JobController }
