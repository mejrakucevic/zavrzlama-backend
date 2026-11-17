import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Korisničko ime je obavezno.'],
      unique: true,
      trim: true,
      minlength: [3, 'Korisničko ime mora imati bar 3 znaka.'],
      maxlength: [20, 'Korisničko ime može imati najviše 20 znakova.'],
      match: [/^[a-zA-Z0-9_]+$/, 'Korisničko ime sme sadržati samo slova, brojeve i _.'],
    },
    email: {
      type: String,
      required: [true, 'Email je obavezan.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email nije ispravan.'],
    },
    // Čuvamo samo heš lozinke, nikad samu lozinku
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Mongoose sam dodaje createdAt i updatedAt
    toJSON: {
      // Kad se korisnik šalje kao JSON, izbaci osetljiva i nepotrebna polja
      transform(_doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passwordHash
        return ret
      },
    },
  },
)

const User = mongoose.model('User', userSchema)

export default User
