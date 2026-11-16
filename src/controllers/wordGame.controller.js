import Word from '../models/Word.js'
import { getDailyWord, getTodayKey } from '../utils/dailyWord.js'
import { evaluateGuess } from '../utils/evaluateGuess.js'

const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6
const SERBIAN_WORD = /^[ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ]{5}$/

// GET /api/games/word/today
// Osnovni podaci o današnjoj igri. Tajna reč se NE šalje!
export function getToday(_req, res) {
  res.json({
    date: getTodayKey(),
    wordLength: WORD_LENGTH,
    maxAttempts: MAX_ATTEMPTS,
  })
}

// POST /api/games/word/guess   telo: { "guess": "MAJKA", "attempt": 1 }
// Proveri pokušaj i vrati boje za svako slovo.
export async function checkGuess(req, res) {
  const guess = String(req.body?.guess ?? '').trim().toUpperCase()
  const attempt = Number(req.body?.attempt)

  // 1. Validacija: da li je klijent poslao ispravne podatke?
  if (!SERBIAN_WORD.test(guess)) {
    return res.status(400).json({ message: `Reč mora imati ${WORD_LENGTH} slova srpske latinice.` })
  }

  if (!Number.isInteger(attempt) || attempt < 1 || attempt > MAX_ATTEMPTS) {
    return res.status(400).json({ message: `Broj pokušaja mora biti od 1 do ${MAX_ATTEMPTS}.` })
  }

  // 2. Da li reč postoji u rečniku?
  const exists = await Word.exists({ text: guess })
  if (!exists) {
    return res.status(400).json({ message: 'Ova reč nije u rečniku.' })
  }

  // 3. Uporedi sa današnjom reči
  const answer = await getDailyWord(getTodayKey())
  const statuses = evaluateGuess(guess, answer)
  const isCorrect = guess === answer
  const isLastAttempt = attempt === MAX_ATTEMPTS

  res.json({
    statuses,
    isCorrect,
    // Rešenje otkrivamo tek kad je igra gotova
    answer: isCorrect || isLastAttempt ? answer : undefined,
  })
}
