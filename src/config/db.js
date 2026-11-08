import mongoose from 'mongoose'
import dns from 'node:dns'

async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is missing. Configure it in .env.')
  }

  if (process.env.DNS_SERVERS) {
    const servers = process.env.DNS_SERVERS.split(',').map((server) => server.trim())
    try {
      dns.setServers(servers)
    } catch {
      throw new Error('DNS_SERVERS must contain valid DNS server IP addresses separated by commas.')
    }
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  } catch {
    throw new Error('MongoDB connection failed. Check MONGODB_URI, database credentials and Atlas network access.')
  }

  console.log('MongoDB connected.')
}

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.')
})

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected.')
})

export default connectDB
