import mongoose from 'mongoose'

// Šema: pravila kako izgleda jedan dokument u kolekciji "words"
const wordSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Reč je obavezna.'],
    unique: true, // ista reč ne sme da postoji dva puta
    uppercase: true, // "majka" se čuva kao "MAJKA"
    trim: true, // " MAJKA " se čuva kao "MAJKA"
    minlength: [5, 'Reč mora imati tačno 5 slova.'],
    maxlength: [5, 'Reč mora imati tačno 5 slova.'],
  },
  // true  = reč može biti tajna reč dana
  // false = reč je samo dozvoljen pokušaj
  isAnswer: {
    type: Boolean,
    default: false,
  },
})

// Model: preko njega čitamo i pišemo u kolekciju "words"
const Word = mongoose.model('Word', wordSchema)

export default Word
