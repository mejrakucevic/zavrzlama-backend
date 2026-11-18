import mongoose from 'mongoose'

// Sve igre na sajtu. Rang lista zna samo za ove oznake, ne i za pravila igara.
export const GAME_IDS = ['pogodi-rec', 'redje', 'ciljni-broj', 'najduza-rec', 'pogodi-drzavu']

// Jedan rezultat: koliko je poena korisnik osvojio u kojoj igri kog dana.
// Svaka igra upisuje ovde kad se partija završi; rang lista čita samo ovu kolekciju.
const scoreSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: String, enum: GAME_IDS, required: true },
    date: { type: String, required: true }, // "2026-11-18"
    score: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
)

// Jedan rezultat po korisniku, igri i danu
scoreSchema.index({ user: 1, game: 1, date: 1 }, { unique: true })
// Za rang listu: filtriranje po datumu (i igri)
scoreSchema.index({ date: 1, game: 1 })

const Score = mongoose.model('Score', scoreSchema)

// Upiši (ili ažuriraj) rezultat. Poziva se iz svake igre kad se partija završi.
export async function recordScore({ userId, game, date, score }) {
  await Score.updateOne(
    { user: userId, game, date },
    { $set: { score } },
    { upsert: true },
  )
}

export default Score
