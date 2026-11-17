import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/User.js'
import { AUTH_COOKIE, cookieOptions, createToken } from '../utils/token.js'

const MIN_PASSWORD_LENGTH = 8
const SALT_ROUNDS = 10 // koliko je bcrypt "spor": 2^10 ponavljanja

// Postavi kolačić sa tokenom i vrati podatke o korisniku
function sendUserWithToken(res, status, user) {
  res.cookie(AUTH_COOKIE, createToken(user), cookieOptions)
  res.status(status).json({ user })
}

// POST /api/auth/register   telo: { username, email, password }
export async function register(req, res) {
  const username = String(req.body?.username ?? '').trim()
  const email = String(req.body?.email ?? '').trim()
  const password = String(req.body?.password ?? '')

  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({ message: `Lozinka mora imati bar ${MIN_PASSWORD_LENGTH} znakova.` })
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({ username, email, passwordHash })
    sendUserWithToken(res, 201, user) // 201 = "napravljeno"
  } catch (error) {
    // Greška iz šeme (npr. prekratko korisničko ime): vrati prvu poruku
    if (error instanceof mongoose.Error.ValidationError) {
      const firstError = Object.values(error.errors)[0]
      return res.status(400).json({ message: firstError.message })
    }
    // Kod 11000 = prekršen "unique" (email ili korisničko ime je zauzeto)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern ?? {})[0]
      const message = field === 'email' ? 'Ovaj email je već registrovan.' : 'Ovo korisničko ime je zauzeto.'
      return res.status(409).json({ message }) // 409 = konflikt
    }
    throw error // nepoznata greška ide u error handler u app.js
  }
}

// POST /api/auth/login   telo: { email, password }
export async function login(req, res) {
  const email = String(req.body?.email ?? '').trim().toLowerCase()
  const password = String(req.body?.password ?? '')

  const user = await User.findOne({ email })
  const isMatch = user ? await bcrypt.compare(password, user.passwordHash) : false

  // Ista poruka za nepostojeći email i pogrešnu lozinku,
  // da napadač ne bi saznao koji emailovi postoje u bazi
  if (!isMatch) {
    return res.status(401).json({ message: 'Pogrešan email ili lozinka.' })
  }

  sendUserWithToken(res, 200, user)
}

// POST /api/auth/logout
export function logout(_req, res) {
  const { maxAge: _maxAge, ...options } = cookieOptions
  res.clearCookie(AUTH_COOKIE, options)
  res.json({ message: 'Odjavljen/a si.' })
}

// GET /api/auth/me   (zaštićena ruta): ko je trenutno prijavljen?
export async function getMe(req, res) {
  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(401).json({ message: 'Korisnik više ne postoji.' })
  }

  res.json({ user })
}
