import express from 'express'

const app = express()

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Zavrzlama API is running.' })
})

export default app
