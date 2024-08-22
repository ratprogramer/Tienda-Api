import { Router } from 'express'
import { userRegister, userLogin } from '../controllers/user.controller.js'

const router = Router()

router.post('/login', userLogin)
router.post('/register', userRegister)

export const usersRouter = router
