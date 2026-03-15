"use client";

import type { SceneId, SceneData } from "@/types/scene";
import { Fade } from "./ui/fade";

const CHANGED_ITEMS = ["Hero", "USPs", "Galerij", "Prijstabel", "Reviews", "CTA's", "Kleur", "Gradient"];

interface SceneDebugProps {
  scene: SceneId;
  sceneData: SceneData;
  show: boolean;
}

export function SceneDebug({ scene, sceneData, show }: SceneDebugProps) {
  if (scene === "default") return null;

  return (
    <Fade show={show} delay={0.65}>
      <div className="mx-[-20px] px-5 pt-3.5 pb-6 bg-[rgba(74,52,40,0.02)]">
        <div className="max-w-[560px] mx-auto border border-dashed border-[rgba(74,52,40,0.1)] rounded-xl px-4 py-3.5">
          <p className="mt-0 mb-1.5 text-[11px] font-bold font-montserrat" style={{ color: sceneData.accent }}>
            🔍 Wat er veranderde:
          </p>
          <div className="flex flex-wrap gap-1">
            {CHANGED_ITEMS.map((x, i) => (
              <span
                key={i}
                className="text-[9px] px-1.5 py-0.5 rounded font-semibold font-montserrat"
                style={{ background: `${sceneData.accent}0E`, color: sceneData.accent }}
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}
