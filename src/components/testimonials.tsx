"use client";

import type { SceneId, SceneData } from "@/types/scene";
import { Fade } from "./ui/fade";

interface TestimonialsProps {
  scene: SceneId;
  sceneData: SceneData;
  show: boolean;
}

export function Testimonials({ scene, sceneData, show }: TestimonialsProps) {
  return (
    <Fade show={show} delay={0.54}>
      <div className="mt-10">
        <p className="font-script text-xl text-center mb-0 transition-colors duration-500" style={{ color: sceneData.accent }}>
          {scene === "default" ? "Tevreden klanten" : "Klanten in dezelfde situatie"}
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5 mt-4">
          {sceneData.testimonials.map((t, i) => (
            <div
              key={`${scene}-t-${i}`}
              className="bg-white border border-[rgba(74,52,40,0.05)] rounded-xl px-4 py-4.5"
            >
              <span className="text-[#C9A86A] tracking-widest text-xs">★★★★★</span>
              <p className="mt-1.5 mb-2.5 text-xs leading-relaxed text-[#4A3428] italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs font-montserrat transition-all duration-500"
                  style={{ background: sceneData.accentSoft, color: sceneData.accent }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="m-0 text-[11.5px] font-bold font-montserrat">{t.name}</p>
                  <p className="m-0 text-[9.5px] text-[#B8976D]">{t.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}
