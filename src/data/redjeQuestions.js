// Pitanja za igru REĐE!
// Format odgovora: "Tekst/drugi oblik/treći oblik:procenat", odvojeno zarezima.
// Procenat = naša procena koliko % ljudi bi dalo taj odgovor (dok nema pravih podataka).
export const REDJE_QUESTIONS = [
  {
    category: 'Geografija',
    prompt: 'Navedi grad u Srbiji.',
    answers: `Beograd/BG:35, Novi Sad/NS:20, Niš:15, Kragujevac:8, Subotica:5, Čačak:3, Kraljevo:3,
      Zrenjanin:2, Pančevo:2, Šabac:2, Smederevo:2, Valjevo:2, Leskovac:2, Kruševac:2, Užice:2,
      Novi Pazar:2, Sombor:1, Vranje:1, Zaječar:1, Pirot:1, Jagodina:1, Loznica:1, Požarevac:1,
      Sremska Mitrovica:1, Kikinda:1, Vršac:1, Bor:1, Prokuplje:1, Negotin:1, Aranđelovac:1,
      Ivanjica:1, Paraćin:1, Ćuprija:1, Gornji Milanovac:1, Bečej:1, Inđija:1, Ruma:1, Kladovo:1,
      Sokobanja/Soko Banja:1, Vrnjačka Banja:1`,
  },
  {
    category: 'Geografija',
    prompt: 'Navedi državu u Evropi.',
    answers: `Srbija:15, Nemačka:12, Francuska:12, Italija:10, Španija:7, Hrvatska:5, Grčka:4,
      Austrija:4, Velika Britanija/Ujedinjeno Kraljevstvo/UK/Engleska:4, Rusija:3, Švajcarska:3,
      Crna Gora:3, Bosna i Hercegovina/BiH/Bosna:3, Portugal:2, Holandija/Nizozemska:2, Poljska:2,
      Mađarska:2, Rumunija:2, Bugarska:2, Severna Makedonija/Makedonija:2, Slovenija:2, Švedska:2,
      Norveška:2, Belgija:1, Albanija:1, Češka:1, Slovačka:1, Ukrajina:1, Belorusija:1, Finska:1,
      Danska:1, Island:1, Irska:1, Estonija:1, Letonija:1, Litvanija:1, Moldavija:1, Luksemburg:1,
      Lihtenštajn:1, Monako:1, Andora:1, San Marino:1, Vatikan:1, Malta:1, Kipar:1`,
  },
  {
    category: 'Hrana',
    prompt: 'Navedi jelo srpske kuhinje.',
    answers: `Sarma:20, Ćevapi/Ćevapčići:18, Pljeskavica:12, Gibanica:8, Pasulj/Prebranac:6, Burek:5,
      Ajvar:4, Karađorđeva šnicla/Karađorđeva:4, Proja:3, Kajmak:3, Punjene paprike:3, Musaka:3,
      Pečenje:3, Podvarak:2, Đuveč:2, Kačamak:2, Pihtije/Piktije:2, Uštipci:2, Sataraš:2,
      Ražnjići:2, Gulaš:2, Pita:2, Šopska salata:2, Svadbarski kupus:1, Mućkalica:1, Riblja čorba:1,
      Teleća čorba:1, Urnebes:1, Komplet lepinja:1, Vešalica:1, Prasetina:1, Jagnjetina:1`,
  },
  {
    category: 'Geografija',
    prompt: 'Navedi reku u Srbiji.',
    answers: `Dunav:35, Sava:25, Morava/Velika Morava:15, Tisa:8, Drina:8, Ibar:3, Zapadna Morava:2,
      Južna Morava:2, Timok:2, Nišava:2, Kolubara:2, Tamiš:1, Begej:1, Lim:1, Mlava:1, Toplica:1,
      Pek:1, Jadar:1, Rasina:1, Pčinja:1, Studenica:1, Uvac:1, Đetinja:1, Jablanica:1`,
  },
  {
    category: 'Hrana',
    prompt: 'Navedi voće.',
    answers: `Jabuka:30, Banana:15, Kruška:8, Šljiva:7, Jagoda:7, Pomorandža/Narandža:6, Grožđe:4,
      Trešnja:4, Višnja:3, Lubenica:3, Breskva:3, Kajsija:3, Malina:2, Kupina:2, Dinja:2, Limun:2,
      Ananas:2, Kivi:2, Mandarina:2, Smokva:1, Dunja:1, Nar:1, Mango:1, Borovnica:1, Ribizla:1,
      Grejpfrut:1, Kokos:1, Avokado:1, Papaja:1`,
  },
  {
    category: 'Priroda',
    prompt: 'Navedi životinju koja živi na farmi.',
    answers: `Krava:30, Svinja:15, Kokoška/Kokoš/Koka:15, Ovca:10, Konj:8, Koza:6, Patka:3, Guska:3,
      Ćurka/Tuka:2, Magarac:2, Pas:2, Petao:2, Zec:1, Mačka:1, Bik:1, Tele:1, Jagnje:1, Prase:1, Pile:1`,
  },
  {
    category: 'Geografija',
    prompt: 'Navedi glavni grad neke evropske države.',
    answers: `Pariz:20, London:15, Rim:12, Berlin:10, Beograd:8, Madrid:6, Beč:6, Atina:3, Zagreb:3,
      Budimpešta:3, Moskva:3, Amsterdam:2, Lisabon:2, Prag:2, Varšava:1, Sofija:1, Bukurešt:1,
      Podgorica:1, Sarajevo:1, Skoplje:1, Ljubljana:1, Brisel:1, Bern:1, Stokholm:1, Oslo:1,
      Kopenhagen:1, Helsinki:1, Dablin:1, Rejkjavik:1, Tirana:1, Bratislava:1, Kijev:1, Minsk:1,
      Talin:1, Riga:1, Viljnus:1, Kišinjev:1, Luksemburg:1, Valeta:1, Nikozija:1, Vaduz:1,
      Andora la Velja:1, San Marino:1, Monako:1`,
  },
  {
    category: 'Sport',
    prompt: 'Navedi sport koji se igra loptom.',
    answers: `Fudbal:40, Košarka:25, Odbojka:10, Rukomet:8, Tenis:5, Vaterpolo:4, Stoni tenis/Pingpong:2,
      Ragbi:1, Golf:1, Bejzbol:1, Američki fudbal:1, Kriket:1, Futsal/Mali fudbal:1,
      Kuglanje/Bouling:1, Bilijar:1, Polo:1, Hokej na travi:1, Odbojka na pesku:1, Softbol:1, Skvoš:1`,
  },
  {
    category: 'Razno',
    prompt: 'Navedi boju.',
    answers: `Crvena:25, Plava:20, Zelena:12, Žuta:10, Crna:7, Bela:6, Ljubičasta:4, Narandžasta:4,
      Roze/Ružičasta:4, Siva:2, Braon/Smeđa:2, Tirkizna:1, Bež:1, Zlatna:1, Srebrna:1, Bordo:1,
      Lila:1, Indigo:1, Maslinasta:1, Teget:1, Krem:1, Cijan:1, Magenta:1, Oker:1`,
  },
  {
    category: 'Muzika',
    prompt: 'Navedi muzički instrument.',
    answers: `Gitara:30, Klavir:20, Violina:12, Bubanj/Bubnjevi:10, Harmonika:5, Truba:4, Flauta:4,
      Saksofon:3, Frula:2, Gusle:2, Tamburica:1, Bas gitara:1, Violončelo/Čelo:1, Kontrabas:1,
      Klarinet:1, Harfa:1, Trombon:1, Orgulje:1, Sintisajzer:1, Ksilofon:1, Usna harmonika:1,
      Ukulele:1, Mandolina:1, Tuba:1, Oboa:1, Fagot:1, Triangl:1, Tarabuka:1`,
  },
  {
    category: 'Geografija',
    prompt: 'Navedi planinu u Srbiji.',
    answers: `Kopaonik:30, Zlatibor:25, Tara:10, Fruška gora:8, Stara planina:6, Rtanj:4, Avala:3,
      Suva planina:2, Šar planina:2, Prokletije:2, Golija:2, Zlatar:2, Ozren:1, Maljen:1, Rudnik:1,
      Povlen:1, Jastrebac:1, Besna Kobila:1, Bukulja:1, Kosmaj:1, Juhor:1, Homolje:1, Javor:1, Radan:1`,
  },
  {
    category: 'Hrana',
    prompt: 'Navedi povrće.',
    answers: `Krompir:25, Paradajz:15, Krastavac:8, Šargarepa:8, Paprika:8, Luk/Crni luk:7, Kupus:6,
      Beli luk:3, Grašak:3, Pasulj:2, Tikvica:2, Plavi patlidžan/Patlidžan:2, Spanać:2, Brokoli:2,
      Karfiol:2, Cvekla:2, Zelena salata/Salata:2, Kukuruz:2, Rotkvica:1, Praziluk:1, Celer:1,
      Peršun:1, Bundeva:1, Boranija:1, Blitva:1, Kelj:1`,
  },
  {
    category: 'Škola',
    prompt: 'Navedi predmet u školi.',
    answers: `Matematika:30, Srpski jezik/Srpski:20, Fizika:6, Hemija:6, Biologija:6, Istorija:6,
      Geografija:6, Engleski jezik/Engleski:6, Fizičko vaspitanje/Fizičko:5, Likovna kultura/Likovno:3,
      Muzička kultura/Muzičko:3, Informatika:3, Tehnika i tehnologija/Tehničko:2, Filozofija:1,
      Psihologija:1, Sociologija:1, Latinski jezik/Latinski:1, Nemački jezik/Nemački:1,
      Francuski jezik/Francuski:1, Ruski jezik/Ruski:1, Veronauka:1, Građansko vaspitanje/Građansko:1,
      Ekonomija:1, Logika:1`,
  },
  {
    category: 'Razno',
    prompt: 'Navedi zanimanje.',
    answers: `Lekar/Doktor:25, Nastavnik/Učitelj:12, Policajac:8, Programer:8, Advokat:4, Inženjer:4,
      Pekar:3, Vatrogasac:3, Kuvar:3, Profesor:2, Pilot:2, Frizer:2, Zubar/Stomatolog:2,
      Medicinska sestra:2, Vozač:2, Glumac:2, Pevač:2, Novinar:1, Arhitekta:1, Konobar:1, Prodavac:1,
      Mesar:1, Stolar:1, Električar:1, Vodoinstalater:1, Poštar:1, Farmaceut:1, Veterinar:1, Sudija:1,
      Ekonomista:1, Psiholog:1, Fotograf:1, Krojač:1, Bravar:1, Zidar:1, Rudar:1, Ribar:1,
      Poljoprivrednik/Zemljoradnik/Seljak:1`,
  },
  {
    category: 'Priroda',
    prompt: 'Navedi pticu.',
    answers: `Vrabac:20, Golub:15, Orao:12, Vrana:8, Lasta:5, Roda:5, Sova:5, Papagaj:4, Labud:2, Detlić:2,
      Kos:2, Svraka:2, Soko:2, Gavran:1, Jastreb:1, Slavuj:1, Galeb:1, Čaplja:1, Pelikan:1, Flamingo:1,
      Pingvin:1, Noj:1, Paun:1, Kanarinac:1, Senica/Sinica:1, Čvorak:1, Kukavica:1, Grlica:1, Ševa:1,
      Fazan:1, Prepelica:1, Kolibri:1, Tukan:1`,
  },
  {
    category: 'Nauka',
    prompt: 'Navedi planetu Sunčevog sistema.',
    answers: `Zemlja:25, Mars:25, Jupiter:15, Saturn:10, Venera:8, Merkur:6, Neptun:5, Uran:5`,
  },
  {
    category: 'Razno',
    prompt: 'Navedi deo tela.',
    answers: `Ruka:20, Glava:15, Noga:12, Oko:8, Nos:6, Uvo:5, Srce:4, Prst:4, Usta:3, Kosa:3, Koleno:2,
      Lakat:2, Rame:2, Vrat:2, Stomak:2, Leđa:2, Zub:2, Jezik:1, Obrva:1, Trepavica:1, Brada:1,
      Čelo:1, Obraz:1, Pluća:1, Jetra:1, Bubreg:1, Mozak:1, Šaka:1, Stopalo:1, Peta:1, Zglob:1,
      Nokat:1, Grudi:1, Kuk:1, Usna:1`,
  },
  {
    category: 'Priroda',
    prompt: 'Navedi vrstu drveta.',
    answers: `Hrast:25, Bor:15, Jela:8, Bukva:8, Breza:7, Lipa:6, Javor:4, Topola:4, Vrba:4, Smrča:3,
      Kesten:2, Jasen:2, Orah:2, Bagrem:2, Omorika/Pančićeva omorika:2, Platan:1, Grab:1, Brest:1,
      Jablan:1, Kedar:1, Čempres:1, Palma:1, Ariš:1, Tisa:1, Jova:1, Dren:1, Maslina:1, Eukaliptus:1,
      Baobab:1, Sekvoja:1`,
  },
  {
    category: 'Hrana',
    prompt: 'Navedi piće.',
    answers: `Voda:20, Kafa:15, Čaj:10, Sok:8, Mleko:6, Pivo:6, Rakija:6, Vino:5, Limunada:3, Jogurt:3,
      Kakao:2, Kisela voda/Mineralna voda:2, Viski:1, Votka/Vodka:1, Džin:1, Rum:1, Šampanjac:1,
      Kefir:1, Smuti:1, Boza:1, Ledeni čaj:1, Kompot:1, Šejk:1, Tekila:1, Liker:1, Kvas:1,
      Špricer:1`,
  },
  {
    category: 'Razno',
    prompt: 'Navedi mesec u godini.',
    answers: `Januar:10, Februar:8, Mart:8, April:8, Maj:10, Jun/Juni:9, Jul/Juli:10, Avgust:10,
      Septembar:8, Oktobar:7, Novembar:6, Decembar:10`,
  },
]

// Pretvori tekst "Novi Sad/NS:20, ..." u niz objekata { text, aliases, basePopularity }
export function parseAnswers(text) {
  return text
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [names, popularity] = part.split(':')
      const [main, ...aliases] = names.split('/').map((name) => name.trim())
      return { text: main, aliases, basePopularity: Number(popularity) }
    })
}
