// Prepoznavanje odgovora: "Šabac", "sabac" i " ŠABAC! " treba da budu isti odgovor.

// Svedi tekst na osnovni oblik: mala slova, bez kvačica, bez interpunkcije
export function normalizeAnswer(text) {
  return String(text)
    .toLowerCase()
    .replaceAll('đ', 'dj')
    .normalize('NFD') // "č" se rastavlja na "c" + kvačicu...
    .replace(/[̀-ͯ]/g, '') // ...a kvačica se briše
    .replace(/[^a-z0-9 ]/g, ' ') // sve osim slova, brojeva i razmaka postaje razmak
    .replace(/\s+/g, ' ') // više razmaka u jedan
    .trim()
}

// Levenštajnovo rastojanje: najmanji broj izmena (dodaj, obriši, zameni slovo)
// da se od jedne reči dobije druga. "kragujevc" → "kragujevac" = 1
export function levenshtein(a, b) {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j)

  for (let i = 1; i <= a.length; i++) {
    const current = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost)
    }
    previous = current
  }

  return previous[b.length]
}

const MIN_LENGTH_FOR_TYPOS = 4 // kod kratkih reči ("jun", "jul") jedna greška menja značenje

// Nađi koji tačan odgovor je igrač mislio. Vraća indeks odgovora ili -1.
export function findAnswerIndex(answers, input) {
  const guess = normalizeAnswer(input)
  if (!guess) return -1

  const formsOf = (answer) => [answer.text, ...(answer.aliases ?? [])].map(normalizeAnswer)

  // 1. Tačno poklapanje
  const exact = answers.findIndex((answer) => formsOf(answer).includes(guess))
  if (exact !== -1) return exact

  // 2. Jedna slovna greška, ali samo ako odgovara tačno jednom odgovoru
  if (guess.length < MIN_LENGTH_FOR_TYPOS) return -1

  const close = answers
    .map((answer, index) => ({ index, forms: formsOf(answer) }))
    .filter(({ forms }) => forms.some((form) => form.length >= MIN_LENGTH_FOR_TYPOS && levenshtein(form, guess) <= 1))

  return close.length === 1 ? close[0].index : -1
}
