import { Router } from 'express'
import authRoutes from './authRoutes'
import companyRoutes from './companyRoutes'
import errorRoutes from './errorRoutes'
import healthRoutes from './healthRoutes'
import helloWorldRoutes from './helloWorldRoutes'
import jobRoutes from './jobRoutes'
import jobSeekersRoutes from './jobSeekerRoutes'

const router = Router()

router.use('/', authRoutes)
router.use('/', healthRoutes)
router.use('/hello-world', helloWorldRoutes)
router.use('/users', jobSeekersRoutes)
router.use('/companies', companyRoutes)
router.use('/jobs', jobRoutes)
router.use('/error', errorRoutes)

export default router
