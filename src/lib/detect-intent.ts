import type { SceneId } from "@/types/scene";
import { INTENTS } from "@/data/intents";

export function detectIntent(input: string): SceneId | null {
  const lower = input.toLowerCase();
  for (const { keywords, scenario } of INTENTS) {
    if (keywords.some((k) => lower.includes(k))) return scenario;
  }
  return null;
}
