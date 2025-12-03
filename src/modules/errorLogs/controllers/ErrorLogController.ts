import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { LogErrorUseCase } from '../useCases/LogErrorUseCase'

class ErrorLogController {
  async create(req: Request, res: Response): Promise<Response> {
    const user = req.user
    const { message } = req.body

    const logErrorUseCase = container.resolve(LogErrorUseCase)

    await logErrorUseCase.execute({
      user_id: Number(user.id),
      message,
    })

    return res.status(200).json({ message: 'Error logged successfully' })
  }
}

export { ErrorLogController }
