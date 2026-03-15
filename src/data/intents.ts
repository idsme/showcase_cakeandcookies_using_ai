import type { IntentRule } from "@/types/scene";

export const INTENTS: IntentRule[] = [
  {
    keywords: ["verjaardag", "birthday", "jarig", "jaar oud", "wordt", "leeftijd", "sweet 16", "feest", "party", "jubileum"],
    scenario: "birthday",
  },
  {
    keywords: ["baby", "gender reveal", "babyshower", "zwanger", "geboorte", "jongen of meisje", "in verwachting", "uitgerekend"],
    scenario: "baby",
  },
  {
    keywords: ["thema", "paw patrol", "pokemon", "nijntje", "frozen", "karakter", "marvel", "peppa", "mario", "disney", "pikachu", "held"],
    scenario: "theme",
  },
  {
    keywords: ["spoed", "morgen", "vandaag", "haast", "snel", "rush", "last minute", "vergeten", "dringend", "urgent", "direct", "overmorgen"],
    scenario: "rush",
  },
];
