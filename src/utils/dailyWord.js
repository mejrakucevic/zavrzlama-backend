import Word from '../models/Word.js'
import { getDayNumber } from './dates.js'

// Izaberi tajnu reč za dati datum.
// Isti datum uvek daje istu reč, pa svi igrači dobijaju istu zagonetku.
export async function getDailyWord(dateKey) {
  const answers = await Word.find({ isAnswer: true }).sort({ text: 1 }).lean()

  if (answers.length === 0) {
    throw new Error('U bazi nema reči. Pokreni: npm.cmd run seed')
  }

  return answers[getDayNumber(dateKey) % answers.length].text
}
