/**
 * Legal texts (Slovenian), transcribed from the collaborator's document h-13.
 *
 * - Edit the wording here; the pages render it as is.
 * - Anything in [square brackets] is a placeholder or an editor's note still to be filled in or removed;
 *   it is highlighted on the page so it can't be published by accident.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  /** A numbered clause such as "3.1." with an optional bold lead-in ("Povpraševanje."). */
  | { type: "clause"; n: string; lead?: string; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "table"; head: readonly string[]; rows: readonly (readonly string[])[] };

export type LegalSection = { n?: string; title?: string; blocks: readonly LegalBlock[] };

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  /** Shown as "Veljavno od". */
  updated: string;
  sections: readonly LegalSection[];
};


export const terms: LegalDoc = {
  slug: "splosni-pogoji",
  title: "Splošni pogoji poslovanja",
  description: "Splošni pogoji poslovanja za storitev izdelave spletnih strani Spletne.com.",
  updated: "25. 11. 2026",
  sections: [
    {
      n: "1",
      title: "Podatki o ponudniku",
      blocks: [
        { type: "p", text: "Ponudnik storitev na spletni strani www.spletne.com (v nadaljevanju: »Spletne« ali »ponudnik«) je:" },
        { type: "list", items: ["[Polno poslovno ime, npr. Ime Priimek s.p. / ime d.o.o.]", "Sedež: [ulica, hišna številka, poštna številka, kraj], Slovenija", "Matična številka: [ … ]", "Davčna številka / ID za DDV: [SI … ali: ni zavezanec za DDV po 94. členu ZDDV-1]", "Vpis v register: [AJPES / Poslovni register Slovenije, št. vpisa …]", "E-pošta: info@spletne.com", "Telefon: [ … ]"] },
      ],
    },
    {
      n: "2",
      title: "Področje uporabe",
      blocks: [
        { type: "clause", n: "2.1", text: "Ti splošni pogoji urejajo uporabo spletne strani www.spletne.com ter storitev načrtovanja in izdelave spletnih strani (v nadaljevanju: »storitev«), ki jih Spletne ponuja naročnikom." },
        { type: "clause", n: "2.2", text: "Storitev je namenjena predvsem poslovnim naročnikom (podjetjem, samostojnim podjetnikom, društvom, zavodom). Če storitev naroči potrošnik v smislu zakona, ki ureja varstvo potrošnikov, se poleg teh pogojev uporabljajo prisilni predpisi o varstvu potrošnikov, ki imajo v primeru neskladja prednost (glej točko 11)." },
        { type: "clause", n: "2.3", text: "Z oddajo povpraševanja in plačilom rezervacije naročnik potrdi, da je te pogoje prebral in se z njimi strinja." },
      ],
    },
    {
      n: "3",
      title: "Opis storitve in potek",
      blocks: [
        { type: "clause", n: "3.1", text: "Naročnik prek obrazca na spletni strani pošlje povezavo do svoje obstoječe spletne strani ali opis podjetja, svoj e-naslov in morebitne želje glede vsebine, dizajna in dinamike.", lead: "Povpraševanje." },
        { type: "clause", n: "3.2", text: "Ob oddaji povpraševanja naročnik zagotovi rezervacijo v višini 20 € (v nadaljevanju: »rezervacija«). Rezervacijo obdeluje ponudnik plačilnih storitev Stripe. Rezervacija služi potrditvi resnosti povpraševanja in delni zaščiti pred zlorabami.", lead: "Rezervacija." },
        { type: "clause", n: "3.3", text: "Spletne ni dolžan sprejeti vsakega povpraševanja. Sprejme tista, pri katerih oceni, da je interes pristen in da bi lahko bila nova spletna stran naročniku koristna. Če povpraševanja ne sprejme, se rezervacija sprosti oziroma vrne v celoti.", lead: "Izbor povpraševanj." },
        { type: "clause", n: "3.4", text: "Po sprejemu povpraševanja Spletne analizira obstoječo stran ali predstavitev in praviloma v 24 urah izdela predogled naslovne strani. Predogled ni javno dostopen; viden je samo z geslom, ki ga naročnik prejme po e-pošti. Predogled je namenjen oceni predvidenega dizajna, predstavitve in videza na mobilnih napravah. Ni končna stran, povezave in funkcije ne delujejo nujno v celoti.", lead: "Izdelava predogleda." },
        { type: "clause", n: "3.5", text: "Naročnik se po ogledu predogleda odloči, ali želi nadaljevati.", lead: "Odločitev naročnika." },
        { type: "list", items: ["Če ne želi nadaljevati, lahko predogled izbriše sam s klikom na ustrezen gumb ali o tem obvesti ponudnika po e-pošti. Brez obveznosti in brez obrazložitve. Rezervacija se v tem primeru vrne oziroma sprosti (točka 5).", "Če želi nadaljevati, naroči izdelavo strani. Ponudnik stran dokonča praviloma v treh (3) dneh od potrditve naročila in dogovora o vsebini, ob upoštevanju točke 3.7."] },
        { type: "clause", n: "3.6", text: "Osnovna storitev (cena 249 €) vključuje: enostransko predstavitveno stran z do šestimi sekcijami, povezave na družbena omrežja, kontaktni obrazec ali gumb za klic, piškotni pas in obvezne pravne strani (podatki o ponudniku, politika zasebnosti, obvestilo o piškotkih), prilagojene strani naročnika, optimizacijo slik, osnovni SEO, mobilno različico, dopolnila in manjše spremembe po ogledu ter namestitev na domeno naročnika.", lead: "Obseg osnovne storitve." },
        { type: "clause", n: "3.7", text: "Dodatne strani, bloki, e-poštna avtomatizacija, razširjena SEO optimizacija, spletna trgovina, plačila in drugo se dogovorijo posebej. Pred začetkom dela naročnik prejme informacijo o predvidenih stroških in roku, ki ga mora potrditi. Rok za izdelavo se v tem primeru lahko ustrezno podaljša.", lead: "Dodatne storitve." },
        { type: "clause", n: "3.8", text: "Rok za izdelavo velja ob pogoju, da naročnik pravočasno posreduje vsebine, odobritve in dostope. Zamude na strani naročnika podaljšajo rok.", lead: "Sodelovanje naročnika." },
        { type: "clause", n: "3.9", text: "Domeno in gostovanje naročnik kupi sam in sta njegovi last. Ponudnik mu lahko pomaga pri izbiri in selitvi strani na novo domeno. Stroški domene in gostovanja niso vključeni v ceno storitve.", lead: "Domena in gostovanje." },
      ],
    },
    {
      n: "4",
      title: "Cena in plačilo",
      blocks: [
        { type: "clause", n: "4.1", text: "Predogled je za naročnika brezplačen, razen rezervacije iz točke 3.2." },
        { type: "clause", n: "4.2", text: "Cena osnovne storitve je 249 € [z DDV / brez DDV – DOPOLNITE; če niste zavezanec za DDV, navedite to]. Končna cena se oblikuje v zadnjem koraku, ko naročnik potrdi dizajn in morebitne nadgradnje." },
        { type: "clause", n: "4.3", text: "Če naročnik izdelavo naroči, se rezervacija 20 € všteje v ceno. [Način: rezervacija se zajame (capture) in odšteje od računa / ponudnik izda račun za razliko 229 € – DOPOLNITE glede na dejansko nastavitev v Stripe.]" },
        { type: "clause", n: "4.4", text: "Plačila se obdelujejo prek družbe Stripe Payments Europe, Ltd. Ponudnik ne vidi in ne hrani podatkov o plačilni kartici." },
        { type: "clause", n: "4.5", text: "Za naročene storitve ponudnik izda račun. Plačilni rok je [8 / 15] dni od izdaje računa, razen če je dogovorjeno drugače. Zamudne obresti se obračunajo po zakonu." },
      ],
    },
    {
      n: "5",
      title: "Rezervacija: vračilo in sprostitev",
      blocks: [
        { type: "clause", n: "5.1", text: "Rezervacija se v celoti vrne oziroma sprosti, če: (a) ponudnik povpraševanja ne sprejme, (b) predogled ni izdelan v roku iz točke 3.4 po krivdi ponudnika, ali (c) naročnik po ogledu predogleda ne želi nadaljevati in to sporoči ali predogled izbriše." },
        { type: "clause", n: "5.2", text: "Kjer je rezervacija izvedena kot začasna blokada sredstev na kartici, se blokada sprosti v nekaj dneh. Rok je odvisen od banke izdajateljice kartice in ni pod nadzorom ponudnika. Ker blokada ne more trajati poljubno dolgo, ponudnik naročnika opozori, da se lahko blokada po poteku roka samodejno sprosti. [DOPOLNITE glede na dejanski tehnični potek v Stripe.]" },
        { type: "clause", n: "5.3", text: "Ponudnik rezervacije ne obdrži, razen v primeru očitne zlorabe (npr. lažno ali nesmiselno povpraševanje, posredovanje vsebin, do katerih naročnik nima pravic). V takem primeru ponudnik naročnika o tem obvesti in obrazloži razlog." },
      ],
    },
    {
      n: "6",
      title: "Vsebine naročnika in avtorske pravice",
      blocks: [
        { type: "clause", n: "6.1", text: "Naročnik jamči, da ima vse potrebne pravice do besedil, fotografij, logotipov, znamk in drugih gradiv, ki jih posreduje ali ki so na njegovi obstoječi strani, ter da njihova uporaba ne krši pravic tretjih oseb. Naročnik ponudniku podeli nepreklicno, neizključno pravico, da jih uporabi izključno za izvedbo storitve." },
        { type: "clause", n: "6.2", text: "Naročnik ponudnika odškodninsko ne bo zadolžil, če ponudnik ravna v skladu z naročnikovimi navodili, naročnik pa je odgovoren za škodo, ki bi nastala zaradi kršitve pravic tretjih oseb z vsebinami, ki jih je posredoval." },
        { type: "clause", n: "6.3", text: "Po plačilu celotne cene naročnik pridobi lastništvo nad izdelano spletno stranjo in kodo ter materialne avtorske pravice za uporabo na svoji domeni, vključno s pravico do predelave. Tretje komponente (knjižnice, pisave, ikone, slike) ostanejo pod licencami svojih avtorjev. [Če želite, dodajte: Ponudnik si pridrži pravico, da izdelek navede kot referenco, razen če naročnik to pisno zavrne.]", lead: "Lastništvo." },
        { type: "clause", n: "6.4", text: "Dokler ni plačana celotna cena, ponudnik ne prenese pravic na naročnika, predogled pa se ne sme javno objaviti ali uporabiti." },
        { type: "clause", n: "6.5", text: "Predogled in predlogi dizajna pred plačilom ostanejo intelektualna lastnina ponudnika. Naročnik jih ne sme objaviti, kopirati ali predati tretjim." },
      ],
    },
    {
      n: "7",
      title: "Hramba in izbris gradiv",
      blocks: [
        { type: "clause", n: "7.1", text: "Če do sodelovanja ne pride, ponudnik gradiva naročnika (slike, logotip, besedila) izbriše najkasneje v 48 urah po koncu postopka (izbris predogleda, odstop ali zavrnitev). Zakonsko zahtevane evidence (npr. o plačilih) ostanejo shranjene toliko časa, kot to zahteva zakon." },
        { type: "clause", n: "7.2", text: "Po predaji projekta stran in podatki ostanejo na gostovanju naročnika; ponudnik jih ne hrani, razen če se dogovorita drugače (npr. za vzdrževanje)." },
        { type: "clause", n: "7.3", text: "Če naročnik pozneje potrebuje spremembe strani, mora ponudniku omogočiti dostop. Delo lahko nadaljuje tudi drug izvajalec." },
      ],
    },
    {
      n: "8",
      title: "Odgovornost",
      blocks: [
        { type: "clause", n: "8.1", text: "Ponudnik izvaja storitev s skrbnostjo dobrega strokovnjaka. Ne jamči za konkretne poslovne rezultate (obisk, uvrstitev v iskalnikih, prodajo ali število strank)." },
        { type: "clause", n: "8.2", text: "Ponudnik ne odgovarja za nedostopnost ali motnje zaradi tretjih strani (ponudniki gostovanja, domen, plačil, iskalnikov) ter za višjo silo." },
        { type: "clause", n: "8.3", text: "Odgovornost ponudnika za posredno škodo in izgubljeni dobiček je, v obsegu, ki ga dovoljuje zakon, izključena. Skupna odgovornost je omejena na znesek, ki ga je naročnik plačal za zadevno storitev, razen v primeru namere ali hude malomarnosti. Za potrošnike ta točka ne velja v delu, ki je v nasprotju s prisilnimi predpisi." },
        { type: "clause", n: "8.4", text: "Ponudnik ne odgovarja za pravno skladnost vsebin, ki jih je dostavil naročnik. Obvezne pravne strani (politika zasebnosti, piškotki) so pripravljene na podlagi podatkov, ki jih posreduje naročnik; naročnik je dolžan ponudnika obvestiti o vseh orodjih in storitvah, ki zbirajo osebne podatke (npr. analitika, oglasna orodja, vtičniki)." },
      ],
    },
    {
      n: "9",
      title: "Reklamacije",
      blocks: [
        { type: "p", text: "Naročnik lahko napake ali pomanjkljivosti sporoči na info@spletne.com. Ponudnik se bo praviloma odzval v 8 delovnih dneh in napake, ki so po njegovi krivdi, odpravil v razumnem roku brez dodatnega plačila. Vsebinske spremembe, ki presegajo dogovorjeni obseg, se obračunajo po dogovoru." },
      ],
    },
    {
      n: "10",
      title: "Prenehanje",
      blocks: [
        { type: "p", text: "Vsaka stran lahko pred potrditvijo naročila izdelave odstopi brez obrazložitve. Po potrditvi naročila se storitev lahko odpove le pisno; za že opravljeno delo ponudnik zaračuna sorazmerni del cene." },
      ],
    },
    {
      n: "11",
      title: "Potrošniki",
      blocks: [
        { type: "clause", n: "11.1", text: "Če je naročnik potrošnik in je storitev naročena na daljavo, ima pravico, da v 14 dneh brez navedbe razloga odstopi od pogodbe, skladno z zakonom. Če potrošnik izrecno zahteva začetek izvajanja storitve v času odstopnega roka (kar velja za izdelavo strani), plača sorazmerni del cene za že opravljeno storitev; po popolni izvedbi storitve pravica do odstopa ugasne, če je potrošnik na to izrecno pristal in je bil o tem obveščen." },
        { type: "clause", n: "11.2", text: "Potrošnik ima pravico do izvensodne rešitve spora. Spletna platforma EU za spletno reševanje sporov je dostopna na https://ec.europa.eu/consumers/odr. [Dopolnite pristojni izvensodni organ, če ga ponudnik priznava.]" },
      ],
    },
    {
      n: "12",
      title: "Spremembe pogojev",
      blocks: [
        { type: "p", text: "Ponudnik lahko te pogoje spremeni. Za naročila, oddana pred spremembo, veljajo pogoji, ki so veljali ob oddaji. Veljavna različica je vedno objavljena na www.spletne.com." },
      ],
    },
    {
      n: "13",
      title: "Pristojno pravo in reševanje sporov",
      blocks: [
        { type: "p", text: "Za pogodbe se uporablja slovensko pravo. Morebitne spore skušata stranki rešiti sporazumno. Če to ni mogoče, je pristojno sodišče v [Ljubljani], pri potrošnikih pa sodišče, ki je pristojno po zakonu." },
      ],
    },
  ],
};

