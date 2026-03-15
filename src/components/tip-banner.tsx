"use client";

import type { SceneId, SceneData } from "@/types/scene";
import { Fade } from "./ui/fade";

interface TipBannerProps {
  scene: SceneId;
  sceneData: SceneData;
  showTip: boolean;
  show: boolean;
}

export function TipBanner({ scene, sceneData, showTip, show }: TipBannerProps) {
  if (!showTip || scene !== "default") return null;

  return (
    <Fade show={show} delay={0.24}>
      <div
        className="max-w-[600px] mx-auto mt-3.5 rounded-xl px-4 py-3"
        style={{
          background: `${sceneData.gold}0D`,
          border: `1px solid ${sceneData.gold}30`,
        }}
      >
        <p className="m-0 text-xs leading-relaxed text-[#8B7E74]">
          <strong className="text-[#C9A86A]">✨ AI-native website.</strong> Klik op een categorie of typ wat je zoekt
          — de hele pagina verandert mee. Prijzen, foto&apos;s, reviews, alles.
        </p>
      </div>
    </Fade>
  );
}
