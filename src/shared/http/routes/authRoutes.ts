import { AuthController } from '@modules/authentication/controllers/AuthController'
import { UserController } from '@modules/authentication/controllers/UserController'
import { validateLogin } from '@modules/authentication/validations/validateLogin'
import { JobController } from '@modules/jobs/controllers/JobController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { ensureUserRole } from '../middleware/ensureUserRole'

const router = Router()

const registerUserController = container.resolve(UserController)
const authController = container.resolve(AuthController)
const jobController = container.resolve(JobController)

// router.post('/register', registerUserController.register.bind(registerUserController))
router.post('/login', validateLogin, authController.login.bind(authController))
router.post('/logout', ensureAuthenticated, authController.logout.bind(authController))
router.get('/users/:user_id/jobs', ensureAuthenticated, ensureUserRole, jobController.getUserApplications.bind(jobController))

export default router
