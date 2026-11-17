import { AUTH_COOKIE, verifyToken } from '../utils/token.js'

// Middleware za zaštićene rute: pušta dalje samo prijavljene korisnike.
// Posle njega ruta u req.user ima { id, role }.
export function requireAuth(req, res, next) {
  const token = req.cookies?.[AUTH_COOKIE]

  if (!token) {
    return res.status(401).json({ message: 'Moraš biti prijavljen/a.' })
  }

  try {
    const payload = verifyToken(token)
    req.user = { id: payload.id, role: payload.role }
    next() // sve je u redu, nastavi do rute
  } catch {
    return res.status(401).json({ message: 'Sesija je istekla. Prijavi se ponovo.' })
  }
}

// Za rute koje sme da koristi samo admin (koristi se POSLE requireAuth)
export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Nemaš dozvolu za ovu akciju.' })
  }
  next()
}
