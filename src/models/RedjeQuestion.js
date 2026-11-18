import mongoose from 'mongoose'

// Jedan tačan odgovor na pitanje
const answerSchema = new mongoose.Schema(
  {
    text: { type: String, required: true }, // kako se prikazuje: "Novi Sad"
    aliases: [String], // drugi prihvaćeni oblici: ["NS"]
    // Naša procena: koliko % ljudi bi dalo ovaj odgovor. Koristi se dok nema dovoljno igrača.
    basePopularity: { type: Number, required: true, min: 0, max: 100 },
    picks: { type: Number, default: 0 }, // koliko igrača je stvarno dalo ovaj odgovor
  },
  { _id: false },
)

// Pitanje za igru REĐE!, npr. "Navedi reku u Srbiji"
const redjeQuestionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    answers: {
      type: [answerSchema],
      validate: [(answers) => answers.length > 0, 'Pitanje mora imati bar jedan tačan odgovor.'],
    },
    totalPicks: { type: Number, default: 0 }, // ukupno tačnih odgovora svih igrača
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const RedjeQuestion = mongoose.model('RedjeQuestion', redjeQuestionSchema)

export default RedjeQuestion
