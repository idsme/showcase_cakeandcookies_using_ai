export type SceneId = "default" | "birthday" | "baby" | "theme" | "rush";

export interface HeroContent {
  badge: string;
  script: string;
  title: string;
  titleSpan: string;
  sub: string;
  cta: string;
}

export interface StatItem {
  num: string;
  label: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  desc: string;
}

export interface GalleryItem {
  img: string;
  name: string;
  tag: string;
}

export interface PricingRow {
  item: string;
  detail: string;
  price: string;
  highlight?: boolean;
}

export interface PricingContent {
  title: string;
  sub: string;
  rows: PricingRow[];
  note: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  occasion: string;
}

export interface UrgencyContent {
  icon: string;
  text: string;
  sub: string;
}

export interface CtaContent {
  title: string;
  sub: string;
}

export interface SceneData {
  accent: string;
  accentSoft: string;
  gold: string;
  bg: string;
  heroBg: string;
  hero: HeroContent;
  stats: StatItem[];
  values: ValueItem[];
  gallery: GalleryItem[];
  pricing: PricingContent;
  testimonials: Testimonial[];
  urgency: UrgencyContent | null;
  ctaSection: CtaContent;
}

export interface Category {
  id: SceneId;
  img: string;
  label: string;
  sub: string;
  trigger: string;
}

export interface IntentRule {
  keywords: string[];
  scenario: SceneId;
}

export interface ChatMessage {
  r: "user" | "ai";
  t: string;
}
