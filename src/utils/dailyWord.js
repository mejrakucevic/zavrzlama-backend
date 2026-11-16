import Word from '../models/Word.js'

const TIME_ZONE = 'Europe/Belgrade'
const MS_PER_DAY = 24 * 60 * 60 * 1000

// Današnji datum u Srbiji, u obliku "2026-11-16"
export function getTodayKey(now = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: TIME_ZONE }).format(now)
}

// Izaberi tajnu reč za dati datum.
// Isti datum uvek daje istu reč, pa svi igrači dobijaju istu zagonetku.
export async function getDailyWord(dateKey) {
  const answers = await Word.find({ isAnswer: true }).sort({ text: 1 }).lean()

  if (answers.length === 0) {
    throw new Error('U bazi nema reči. Pokreni: npm.cmd run seed')
  }

  const dayNumber = Math.floor(Date.parse(dateKey) / MS_PER_DAY) // broj dana od 1.1.1970.
  return answers[dayNumber % answers.length].text
}
