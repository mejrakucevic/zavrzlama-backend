import mongoose from 'mongoose'

// Odgovor igrača na jedno pitanje
const playerAnswerSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' }, // šta je igrač ukucao
    matched: { type: String, default: null }, // prepoznat tačan odgovor, ili null
    points: { type: Number, default: 0 },
    share: { type: Number, default: null }, // udeo igrača sa istim odgovorom (0–1)
    timedOut: { type: Boolean, default: false },
  },
  { _id: false },
)

// Jedna partija REĐE!: jedan korisnik, jedan dan
const redjeGameSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    // Današnja pitanja, utvrđena pri pravljenju partije
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RedjeQuestion' }],
    answers: [playerAnswerSchema], // answers.length = broj odgovorenih pitanja
    // Kad je prikazano trenutno pitanje (null = nijedno pitanje nije otvoreno).
    // Vreme meri SERVER, pa se tajmer ne može prevariti iz pregledača.
    currentStartedAt: { type: Date, default: null },
    status: { type: String, enum: ['playing', 'finished'], default: 'playing' },
    score: { type: Number, default: 0 },
    finishedAt: Date,
  },
  { timestamps: true, optimisticConcurrency: true },
)

redjeGameSchema.index({ user: 1, date: 1 }, { unique: true })

const RedjeGame = mongoose.model('RedjeGame', redjeGameSchema)

export default RedjeGame
