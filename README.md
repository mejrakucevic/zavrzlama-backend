# Zavrzlama — backend

Backend univerzitetskog projekta Zavrzlama, napravljen uz Node.js i Express.
Trenutno sadrži HTTP server, probnu API rutu i konekciju sa MongoDB bazom
preko Mongoose-a. Frontend koristi health rutu preko Vite razvojnog proxy-ja.

## Preduslovi

- Node.js 24 ili noviji.
- npm.
- Pokrenut lokalni MongoDB server na portu 27017.

Na Windows-u koristimo `npm.cmd` zbog PowerShell ograničenja za `npm.ps1`.
Na drugim sistemima koristi `npm`.

## Instalacija i pokretanje

U folderu `zavrzlama-backend` pokreni:

```powershell
npm.cmd ci
Copy-Item .env.example .env
npm.cmd run dev
```

Kopiranje uradi samo pri prvom podešavanju, ako `.env` već ne postoji.
Primer sadrži `PORT=5000` i lokalnu adresu baze u `MONGODB_URI`.
`.env` se ignoriše u Git-u, dok se
`.env.example` čuva sa bezbednim primerima, bez lozinki i ključeva.

Node učitava `.env` pomoću opcije `--env-file-if-exists`. Podrazumevani port
je 5000, ali je `MONGODB_URI` obavezna konfiguracija. Postojeće promenljive
okruženja imaju prednost nad vrednostima iz fajla.
Port mora biti ceo broj od 1 do 65535.

`dev` koristi Node opciju `--watch`, koja ponovo pokreće server pri promeni
učitanih JavaScript fajlova. Posle izmene `.env` ručno ponovo pokreni server.
Zaustavljanje: `Ctrl+C`. Za pokretanje bez praćenja izmena koristi:

```powershell
npm.cmd start
```

Server trenutno sluša samo lokalno, na adresi `127.0.0.1`.
Ako je port zauzet, zaustavi prethodnu instancu servera ili promeni `PORT` u
sopstvenom `.env` fajlu, na primer na 5001.

## MongoDB konekcija

Za lokalni razvoj `.env` treba da sadrži:

```dotenv
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/zavrzlama
```

`127.0.0.1` označava ovaj računar, `27017` MongoDB port, a `zavrzlama`
naziv baze. Za lokalnu konekciju koristimo IPv4 adresu kako bismo izbegli
razliku između IPv4 i IPv6 adresa na koje `localhost` može da pokazuje.

`src/config/db.js` proverava konfiguraciju i poziva `mongoose.connect()`.
`src/server.js` čeka uspešnu konekciju pre pokretanja Express servera.
Pri uspehu očekuj najpre `MongoDB je povezan.`, zatim adresu API-ja.
Konekcija sama ne upisuje podatke: baza će se pojaviti u Compass-u nakon
prvog upisa podataka, koji ćemo dodati u kasnijim koracima.

Ako konekcija ne uspe, posle približno pet sekundi ispisuje se poruka,
HTTP server se ne pokreće, a proces završava sa neuspešnim statusom.
U `--watch` režimu Node ostaje spreman za ponovno pokretanje pri izmeni koda.
Ako je HTTP port zauzet nakon povezivanja, konekcija sa bazom se zatvara.
Adresa konekcije i eventualni kredencijali ne ispisuju se u porukama greške.

Provera MongoDB servisa u PowerShell-u:

```powershell
Get-Service MongoDB
```

Očekivani status je `Running`. Ako servis treba pokrenuti, u administratorskom
PowerShell terminalu koristi `Start-Service MongoDB`.

Za proveru neuspešne konekcije bez zaustavljanja MongoDB servisa, u novom
terminalu iz backend foldera privremeno koristi drugi MongoDB port i drugi
HTTP port. Pre toga proveri da 27018 i 5001 nisu zauzeti:

```powershell
$env:MONGODB_URI = 'mongodb://127.0.0.1:27018/zavrzlama'
$env:PORT = '5001'
npm.cmd start
Remove-Item Env:MONGODB_URI
Remove-Item Env:PORT
```

Očekuj poruku o neuspešnom povezivanju i da API na portu 5001 nije dostupan.
Privremene promenljive se uklanjaju poslednjim dvema komandama.

## API i ručna provera

Otvori http://127.0.0.1:5000/api/health u pregledaču. Očekuj status `200` i:

```json
{
  "status": "ok",
  "service": "zavrzlama-backend"
}
```

Ili iz drugog PowerShell terminala:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:5000/api/health
```

Ova ruta potvrđuje da server odgovara; ne proverava bazu podataka.
Nepoznata adresa, na primer `/api/nepostojeca`, vraća status `404` i:

```json
{ "message": "Ruta nije pronađena." }
```

Ako promeniš port, koristi novi port i u adresama za proveru.

## Provera sintakse

```powershell
npm.cmd run check
```

Ova komanda proverava sintaksu sva tri JavaScript fajla bez pokretanja servera.
Uspešna provera prolazi bez grešaka; nije zamena za proveru HTTP odgovora.

## Struktura

```text
src/
  app.js        # Express aplikacija, health ruta i odgovor za nepoznate adrese
  server.js     # Provera porta i pokretanje servera
  config/
    db.js       # Povezivanje sa MongoDB bazom preko Mongoose-a
.env.example    # Primer lokalne konfiguracije bez tajnih podataka
```

Express ruta povezuje HTTP metod i putanju sa funkcijom koja obrađuje zahtev.
`req` predstavlja zahtev, a `res` odgovor. `_req` označava da zahtev trenutno
ne koristimo. `res.status(...).json(...)` šalje status i JSON podatke.

Dokumentacija:

- https://expressjs.com/en/starter/hello-world/
- https://nodejs.org/docs/latest-v24.x/api/cli.html
- https://mongoosejs.com/docs/connections.html
