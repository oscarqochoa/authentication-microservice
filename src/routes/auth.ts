import { Router } from 'express'
import { TokenValidation } from '../libs/verifyToken';

const router: Router = Router();

// Controllers
import { signup, signin, profile } from '../controllers/auth.controller'

router.post('/signup', signup)
router.post('/signin', signin)

router.get('/profile', TokenValidation, profile)

export default router;