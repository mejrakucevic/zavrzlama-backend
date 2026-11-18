import mongoose from 'mongoose'
import RedjeGame from '../models/RedjeGame.js'
import RedjeQuestion from '../models/RedjeQuestion.js'
import { recordScore } from '../models/Score.js'
import { findAnswerIndex } from '../utils/answerMatching.js'
import { getDayNumber, getTodayKey } from '../utils/dates.js'

const QUESTIONS_PER_DAY = 5
const TIME_LIMIT_MS = 20_000
const GRACE_MS = 2_000 // rezerva za sporu mrežu
const MAX_INPUT_LENGTH = 60
const MIN_POINTS = 10 // svaki tačan odgovor vredi bar ovoliko
// Koliko "zamišljenih igrača" daje naša procena popularnosti. Dok je pravih igrača malo,
// procena odlučuje; kad ih bude mnogo, odlučuju pravi odgovori.
const PRIOR_WEIGHT = 20

// ----- Pomoćne funkcije -----

// Udeo igrača (0–1) koji daju ovaj odgovor: mešavina naše procene i pravih odgovora
function getShare(answer, question) {
  const virtualPicks = (answer.basePopularity / 100) * PRIOR_WEIGHT
  return (virtualPicks + answer.picks) / (PRIOR_WEIGHT + question.totalPicks)
}

// Ređi odgovor = više poena. Odgovor koji daje 35% igrača vredi 65 poena.
function getPoints(share) {
  return Math.max(MIN_POINTS, Math.round(100 * (1 - share)))
}

// Tri najčešća odgovora, za prikaz posle odgovora
function getTopAnswers(question) {
  return question.answers
    .map((answer) => ({ text: answer.text, share: getShare(answer, question) }))
    .sort((a, b) => b.share - a.share)
    .slice(0, 3)
}

// Današnja pitanja: isti izbor za sve igrače, drugačiji svakog dana
async function pickDailyQuestionIds(date) {
  const questions = await RedjeQuestion.find({ isActive: true }).sort({ prompt: 1 }).select('_id').lean()

  if (questions.length < QUESTIONS_PER_DAY) {
    throw new Error('Nema dovoljno pitanja za REĐE!. Pokreni: npm.cmd run seed:redje')
  }

  const start = getDayNumber(date) * QUESTIONS_PER_DAY
  return Array.from({ length: QUESTIONS_PER_DAY }, (_, i) => questions[(start + i) % questions.length]._id)
}

async function findOrCreateGame(userId, date) {
  const existing = await RedjeGame.findOne({ user: userId, date })
  if (existing) return existing

  try {
    return await RedjeGame.create({ user: userId, date, questions: await pickDailyQuestionIds(date) })
  } catch (error) {
    if (error.code === 11000) return RedjeGame.findOne({ user: userId, date })
    throw error
  }
}

const isQuestionOpen = (game) => game.currentStartedAt !== null
const isTimeUp = (game) => Date.now() - game.currentStartedAt.getTime() > TIME_LIMIT_MS + GRACE_MS

// Zabeleži odgovor na otvoreno pitanje i završi partiju ako je to bilo poslednje pitanje
function closeQuestion(game, playerAnswer) {
  game.answers.push(playerAnswer)
  game.currentStartedAt = null

  if (game.answers.length === QUESTIONS_PER_DAY) {
    game.status = 'finished'
    game.score = game.answers.reduce((sum, answer) => sum + answer.points, 0)
    game.finishedAt = new Date()
  }
}

// Ako je igrač zatvorio stranicu usred pitanja, a vreme je isteklo: računaj kao 0 poena
async function expireIfNeeded(game) {
  if (isQuestionOpen(game) && isTimeUp(game)) {
    closeQuestion(game, { timedOut: true })
    await game.save()
    if (game.status === 'finished') await submitScore(game)
  }
}

function submitScore(game) {
  return recordScore({ userId: game.user, game: 'redje', date: game.date, score: game.score })
}

