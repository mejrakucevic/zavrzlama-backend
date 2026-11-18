// Sve igre koriste "dan po srpskom vremenu", u obliku teksta "2026-11-18".
// Takav tekst se ispravno poredi i sortira kao string: "2026-11-09" < "2026-11-18".
const TIME_ZONE = 'Europe/Belgrade'
const MS_PER_DAY = 24 * 60 * 60 * 1000

// Današnji datum u Srbiji
export function getTodayKey(now = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: TIME_ZONE }).format(now)
}

// Ponedeljak tekuće nedelje, npr. za sredu "2026-11-18" vraća "2026-11-16"
export function getWeekStartKey(now = new Date()) {
  const today = new Date(getTodayKey(now)) // ponoć po UTC-u, pa nema problema sa vremenskim zonama
  const daysSinceMonday = (today.getUTCDay() + 6) % 7 // nedelja = 0 → 6, ponedeljak = 1 → 0
  return new Date(today.getTime() - daysSinceMonday * MS_PER_DAY).toISOString().slice(0, 10)
}

// Redni broj dana od 1.1.1970. (koristi se za izbor dnevne reči)
export function getDayNumber(dateKey) {
  return Math.floor(Date.parse(dateKey) / MS_PER_DAY)
}
