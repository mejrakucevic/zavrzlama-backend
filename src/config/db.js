import mongoose from 'mongoose'

mongoose.connection.on('error', () => {
  console.error('Greška u vezi sa MongoDB bazom.')
})

export async function connectDB() {
  const uri = process.env.MONGODB_URI?.trim()

  if (!uri) {
    throw new Error('Nedostaje MONGODB_URI u konfiguraciji okruženja.')
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  } catch {
    throw new Error('Povezivanje sa MongoDB bazom nije uspelo. Proveri servis i MONGODB_URI.')
  }

  console.log('MongoDB je povezan.')
}

export async function disconnectDB() {
  await mongoose.disconnect()
}
