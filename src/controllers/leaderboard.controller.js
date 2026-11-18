import mongoose from 'mongoose'
import Score, { GAME_IDS } from '../models/Score.js'
import { getTodayKey, getWeekStartKey } from '../utils/dates.js'

const PERIODS = ['day', 'week', 'all']
const TOP_LIMIT = 20

// GET /api/leaderboard?period=day|week|all&game=all|pogodi-rec|...
// Javna ruta; prijavljen korisnik dobija i svoje mesto.
export async function getLeaderboard(req, res) {
  const period = req.query.period ?? 'week'
  const game = req.query.game ?? 'all'

  if (!PERIODS.includes(period)) {
    return res.status(400).json({ message: 'Period mora biti day, week ili all.' })
  }
  if (game !== 'all' && !GAME_IDS.includes(game)) {
    return res.status(400).json({ message: 'Nepoznata igra.' })
  }

  // 1. Filter: koje rezultate uzimamo u obzir
  const match = {}
  if (period === 'day') match.date = getTodayKey()
  if (period === 'week') match.date = { $gte: getWeekStartKey() }
  if (game !== 'all') match.game = game

  // 2. Saberi poene po korisniku (zajednički početak oba upita)
  const totalsPerUser = [
    { $match: match },
    {
      $group: {
        _id: '$user', // grupiši po korisniku
        totalScore: { $sum: '$score' }, // saberi poene
        gamesPlayed: { $sum: 1 }, // prebroj partije
      },
    },
  ]

  // 3. Najboljih 20, sa korisničkim imenima
  const top = await Score.aggregate([
    ...totalsPerUser,
    { $sort: { totalScore: -1, gamesPlayed: 1, _id: 1 } }, // jednak zbir: bolji je ko je igrao manje
    { $limit: TOP_LIMIT },
    {
      // "JOIN" sa kolekcijom users
      $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' },
    },
    { $unwind: '$user' }, // niz sa jednim korisnikom → sam korisnik
    {
      $project: { _id: 0, userId: '$_id', username: '$user.username', totalScore: 1, gamesPlayed: 1 },
    },
  ])

  // Mesto: isti broj poena = isto mesto (1, 2, 2, 4...)
  const entries = top.map((entry) => ({
    ...entry,
    rank: top.filter((other) => other.totalScore > entry.totalScore).length + 1,
  }))

  // 4. Mesto prijavljenog korisnika (i kad nije među prvih 20)
  let me = null
  if (req.user) {
    const userId = new mongoose.Types.ObjectId(req.user.id)
    const [mine] = await Score.aggregate([...totalsPerUser, { $match: { _id: userId } }])

    if (mine) {
      // Mesto = broj korisnika sa više poena + 1
      const [better] = await Score.aggregate([
        ...totalsPerUser,
        { $match: { totalScore: { $gt: mine.totalScore } } },
        { $count: 'count' },
      ])
      me = { rank: (better?.count ?? 0) + 1, totalScore: mine.totalScore, gamesPlayed: mine.gamesPlayed }
    }
  }

  res.json({ period, game, entries, me })
}
