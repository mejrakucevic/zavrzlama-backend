import mongoose from 'mongoose'
import { recordScore } from '../models/Score.js'
import Word from '../models/Word.js'
import WordGame from '../models/WordGame.js'
import { getDailyWord } from '../utils/dailyWord.js'
import { getTodayKey } from '../utils/dates.js'
import { evaluateGuess } from '../utils/evaluateGuess.js'

const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6
const SERBIAN_WORD = /^[ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ]{5}$/

// Poeni za pobedu, po broju pokušaja: iz 1. pokušaja 100, ..., iz 6. pokušaja 20
const SCORES = [100, 80, 60, 40, 30, 20]

// Ono što frontend sme da vidi. Rešenje samo kad je igra gotova.
function toPublicGame(game) {
  const isFinished = game.status !== 'playing'
  return {
    guesses: game.guesses,
    status: game.status,
    score: game.score,
    answer: isFinished ? game.answer : undefined,
  }
}

// Nađi današnju partiju korisnika, ili je napravi ako još ne postoji
async function findOrCreateGame(userId, date) {
  const existing = await WordGame.findOne({ user: userId, date }).select('+answer')
  if (existing) return existing

  try {
    const answer = await getDailyWord(date)
    return await WordGame.create({ user: userId, date, answer })
  } catch (error) {
    // Dva zahteva su istovremeno pokušala da naprave partiju: uzmi onu koja je napravljena
    if (error.code === 11000) {
      return WordGame.findOne({ user: userId, date }).select('+answer')
    }
    throw error
  }
}

// GET /api/games/word/today   (zaštićena ruta)
// Podaci o današnjoj igri i dosadašnji pokušaji prijavljenog korisnika
export async function getToday(req, res) {
  const date = getTodayKey()
  const game = await WordGame.findOne({ user: req.user.id, date }).select('+answer')

  res.json({
    date,
    wordLength: WORD_LENGTH,
    maxAttempts: MAX_ATTEMPTS,
    game: game ? toPublicGame(game) : { guesses: [], status: 'playing', score: 0 },
  })
}

// POST /api/games/word/guess   (zaštićena ruta)   telo: { "guess": "MAJKA" }
export async function checkGuess(req, res) {
  const guess = String(req.body?.guess ?? '').trim().toUpperCase()

  // 1. Validacija
  if (!SERBIAN_WORD.test(guess)) {
    return res.status(400).json({ message: `Reč mora imati ${WORD_LENGTH} slova srpske latinice.` })
  }

  const exists = await Word.exists({ text: guess })
  if (!exists) {
    return res.status(400).json({ message: 'Ova reč nije u rečniku.' })
  }

  // 2. Nađi partiju i proveri da li još traje
  const game = await findOrCreateGame(req.user.id, getTodayKey())

  if (game.status !== 'playing') {
    return res.status(409).json({ message: 'Današnja igra je završena. Nova reč stiže sutra.' })
  }

  // 3. Oboji pokušaj i ažuriraj partiju. Server sam broji pokušaje.
  game.guesses.push({ word: guess, statuses: evaluateGuess(guess, game.answer) })

  if (guess === game.answer) {
    game.status = 'won'
    game.score = SCORES[game.guesses.length - 1]
    game.finishedAt = new Date()
  } else if (game.guesses.length >= MAX_ATTEMPTS) {
    game.status = 'lost'
    game.finishedAt = new Date()
  }

  try {
    await game.save()
  } catch (error) {
    // Isti pokušaj je poslat dva puta istovremeno (npr. dupli klik)
    if (error instanceof mongoose.Error.VersionError) {
      return res.status(409).json({ message: 'Pokušaj je već poslat. Osveži stranicu.' })
    }
    throw error
  }

  // 4. Partija je gotova: predaj rezultat rang listi
  if (game.status !== 'playing') {
    await recordScore({ userId: req.user.id, game: 'pogodi-rec', date: game.date, score: game.score })
  }

  res.json({ game: toPublicGame(game) })
}
