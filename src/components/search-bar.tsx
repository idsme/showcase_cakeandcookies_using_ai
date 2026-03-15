"use client";

import type { SceneData, ChatMessage } from "@/types/scene";
import { Fade } from "./ui/fade";

interface SearchBarProps {
  sceneData: SceneData;
  input: string;
  setInput: (v: string) => void;
  log: ChatMessage[];
  submit: () => void;
  show: boolean;
}

export function SearchBar({ sceneData, input, setInput, log, submit, show }: SearchBarProps) {
  const d = sceneData;

  return (
    <Fade show={show} delay={0.1}>
      <div className="max-w-[600px] mx-auto mt-5">
        {log.length > 0 && (
          <div className="mb-2.5 rounded-xl bg-[rgba(74,52,40,0.02)] border border-[rgba(74,52,40,0.06)] p-3 max-h-[130px] overflow-y-auto">
            {log.map((m, i) => (
              <div key={i} className="mb-1.5 flex gap-1.5 items-start">
                <div
                  className="min-w-[22px] h-[22px] rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{
                    background: m.r === "user" ? "rgba(74,52,40,0.06)" : `${d.accent}12`,
                    color: m.r === "user" ? "#4A3428" : d.accent,
                  }}
                >
                  {m.r === "user" ? "Jij" : "AI"}
                </div>
                <p className={`m-0 text-xs leading-relaxed pt-0.5 ${m.r === "user" ? "text-[#8B7E74]" : "text-[#4A3428]"}`}>
                  {m.t}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Vertel over je feest of wat je zoekt..."
            className="flex-1 px-3.5 py-3 bg-white rounded-xl text-[#4A3428] text-sm font-sans outline-none transition-colors duration-300 box-border"
            style={{ border: `2px solid ${d.accent}30` }}
            onFocus={(e) => (e.target.style.borderColor = d.accent)}
            onBlur={(e) => (e.target.style.borderColor = `${d.accent}30`)}
          />
          <button
            onClick={submit}
            className="w-11 h-11 rounded-xl border-none text-white cursor-pointer text-lg font-bold flex items-center justify-center transition-colors duration-300 shrink-0 hover:opacity-90"
            style={{ background: d.accent }}
          >
            →
          </button>
        </div>
      </div>
    </Fade>
  );
}
