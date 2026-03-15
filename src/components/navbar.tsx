"use client";

import Image from "next/image";
import type { SceneId, SceneData } from "@/types/scene";
import { IMG } from "@/lib/constants";

interface NavbarProps {
  scene: SceneId;
  sceneData: SceneData;
  onReset: () => void;
}

export function Navbar({ scene, sceneData, onReset }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[rgba(250,248,245,0.92)] backdrop-blur-md border-b border-[rgba(74,52,40,0.06)] py-2.5 px-6">
      <div className="max-w-[920px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onReset}>
          <Image
            src={`${IMG}/logo-taart-koek.jpeg`}
            alt="Taart & Koek logo"
            width={40}
            height={40}
            className="rounded-full object-cover border-2 border-[#FFE5EC]"
          />
          <span className="font-playfair text-lg font-bold">
            Taart <span className="transition-colors duration-500" style={{ color: sceneData.accent }}>&</span> Koek
          </span>
        </div>
        <div className="flex gap-2 items-center">
          {scene !== "default" && (
            <button
              onClick={onReset}
              className="bg-[rgba(74,52,40,0.05)] border border-[rgba(74,52,40,0.1)] rounded-lg px-3 py-1 cursor-pointer text-[11px] font-sans text-[#4A3428] hover:bg-[rgba(74,52,40,0.08)] transition-colors"
            >
              ↩ Reset
            </button>
          )}
          <span
            className="text-[9px] font-bold tracking-widest uppercase rounded-xl px-2.5 py-1 transition-all duration-500"
            style={{
              color: sceneData.accent,
              background: `${sceneData.accent}12`,
              border: `1px solid ${sceneData.accent}28`,
            }}
          >
            AI-Native
          </span>
        </div>
      </div>
    </nav>
  );
}
