# Zavrzlama — backend

Backend univerzitetskog projekta Zavrzlama. Trenutno sadrži Node.js i Express
server sa jednom rutom za proveru rada. MongoDB i komunikaciju sa frontendom
dodajemo u narednim koracima.

## Instalacija i pokretanje

Koristi Node.js 24 ili noviji. Provereno sa Node.js 24.14.0 i npm 11.9.0.
Iz foldera `zavrzlama-backend` pokreni:

```powershell
npm.cmd ci
npm.cmd run dev
```

Na drugim sistemima koristi `npm` umesto `npm.cmd`.
`npm ci` instalira zavisnosti prema `package-lock.json`.
Komanda `dev` koristi Node-ov `--watch` režim, koji ponovo pokreće server
kada sačuvaš promenu u kodu. Server zaustavljaš sa `Ctrl+C`.
Za pokretanje bez praćenja promena koristi `npm.cmd start`.

Očekivana poruka:

```text
Zavrzlama API: http://localhost:3000/api/health
```

Ako je port 3000 zauzet, zaustavi prethodnu instancu svog servera.
Greška pri pokretanju se ispisuje u terminalu i proces završava sa kodom 1.

## Struktura i način rada

```text
src/
  app.js     # Express aplikacija i definicija rute
  server.js  # Pokretanje servera na portu 3000
```

`type: module` u `package.json` omogućava `import` i `export` sintaksu.
`app.get` definiše odgovor na GET zahtev za zadatu putanju.
`req` predstavlja zahtev klijenta, a `res` odgovor servera.
`res.status(200).json(...)` vraća uspešan odgovor sa JSON podacima.
`app.listen` pokreće slušanje dolaznih zahteva.

Odvajanje aplikacije od pokretanja omogućava da kasnije proveravamo rute
bez pokretanja servera na fiksnom portu.
[Zvanični Express primer](https://expressjs.com/en/starter/hello-world/).

## Provera

Proveri sintaksu:

```powershell
npm.cmd run check
```

Ova komanda proverava sintaksu oba izvorna fajla; ne proverava HTTP ponašanje.
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

## Git

Čuvamo `package.json`, `package-lock.json`, izvorni kod i dokumentaciju.
`node_modules` i `.env` fajlovi su ignorisani. Za ovaj korak `.env` nije potreban.
