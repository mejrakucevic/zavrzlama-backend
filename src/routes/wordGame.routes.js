import { Router } from 'express'
import { checkGuess, getToday } from '../controllers/wordGame.controller.js'
import { requireAuth } from '../middleware/auth.js'

// Sve rute za igru "Pogodi reč". U app.js su "zakačene" na /api/games/word
const router = Router()

// Za igranje je potrebna prijava: requireAuth važi za SVE rute ispod ovog reda
router.use(requireAuth)

router.get('/today', getToday)
router.post('/guess', checkGuess)

export default router
