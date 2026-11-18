import mongoose from 'mongoose'

// Jedan pokušaj: reč i boja za svako slovo
const guessSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    statuses: [{ type: String, enum: ['correct', 'present', 'absent'] }],
  },
  { _id: false }, // pokušajima ne treba sopstveni _id
)

// Jedna partija "Pogodi reč": jedan korisnik, jedan dan
const wordGameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // veza ka kolekciji users
      required: true,
    },
    date: {
      type: String, // "2026-11-18"
      required: true,
    },
    // Tajna reč se pamti pri prvom pokušaju, pa se ne menja ni ako se lista reči promeni.
    // select: false = ne učitava se iz baze ako to izričito ne zatražimo
    answer: {
      type: String,
      required: true,
      select: false,
    },
    guesses: [guessSchema],
    status: {
      type: String,
      enum: ['playing', 'won', 'lost'],
      default: 'playing',
    },
    score: {
      type: Number,
      default: 0,
    },
    finishedAt: Date,
  },
  {
    timestamps: true,
    // Ako dva zahteva istovremeno menjaju istu partiju, drugi dobija grešku
    // umesto da tiho prepiše prvi
    optimisticConcurrency: true,
  },
)

// Jedna partija po korisniku po danu: baza ne dozvoljava duplikate
wordGameSchema.index({ user: 1, date: 1 }, { unique: true })
// Za rang listu: brzo nađi najbolje rezultate za dati dan
wordGameSchema.index({ date: 1, score: -1 })

const WordGame = mongoose.model('WordGame', wordGameSchema)

export default WordGame
