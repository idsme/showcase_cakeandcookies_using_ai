import { useState, useCallback } from "react";

const IMG = "https://idsme.github.io/showcase_cakeandcookies_using_ai/images";

const CATEGORIES = [
  { id: "birthday", img: `${IMG}/mile-stone-16-girl.jpg`, label: "Verjaardag", sub: "Alle leeftijden", trigger: "Ik zoek een verjaardagstaart" },
  { id: "baby", img: `${IMG}/theme-cake-baby-shower-girl.jpg`, label: "Babyshower", sub: "& Gender Reveal", trigger: "We organiseren een babyshower!" },
  { id: "theme", img: `${IMG}/theme-cake-paw-patrol.jpg`, label: "Thema Taart", sub: "Karakter & thema", trigger: "Ik wil een thema taart bestellen voor mijn kind" },
  { id: "rush", img: `${IMG}/heart-cake.jpeg`, label: "Spoed", sub: "Morgen nodig?", trigger: "Help! Ik heb morgen een taart nodig" },
];

const S = {
  default: {
    accent: "#E91E8C", accentSoft: "#FFE5EC", gold: "#C9A86A", bg: "#FAF8F5",
    heroBg: "linear-gradient(135deg, #FAF8F5 0%, #FFE5EC 100%)",
    hero: { badge: "📍 Rotterdam-Nesselande", script: "Met liefde handgemaakt", title: "Droomtaarten", titleSpan: "op maat", sub: "Handgemaakte taarten voor jouw speciale momenten. Dagelijks verse ingrediënten, geen fondant — alleen heerlijke ganache.", cta: "Bestel via WhatsApp" },
    stats: [{ num: "500+", label: "Taarten gemaakt" }, { num: "5.0 ★", label: "Beoordeling" }, { num: "100%", label: "Handgemaakt" }],
    values: [
      { icon: "👩‍🍳", title: "Handgemaakt", desc: "Elke taart met liefde gemaakt, alleen verse kwaliteit." },
      { icon: "✨", title: "Geen fondant", desc: "Alleen heerlijke ganache van de beste chocolade." },
      { icon: "🎨", title: "Persoonlijk ontwerp", desc: "Deel je idee, wij maken het werkelijkheid." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-paw-patrol.jpg`, name: "Paw Patrol", tag: "Thema Taart" },
      { img: `${IMG}/theme-cake-baby-shower-girl.jpg`, name: "Babyshower", tag: "Gender Reveal" },
      { img: `${IMG}/theme-cake-pokemon.jpg`, name: "Pokémon", tag: "Kindertaart" },
      { img: `${IMG}/mile-stone-80-woman.jpeg`, name: "Bloementaart", tag: "Jubileum" },
      { img: `${IMG}/mile-stone-baby.jpg`, name: "Oh Baby", tag: "Babyshower" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "1e Verjaardag" },
      { img: `${IMG}/mile-stone-16-girl.jpg`, name: "Sweet 16", tag: "Verjaardag" },
      { img: `${IMG}/heart-cake.jpeg`, name: "Harttaart", tag: "Liefde" },
    ],
    pricing: { title: "Startprijzen", sub: "Inclusief premium ingrediënten & basis decoratie",
      rows: [
        { item: "Bento Taart", detail: "1-2 personen", price: "€30" },
        { item: "Ronde Taart", detail: "10 personen", price: "va. €55" },
        { item: "Ronde Taart", detail: "15 personen", price: "va. €82,50" },
        { item: "Ronde Taart – 1 laag", detail: "20 personen", price: "va. €110" },
        { item: "Ronde Taart – 2 lagen", detail: "20 personen", price: "va. €125" },
        { item: "Ronde Taart – 2 lagen", detail: "30 personen", price: "va. €180" },
      ],
      note: "Smaken: Vanille, Red Velvet, Chocolade · Vulling: Vanille crème, Jam, Oreo, Chocolade, Lemoncurd, Kokos · Glutenvrij mogelijk tot 15p",
    },
    testimonials: [
      { quote: "De taart was absoluut prachtig en smaakte nog beter dan het eruitzag! Perfect voor de verjaardag van onze dochter.", name: "Sophie", occasion: "Verjaardagstaart" },
      { quote: "Onze gender reveal taart was een groot succes! Iedereen was verbaasd over hoe mooi én lekker de taart was.", name: "Alize", occasion: "Gender Reveal" },
      { quote: "De Paw Patrol taart voor mijn zoontje was fantastisch! De details waren ongelooflijk.", name: "Marcus", occasion: "Thema Taart" },
    ],
    urgency: null,
    ctaSection: { title: "Jouw droomtaart begint hier", sub: "Vertel ons over je feest en wij doen de rest" },
  },
  birthday: {
    accent: "#E91E8C", accentSoft: "#FFE5EC", gold: "#C9A86A", bg: "#FFF9FB",
    heroBg: "linear-gradient(135deg, #FFF9FB 0%, #FFE5EC 50%, #FFF0F5 100%)",
    hero: { badge: "🎂 Verjaardagstaarten specialist", script: "Maak het onvergetelijk", title: "De perfecte", titleSpan: "verjaardagstaart", sub: "Van Paw Patrol voor de kleintjes tot elegante taarten voor volwassenen — elk feest verdient een taart die net zo bijzonder is als de jarige.", cta: "Bestel verjaardagstaart" },
    stats: [{ num: "300+", label: "Verjaardagstaarten" }, { num: "1-80", label: "Alle leeftijden" }, { num: "3 dagen", label: "Bestel vooruit" }],
    values: [
      { icon: "🎈", title: "Elk thema mogelijk", desc: "Paw Patrol, Pokémon, Frozen, Nijntje — noem het en wij maken het." },
      { icon: "🔢", title: "Alle leeftijden", desc: "Van 1e verjaardag tot 80ste jubileum, elke mijlpaal." },
      { icon: "👨‍👩‍👧‍👦", title: "Voor elk gezelschap", desc: "Van bento (1-2p) tot grote feesten (30+ personen)." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-paw-patrol.jpg`, name: "Paw Patrol", tag: "Populair bij kids" },
      { img: `${IMG}/theme-cake-pokemon.jpg`, name: "Pokémon", tag: "Kindertaart" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "1e Verjaardag" },
      { img: `${IMG}/mile-stone-16-girl.jpg`, name: "Sweet 16", tag: "Tiener" },
      { img: `${IMG}/mile-stone-80-woman.jpeg`, name: "Bloementaart", tag: "80ste Verjaardag" },
      { img: `${IMG}/heart-cake.jpeg`, name: "Harttaart", tag: "Speciaal" },
    ],
    pricing: { title: "Verjaardagstaart prijzen", sub: "Inclusief thema-decoratie, naam en leeftijd",
      rows: [
        { item: "Bento Taart", detail: "1-2 personen", price: "€30" },
        { item: "Klein feestje", detail: "10 personen", price: "va. €55", highlight: true },
        { item: "Familiefeest", detail: "15 personen", price: "va. €82,50" },
        { item: "Groot feest – 1 laag", detail: "20 personen", price: "va. €110" },
        { item: "Groot feest – 2 lagen", detail: "20-30 personen", price: "va. €125 – €180" },
      ],
      note: "Tip: Combineer met cupcakes of cakepops voor de kindjes! Glutenvrij mogelijk.",
    },
    testimonials: [
      { quote: "De Paw Patrol taart voor mijn zoontje was fantastisch! De details waren ongelooflijk. Hij was zo blij!", name: "Marcus", occasion: "Thema Taart – 5 jaar" },
      { quote: "De taart was absoluut prachtig en smaakte nog beter dan het eruitzag! Perfect voor onze dochter.", name: "Sophie", occasion: "Sweet 16" },
      { quote: "Mijn moeder werd 80 en de bloementaart was prachtig. Iedereen wilde weten waar die vandaan kwam!", name: "Fatima", occasion: "80ste verjaardag" },
    ],
    urgency: null,
    ctaSection: { title: "Wanneer is het feest?", sub: "Bestel minimaal 3 dagen van tevoren voor het beste resultaat" },
  },
  baby: {
    accent: "#F48FB1", accentSoft: "#FFF0F5", gold: "#C9A86A", bg: "#FFFBFD",
    heroBg: "linear-gradient(135deg, #FFFBFD 0%, #FFF0F5 50%, #F8E8FF 100%)",
    hero: { badge: "👶 Baby & Gender Reveal", script: "Een zoet begin", title: "Welkom", titleSpan: "kleine spruit", sub: "Maak de aankondiging onvergetelijk. Gender reveal met gekleurde vulling, babyshower taarten met persoonlijke details.", cta: "Bestel babyshower taart" },
    stats: [{ num: "150+", label: "Babyshower taarten" }, { num: "🩷🩵", label: "Gender Reveal" }, { num: "100%", label: "Verrassing gegarandeerd" }],
    values: [
      { icon: "🎀", title: "Gender Reveal vulling", desc: "Roze of blauwe crème binnenin — de verrassing zit in elke hap." },
      { icon: "🍼", title: "Babyshower thema's", desc: "Nijntje, beertjes, sterren, wolkjes — alles gepersonaliseerd." },
      { icon: "📸", title: "Instagram-waardig", desc: "Ontworpen om prachtig op foto's te staan." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-baby-shower-girl.jpg`, name: "Babyshower", tag: "Gender Reveal" },
      { img: `${IMG}/mile-stone-baby.jpg`, name: "Oh Baby", tag: "Babyshower" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "1e Verjaardag" },
      { img: `${IMG}/heart-cake.jpeg`, name: "Harttaart", tag: "Met liefde" },
    ],
    pricing: { title: "Babyshower & Gender Reveal", sub: "Inclusief thema-decoratie en gekleurde vulling",
      rows: [
        { item: "Bento Taart", detail: "Intiem", price: "€30" },
        { item: "Gender Reveal Taart", detail: "10 personen", price: "va. €55", highlight: true },
        { item: "Babyshower Taart", detail: "15 personen", price: "va. €82,50" },
        { item: "Groot feest", detail: "20 personen", price: "va. €110" },
      ],
      note: "Gender reveal: gekleurde crème of confetti binnenin. Geheim blijft veilig bij ons! 🤫",
    },
    testimonials: [
      { quote: "Onze gender reveal taart was een groot succes! Iedereen was verbaasd over hoe mooi én lekker de taart was.", name: "Alize", occasion: "Gender Reveal" },
      { quote: "De Oh Baby taart was precies wat ik in gedachten had. Prachtige pastelkleuren en heerlijke vanille.", name: "Naomi", occasion: "Babyshower" },
      { quote: "Het moment dat we de taart aansneden en de roze vulling zagen... onvergetelijk!", name: "Daan & Lisa", occasion: "Gender Reveal" },
    ],
    urgency: null,
    ctaSection: { title: "Wanneer is de uitgerekende datum?", sub: "Plan je babyshower taart ruim van tevoren" },
  },
  theme: {
    accent: "#7C4DFF", accentSoft: "#F3EEFF", gold: "#C9A86A", bg: "#FDFBFF",
    heroBg: "linear-gradient(135deg, #FDFBFF 0%, #F3EEFF 50%, #FFF0F5 100%)",
    hero: { badge: "🎨 Thema & Karakter Taarten", script: "Hun held op taart", title: "Paw Patrol, Pokémon", titleSpan: "& meer", sub: "Elk favoriet karakter tot leven gebracht in taart. Nijntje, Frozen, Marvel — noem het thema en wij ontwerpen het.", cta: "Bestel themataart" },
    stats: [{ num: "200+", label: "Themataarten" }, { num: "∞", label: "Thema's mogelijk" }, { num: "#1", label: "Kids favoriet" }],
    values: [
      { icon: "🐾", title: "Elk karakter mogelijk", desc: "Paw Patrol, Pokémon, Nijntje, Frozen, Mario — alles kan." },
      { icon: "🖌️", title: "Handgeschilderd detail", desc: "Elk detail met de hand in ganache. Geen prints, geen fondant." },
      { icon: "📷", title: "Stuur een voorbeeld", desc: "Stuur een foto via WhatsApp en wij maken het na in taart." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-paw-patrol.jpg`, name: "Paw Patrol", tag: "Populair" },
      { img: `${IMG}/theme-cake-pokemon.jpg`, name: "Pokémon", tag: "Kindertaart" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "Peuters" },
      { img: `${IMG}/theme-cake-baby-shower-girl.jpg`, name: "Fantasy", tag: "Meisjes" },
      { img: `${IMG}/mile-stone-16-girl.jpg`, name: "Elegant thema", tag: "Tieners" },
      { img: `${IMG}/mile-stone-baby.jpg`, name: "Oh Baby", tag: "Baby thema" },
    ],
    pricing: { title: "Themataart prijzen", sub: "Inclusief thema-decoratie naar keuze",
      rows: [
        { item: "Bento Themataart", detail: "1-2 personen", price: "€30" },
        { item: "Kinderfeest", detail: "10 personen", price: "va. €55", highlight: true },
        { item: "Groot kinderfeest", detail: "15 personen", price: "va. €82,50" },
        { item: "Feest – 1 laag", detail: "20 personen", price: "va. €110" },
        { item: "Showstopper – 2 lagen", detail: "20-30p", price: "va. €125 – €180" },
      ],
      note: "Complexe thema's kunnen meerprijs hebben. Stuur je idee via WhatsApp voor een exacte prijs!",
    },
    testimonials: [
      { quote: "De Paw Patrol taart voor mijn zoontje was fantastisch! De details waren ongelooflijk!", name: "Marcus", occasion: "Paw Patrol – 5 jaar" },
      { quote: "Een Pokémon taart besteld en het leek alsof Pikachu uit de taart sprong. Geweldig!", name: "Dennis", occasion: "Pokémon – 8 jaar" },
      { quote: "Nijntje taart voor de eerste verjaardag. Zo schattig! Geen fondant, heerlijk!", name: "Lotte", occasion: "Nijntje – 1 jaar" },
    ],
    urgency: null,
    ctaSection: { title: "Welk thema wordt het?", sub: "Stuur je idee of een foto via WhatsApp — wij doen de rest" },
  },
  rush: {
    accent: "#FF5252", accentSoft: "#FFF0F0", gold: "#C9A86A", bg: "#FFFAFA",
    heroBg: "linear-gradient(135deg, #FFFAFA 0%, #FFE8E8 50%, #FFF5F0 100%)",
    hero: { badge: "⚡ Spoedbestelling", script: "Vergeten? Geen paniek!", title: "Morgen al", titleSpan: "een taart nodig?", sub: "Het overkomt de beste. WhatsApp ons direct en we kijken wat er op korte termijn mogelijk is.", cta: "⚡ WhatsApp Spoed" },
    stats: [{ num: "24-48u", label: "Snelste levertijd" }, { num: "Direct", label: "WhatsApp reactie" }, { num: "€10", label: "Spoedtoeslag" }],
    values: [
      { icon: "⏰", title: "Snelle reactie", desc: "WhatsApp ons en we reageren direct." },
      { icon: "🎂", title: "Zelfde kwaliteit", desc: "Spoed = niet minder kwaliteit. Altijd handgemaakt." },
      { icon: "📍", title: "Ophalen Nesselande", desc: "Snel ophalen op afgesproken tijd." },
    ],
    gallery: [
      { img: `${IMG}/heart-cake.jpeg`, name: "Harttaart", tag: "Snel leverbaar" },
      { img: `${IMG}/mile-stone-16-girl.jpg`, name: "Elegant", tag: "Binnen 48u" },
      { img: `${IMG}/mile-stone-80-woman.jpeg`, name: "Bloemen", tag: "Populaire keuze" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "Kids favoriet" },
    ],
    pricing: { title: "Spoedprijzen", sub: "Reguliere prijs + €10 spoedtoeslag",
      rows: [
        { item: "Bento – SPOED", detail: "1-2 personen", price: "€40", highlight: true },
        { item: "Ronde Taart – SPOED", detail: "10 personen", price: "va. €65" },
        { item: "Ronde Taart – SPOED", detail: "15 personen", price: "va. €92,50" },
      ],
      note: "Spoedtoeslag €10. Beschikbaarheid afhankelijk van planning.",
    },
    testimonials: [
      { quote: "Vergeten te bestellen — binnen 24 uur een prachtige taart. Redder in nood!", name: "Karin", occasion: "Spoedbestelling" },
      { quote: "Zondagochtend gebeld, maandagmiddag opgehaald. Ongelooflijk!", name: "Thomas", occasion: "Last-minute" },
    ],
    urgency: { icon: "🚨", text: "WhatsApp nu voor beschikbaarheid vandaag/morgen", sub: "Hoe eerder je belt, hoe meer opties" },
    ctaSection: { title: "Elke minuut telt!", sub: "Stuur nu een WhatsApp — we kijken direct wat er kan" },
  },
};