export const privacy: LegalDoc = {
  slug: "politika-zasebnosti",
  title: "Politika zasebnosti",
  description: "Kako Spletne.com obdeluje in varuje osebne podatke.",
  updated: "25. 11. 2026",
  sections: [
    {
      n: "1",
      title: "Upravljavec",
      blocks: [
        { type: "p", text: "Upravljavec osebnih podatkov je [polno poslovno ime in naslov iz točke 1 splošnih pogojev], e-pošta: info@spletne.com. Osebnih podatkov obdelujemo v skladu z Uredbo (EU) 2016/679 (GDPR) in slovensko zakonodajo o varstvu osebnih podatkov." },
      ],
    },
    {
      n: "2",
      title: "Katere podatke obdelujemo, zakaj in na kakšni podlagi",
      blocks: [
        { type: "table", head: ["Namen", "Podatki", "Pravna podlaga", "Hramba"], rows: [["Odgovor na povpraševanje in komunikacija", "e-naslov, povezava do obstoječe strani, vsebina sporočila, morebitno ime in telefon", "izvedba ukrepov na zahtevo posameznika pred sklenitvijo pogodbe (6/1/b GDPR)", "do konca postopka; če do sodelovanja ne pride, 48 ur za gradiva, korespondenca do [6] mesecev"], ["Izdelava predogleda in strani", "podatki in gradiva, ki jih pošlje naročnik (besedila, slike, logotip, kontaktni podatki na strani)", "izvedba pogodbe oziroma ukrepov pred sklenitvijo pogodbe (6/1/b)", "če do sodelovanja ne pride, izbris v 48 urah; po predaji strani ostanejo pri naročniku"], ["Zasebni ogled (geslo)", "e-naslov, geslo za dostop do predogleda", "izvedba pogodbe (6/1/b)", "do izbrisa predogleda"], ["Rezervacija in plačilo", "e-naslov, znesek, status plačila (podatke o kartici obdeluje Stripe)", "izvedba pogodbe (6/1/b); zakonske obveznosti (6/1/c) za račune", "račune in knjigovodske listine 10 let, kot določa zakon"], ["Varnost in delovanje strani", "IP-naslov, tehnični podatki o brskalniku, dnevniki strežnika", "zakoniti interes (6/1/f)", "[do 90 dni]"], ["Obveščanje o zahtevkih in sporih", "podatki, potrebni za uveljavljanje ali obrambo pravnih zahtevkov", "zakoniti interes (6/1/f)", "do izteka zastaralnih rokov"]] },
        { type: "p", text: "Podatkov ne uporabljamo za avtomatizirano odločanje ali profiliranje. [Če pošiljate novice ali tržna sporočila, dodajte posebno vrstico s privolitvijo (6/1/a) ali zakonitim interesom za obstoječe stranke ter možnostjo odjave.]" },
      ],
    },
    {
      n: "3",
      title: "Obdelovalci in prejemniki podatkov",
      blocks: [
        { type: "p", text: "Podatke lahko obdelujejo naši zunanji izvajalci, ki delujejo po naših navodilih in s katerimi imamo sklenjene ustrezne pogodbe:" },
        { type: "list", items: ["Stripe Payments Europe, Ltd. (Irska) za obdelavo plačil in rezervacij.", "[Ponudnik gostovanja spletne strani in predogleda, npr. Vercel / Hetzner / drug] za gostovanje.", "[Ponudnik e-pošte, npr. Google Workspace / Zoho / drug] za e-poštno komunikacijo.", "[Morebitni drugi: analitika, knjigovodski servis, orodje za obrazce.]"] },
        { type: "p", text: "Podatki se praviloma obdelujejo v EU/EGP. Če jih ponudnik (npr. Stripe ali ponudnik gostovanja) prenese v tretje države, se uporabijo ustrezni mehanizmi iz GDPR (standardne pogodbene klavzule ali sklep o ustreznosti). Podatkov ne prodajamo." },
      ],
    },
    {
      n: "4",
      title: "Vaše pravice",
      blocks: [
        { type: "p", text: "Imate pravico do dostopa, popravka, izbrisa, omejitve obdelave, prenosljivosti ter ugovora zoper obdelavo na podlagi zakonitega interesa. Če obdelava temelji na privolitvi, jo lahko kadar koli prekličete brez vpliva na zakonitost obdelave pred preklicem. Zahtevo pošljite na info@spletne.com; odgovorimo v enem mesecu." },
        { type: "p", text: "Imate tudi pravico do pritožbe pri nadzornem organu: Informacijski pooblaščenec, Dunajska cesta 22, 1000 Ljubljana, www.ip-rs.si, gp.ip@ip-rs.si." },
      ],
    },
    {
      n: "5",
      title: "Varnost",
      blocks: [
        { type: "p", text: "Podatke varujemo z ustreznimi tehničnimi in organizacijskimi ukrepi, med drugim s šifrirano povezavo (HTTPS), zaščito dostopa z gesli in omejitvijo dostopa samo na pooblaščene osebe." },
      ],
    },
    {
      n: "6",
      title: "Gradiva tretjih oseb",
      blocks: [
        { type: "p", text: "Če nam pošljete gradiva, ki vsebujejo osebne podatke tretjih oseb (npr. fotografije zaposlenih, mnenja strank), potrjujete, da imate za to ustrezno pravno podlago in da so posamezniki o tem obveščeni." },
      ],
    },
    {
      n: "7",
      title: "Spremembe",
      blocks: [
        { type: "p", text: "Politiko lahko posodobimo. Veljavna različica je objavljena na tej strani z datumom zadnje spremembe." },
      ],
    },
  ],
};

