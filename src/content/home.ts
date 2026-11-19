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
    title: { before: "Kako vam je všeč vaša ", em: "nova stran?" },
    aside: "Najprej jo izdelamo. Če vam je všeč, naročite.",
    cta: "Revamp your website",
    scroll: "Scroll",
  },

  whatWeDo: {
    title: { lang: "sl", text: "Zdaj je pravi čas za posodobitev" },
    /** PLACEHOLDER: subheadline to come from the collaborator. */
    sub: "Here’s a ten-year-old website next to the one we’d build today. Drag to compare.",
  },

  howItWorks: {
    label: "(02) How it works",
    title: { before: "Four steps. You can walk away at ", em: "any", after: " of them." },
    stepWord: "Step",
    steps: [
      {
        title: "Send us your link",
        meta: "Takes 2 minutes",
        body: "Send us the link to your current website, or just your business name if you don’t have one. We look at what you have, who your customers are and what’s missing. Within a day we reply with a short plan for your new site. No forms, no sales calls.",
      },
      {
        title: "We agree on what to build",
        meta: "€20 deposit, refundable",
        body: "We talk through what your new site should say and do. A €20 deposit starts the work, and it’s fully refundable. Then we build your preview, about 30% finished, and email you a private code to open it.",
      },
      {
        title: "Launch, or walk away",
        meta: "Finished in 3 days",
        body: "If you like it, you pay the agreed price and we finish it within 3 days. If you want changes, we listen and adjust. If you don’t like it, we delete it and return your €20. No obligations, no questions asked.",
      },
      {
        title: "Optional extras",
        meta: "Only if you need them",
        body: "Need more than one page? We can add pages, SEO, an online shop, payments or email automation, and look after the site once it’s live. Extras are quoted by email, so you only pay for what you use.",
      },
    ],
  },

  previewAccess: {
    label: "(03) Your preview",
    title: { before: "See your new site ", em: "in private." },
    body: [
      "When your preview is ready, we email you a private code. Enter it here and your new site opens right on this page. No account, no password to remember.",
      "Your preview is about 30% finished: enough to judge the design, the feel and how it works on your phone. Some links and forms stay placeholders until you say yes.",
    ],
    primary: { label: "Send us your link", href: "#start" },
    secondary: { label: "How it works", href: "#process" },
    card: {
      eyebrow: "Private preview",
      title: "Got a preview code?",
      text: "Six letters and numbers, from the email we sent you.",
      inputLabel: "Preview code",
      button: "Open preview",
      checking: "Checking…",
      note: "No code yet? Every preview is made for one business. Send us your link and we’ll make yours.",
    },
    errors: {
      format: "Codes are 6 letters and numbers. Check the email we sent you.",
      notFound: "No preview matches that code. Check the email we sent you, or write to us.",
    },
  },

  pricing: {
    label: "(04) Pricing",
    title: { before: "You decide what it ", em: "costs." },
    sub: "Scope, price and delivery date are agreed before we start.",
    prices: [
      { amount: 0, label: "If you walk away", note: "Your €20 deposit comes back." },
      { amount: 299, label: "If you keep it", note: "One page, one payment." },
    ],
    cta: "Start with your link",
    includesLabel: "What’s included",
    includes: [
      { title: "A page built around your business", text: "Up to five sections: services, photos, about, location and contact." },
      { title: "A clear way to reach you", text: "Phone, email, map or your booking link, right where customers look for them." },
      { title: "Made for phones first", text: "Most of your visitors are on a phone, so that’s where we design first." },
      { title: "Changes before launch", text: "Tell us what to change and we adjust it before anything goes live." },
      { title: "Live in 3 days", text: "Once you say yes, we finish it and put it online within 3 days, in your name." },
    ],
    extras: "Need more pages, SEO, a shop, payments or email automation? We quote extras by email after we’ve talked.",
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
    copyright: "© 2026 Bespoke",
  },
} as const;
