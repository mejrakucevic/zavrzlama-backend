import { Router } from 'express'
import { getLeaderboard } from '../controllers/leaderboard.controller.js'
import { optionalAuth } from '../middleware/auth.js'

// Rang lista je javna; optionalAuth samo prepozna prijavljenog korisnika
const router = Router()

router.get('/', optionalAuth, getLeaderboard)

export default router
