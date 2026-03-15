"use client";

import type { SceneId, SceneData } from "@/types/scene";
import { CATEGORIES } from "@/data/categories";
import { Fade } from "./ui/fade";

interface CategoryCardsProps {
  scene: SceneId;
  sceneData: SceneData;
  respond: (text: string, scene?: SceneId) => void;
  show: boolean;
}

export function CategoryCards({ scene, sceneData, respond, show }: CategoryCardsProps) {
  const d = sceneData;

  return (
    <Fade show={show} delay={0.17}>
      <div className="max-w-[600px] mx-auto mt-3.5">
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((c) => {
            const active = scene === c.id;
            return (
              <div
                key={c.id}
                onClick={() => respond(c.trigger, c.id)}
                className="cursor-pointer rounded-xl overflow-hidden relative aspect-[3/4] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  border: active ? `2.5px solid ${d.accent}` : "2.5px solid transparent",
                  boxShadow: active ? `0 4px 18px ${d.accent}22` : "0 2px 8px rgba(74,52,40,0.06)",
                }}
              >
                <img
                  src={c.img}
                  alt={c.label}
                  className="w-full h-full object-cover block transition-transform duration-400"
                  style={active ? { transform: "scale(1.08)" } : {}}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-2 transition-all duration-500"
                  style={{
                    background: active
                      ? `linear-gradient(to top, ${d.accent}DD 0%, ${d.accent}55 40%, transparent 100%)`
                      : "linear-gradient(to top, rgba(74,52,40,0.85) 0%, rgba(74,52,40,0.2) 50%, transparent 100%)",
                  }}
                >
                  <p className="m-0 text-white font-montserrat text-xs font-bold leading-tight">{c.label}</p>
                  <p className="mt-0.5 mb-0 text-white/75 text-[9.5px]">{c.sub}</p>
                </div>
                {active && (
                  <div
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white flex items-center justify-center text-[11px] font-bold"
                    style={{ color: d.accent }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Fade>
  );
}
