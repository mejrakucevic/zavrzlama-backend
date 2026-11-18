// Prepiše rezultate završenih partija "Pogodi reč" u kolekciju scores.
// Potrebno samo za partije odigrane pre nego što je rang lista postojala.
// Pokretanje: npm.cmd run sync-scores   (bezbedno je pokrenuti više puta)
import { connectDB, disconnectDB } from '../config/db.js'
import { recordScore } from '../models/Score.js'
import WordGame from '../models/WordGame.js'

async function syncScores() {
  await connectDB()

  const finished = await WordGame.find({ status: { $ne: 'playing' } }).lean()

  for (const game of finished) {
    await recordScore({ userId: game.user, game: 'pogodi-rec', date: game.date, score: game.score })
  }

  console.log(`Prepisano rezultata: ${finished.length}`)
}

syncScores()
  .catch((error) => {
    console.error('Prepisivanje nije uspelo:', error.message)
    process.exitCode = 1
  })
  .finally(disconnectDB)
