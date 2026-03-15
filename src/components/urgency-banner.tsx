"use client";

import type { SceneData } from "@/types/scene";
import { Fade } from "./ui/fade";

interface UrgencyBannerProps {
  sceneData: SceneData;
  show: boolean;
}

export function UrgencyBanner({ sceneData, show }: UrgencyBannerProps) {
  if (!sceneData.urgency) return null;

  const u = sceneData.urgency;

  return (
    <Fade show={show} delay={0.14}>
      <div
        className="max-w-[600px] mx-auto mt-3.5 rounded-xl px-4 py-3 flex items-center gap-3"
        style={{
          background: `${sceneData.accent}08`,
          border: `1px solid ${sceneData.accent}20`,
        }}
      >
        <span className="text-2xl">{u.icon}</span>
        <div>
          <p className="m-0 text-[13px] font-bold" style={{ color: sceneData.accent }}>
            {u.text}
          </p>
          <p className="mt-0.5 mb-0 text-[10px] text-[#8B7E74]">{u.sub}</p>
        </div>
      </div>
    </Fade>
  );
}
