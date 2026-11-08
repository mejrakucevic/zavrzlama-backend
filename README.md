# Zavrzlama — backend

Backend univerzitetskog projekta Zavrzlama. Trenutno sadrži Node.js i Express
server sa rutom za proveru rada i povezivanjem sa MongoDB bazom preko Mongoose-a.
Komunikaciju sa frontendom dodajemo u narednim koracima.

## Instalacija i pokretanje

Koristi Node.js 24 ili noviji. Provereno sa Node.js 24.14.0 i npm 11.9.0.
Iz foldera `zavrzlama-backend` pokreni:

```powershell
npm.cmd ci
Copy-Item .env.example .env
```

Ako `.env` već postoji, nemoj ga prepisivati. U lokalnom `.env` fajlu postavi
`MONGODB_URI` na Atlas connection string, sa korisnikom baze, njegovom lozinkom
i nazivom baze `zavrzlama`. Zameni sve primer vrednosti. Posebni znakovi u
korisničkom imenu i lozinci moraju biti URL-kodirani. U Atlas-u dozvoli pristup
sa svoje trenutne IP adrese. Lozinka korisnika baze nije lozinka Atlas naloga.

Zatim pokreni:

```powershell
npm.cmd run dev
```

Na drugim sistemima koristi `npm` umesto `npm.cmd`.
`npm ci` instalira zavisnosti prema `package-lock.json`.
Komanda `dev` koristi Node-ov `--watch` režim, koji ponovo pokreće server
kada sačuvaš promenu u kodu. Server zaustavljaš sa `Ctrl+C`.
Za pokretanje bez praćenja promena koristi `npm.cmd start`.
Obe komande koriste Node-ov `--env-file=.env` za učitavanje konfiguracije.
`PORT` je opcion i podrazumevano je 3000. Posle izmene `.env` fajla ručno
ponovo pokreni server. Pokretanje zahteva uspešno povezivanje sa bazom.

Ako podrazumevani DNS odbija Atlas SRV upite (`ECONNREFUSED`), u lokalni
`.env` možeš dodati `DNS_SERVERS=1.1.1.1,8.8.8.8` i ponovo pokrenuti server.
To koristi Cloudflare i Google javni DNS samo za Node DNS upite u ovom procesu;
ne menja Windows mrežna podešavanja. Ova promenljiva je opciona i nije potrebna
kada podrazumevani DNS radi. `dns.setServers` utiče na `dns.resolve` upite
(uključujući Atlas SRV/TXT upite), ali ne na sistemski `dns.lookup`.

Očekivana poruka:

```text
MongoDB connected.
Zavrzlama API: http://localhost:3000/api/health
```

Ako je port 3000 zauzet, zaustavi prethodnu instancu svog servera.
Greška pri pokretanju se ispisuje u terminalu i proces završava sa kodom 1.

## Struktura i način rada

```text
src/
  app.js     # Express aplikacija i definicija rute
  config/db.js # Povezivanje sa bazom preko Mongoose-a
  server.js  # Provera porta, povezivanje sa bazom, pa pokretanje servera
```

`type: module` u `package.json` omogućava `import` i `export` sintaksu.
`app.get` definiše odgovor na GET zahtev za zadatu putanju.
`req` predstavlja zahtev klijenta, a `res` odgovor servera.
`res.status(200).json(...)` vraća uspešan odgovor sa JSON podacima.
`app.listen` pokreće slušanje dolaznih zahteva.

Odvajanje aplikacije od pokretanja omogućava da kasnije proveravamo rute
bez pokretanja servera na fiksnom portu.
[Zvanični Express primer](https://expressjs.com/en/starter/hello-world/).

`connectDB` čita `process.env.MONGODB_URI` i čeka `mongoose.connect`.
`await` odlaže sledeći korak dok se povezivanje ne završi. `try/catch`
obrađuje neuspeh: server ispisuje poruku bez connection stringa i završava
sa kodom 1. Za izbor dostupnog servera baze čekamo do 10 sekundi.
Neispravan port se odbija pre povezivanja sa bazom.
[Mongoose dokumentacija](https://mongoosejs.com/docs/connections.html).

## Provera

Proveri sintaksu:

```powershell
npm.cmd run check
```

Ova komanda proverava sintaksu izvornih fajlova; ne proverava HTTP ponašanje.
Zatim, dok server radi, otvori `http://localhost:3000/api/health` u pregledaču.
Očekuj HTTP 200 i JSON:

```json
{"status":"ok","message":"Zavrzlama API is running."}
```

U drugom PowerShell terminalu možeš proveriti status i sadržaj odgovora:

```powershell
$response = Invoke-WebRequest http://localhost:3000/api/health -UseBasicParsing
$response.StatusCode
$response.Content
```

Očekuj status `200` i isti JSON. `http://localhost:3000/` i nepostojeće
putanje vraćaju Express-ov podrazumevani HTTP 404 odgovor.
Health ruta potvrđuje samo da API odgovara; ne proverava bazu podataka.
Pri pokretanju je veza sa bazom obavezna, ali health ruta ne radi dodatni upit
za svaki zahtev. Baza se može pojaviti u Atlas pregledu tek nakon prvog upisa;
u ovom koraku ne kreiramo kolekcije niti upisujemo podatke.

Za proveru nedostajuće konfiguracije u posebnom PowerShell terminalu pokreni:

```powershell
node src/server.js
```

Ako `MONGODB_URI` nije postavljen u okruženju terminala, očekuj poruku da
nedostaje i kod izlaska 1 (`$LASTEXITCODE`). Ova komanda namerno ne učitava `.env`.

## Git

Čuvamo `package.json`, `package-lock.json`, izvorni kod i dokumentaciju.
`node_modules` i `.env` fajlovi su ignorisani. `.env.example` se čuva u Git-u
isključivo sa primer vrednostima bez stvarnih lozinki i connection stringova.
