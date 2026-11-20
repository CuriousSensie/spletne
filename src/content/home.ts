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
      { href: "#what-we-do", label: "What we do" },
      { href: "#process", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    pill: "Free preview",
  },

  hero: {
    lang: "sl",
    title: { before: "Ste že razmišljali o novi spletni strani?" },
    aside: "Najprej jo izdelamo. Plačate šele, če vam je všeč.",
    cta: "Preizkusite brez obveznosti",
    scroll: "Scroll",
  },

  whatWeDo: {
    title: { lang: "sl", text: "Morda je čas za posodobitev" },
    /** PLACEHOLDER: subheadline to come from the collaborator. */
    sub: "Stranke vas ocenijo v nekaj sekundah. Kaj vidijo pri vas?",
  },
  

  howItWorks: {
    label: "Kako poteka",
    title: { before: "Štirje koraki. Naročite šele, ko boste zadovoljni." },
    stepWord: "Step",
    steps: [
      {
        title: "Pošljete",
        meta: "Preberi zakaj depozit",
        body: "Pošljete naslov svoje trenutne strani (ali predstavite podjetje, če strani še nimate). Lahko dodate tudi okvirne želje glede vsebine, izgleda, dinamike. Dodali boste 20€ depozita, ki ga v celoti in brez vprašanj vrnemo, če dizajn ne bo ustrezal vašim pričakovanjem.",
      },
      {
        title: "Izdelamo",
        meta: "Predogled bo viden samo vam",
        body: "Stran bomo analizirali, poiskali najbolj optimalne rešitve in jo v naslednjih 24 urah izdelali. Skrita bo pred javnostjo in vidna samo preko gesla, ki vam ga pošljemo.",
      },
      {
        title: "Zavržemo",
        meta: "Depozit bo povrnjen",
        body: "V primeru, da spletna stran ne odgovarja vašim pričakovanjem, jo lahko enostavno z enim klikom stran sami izbrišete. Brez obveznosti, brez vprašanj, depozit pa bo povrnjen še istega dne.",
      },
      {
        title: "Dokončamo",
        meta: "Stran bo izdelana v treh dneh",
        body: "Če stran ustreza vašim pričakovanjem, potem nadaljujemo. Prisluhnili bomo vašim dopolnitvam, spremembam; lahko se dogovorimo tudi za morebitne dodatke, npr več strani ali blokov, email avtomatizacijo, SEO optimizacijo, trgovino in drugo. V tem primeru izdelavo strani naročite in dokončana bo v treh dneh.",
      },
    ],
  },

  previewAccess: {
    label: "Predogled vaše nove strani",
    title: { before: "Za ogled strani boste vnesli geslo" },
    body: [
      "Ko naslovno stran dokončamo (korak 02), vam bomo poslali geslo. Vnesli ga boste na desni strani in stran bo vidna samo vam.",
      "Predogled ne pomeni, da je stran dokončana in da povezave delujejo, bo pa dovolj, da dobite vpogled v predviden dizajn, vašo predstavitev, izgled na telefonu, morda pa dobite še kakšno idejo za dopolnitev.",
    ],
    primary: { label: "Povezava do obstoječe strani", href: "#start" },
    secondary: { label: "Kako deluje", href: "#process" },
    card: {
      eyebrow: "Zasebni ogled",
      title: "Vnesite geslo",
      text: "Geslo vam pošljemo po e-pošti.",
      inputLabel: "Vnos kode",
      button: "Prikaži stran",
      checking: "Preverjam…",
      note: "Op. Geslo včasih konča v SPAM mapi na vašem emailu. Preverite tudi to, če gesla niste prejeli.",
    },
    errors: {
      format: "Geslo je sestavljeno iz 6 črk ali številk. Preverite email, ki smo vam ga poslali.",
      notFound: "Geslo je napačno. Poskusite ponovno ali nas kontaktirajte.",
    },
  },

  pricing: {
    label: "Cenik",
    title: { before: "Brezplačno, razen če vas navdušimo." },
    sub: "Dokončno ceno oblikujemo šele v zadnjem koraku, ko predviden dizajn že potrdite in dodate morebitne nadgradnje.",
    prices: [
      { amount: 0, label: "Če smo usekali mimo", note: "Vaših 20€ depozita bo povrnjenih." },
      { amount: 299, label: "Če želite, da izdelamo do konca", note: "Moderna predstavitev na eni strani" },
    ],
    cta: "Dodaj povezavo do trenutne strani",
    includesLabel: "Kaj je vključeno",
    includes: [
      { title: "Moderna predstavitev na eni strani", text: "Do največ šest sekcij/blokov." },
      { title: "Povezava s socialnimi omrežji", text: "Vse povezave do vaših socialnih omrežij in drugih spletnih strani." },
      { title: "Kontaktni obrazec ali gumb za klic", text: "Stranke vas lahko pokličejo ali pišejo z enim dotikom." },
      { title: "Piškotki in obvezne pravne strani", text: "Podatki o ponudniku, politika zasebnosti in obvestilo o piškotkih, prilagojeni vaši strani." },
      { title: "Optimizacija slik", text: "Optimizacija in hitro nalaganje strani." },      
      { title: "Osnovni SEO", text: "Da vas Google najde in pokaže v iskalnikih." },
      { title: "Mobilna verzija vaše strani", text: "Večina vaših strank prihaja do vas preko telefonov, zato je to prioriteta." },
      { title: "Dopolnila in spremembe", text: "Včasih šele po ogledu ugotovimo, da bi bila dobrodošla kakšna manjša sprememba." },
      { title: "Izdelava v treh dneh", text: "Potrudili se bomo, da je vaša stran pravočasno." },
      { title: "Namestitev na vašo domeno", text: "Stran namestimo na vašo obstoječo domeno in poskrbimo, da vse deluje." },
    ],
    extras: "Rabite več strani, nadstandardno optimizacijo SEO, trgovino, plačila, avtomatizacije? Pogovorimo se in našli bomo rešitve.",
  },

  whatYouGet: {
    label: "(05) What you get",
    title: { before: "Every layer is ", em: "yours." },
    layers: {
      domain: { name: "Domain & hosting", line: "In your name. You hold the keys." },
      code: { name: "Code", line: "Clean code, impeccable performance, quick to load, and handed over in full." },
      structure: { name: "Structure", line: "Built the way Google reads, so locals find you." },
      design: { name: "Design", line: "Drawn for your business. No templates." },
      words: { name: "Words", line: "Written with your business and target audience in mind." },
    },
    states: { finished: "The finished site", assembled: "Assembled", hint: "Scroll to take it apart.", closing: "All of it, in your name.", layerWord: "Layer" },
  },

  faq: {
    label: "Questions",
    title: { before: "Asked and ", em: "answered." },
    more: { before: "Still unsure?", link: "Just ask." },
    items: [
      {
        q: "How much does it cost?",
        a: "€299 for a one-page site with up to five sections, if you decide to keep it. If you don’t, it costs nothing: your €20 deposit comes back to you.",
      },
      {
        q: "Why is there a €20 deposit?",
        a: "It lets us spend real time on your preview, and it tells us you’re serious. If you don’t like the result, we refund it in full. No questions asked.",
      },
      {
        q: "What will my preview look like?",
        a: "Your new site, about 30% finished: the real design with your name and, where we have them, your photos. Enough to judge it properly. Some links and forms won’t work yet.",
      },
      {
        q: "What if I want changes?",
        a: "Tell us. We listen, adjust it and show you again before anything goes live.",
      },
      {
        q: "What if I don’t like it?",
        a: "We delete it, along with everything you sent us, and return your €20. No obligations.",
      },
      {
        q: "How fast is it live?",
        a: "Within 3 days of your yes.",
      },
      {
        q: "Do I own it?",
        a: "Yes. The domain, hosting and code are in your name, and hosting is paid straight to the provider, usually a few euros a month. If you ever leave, everything goes with you.",
      },
      {
        q: "Can you do more than one page?",
        a: "Yes. More pages, SEO, a shop, payments, email automation and support after launch are all possible. We quote them by email, so you only pay for what you need.",
      },
    ],
  },

  start: {
    label: "(06) Start",
    title: { before: "Your new site is one link ", em: "away." },
    body: "Send us your website, or just your business name. We’ll reply within a day with a short plan.",
    form: {
      site: { label: "Your website or business name", placeholder: "yourbusiness.si" },
      email: { label: "Your email", placeholder: "you@yourbusiness.si" },
      submit: "Show me my new site",
      sending: "Sending…",
      due: "Due today · €0.00",
      okEyebrow: "Request received",
      ok: { before: "Got it. We’ll reply to ", after: " within one working day." },
      errors: {
        site: "Add your website, like yourbusiness.si, or your business name.",
        email: "That email looks off. Mind checking it?",
        server: "Something broke on our end. Please try again in a minute.",
      },
    },
  },

  footer: {
    city: "Ljubljana",
    links: [
      { href: "#process", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    copyright: "© 2026 Spletne",
  },
} as const;
