import { Router } from 'express'
import { checkGuess, getToday } from '../controllers/wordGame.controller.js'

// Sve rute za igru "Pogodi reč". U app.js su "zakačene" na /api/games/word
const router = Router()

router.get('/today', getToday)
router.post('/guess', checkGuess)

export default router
