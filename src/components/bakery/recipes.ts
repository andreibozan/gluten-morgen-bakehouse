export type Recipe = { title: string; time: string; ingredients: string[]; steps: string };
export type Pairing = { slug: string; pairing: string; recipes: Recipe[] };

export const pairings: Pairing[] = [
  {
    slug: "paine-taraneasca",
    pairing: "Unt bun, brânză telemea, zacuscă, ouă, supe și ciorbe.",
    recipes: [
      { title: "Bruschete cu roșii și usturoi", time: "15 min", ingredients: ["4 felii pâine țărănească", "3 roșii coapte", "1 cățel usturoi", "busuioc, ulei de măsline, sare"], steps: "Prăjește feliile pe grill sau în tigaie uscată. Freacă-le cu usturoi, pune roșiile tăiate cubulețe cu busuioc, sare și ulei." },
      { title: "Ouă poșate pe pâine prăjită", time: "15 min", ingredients: ["2 felii pâine", "2 ouă", "unt", "ceapă verde, piper"], steps: "Prăjește pâinea în unt. Poșează ouăle 3 minute în apă cu puțin oțet și așază-le deasupra, cu ceapă verde și piper." },
      { title: "Supă de roșii cu crutoane", time: "40 min", ingredients: ["1 kg roșii", "1 ceapă", "2 felii pâine", "ulei, cimbru"], steps: "Călește ceapa, adaugă roșiile, fierbe 25 de minute și pasează. Taie pâinea cuburi, rumenește-le cu ulei și cimbru la cuptor și servește-le deasupra." },
    ],
  },
  {
    slug: "paine-cheddar-jalapenos",
    pairing: "Bere blondă, chili, avocado, piept de pui, ouă jumări.",
    recipes: [
      { title: "Grilled cheese picant", time: "10 min", ingredients: ["2 felii pâine cheddar & jalapeños", "cheddar ras", "unt"], steps: "Unge feliile pe exterior cu unt, pune cheddar între ele și rumenește în tigaie la foc mediu, câte 3 minute pe parte." },
      { title: "Toast cu avocado și ou", time: "10 min", ingredients: ["2 felii pâine", "1 avocado", "2 ouă", "lime, fulgi de chili"], steps: "Prăjește pâinea, zdrobește avocado cu lime și sare, întinde-l pe felii și pune deasupra un ou ochi și fulgi de chili." },
      { title: "Chili con carne cu pâine", time: "1 h", ingredients: ["500 g carne tocată", "1 conservă fasole roșie", "roșii, ceapă, chimion"], steps: "Rumenește carnea cu ceapa, adaugă roșii, fasole și condimente și fierbe 40 de minute. Servește cu felii groase de pâine pentru înmuiat." },
    ],
  },
  {
    slug: "paine-usturoi-rozmarin",
    pairing: "Friptură, carne la grătar, ciuperci, brânză de capră, vin roșu.",
    recipes: [
      { title: "Pâine cu unt de ierburi la cuptor", time: "15 min", ingredients: ["1 pâine cu usturoi și rozmarin", "80 g unt moale", "pătrunjel, sare de mare"], steps: "Crestează pâinea, umple crestăturile cu unt amestecat cu pătrunjel și coace 10 minute la 200°C." },
      { title: "Crostini cu ciuperci", time: "20 min", ingredients: ["6 felii pâine", "300 g ciuperci", "unt, cimbru, parmezan"], steps: "Sotează ciupercile în unt cu cimbru, apoi pune-le pe feliile prăjite și rade parmezan deasupra." },
      { title: "Platou cu brânză de capră și miere", time: "10 min", ingredients: ["felii pâine", "brânză de capră", "miere, nuci"], steps: "Prăjește ușor feliile, pune brânza de capră, un fir de miere și nuci zdrobite." },
    ],
  },
  {
    slug: "paine-rosii-busuioc",
    pairing: "Mozzarella, prosciutto, paste, salate de vară, vin alb.",
    recipes: [
      { title: "Sandviș caprese", time: "10 min", ingredients: ["2 felii pâine cu roșii uscate", "mozzarella", "roșie, busuioc, pesto"], steps: "Unge pâinea cu pesto, adaugă felii de mozzarella, roșie și busuioc. Poți să-l presezi cald în tigaie." },
      { title: "Panzanella", time: "20 min", ingredients: ["4 felii pâine de o zi", "roșii, castravete, ceapă roșie", "ulei de măsline, oțet de vin"], steps: "Taie pâinea cuburi și rumenește-o ușor. Amestec-o cu legumele tăiate și dressingul și las-o 10 minute să se îmbibe." },
      { title: "Tartine cu prosciutto și rucola", time: "10 min", ingredients: ["felii pâine", "prosciutto", "rucola, parmezan, ulei"], steps: "Prăjește feliile, pune prosciutto, rucola și așchii de parmezan, apoi un strop de ulei." },
    ],
  },
  {
    slug: "chifle-artizanale",
    pairing: "Burgeri, pulled pork, mic dejun, sandvișuri la pachet.",
    recipes: [
      { title: "Burger de casă", time: "30 min", ingredients: ["4 chifle", "500 g carne tocată de vită", "cheddar, salată, roșie, ceapă"], steps: "Formează 4 chiftele, gătește-le pe grill 3–4 minute pe parte, pune cheddar la final. Prăjește chiflele tăiate și asamblează." },
      { title: "Chiflă cu pulled pork", time: "3 h", ingredients: ["1 kg ceafă de porc", "sos barbecue", "salată de varză"], steps: "Coace carnea acoperită 2,5 ore la 160°C, destram-o cu sos barbecue și servește-o în chiflă cu salată de varză." },
      { title: "Chiflă de mic dejun", time: "10 min", ingredients: ["2 chifle", "2 ouă", "bacon, cașcaval"], steps: "Prăjește baconul, fă ouăle ochi, pune-le cu cașcavalul în chifla încălzită." },
    ],
  },
  {
    slug: "bagheta-rustica",
    pairing: "Brânzeturi, pateuri, unt și gem, supe franțuzești.",
    recipes: [
      { title: "Baghetă cu unt și gem", time: "5 min", ingredients: ["baghetă", "unt bun", "gem de caise"], steps: "Taie bagheta pe lungime, unge cu unt rece și gem. Micul dejun franțuzesc clasic." },
      { title: "Supă de ceapă gratinată", time: "1 h", ingredients: ["1 kg ceapă", "1 l supă de vită", "felii baghetă", "cașcaval ras"], steps: "Caramelizează ceapa 40 de minute, adaugă supa și fierbe 15 minute. Pune deasupra felii de baghetă cu cașcaval și gratinează." },
      { title: "Platou de brânzeturi", time: "10 min", ingredients: ["baghetă", "3 brânzeturi diferite", "struguri, nuci, miere"], steps: "Taie bagheta felii oblice și aranjează-le pe un platou cu brânzeturile, fructele și nucile." },
    ],
  },
  {
    slug: "paine-integrala",
    pairing: "Somon, avocado, hummus, ouă, brânză proaspătă.",
    recipes: [
      { title: "Tartine cu somon și cremă de brânză", time: "10 min", ingredients: ["felii pâine integrală", "somon afumat", "cremă de brânză, mărar, lămâie"], steps: "Întinde crema de brânză, pune somonul, mărar și câteva picături de lămâie." },
      { title: "Toast cu hummus și legume", time: "10 min", ingredients: ["felii pâine", "hummus", "castravete, ridichi, semințe"], steps: "Prăjește pâinea, întinde hummus, adaugă legumele feliate și semințele." },
      { title: "Budincă de pâine cu mere", time: "50 min", ingredients: ["4 felii pâine de o zi", "2 mere", "2 ouă, 300 ml lapte, scorțișoară, miere"], steps: "Taie pâinea și merele cuburi, toarnă peste ele ouăle bătute cu lapte, miere și scorțișoară. Coace 35 de minute la 180°C." },
    ],
  },
  {
    slug: "painea-saptamanii",
    pairing: "Se schimbă în fiecare săptămână. Întreabă-ne cu ce se potrivește lotul curent.",
    recipes: [
      { title: "Felii prăjite cu ulei și sare", time: "5 min", ingredients: ["felii pâine", "ulei de măsline bun", "sare de mare"], steps: "Cel mai simplu mod de a gusta o pâine nouă: prăjită, cu ulei și puțină sare." },
      { title: "Sandviș deschis de sezon", time: "10 min", ingredients: ["felii pâine", "brânză proaspătă", "legume de sezon"], steps: "Întinde brânza și adaugă ce legume ai din piață săptămâna asta." },
      { title: "Crutoane pentru salată", time: "15 min", ingredients: ["pâine de o zi", "ulei, ierburi uscate"], steps: "Taie cuburi, amestecă cu ulei și ierburi și coace 10 minute la 200°C. Nu arunci nimic din pâine." },
    ],
  },
];
