import { once } from 'node:events'
import app from './app.js'
import { connectDB, disconnectDB } from './config/db.js'

async function startServer() {
  const port = Number(process.env.PORT ?? 5000)

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT mora biti ceo broj između 1 i 65535.')
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('Nedostaje JWT_SECRET u konfiguraciji okruženja.')
  }

  await connectDB()

  const server = app.listen(port, '127.0.0.1')
  await once(server, 'listening')

  console.log(`Zavrzlama API: http://127.0.0.1:${port}/api/health`)
}

startServer().catch(async (error) => {
  console.error('Pokretanje servera nije uspelo:', error.message)
  process.exitCode = 1
  await disconnectDB()
})