// Ono što frontend sme da vidi
async function toPublicGame(game) {
  const questions = await RedjeQuestion.find({ _id: { $in: game.questions } }).select('prompt').lean()
  const promptOf = (id) => questions.find((q) => q._id.equals(id))?.prompt ?? ''
  const index = game.answers.length

  return {
    status: game.status,
    score: game.score,
    answers: game.answers.map((answer, i) => ({ ...answer.toObject(), prompt: promptOf(game.questions[i]) })),
    // Otvoreno pitanje: tekst i koliko vremena je ostalo (tekst se ne šalje pre nego što tajmer krene)
    current: isQuestionOpen(game)
      ? {
          index,
          prompt: promptOf(game.questions[index]),
          remainingMs: Math.max(0, TIME_LIMIT_MS - (Date.now() - game.currentStartedAt.getTime())),
        }
      : null,
  }
}

function emptyGame() {
  return { status: 'playing', score: 0, answers: [], current: null }
}

// ----- Rute -----

// GET /api/games/redje/today
export async function getToday(req, res) {
  const game = await RedjeGame.findOne({ user: req.user.id, date: getTodayKey() })
  if (game) await expireIfNeeded(game)

  res.json({
    date: getTodayKey(),
    questionCount: QUESTIONS_PER_DAY,
    timeLimitMs: TIME_LIMIT_MS,
    game: game ? await toPublicGame(game) : emptyGame(),
  })
}

// POST /api/games/redje/next: otvori sledeće pitanje i pokreni tajmer
export async function nextQuestion(req, res) {
  const game = await findOrCreateGame(req.user.id, getTodayKey())
  await expireIfNeeded(game)

  if (game.status === 'finished') {
    return res.status(409).json({ message: 'Današnja igra je završena. Nova pitanja stižu sutra.' })
  }

  // Ako je pitanje već otvoreno (npr. osvežena stranica), tajmer se NE pokreće ponovo
  if (!isQuestionOpen(game)) {
    game.currentStartedAt = new Date()
    try {
      await game.save()
    } catch (error) {
      if (!(error instanceof mongoose.Error.VersionError)) throw error
      // Drugi zahtev je istovremeno otvorio pitanje: vrati njegovo stanje
      return res.json({ game: await toPublicGame(await RedjeGame.findById(game._id)) })
    }
  }

  res.json({ game: await toPublicGame(game) })
}

// POST /api/games/redje/answer   telo: { "answer": "Pčinja" }
export async function submitAnswer(req, res) {
  const input = String(req.body?.answer ?? '').trim().slice(0, MAX_INPUT_LENGTH)
  const game = await RedjeGame.findOne({ user: req.user.id, date: getTodayKey() })

  if (!game || !isQuestionOpen(game)) {
    return res.status(409).json({ message: 'Nema otvorenog pitanja.' })
  }

  const question = await RedjeQuestion.findById(game.questions[game.answers.length])

  // Podrazumevano: netačan odgovor, 0 poena
  let result = { input, matched: null, share: null, points: 0, timedOut: false }

  if (isTimeUp(game)) {
    result.timedOut = true
  } else {
    const index = findAnswerIndex(question.answers, input)
    if (index !== -1) {
      const share = getShare(question.answers[index], question)
      result = { ...result, matched: question.answers[index].text, share, points: getPoints(share) }
    }
  }

  closeQuestion(game, result)

  try {
    await game.save()
  } catch (error) {
    if (error instanceof mongoose.Error.VersionError) {
      return res.status(409).json({ message: 'Odgovor je već poslat.' })
    }
    throw error
  }

  // Tek kad je odgovor sačuvan: povećaj brojač za taj odgovor ($inc je atomski,
  // pa se ne gube brojanja ni kad mnogo igrača odgovara u istom trenutku)
  if (result.matched) {
    await RedjeQuestion.updateOne(
      { _id: question._id, 'answers.text': result.matched },
      { $inc: { 'answers.$.picks': 1, totalPicks: 1 } },
    )
  }

  if (game.status === 'finished') await submitScore(game)

  res.json({
    result: { ...result, topAnswers: getTopAnswers(question) },
    game: await toPublicGame(game),
  })
}
