"use client";

import type { SceneId, SceneData } from "@/types/scene";
import { Fade } from "./ui/fade";

interface ValuesSectionProps {
  scene: SceneId;
  sceneData: SceneData;
  show: boolean;
}

export function ValuesSection({ scene, sceneData, show }: ValuesSectionProps) {
  return (
    <Fade show={show} delay={0.3}>
      <div className="mt-10">
        <p className="font-script text-xl text-center mb-0 transition-colors duration-500" style={{ color: sceneData.accent }}>
          Waarom Taart en Koek
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2.5 mt-4">
          {sceneData.values.map((v, i) => (
            <div
              key={`${scene}-v-${i}`}
              className="bg-white border border-[rgba(74,52,40,0.05)] rounded-xl px-4 py-5 text-center transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-[28px] block mb-2">{v.icon}</span>
              <h3 className="font-montserrat text-[13px] font-bold mb-1">{v.title}</h3>
              <p className="m-0 text-xs leading-relaxed text-[#8B7E74]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}