const INTENTS = [
  { keywords: ["verjaardag","birthday","jarig","jaar oud","wordt","leeftijd","sweet 16","feest","party","jubileum"], scenario: "birthday" },
  { keywords: ["baby","gender reveal","babyshower","zwanger","geboorte","jongen of meisje","in verwachting","uitgerekend"], scenario: "baby" },
  { keywords: ["thema","paw patrol","pokemon","nijntje","frozen","karakter","marvel","peppa","mario","disney","pikachu","held"], scenario: "theme" },
  { keywords: ["spoed","morgen","vandaag","haast","snel","rush","last minute","vergeten","dringend","urgent","direct","overmorgen"], scenario: "rush" },
];

function detectIntent(input) {
  const l = input.toLowerCase();
  for (const { keywords, scenario } of INTENTS) {
    if (keywords.some((k) => l.includes(k))) return scenario;
  }
  return null;
}

function Fade({ children, show, delay = 0 }) {
  return <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(24px)", transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>{children}</div>;
}

export default function TaartEnKoekAINative() {
  const [input, setInput] = useState("");
  const [scene, setScene] = useState("default");
  const [show, setShow] = useState(true);
  const [log, setLog] = useState([]);
  const [showTip, setShowTip] = useState(true);
  const d = S[scene];

  const transition = useCallback((ns) => { setShow(false); setTimeout(() => { setScene(ns); setTimeout(() => setShow(true), 80); }, 350); }, []);

  const respond = useCallback((text, ts) => {
    const intent = ts || detectIntent(text);
    if (intent && intent !== scene) {
      const l = { birthday: "verjaardagstaarten", baby: "babyshower & gender reveal", theme: "themataarten", rush: "een spoedbestelling" };
      setLog((p) => [...p, { r: "user", t: text }, { r: "ai", t: `Ik snap het — je zoekt ${l[intent]}. De pagina past zich aan... 🎂` }]);
      setShowTip(false); transition(intent);
    } else if (intent === scene) {
      setLog((p) => [...p, { r: "user", t: text }, { r: "ai", t: "Je ziet al de juiste informatie! Scroll voor prijzen of klik WhatsApp." }]);
    } else {
      setLog((p) => [...p, { r: "user", t: text }, { r: "ai", t: "Klik op een categorie of typ: 'verjaardagstaart', 'babyshower', 'Paw Patrol', of 'spoed'." }]);
    }
  }, [scene, transition]);

  const submit = useCallback(() => { if (!input.trim()) return; respond(input.trim()); setInput(""); }, [input, respond]);
  const reset = useCallback(() => { setLog([]); setShowTip(true); transition("default"); }, [transition]);

  const mx = { maxWidth: 920, margin: "0 auto", padding: "0 20px" };

  return (
    <div style={{ minHeight: "100vh", background: d.bg, fontFamily: "'Lato',sans-serif", color: "#4A3428", transition: "background 0.6s", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Lato:wght@300;400;700&family=Montserrat:wght@400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,248,245,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(74,52,40,0.06)", padding: "10px 24px" }}>
        <div style={{ ...mx, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={reset}>
            <img src={`${IMG}/logo-taart-en-koek.jpeg`} alt="Logo" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #FFE5EC" }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700 }}>Taart <span style={{ color: d.accent, transition: "color 0.5s" }}>&</span> Koek</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {scene !== "default" && <button onClick={reset} style={{ background: "rgba(74,52,40,0.05)", border: "1px solid rgba(74,52,40,0.1)", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 11, fontFamily: "inherit", color: "#4A3428" }}>↩ Reset</button>}
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: d.accent, background: `${d.accent}12`, border: `1px solid ${d.accent}28`, borderRadius: 14, padding: "4px 10px", transition: "all 0.5s" }}>AI-Native</span>
          </div>
        </div>
      </nav>

      <div style={mx}>
        {/* HERO */}
        <Fade show={show} delay={0}>
          <div style={{ textAlign: "center", background: d.heroBg, margin: "0 -20px", padding: "40px 20px 24px", borderRadius: "0 0 28px 28px", transition: "background 0.7s" }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#4A3428", background: "rgba(74,52,40,0.05)", borderRadius: 20, padding: "5px 14px" }}>{d.hero.badge}</span>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(20px,3.5vw,28px)", color: d.accent, margin: "10px 0 4px", transition: "color 0.5s" }}>{d.hero.script}</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,5vw,44px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 12px" }}>
              {d.hero.title} <span style={{ color: d.accent, transition: "color 0.5s" }}>{d.hero.titleSpan}</span>
            </h1>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#8B7E74", maxWidth: 500, margin: "0 auto 20px" }}>{d.hero.sub}</p>
            <a href="https://wa.me/31634191203" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: d.accent, color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 13, fontFamily: "'Montserrat',sans-serif", transition: "background 0.5s" }}>📲 {d.hero.cta}</a>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
              {d.stats.map((s, i) => <div key={i}><div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700 }}>{s.num}</div><div style={{ fontSize: 10, color: "#8B7E74" }}>{s.label}</div></div>)}
            </div>
          </div>
        </Fade>

        {/* SEARCH + CONVERSATION */}
        <Fade show={show} delay={0.1}>
          <div style={{ maxWidth: 600, margin: "20px auto 0" }}>
            {log.length > 0 && (
              <div style={{ marginBottom: 10, borderRadius: 14, background: "rgba(74,52,40,0.02)", border: "1px solid rgba(74,52,40,0.06)", padding: 12, maxHeight: 130, overflowY: "auto" }}>
                {log.map((m, i) => (
                  <div key={i} style={{ marginBottom: 6, display: "flex", gap: 7, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 22, height: 22, borderRadius: 11, background: m.r === "user" ? "rgba(74,52,40,0.06)" : `${d.accent}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: m.r === "user" ? "#4A3428" : d.accent }}>{m.r === "user" ? "Jij" : "AI"}</div>
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: m.r === "user" ? "#8B7E74" : "#4A3428", paddingTop: 2 }}>{m.t}</p>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 6 }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="Vertel over je feest of wat je zoekt..."
                style={{ flex: 1, padding: "13px 14px", background: "#fff", border: `2px solid ${d.accent}30`, borderRadius: 14, color: "#4A3428", fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
                onFocus={(e) => (e.target.style.borderColor = d.accent)} onBlur={(e) => (e.target.style.borderColor = `${d.accent}30`)} />
              <button onClick={submit} style={{ width: 44, height: 44, borderRadius: 14, border: "none", background: d.accent, color: "#fff", cursor: "pointer", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", flexShrink: 0 }}>→</button>
            </div>
          </div>
        </Fade>

        {/* ★ CATEGORY CARDS WITH REAL IMAGES ★ */}
        <Fade show={show} delay={0.17}>
          <div style={{ maxWidth: 600, margin: "14px auto 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {CATEGORIES.map((c) => {
                const active = scene === c.id;
                return (
                  <div key={c.id} onClick={() => respond(c.trigger, c.id)}
                    style={{ cursor: "pointer", borderRadius: 14, overflow: "hidden", position: "relative", aspectRatio: "3/4", border: active ? `2.5px solid ${d.accent}` : "2.5px solid transparent", transition: "all 0.3s", boxShadow: active ? `0 4px 18px ${d.accent}22` : "0 2px 8px rgba(74,52,40,0.06)" }}
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(74,52,40,0.12)"; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = active ? `0 4px 18px ${d.accent}22` : "0 2px 8px rgba(74,52,40,0.06)"; }}>
                    <img src={c.img} alt={c.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s", ...(active ? { transform: "scale(1.08)" } : {}) }} />
                    <div style={{ position: "absolute", inset: 0, background: active ? `linear-gradient(to top, ${d.accent}DD 0%, ${d.accent}55 40%, transparent 100%)` : "linear-gradient(to top, rgba(74,52,40,0.85) 0%, rgba(74,52,40,0.2) 50%, transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10px 8px", transition: "background 0.5s" }}>
                      <p style={{ margin: 0, color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{c.label}</p>
                      <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.75)", fontSize: 9.5 }}>{c.sub}</p>
                    </div>
                    {active && <div style={{ position: "absolute", top: 6, right: 6, width: 20, height: 20, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: d.accent, fontWeight: 700 }}>✓</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>

        {/* TIP */}
        {showTip && scene === "default" && (
          <Fade show={show} delay={0.24}>
            <div style={{ maxWidth: 600, margin: "14px auto 0", background: `${d.gold}0D`, border: `1px solid ${d.gold}30`, borderRadius: 12, padding: "12px 16px" }}>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "#8B7E74" }}>
                <strong style={{ color: "#C9A86A" }}>✨ AI-native website.</strong> Klik op een categorie of typ wat je zoekt — de hele pagina verandert mee. Prijzen, foto's, reviews, alles.
              </p>
            </div>
          </Fade>
        )}

        {/* URGENCY */}
        {d.urgency && (
          <Fade show={show} delay={0.14}>
            <div style={{ maxWidth: 600, margin: "14px auto 0", background: `${d.accent}08`, border: `1px solid ${d.accent}20`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>{d.urgency.icon}</span>
              <div><p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: d.accent }}>{d.urgency.text}</p><p style={{ margin: "2px 0 0", fontSize: 10, color: "#8B7E74" }}>{d.urgency.sub}</p></div>
            </div>
          </Fade>
        )}

        {/* VALUES */}
        <Fade show={show} delay={0.3}>
          <div style={{ marginTop: 40 }}>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 20, color: d.accent, textAlign: "center", marginBottom: 0, transition: "color 0.5s" }}>Waarom Taart en Koek</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: 10, marginTop: 16 }}>
              {d.values.map((v, i) => (
                <div key={`${scene}-v-${i}`} style={{ background: "#fff", border: "1px solid rgba(74,52,40,0.05)", borderRadius: 14, padding: "20px 16px", textAlign: "center", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(74,52,40,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{v.icon}</span>
                  <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>{v.title}</h3>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "#8B7E74" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* GALLERY */}
        <Fade show={show} delay={0.4}>
          <div style={{ marginTop: 40 }}>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 20, color: d.accent, textAlign: "center", marginBottom: 0, transition: "color 0.5s" }}>Onze creaties</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, textAlign: "center", marginBottom: 16 }}>
              {scene === "default" ? "Galerij" : scene === "birthday" ? "Verjaardagstaarten" : scene === "baby" ? "Baby & Gender Reveal" : scene === "theme" ? "Themataarten" : "Snel leverbaar"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px,1fr))", gap: 8 }}>
              {d.gallery.map((g, i) => (
                <div key={`${scene}-g-${i}`} style={{ borderRadius: 12, overflow: "hidden", position: "relative", aspectRatio: "1", cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = `0 8px 20px ${d.accent}15`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <img src={g.img} alt={g.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(74,52,40,0.8) 0%, transparent 55%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "8px 8px" }}>
                    <p style={{ margin: 0, color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 700 }}>{g.name}</p>
                    <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 9 }}>{g.tag}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <a href="https://www.instagram.com/taart_en_koek/" target="_blank" rel="noopener" style={{ fontSize: 12, color: d.accent, fontWeight: 600, textDecoration: "none", fontFamily: "'Montserrat',sans-serif" }}>📸 Meer op Instagram →</a>
            </div>
          </div>
        </Fade>

        {/* PRICING */}
        <Fade show={show} delay={0.48}>
          <div style={{ marginTop: 40 }}>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 20, color: d.accent, textAlign: "center", marginBottom: 0, transition: "color 0.5s" }}>Transparante prijzen</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, textAlign: "center", marginBottom: 16 }}>{d.pricing.title}</h2>
            <div style={{ maxWidth: 480, margin: "0 auto", background: "#fff", borderRadius: 16, padding: "22px 20px", border: "1px solid rgba(74,52,40,0.05)", boxShadow: "0 3px 14px rgba(74,52,40,0.03)" }}>
              <p style={{ margin: "0 0 14px", fontSize: 12, color: "#8B7E74", textAlign: "center" }}>{d.pricing.sub}</p>
              {d.pricing.rows.map((r, i) => (
                <div key={`${scene}-p-${i}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: r.highlight ? "10px 10px" : "10px 0", borderBottom: i < d.pricing.rows.length - 1 ? "1px solid rgba(74,52,40,0.04)" : "none", background: r.highlight ? `${d.accent}06` : "transparent", margin: r.highlight ? "0 -8px" : 0, borderRadius: r.highlight ? 8 : 0 }}>
                  <div><span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12.5, fontWeight: 600 }}>{r.item}</span><span style={{ display: "block", fontSize: 10, color: "#B8976D", marginTop: 1 }}>{r.detail}</span></div>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: d.accent, transition: "color 0.5s" }}>{r.price}</span>
                </div>
              ))}
              <p style={{ margin: "14px 0 0", fontSize: 11, color: "#B8976D", lineHeight: 1.5, textAlign: "center" }}>{d.pricing.note}</p>
            </div>
          </div>
        </Fade>

        {/* TESTIMONIALS */}
        <Fade show={show} delay={0.54}>
          <div style={{ marginTop: 40 }}>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 20, color: d.accent, textAlign: "center", marginBottom: 0, transition: "color 0.5s" }}>
              {scene === "default" ? "Tevreden klanten" : "Klanten in dezelfde situatie"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 10, marginTop: 16 }}>
              {d.testimonials.map((t, i) => (
                <div key={`${scene}-t-${i}`} style={{ background: "#fff", border: "1px solid rgba(74,52,40,0.05)", borderRadius: 14, padding: "18px 16px" }}>
                  <span style={{ color: "#C9A86A", letterSpacing: 2, fontSize: 12 }}>★★★★★</span>
                  <p style={{ margin: "6px 0 10px", fontSize: 12, lineHeight: 1.6, color: "#4A3428", fontStyle: "italic" }}>"{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: d.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: d.accent, fontFamily: "'Montserrat',sans-serif", transition: "all 0.5s" }}>{t.name[0]}</div>
                    <div><p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, fontFamily: "'Montserrat',sans-serif" }}>{t.name}</p><p style={{ margin: 0, fontSize: 9.5, color: "#B8976D" }}>{t.occasion}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* CTA */}
        <Fade show={show} delay={0.6}>
          <div style={{ textAlign: "center", background: d.heroBg, margin: "40px -20px 0", padding: "32px 20px", borderRadius: "24px 24px 0 0", transition: "background 0.7s" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, marginBottom: 6 }}>{d.ctaSection.title}</h2>
            <p style={{ fontSize: 12.5, color: "#8B7E74", marginBottom: 18 }}>{d.ctaSection.sub}</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/31634191203" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 22px", background: "#25D366", color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 13, fontFamily: "'Montserrat',sans-serif" }}>📲 WhatsApp</a>
              <a href="https://www.instagram.com/taart_en_koek/" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 22px", background: "linear-gradient(135deg,#833AB4,#E1306C,#F77737)", color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 13, fontFamily: "'Montserrat',sans-serif" }}>📸 Instagram</a>
            </div>
          </div>
        </Fade>

        {/* WHAT CHANGED */}
        {scene !== "default" && (
          <Fade show={show} delay={0.65}>
            <div style={{ margin: "0 -20px", padding: "14px 20px 24px", background: "rgba(74,52,40,0.02)" }}>
              <div style={{ maxWidth: 560, margin: "0 auto", border: "1px dashed rgba(74,52,40,0.1)", borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ margin: "0 0 5px", fontSize: 11, fontWeight: 700, color: d.accent, fontFamily: "'Montserrat',sans-serif" }}>🔍 Wat er veranderde:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {["Hero", "USPs", "Galerij", "Prijstabel", "Reviews", "CTA's", "Kleur", "Gradient"].map((x, i) => (
                    <span key={i} style={{ fontSize: 9, background: `${d.accent}0E`, color: d.accent, padding: "2px 6px", borderRadius: 5, fontWeight: 600, fontFamily: "'Montserrat',sans-serif" }}>{x}</span>
                  ))}
                </div>
              </div>
            </div>
          </Fade>
        )}

        {/* FOOTER */}
        <Fade show={show} delay={0.7}>
          <footer style={{ background: "#4A3428", color: "#FAF8F5", margin: "0 -20px", padding: "32px 20px 16px" }}>
            <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src={`${IMG}/logo-taart-en-koek.jpeg`} alt="Logo" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>Taart <span style={{ color: "#C9A86A" }}>&</span> Koek</span>
                  <p style={{ fontSize: 11, color: "#B8976D", margin: "2px 0 0", maxWidth: 220, lineHeight: 1.4 }}>Handgemaakte taarten uit Rotterdam-Nesselande</p>
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: 11, color: "#B8976D", lineHeight: 1.7 }}>
                <p style={{ margin: 0 }}>📍 Rotterdam-Nesselande</p>
                <p style={{ margin: 0 }}>📲 06-34 19 12 03</p>
                <p style={{ margin: 0 }}>📸 @taart_en_koek</p>
              </div>
            </div>
            <p style={{ textAlign: "center", fontSize: 10, color: "#8B7E74", marginTop: 18, paddingTop: 12, borderTop: "1px solid rgba(201,168,106,0.12)" }}>© 2026 Taart en Koek · Made with <span style={{ color: "#E91E8C" }}>♥</span> in Rotterdam-Nesselande</p>
          </footer>
        </Fade>
      </div>
    </div>
  );
}
