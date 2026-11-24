/**
 * Every user-facing string on the home page, in one place for translation.
 *
 * - `lang` marks text that is already Slovenian; everything else is English for now.
 * - In headings, `em` is the part set in italic serif.
 * - PLACEHOLDER marks copy still waiting on final wording.
 */

export const home = {
  nav: {
    links: [
      { href: "#process", label: "Kako poteka" },
      { href: "#pricing", label: "Cenik" },
      { href: "#faq", label: "FAQ" },
    ],
    pill: "Dodaj geslo",
  },

  hero: {
    lang: "sl",
    title: { before: "Ste že razmišljali o novi spletni strani?" },
    /** One entry per line. */
    aside: ["Najprej jo izdelamo.", "Plačate šele, če vam je všeč."],
    cta: "Preizkusite",
    scroll: "Nižje",
  },

  whatWeDo: {
    title: { lang: "sl", text: "Vaša spletna stran je vaš prvi stik" },
    /** PLACEHOLDER: subheadline to come from the collaborator. */
    sub: "Lahko prinese nove stranke ali pa jih odžene h konkurenci. Kako je pri vas?",
  },
  
  howItWorks: {
    label: "Kako poteka",
    title: { before: "Štirje koraki. Naročite šele, ko boste zadovoljni." },
    stepWord: "Korak",
    steps: [
      {
        title: "Pošljete",
        meta: "20 € rezervacije",
        body: "Pošljete naslov svoje strani (ali predstavite podjetje, če strani še nimate). Lahko dodate tudi okvirne želje glede vsebine, dizajna, dinamike. Dodali boste 20 € rezervacije, ki jo v celoti in brez vprašanj vrnemo, če dizajn ne bo ustrezal vašim pričakovanjem.",
      },
      {
        title: "Izdelamo",
        meta: "Predogled bo viden samo vam",
        body: "Stran bomo analizirali, poiskali najbolj optimalne rešitve in jo v naslednjih 24 urah izdelali. Skrita bo pred javnostjo in vidna samo z geslom, ki vam ga pošljemo.",
      },
      {
        title: "Odločite se",
        meta: "Če ne ustreza",
        body: "Če spletna stran ne odgovarja vašim pričakovanjem, jo lahko enostavno z enim klikom stran sami izbrišete. Brez obveznosti, brez vprašanj, rezervacija pa bo povrnjena po vaši zahtevi.",
      },
      {
        title: "Dokončamo",
        meta: "Stran bo izdelana v treh dneh",
        body: "Če stran ustreza vašim pričakovanjem, potem nadaljujemo. Prisluhnili bomo vašim dopolnitvam, spremembam; lahko se dogovorimo tudi za morebitne dodatke, npr. več strani ali blokov, email avtomatizacijo, SEO optimizacijo, trgovino in drugo. V tem primeru izdelavo strani naročite in dokončana bo v treh dneh.",
      },
    ],
  },

  previewAccess: {
    label: "Predogled vaše nove strani",
    title: { before: "Zasebni ogled" },
    body: [
      "Ko naslovno stran dokončamo (korak 02), vam bomo poslali geslo. Vnesli ga boste na desni strani in stran bo vidna samo vam.",
      "Predogled ne pomeni, da je stran dokončana in da povezave delujejo, bo pa dovolj, da dobite vpogled v predviden dizajn, vašo predstavitev, videz na telefonu, morda pa dobite še kakšno idejo za dopolnitev.",
    ],
    primary: { label: "Povezava do obstoječe strani", href: "#start" },
    secondary: { label: "Kako deluje", href: "#process" },
    card: {
      eyebrow: "Zasebni ogled",
      title: "Vnesi geslo",
      text: "Geslo pošljemo po e-pošti.",
      inputLabel: "Vnos gesla",
      button: "Prikaži stran",
      checking: "Preverjam…",
      note: "Op. Geslo včasih konča v mapi z neželeno pošto. Preverite tudi to, če gesla niste prejeli.",
    },
    errors: {
      format: "Geslo je sestavljeno iz 6 črk ali številk. Preverite email, ki smo vam ga poslali.",
      notFound: "Geslo je napačno. Poskusite ponovno ali nas kontaktirajte.",
    },
  },

  pricing: {
    label: "Cenik",
    title: { before: "Brezplačno. Razen če vas navdušimo." },
    sub: "Dokončno ceno oblikujemo šele v zadnjem koraku, ko predviden dizajn že potrdite in dodate morebitne nadgradnje.",
    prices: [
      { amount: 0, label: "Če vas ne prepričamo", note: "20 € rezervacije bo povrnjenih." },
      { amount: 249, label: "Če jo želite dokončati", note: "Moderna predstavitev na eni strani" },
    ],
    cta: "Dodaj povezavo do svoje strani",
    includesLabel: "Kaj je vključeno",
    includes: [
      { title: "Moderna predstavitev na eni strani", text: "Do šest sekcij/blokov." },
      { title: "Povezava s socialnimi omrežji", text: "Vse povezave do vaših socialnih omrežij in drugih spletnih strani." },
      { title: "Kontaktni obrazec ali gumb za klic", text: "Stranke vas lahko pokličejo ali pišejo z enim dotikom." },
      { title: "Piškotki in obvezne pravne strani", text: "Podatki o ponudniku, politika zasebnosti in obvestilo o piškotkih, prilagojeni vaši strani." },
      { title: "Optimizacija slik", text: "Optimizacija in hitro nalaganje strani." },      
      { title: "Osnovni SEO", text: "Da vas Google najde in pokaže v iskalnikih." },
      { title: "Mobilna verzija vaše strani", text: "Večina vaših strank prihaja do vas preko telefonov, zato je to prioriteta." },
      { title: "Dopolnila in spremembe", text: "Včasih šele po ogledu skupaj ugotovimo, da bi bila dobrodošla kakšna manjša sprememba." },
      { title: "Izdelava v treh dneh", text: "Potrudili se bomo, da je vaša stran pravočasno izdelana." },
      { title: "Namestitev na vašo domeno", text: "Stran namestimo na vašo domeno in poskrbimo, da vse deluje." },
    ],
    extras: "Rabite več strani, nadstandardno optimizacijo SEO, trgovino, plačila, avtomatizacije? Pogovorimo se in našli bomo rešitve.",
  },

  whatYouGet: {
    label: "Kaj dobite",
    title: { before: "Stran, ki odpira nove priložnosti" },
    layers: {
      domain: { name: "Namestitev", line: "Vaša domena, vaš prostor na spletu. Mi poskrbimo, da vse deluje." },
      code: { name: "Koda", line: "Pregledna in urejena, da jo razume vsak razvijalec. Lastnik ste vi." },
      structure: { name: "Struktura", line: "Jasna zgradba, da vas Google razume, najde in prikaže." },
      design: { name: "Dizajn", line: "Sodoben, jasen, pregleden, prilagojen telefonu." },
      words: { name: "Besedila", line: "Jasna, kratka, prepričljiva. Brez praznih fraz." },
    },
    states: { finished: "Bolj vidni. Bolj prepričljivi.", assembled: "Sestavljena", hint: "Razstavi jo.", closing: "Vaša nova spletna stran.", layerWord: "Plast" },
  },

  faq: {
    label: "Vprašanja",
    title: { before: "Pogosta vprašanja" },
    more: { before: "Imate vprašanje? ", link: "Pišite nam." },
    items: [
      {
        q: "Koliko stane spletna stran?",
        a: "249 € za enostransko predstavitveno stran, če se odločite, da jo obdržite. Če ne, vas ne stane nič: rezervacija 20 € bo povrnjena. Brez rizika.",
      },      
      {
        q: "Zakaj je potrebna rezervacija 20 €?",
        a: "Brezplačno delamo do trenutka, ko vas navdušimo. Rezervacija potrdi, da je vaše povpraševanje resno, nas pa vsaj delno obvaruje pred zlorabami. Brez tega ponudba ne bi bila tako ugodna. ",
      },      
      {
        q: "Kako poteka rezervacija?",
        a: "Plačila obdelujemo prek Stripe, enega največjih ponudnikov spletnih plačil. Stripe na vaši kartici rezervira 20 €; denar tako ostane na vašem računu. Če se ne odločite za nadaljevanje, se rezervacija sprosti in na vašem računu odblokira v nekaj dneh, odvisno od banke. Če stran obdržite, se 20 € všteje v ceno.",
      },      
      {
        q: "Ali vzamete vsako povpraševanje v delo?",
        a: "Nikakor ne. To ne bi bilo mogoče časovno, niti ne bi bilo ekonomsko upravičeno. Med povpraševanji izberemo tiste, za katere verjamemo, da je interes pristen in kjer ugotovimo, da bi modernizacija lahko bila koristna za naročnika.",
      },
      {
        q: "Kaj če s predlaganim dizajnom ne bomo zadovoljni?",
        a: "Pogovorimo se in skupaj poiščemo boljše rešitve. Če želite, lahko tudi odstopite. V tem primeru bo Stripe rezervacijo 20 € v nekaj dneh sprostil.",
      },
      {
        q: "Kaj je z našimi podatki, varnostjo?",
        a: "Vaše podatke obravnavamo skrbno. Če do sodelovanja ne pride, vaše gradivo (slike, logotip, besedila) izbrišemo najkasneje v 48 urah. Vašo stran lahko trajno izbrišete tudi sami s klikom na gumb na strani predogleda. Po predaji projekta stran in podatki ostanejo na vašem gostovanju, pri nas jih ne hranimo.",
      },
      {
        q: "Kaj če še nimam strani, niti domene?",
        a: "Če bo potrebno, vam bomo pomagali najti ugodno rešitev; domeno in gostovanje boste kupili sami in so vaša last, mi pa vam bomo pomagali preseliti stran na vašo novo domeno.",
      },
      {
        q: "Rabimo več strani, dodatne storitve.",
        a: "Postopek je enak. Skupaj bomo pregledali, kakšna so vaša pričakovanja in poiskali ustrezne rešitve. Še pred začetkom del boste seznanjeni s predvidenimi stroški. Ko izdelamo naslovno stran, dokončno dogovorimo tudi vse ostalo.",
      },
      {
        q: "Kdo je lastnik domene, spletne strani?",
        a: "Vi. Domena, gostovanje, e-naslov, koda so vaši. Če bi kasneje potrebovali morebitne spremembe na strani, nam boste morali omogočiti dostop; lahko pa delo nadaljuje tudi drug programer, ker je koda čista, tako da s tem ne bo problemov kasneje.",
      },
      {
        q: "Ponujate še kaj drugega kot spletne strani?",
        a: "Kontaktirajte nas. Morda bomo našli rešitve.",
      },
    ],
  },

  start: {
    label: "Začnimo",
    title: { before: "En klik do nove strani." },
    body: "Pošljite nam povezavo do obstoječe strani ali opišite svoje želje. Običajno odgovorimo v roku 24 ur z že pripravljenim okvirom načrta.",
    form: {
      site: { label: "Trenutna stran", placeholder: "našastran.si" },
      email: { label: "Vaš e-naslov", placeholder: "podjetje@podjetje.si" },
      submit: "Pošlji",
      sending: "Pošiljam…",
      consent: {
        before: "Z oddajo se strinjate z obdelavo vašega e-naslova za odgovor na povpraševanje. ",
        link: "Politika zasebnosti",
        href: "/sl/zasebnost",
      },
      due: "Cena: 0 €",
      okEyebrow: "Povpraševanje oddano",
      ok: { before: "Prejeli smo povpraševanje. Odgovorili bomo ", after: " predvidoma v enem dnevu." },
      errors: {
        site: "Vnesi naslov spletne strani ali ime podjetja.",
        email: "Vnesite veljaven e-naslov.",
        server: "Prišlo je do napake. Poskusi znova čez nekaj minut.",
      },
    },
  },

  footer: {
    links: [
      { href: "#process", label: "Kako poteka" },
      { href: "#pricing", label: "Cenik" },
      { href: "#faq", label: "FAQ" },
    ],
    copyright: "© 2026 Spletne.com",
  },
} as const;
