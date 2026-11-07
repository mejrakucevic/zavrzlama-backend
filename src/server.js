import app from './app.js'

const port = 3000

const server = app.listen(port, () => {
  console.log(`Zavrzlama API: http://localhost:${port}/api/health`)
})

server.on('error', (error) => {
  console.error('Server failed to start:', error.message)
  process.exit(1)
})
