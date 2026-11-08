import app from './app.js'
import connectDB from './config/db.js'

const port = Number(process.env.PORT ?? 3000)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT must be an integer between 1 and 65535.')
  process.exit(1)
}

try {
  await connectDB()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const server = app.listen(port, () => {
  console.log(`Zavrzlama API: http://localhost:${port}/api/health`)
})

server.on('error', (error) => {
  console.error('Server failed to start:', error.message)
  process.exit(1)
})
