import jwt from 'jsonwebtoken'

export const AUTH_COOKIE = 'zavrzlama_token'
const TOKEN_LIFETIME_DAYS = 7

function getSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('Nedostaje JWT_SECRET u konfiguraciji okruženja.')
  return secret
}

// Napravi potpisan token sa id-jem i ulogom korisnika
export function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, getSecret(), {
    expiresIn: `${TOKEN_LIFETIME_DAYS}d`,
  })
}

// Proveri potpis i rok trajanja. Baca grešku ako token nije ispravan.
export function verifyToken(token) {
  return jwt.verify(token, getSecret())
}

// Podešavanja kolačića u kome čuvamo token
export const cookieOptions = {
  httpOnly: true, // JavaScript u pregledaču ne može da ga pročita (zaštita od XSS)
  sameSite: 'lax', // drugi sajtovi ne mogu da ga pošalju u naše ime (zaštita od CSRF)
  secure: process.env.NODE_ENV === 'production', // na internetu samo preko HTTPS
  maxAge: TOKEN_LIFETIME_DAYS * 24 * 60 * 60 * 1000,
}
