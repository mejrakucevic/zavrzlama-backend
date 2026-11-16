// Puni bazu rečima. Pokretanje: npm.cmd run seed
// Skripta se može pokrenuti više puta: postojeće reči se ažuriraju, ne dupliraju.
import { connectDB, disconnectDB } from '../config/db.js'
import { ALLOWED_WORDS, ANSWER_WORDS } from '../data/words.js'
import Word from '../models/Word.js'

const words = [
  ...ANSWER_WORDS.map((text) => ({ text, isAnswer: true })),
  ...ALLOWED_WORDS.map((text) => ({ text, isAnswer: false })),
]

async function seed() {
  await connectDB()

  // "upsert" = ažuriraj ako postoji, ubaci ako ne postoji
  const operations = words.map((word) => ({
    updateOne: {
      filter: { text: word.text },
      update: { $set: word },
      upsert: true,
    },
  }))

  const result = await Word.bulkWrite(operations)
  const total = await Word.countDocuments()

  console.log(`Dodato novih reči: ${result.upsertedCount}, ukupno u bazi: ${total}`)
}

seed()
  .catch((error) => {
    console.error('Punjenje baze nije uspelo:', error.message)
    process.exitCode = 1
  })
  .finally(disconnectDB)
