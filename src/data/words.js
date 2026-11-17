// Reči koje mogu biti tajna reč dana: česte, poznate imenice (nominativ jednine)
export const ANSWER_WORDS = [
  'AVION', 'BAJKA', 'BAKAR', 'BALON', 'BANKA', 'BAŠTA', 'BIBER', 'BRAVA',
  'CIGLA', 'CRKVA', 'CVEĆE', 'ČAMAC', 'ČEKIĆ', 'ČELIK', 'ČETKA', 'ČOVEK',
  'DASKA', 'DEČAK', 'DINJA', 'DUGME', 'DUŠEK', 'ĐUBRE', 'FARMA', 'FLAŠA',
  'GLAVA', 'GOLUB', 'GOVOR', 'GRANA', 'GUSKA', 'HARFA', 'HOTEL', 'HRANA',
  'IGRAČ', 'ISTOK', 'IZVOR', 'JAKNA', 'JELEN', 'JELKA', 'JEZIK', 'JUNAK',
  'JUTRO', 'KAFIĆ', 'KAMEN', 'KANTA', 'KAPAK', 'KAPUT', 'KARTA', 'KLJUČ',
  'KLUPA', 'KOCKA', 'KOFER', 'KOKOŠ', 'KOLAČ', 'KONAC', 'KORAK', 'KORPA',
  'KRALJ', 'KRAVA', 'KRILO', 'KRUNA', 'KUGLA', 'LAKAT', 'LAMPA', 'LANAC',
  'LEPAK', 'LIMUN', 'LISTA', 'LONAC', 'LOPTA', 'LUTKA', 'MAČAK', 'MAČKA',
  'MAGLA', 'MAJKA', 'MARKA', 'MAŠNA', 'MESAR', 'MESEC', 'METLA', 'MIRIS',
  'MLEKO', 'MOMAK', 'MOTOR', 'NAROD', 'NOSAČ', 'NOVAC', 'OBALA', 'OBLAK',
  'OBLIK', 'ODMOR', 'OGANJ', 'OGLAS', 'OKEAN', 'OKVIR', 'OLUJA', 'OPERA',
  'OSMEH', 'PAKET', 'PALMA', 'PAPIR', 'PATKA', 'PEČAT', 'PEKAR', 'PESAK',
  'PESMA', 'PIJAC', 'PILOT', 'PIRAT', 'PISMO', 'PLAŽA', 'POLJE', 'PONOĆ',
  'POTOK', 'PRASE', 'PRIČA', 'PTICA', 'PUTER', 'RADIO', 'RIBAR', 'ROMAN',
  'RUČAK', 'SALON', 'SAPUN', 'SEDLO', 'SENKA', 'SIRUP', 'SLAMA', 'SLIKA',
  'SLOVO', 'SNAGA', 'SOFRA', 'SOKOL', 'SPORT', 'SREĆA', 'STADO', 'STAZA',
  'STENA', 'STRAH', 'SUNCE', 'SUSED', 'SVEĆA', 'SVILA', 'ŠAPAT', 'ŠARAN',
  'ŠATOR', 'ŠEĆER', 'ŠEŠIR', 'ŠKOLA', 'TABLA', 'TAČKA', 'TENIS', 'TEPIH',
  'TESTO', 'TETKA', 'TIGAR', 'TORBA', 'TORTA', 'TRAKA', 'TRAVA', 'TRUBA',
  'TUNEL', 'UGALJ', 'ULICA', 'UŽINA', 'VAGON', 'VATRA', 'VESLO', 'VETAR',
  'VIDRA', 'VIHOR', 'VITEZ', 'VOĆKA', 'VOZAČ', 'VRATA', 'VREME', 'ZAKON',
  'ZAMAK', 'ZAVOJ', 'ZEBRA', 'ZLATO', 'ZMIJA', 'ZUBAR', 'ZVONO', 'ŽELJA',
  'ŽETVA', 'ŽIVOT', 'ŽURKA',
]

// Reči koje su dozvoljeni pokušaji, ali nisu tajne reči:
// množina, glagoli, pridevi, prilozi, brojevi...
export const ALLOWED_WORDS = [
  // množina
  'BAJKE', 'BRAVE', 'CRKVE', 'ČETKE', 'DASKE', 'DINJE', 'GLAVE', 'GRANE',
  'JAKNE', 'KANTE', 'KARTE', 'KLUPE', 'KOCKE', 'KORPE', 'KRAVE', 'KUGLE',
  'LAMPE', 'LISTE', 'LOPTE', 'LUTKE', 'MAČKE', 'MAJKE', 'MAŠNE', 'METLE',
  'PALME', 'PATKE', 'PESME', 'PRIČE', 'PTICE', 'SLIKE', 'STAZE', 'STENE',
  'SVEĆE', 'ŠKOLE', 'TABLE', 'TAČKE', 'TETKE', 'TORBE', 'TORTE', 'TRAKE',
  'ULICE', 'ZMIJE', 'ŽELJE',
  // glagoli
  'ČEKAM', 'ČITAM', 'GLEDA', 'IDEMO', 'IGRAM', 'IMAMO', 'JEDEM', 'KUPIM',
  'LEŽIM', 'MISLI', 'NOSIM', 'PEVAM', 'PIJEM', 'PIŠEM', 'PLIVA', 'RADIM',
  'SEDIM', 'SLUŠA', 'SPAVA', 'STOJI', 'ŠETAM', 'TRČIM', 'VIDIM', 'VOLIM',
  'VOZIM', 'ZNAMO',
  // pridevi
  'CRVEN', 'DOBAR', 'DUBOK', 'GORAK', 'MEKAN', 'NIZAK', 'ŠIROK', 'TEŽAK',
  'TOPAO', 'VELIK', 'VISOK', 'ZELEN',
  // prilozi, brojevi i ostalo
  'DANAS', 'DESET', 'DESNO', 'DEVET', 'DOSTA', 'ISPOD', 'IZNAD', 'JEDAN',
  'KAKAV', 'MALKO', 'MNOGO', 'NIKAD', 'ODMAH', 'OKOLO', 'PORED', 'POSLE',
  'PREKO', 'SEDAM', 'SUTRA', 'ZAŠTO',
]
