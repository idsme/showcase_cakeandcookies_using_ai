"use client";

import type { SceneId, SceneData } from "@/types/scene";
import { Fade } from "./ui/fade";

interface PricingTableProps {
  scene: SceneId;
  sceneData: SceneData;
  show: boolean;
}

export function PricingTable({ scene, sceneData, show }: PricingTableProps) {
  const p = sceneData.pricing;

  return (
    <Fade show={show} delay={0.48}>
      <div className="mt-10">
        <p className="font-script text-xl text-center mb-0 transition-colors duration-500" style={{ color: sceneData.accent }}>
          Transparante prijzen
        </p>
        <h2 className="font-playfair text-2xl text-center mb-4">{p.title}</h2>
        <div className="max-w-[480px] mx-auto bg-white rounded-2xl px-5 py-5.5 border border-[rgba(74,52,40,0.05)] shadow-sm">
          <p className="mt-0 mb-3.5 text-xs text-[#8B7E74] text-center">{p.sub}</p>
          {p.rows.map((r, i) => (
            <div
              key={`${scene}-p-${i}`}
              className="flex justify-between items-center py-2.5 transition-colors"
              style={{
                padding: r.highlight ? "10px" : "10px 0",
                borderBottom: i < p.rows.length - 1 ? "1px solid rgba(74,52,40,0.04)" : "none",
                background: r.highlight ? `${sceneData.accent}06` : "transparent",
                margin: r.highlight ? "0 -8px" : "0",
                borderRadius: r.highlight ? 8 : 0,
              }}
            >
              <div>
                <span className="font-montserrat text-[12.5px] font-semibold">{r.item}</span>
                <span className="block text-[10px] text-[#B8976D] mt-0.5">{r.detail}</span>
              </div>
              <span
                className="font-playfair text-base font-bold transition-colors duration-500"
                style={{ color: sceneData.accent }}
              >
                {r.price}
              </span>
            </div>
          ))}
          <p className="mt-3.5 mb-0 text-[11px] text-[#B8976D] leading-relaxed text-center">{p.note}</p>
        </div>
      </div>
    </Fade>
  );
}
