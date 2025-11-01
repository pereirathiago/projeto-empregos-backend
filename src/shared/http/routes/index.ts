import { Router } from 'express'
import authRoutes from './authRoutes'
import companyRoutes from './companyRoutes'
import helloWorldRoutes from './helloWorldRoutes'
import jobSeekersRoutes from './jobSeekerRoutes'

const router = Router()

router.use('/', authRoutes)
router.use('/hello-world', helloWorldRoutes)
router.use('/users', jobSeekersRoutes)
router.use('/companies', companyRoutes)

export default router
