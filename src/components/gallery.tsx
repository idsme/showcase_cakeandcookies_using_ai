"use client";

import type { SceneId, SceneData } from "@/types/scene";
import { INSTAGRAM_URL } from "@/lib/constants";
import { Fade } from "./ui/fade";

const GALLERY_TITLES: Record<SceneId, string> = {
  default: "Galerij",
  birthday: "Verjaardagstaarten",
  baby: "Baby & Gender Reveal",
  theme: "Themataarten",
};

interface GalleryProps {
  scene: SceneId;
  sceneData: SceneData;
  show: boolean;
}

export function Gallery({ scene, sceneData, show }: GalleryProps) {
  return (
    <Fade show={show} delay={0.4}>
      <div className="mt-10">
        <p className="font-script text-xl text-center mb-0 transition-colors duration-500" style={{ color: sceneData.accent }}>
          Onze creaties
        </p>
        <h2 className="font-playfair text-2xl text-center mb-4">{GALLERY_TITLES[scene]}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2">
          {sceneData.gallery.map((g, i) => (
            <div
              key={`${scene}-g-${i}`}
              className="rounded-xl overflow-hidden relative aspect-square cursor-pointer transition-all duration-250 hover:scale-[1.03]"
              style={{ boxShadow: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 20px ${sceneData.accent}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <img src={g.img} alt={g.name} className="w-full h-full object-cover block" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(74,52,40,0.8)] to-transparent flex flex-col justify-end p-2">
                <p className="m-0 text-white font-montserrat text-[11px] font-bold">{g.name}</p>
                <p className="m-0 text-white/70 text-[9px]">{g.tag}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold no-underline font-montserrat transition-colors duration-500"
            style={{ color: sceneData.accent }}
          >
            📸 Meer op Instagram →
          </a>
        </div>
      </div>
    </Fade>
  );
}
