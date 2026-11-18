// Upisuje pitanja za REĐE! u bazu. Pokretanje: npm.cmd run seed:redje
// Može se pokrenuti više puta: statistika igrača (picks) se čuva.
import { connectDB, disconnectDB } from '../config/db.js'
import { parseAnswers, REDJE_QUESTIONS } from '../data/redjeQuestions.js'
import RedjeQuestion from '../models/RedjeQuestion.js'

async function seed() {
  await connectDB()
  let created = 0

  for (const { prompt, category, answers } of REDJE_QUESTIONS) {
    const parsed = parseAnswers(answers)
    const existing = await RedjeQuestion.findOne({ prompt })

    if (!existing) {
      await RedjeQuestion.create({ prompt, category, answers: parsed })
      created++
      continue
    }

    // Pitanje već postoji: ažuriraj odgovore, ali zadrži koliko puta je svaki izabran
    const oldPicks = new Map(existing.answers.map((answer) => [answer.text, answer.picks]))
    existing.category = category
    existing.answers = parsed.map((answer) => ({ ...answer, picks: oldPicks.get(answer.text) ?? 0 }))
    await existing.save()
  }

  console.log(`Novih pitanja: ${created}, ukupno: ${await RedjeQuestion.countDocuments()}`)
}

seed()
  .catch((error) => {
    console.error('Punjenje pitanja nije uspelo:', error.message)
    process.exitCode = 1
  })
  .finally(disconnectDB)
