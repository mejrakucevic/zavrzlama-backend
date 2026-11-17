import { Router } from 'express'
import { getMe, login, logout, register } from '../controllers/auth.controller.js'
import { requireAuth } from '../middleware/auth.js'

// Rute za naloge. U app.js su "zakačene" na /api/auth
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', requireAuth, getMe) // requireAuth se izvršava PRE getMe

export default router
