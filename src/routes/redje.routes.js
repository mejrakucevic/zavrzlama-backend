import { Router } from 'express'
import { getToday, nextQuestion, submitAnswer } from '../controllers/redje.controller.js'
import { requireAuth } from '../middleware/auth.js'

// Rute za igru REĐE!. U app.js su "zakačene" na /api/games/redje
const router = Router()

router.use(requireAuth)

router.get('/today', getToday)
router.post('/next', nextQuestion)
router.post('/answer', submitAnswer)

export default router
