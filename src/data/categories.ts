import type { Category } from "@/types/scene";
import { IMG } from "@/lib/constants";

export const CATEGORIES: Category[] = [
  { id: "birthday", img: `${IMG}/mile-stone-meisje.jpg`, label: "Verjaardag", sub: "Alle leeftijden", trigger: "Ik zoek een verjaardagstaart" },
  { id: "baby", img: `${IMG}/theme-cake-baby.jpg`, label: "Babyshower", sub: "& Gender Reveal", trigger: "We organiseren een babyshower!" },
  { id: "theme", img: `${IMG}/theme-cake-paw.jpg`, label: "Thema Taart", sub: "Karakter & thema", trigger: "Ik wil een thema taart bestellen voor mijn kind" },
  { id: "rush", img: `${IMG}/hart-cake-taart.jpeg`, label: "Spoed", sub: "Morgen nodig?", trigger: "Help! Ik heb morgen een taart nodig" },
];
