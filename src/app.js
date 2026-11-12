import express from 'express'

const app = express()

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'zavrzlama-backend',
  })
})

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta nije pronađena.' })
})

export default app
