import cookieParser from 'cookie-parser'
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import leaderboardRoutes from './routes/leaderboard.routes.js'
import redjeRoutes from './routes/redje.routes.js'
import wordGameRoutes from './routes/wordGame.routes.js'

const app = express()

// Middleware: pretvara JSON iz tela zahteva u objekat req.body
app.use(express.json())
// Middleware: čita kolačiće iz zahteva u objekat req.cookies
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'zavrzlama-backend',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/games/word', wordGameRoutes)
app.use('/api/games/redje', redjeRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

// Nijedna ruta se nije poklopila
app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta nije pronađena.' })
})

// Obrada grešaka: Express ovde šalje svaku grešku iz ruta
// (prepoznaje je po 4 parametra)
app.use((error, _req, res, _next) => {
  // Neispravan JSON u telu zahteva
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Neispravan JSON u zahtevu.' })
  }

  console.error(error)
  res.status(500).json({ message: 'Greška na serveru.' })
})

export default app
