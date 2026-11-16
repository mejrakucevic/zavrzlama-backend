import express from 'express'
import wordGameRoutes from './routes/wordGame.routes.js'

const app = express()

// Middleware: pretvara JSON iz tela zahteva u objekat req.body
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'zavrzlama-backend',
  })
})

app.use('/api/games/word', wordGameRoutes)

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