export const cookies: LegalDoc = {
  slug: "piskotki",
  title: "Obvestilo o piškotkih",
  description: "Katere piškotke uporablja spletna stran Spletne.com.",
  updated: "25. 11. 2026",
  sections: [
    {
      blocks: [
        { type: "p", text: "[Uskladite z dejanskim stanjem: preverite v brskalniku (F12 → Application → Cookies) ali stran res nastavlja samo spodaj navedene piškotke.]" },
        { type: "p", text: "Spletna stran www.spletne.com uporablja samo nujne piškotke in podobne tehnologije, ki so potrebne za delovanje strani (npr. shranjevanje seje pri vnosu gesla za zasebni ogled, varnost obrazcev). Zanje privolitev ni potrebna." },
        { type: "p", text: "Če stran uporablja še analitične, oglasne ali druge neobvezne piškotke (npr. Google Analytics, Meta Pixel), jih nastavimo samo po vaši predhodni privolitvi prek piškotnega obvestila, privolitev pa lahko kadar koli prekličete. V tem primeru v tabelo vnesite: ime piškotka, ponudnika, namen in čas hrambe." },
        { type: "p", text: "Piškotke lahko izbrišete ali blokirate v nastavitvah brskalnika." },
        { type: "p", text: "Vprašanja: info@spletne.com" },
      ],
    },
  ],
};
