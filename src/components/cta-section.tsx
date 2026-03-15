"use client";

import type { SceneData } from "@/types/scene";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/constants";
import { Fade } from "./ui/fade";

interface CtaSectionProps {
  sceneData: SceneData;
  show: boolean;
}

export function CtaSection({ sceneData, show }: CtaSectionProps) {
  return (
    <Fade show={show} delay={0.6}>
      <div
        className="text-center mx-[-20px] mt-10 px-5 py-8 rounded-t-3xl transition-all duration-700"
        style={{ background: sceneData.heroBg }}
      >
        <h2 className="font-playfair text-[22px] mb-1.5">{sceneData.ctaSection.title}</h2>
        <p className="text-[12.5px] text-[#8B7E74] mb-4.5">{sceneData.ctaSection.sub}</p>
        <div className="flex gap-2 justify-center flex-wrap">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5.5 py-2.5 bg-[#25D366] text-white rounded-xl no-underline font-semibold text-[13px] font-montserrat hover:opacity-90 transition-opacity"
          >
            📲 WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5.5 py-2.5 text-white rounded-xl no-underline font-semibold text-[13px] font-montserrat hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#833AB4,#E1306C,#F77737)" }}
          >
            📸 Instagram
          </a>
        </div>
      </div>
    </Fade>
  );
}
