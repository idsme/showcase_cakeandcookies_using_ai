import type { SceneData, SceneId } from "@/types/scene";
import { IMG } from "@/lib/constants";

export const SCENES: Record<SceneId, SceneData> = {
  default: {
    accent: "#E91E8C",
    accentSoft: "#FFE5EC",
    gold: "#C9A86A",
    bg: "#FAF8F5",
    heroBg: "linear-gradient(135deg, #FAF8F5 0%, #FFE5EC 100%)",
    hero: {
      badge: "📍 Rotterdam-Nesselande",
      script: "Met liefde handgemaakt",
      title: "Droomtaarten",
      titleSpan: "op maat",
      sub: "Handgemaakte taarten voor jouw speciale momenten. Dagelijks verse ingrediënten, geen fondant — alleen heerlijke ganache.",
      cta: "Bestel via WhatsApp",
    },
    stats: [
      { num: "500+", label: "Taarten gemaakt" },
      { num: "5.0 ★", label: "Beoordeling" },
      { num: "100%", label: "Handgemaakt" },
    ],
    values: [
      { icon: "👩‍🍳", title: "Handgemaakt", desc: "Elke taart met liefde gemaakt, alleen verse kwaliteit." },
      { icon: "✨", title: "Geen fondant", desc: "Alleen heerlijke ganache van de beste chocolade." },
      { icon: "🎨", title: "Persoonlijk ontwerp", desc: "Deel je idee, wij maken het werkelijkheid." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-paw.jpg`, name: "Paw Patrol", tag: "Thema Taart" },
      { img: `${IMG}/theme-cake-baby.jpg`, name: "Babyshower", tag: "Gender Reveal" },
      { img: `${IMG}/theme-cake-pokemon.jpg`, name: "Pokémon", tag: "Kindertaart" },
      { img: `${IMG}/mile-stone-woman.jpeg`, name: "Bloementaart", tag: "Jubileum" },
      { img: `${IMG}/mile-stone-baby.jpg`, name: "Oh Baby", tag: "Babyshower" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "1e Verjaardag" },
      { img: `${IMG}/mile-stone-meisje.jpg`, name: "Sweet 16", tag: "Verjaardag" },
      { img: `${IMG}/hart-cake-taart.jpeg`, name: "Harttaart", tag: "Liefde" },
    ],
    pricing: {
      title: "Startprijzen",
      sub: "Inclusief premium ingrediënten & basis decoratie",
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

    ctaSection: { title: "Jouw droomtaart begint hier", sub: "Vertel ons over je feest en wij doen de rest" },
  },

  birthday: {
    accent: "#E91E8C",
    accentSoft: "#FFE5EC",
    gold: "#C9A86A",
    bg: "#FFF9FB",
    heroBg: "linear-gradient(135deg, #FFF9FB 0%, #FFE5EC 50%, #FFF0F5 100%)",
    hero: {
      badge: "🎂 Verjaardagstaarten specialist",
      script: "Maak het onvergetelijk",
      title: "De perfecte",
      titleSpan: "verjaardagstaart",
      sub: "Van Paw Patrol voor de kleintjes tot elegante taarten voor volwassenen — elk feest verdient een taart die net zo bijzonder is als de jarige.",
      cta: "Bestel verjaardagstaart",
    },
    stats: [
      { num: "300+", label: "Verjaardagstaarten" },
      { num: "1-80", label: "Alle leeftijden" },
      { num: "3 dagen", label: "Bestel vooruit" },
    ],
    values: [
      { icon: "🎈", title: "Elk thema mogelijk", desc: "Paw Patrol, Pokémon, Frozen, Nijntje — noem het en wij maken het." },
      { icon: "🔢", title: "Alle leeftijden", desc: "Van 1e verjaardag tot 80ste jubileum, elke mijlpaal." },
      { icon: "👨‍👩‍👧‍👦", title: "Voor elk gezelschap", desc: "Van bento (1-2p) tot grote feesten (30+ personen)." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-paw.jpg`, name: "Paw Patrol", tag: "Populair bij kids" },
      { img: `${IMG}/theme-cake-pokemon.jpg`, name: "Pokémon", tag: "Kindertaart" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "1e Verjaardag" },
      { img: `${IMG}/mile-stone-meisje.jpg`, name: "Sweet 16", tag: "Tiener" },
      { img: `${IMG}/mile-stone-woman.jpeg`, name: "Bloementaart", tag: "80ste Verjaardag" },
      { img: `${IMG}/hart-cake-taart.jpeg`, name: "Harttaart", tag: "Speciaal" },
    ],
    pricing: {
      title: "Verjaardagstaart prijzen",
      sub: "Inclusief thema-decoratie, naam en leeftijd",
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

    ctaSection: { title: "Wanneer is het feest?", sub: "Bestel minimaal 3 dagen van tevoren voor het beste resultaat" },
  },

  baby: {
    accent: "#F48FB1",
    accentSoft: "#FFF0F5",
    gold: "#C9A86A",
    bg: "#FFFBFD",
    heroBg: "linear-gradient(135deg, #FFFBFD 0%, #FFF0F5 50%, #F8E8FF 100%)",
    hero: {
      badge: "👶 Baby & Gender Reveal",
      script: "Een zoet begin",
      title: "Welkom",
      titleSpan: "kleine spruit",
      sub: "Maak de aankondiging onvergetelijk. Gender reveal met gekleurde vulling, babyshower taarten met persoonlijke details.",
      cta: "Bestel babyshower taart",
    },
    stats: [
      { num: "150+", label: "Babyshower taarten" },
      { num: "🩷🩵", label: "Gender Reveal" },
      { num: "100%", label: "Verrassing gegarandeerd" },
    ],
    values: [
      { icon: "🎀", title: "Gender Reveal vulling", desc: "Roze of blauwe crème binnenin — de verrassing zit in elke hap." },
      { icon: "🍼", title: "Babyshower thema's", desc: "Nijntje, beertjes, sterren, wolkjes — alles gepersonaliseerd." },
      { icon: "📸", title: "Instagram-waardig", desc: "Ontworpen om prachtig op foto's te staan." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-baby.jpg`, name: "Babyshower", tag: "Gender Reveal" },
      { img: `${IMG}/mile-stone-baby.jpg`, name: "Oh Baby", tag: "Babyshower" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "1e Verjaardag" },
      { img: `${IMG}/hart-cake-taart.jpeg`, name: "Harttaart", tag: "Met liefde" },
    ],
    pricing: {
      title: "Babyshower & Gender Reveal",
      sub: "Inclusief thema-decoratie en gekleurde vulling",
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

    ctaSection: { title: "Wanneer is de uitgerekende datum?", sub: "Plan je babyshower taart ruim van tevoren" },
  },

  theme: {
    accent: "#7C4DFF",
    accentSoft: "#F3EEFF",
    gold: "#C9A86A",
    bg: "#FDFBFF",
    heroBg: "linear-gradient(135deg, #FDFBFF 0%, #F3EEFF 50%, #FFF0F5 100%)",
    hero: {
      badge: "🎨 Thema & Karakter Taarten",
      script: "Hun held op taart",
      title: "Paw Patrol, Pokémon",
      titleSpan: "& meer",
      sub: "Elk favoriet karakter tot leven gebracht in taart. Nijntje, Frozen, Marvel — noem het thema en wij ontwerpen het.",
      cta: "Bestel themataart",
    },
    stats: [
      { num: "200+", label: "Themataarten" },
      { num: "∞", label: "Thema's mogelijk" },
      { num: "#1", label: "Kids favoriet" },
    ],
    values: [
      { icon: "🐾", title: "Elk karakter mogelijk", desc: "Paw Patrol, Pokémon, Nijntje, Frozen, Mario — alles kan." },
      { icon: "🖌️", title: "Handgeschilderd detail", desc: "Elk detail met de hand in ganache. Geen prints, geen fondant." },
      { icon: "📷", title: "Stuur een voorbeeld", desc: "Stuur een foto via WhatsApp en wij maken het na in taart." },
    ],
    gallery: [
      { img: `${IMG}/theme-cake-paw.jpg`, name: "Paw Patrol", tag: "Populair" },
      { img: `${IMG}/theme-cake-pokemon.jpg`, name: "Pokémon", tag: "Kindertaart" },
      { img: `${IMG}/theme-cake-nijntje.jpg`, name: "Nijntje", tag: "Peuters" },
      { img: `${IMG}/theme-cake-baby.jpg`, name: "Fantasy", tag: "Meisjes" },
      { img: `${IMG}/mile-stone-meisje.jpg`, name: "Elegant thema", tag: "Tieners" },
      { img: `${IMG}/mile-stone-baby.jpg`, name: "Oh Baby", tag: "Baby thema" },
    ],
    pricing: {
      title: "Themataart prijzen",
      sub: "Inclusief thema-decoratie naar keuze",
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
    ctaSection: { title: "Welk thema wordt het?", sub: "Stuur je idee of een foto via WhatsApp — wij doen de rest" },
  },
};
