"use client";

import type { SceneData } from "@/types/scene";
import { WHATSAPP_URL } from "@/lib/constants";
import { Fade } from "./ui/fade";

interface HeroProps {
  data: SceneData;
  show: boolean;
}

export function Hero({ data, show }: HeroProps) {
  return (
    <Fade show={show} delay={0}>
      <div
        className="text-center mx-[-20px] px-5 pt-10 pb-6 rounded-b-[28px] transition-all duration-700"
        style={{ background: data.heroBg }}
      >
        <span className="text-[11px] font-semibold tracking-wide text-[#4A3428] bg-[rgba(74,52,40,0.05)] rounded-full px-3.5 py-1.5">
          {data.hero.badge}
        </span>
        <p
          className="font-script text-[clamp(20px,3.5vw,28px)] mt-2.5 mb-1 transition-colors duration-500"
          style={{ color: data.accent }}
        >
          {data.hero.script}
        </p>
        <h1 className="font-playfair text-[clamp(26px,5vw,44px)] font-bold leading-tight mb-3">
          {data.hero.title}{" "}
          <span className="transition-colors duration-500" style={{ color: data.accent }}>
            {data.hero.titleSpan}
          </span>
        </h1>
        <p className="text-sm leading-relaxed text-[#8B7E74] max-w-[500px] mx-auto mb-5">
          {data.hero.sub}
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold text-[13px] font-montserrat transition-colors duration-500 hover:opacity-90"
          style={{ background: data.accent }}
        >
          📲 {data.hero.cta}
        </a>
        <div className="flex justify-center gap-6 mt-5 flex-wrap">
          {data.stats.map((s, i) => (
            <div key={i}>
              <div className="font-playfair text-lg font-bold">{s.num}</div>
              <div className="text-[10px] text-[#8B7E74]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
}
