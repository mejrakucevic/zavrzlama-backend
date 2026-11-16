// Uporedi pokušaj sa tajnom reči i vrati boju za svako slovo:
// 'correct' (pravo mesto), 'present' (postoji na drugom mestu), 'absent' (ne postoji).
// Radi u dva prolaza da bi ponovljena slova bila ispravno obojena.
export function evaluateGuess(guess, answer) {
  const statuses = Array(answer.length).fill('absent')
  const remaining = {} // slova odgovora koja još nisu "potrošena"

  // 1. prolaz: zelena slova
  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) {
      statuses[i] = 'correct'
    } else {
      remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1
    }
  }

  // 2. prolaz: žuta slova
  for (let i = 0; i < answer.length; i++) {
    if (statuses[i] === 'correct') continue

    const letter = guess[i]
    if (remaining[letter] > 0) {
      statuses[i] = 'present'
      remaining[letter]--
    }
  }

  return statuses
}
