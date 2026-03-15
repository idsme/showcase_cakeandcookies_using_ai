"use client";

import { useState, useCallback } from "react";
import type { SceneId, ChatMessage } from "@/types/scene";
import { SCENES } from "@/data/scenes";
import { detectIntent } from "@/lib/detect-intent";

const SCENE_LABELS: Record<Exclude<SceneId, "default">, string> = {
  birthday: "verjaardagstaarten",
  baby: "babyshower & gender reveal",
  theme: "themataarten",
};

export function useScene() {
  const [scene, setScene] = useState<SceneId>("default");
  const [input, setInput] = useState("");
  const [log, setLog] = useState<ChatMessage[]>([]);
  const [showTip, setShowTip] = useState(true);
  const [show, setShow] = useState(true);

  const sceneData = SCENES[scene];

  const transition = useCallback((next: SceneId) => {
    setShow(false);
    setTimeout(() => {
      setScene(next);
      setTimeout(() => setShow(true), 80);
    }, 350);
  }, []);

  const respond = useCallback(
    (text: string, triggeredScene?: SceneId) => {
      const intent = triggeredScene || detectIntent(text);

      if (intent && intent !== "default" && intent !== scene) {
        setLog((prev) => [
          ...prev,
          { r: "user", t: text },
          { r: "ai", t: `Ik snap het — je zoekt ${SCENE_LABELS[intent]}. De pagina past zich aan... 🎂` },
        ]);
        setShowTip(false);
        transition(intent);
      } else if (intent === scene) {
        setLog((prev) => [
          ...prev,
          { r: "user", t: text },
          { r: "ai", t: "Je ziet al de juiste informatie! Scroll voor prijzen of klik WhatsApp." },
        ]);
      } else {
        setLog((prev) => [
          ...prev,
          { r: "user", t: text },
          { r: "ai", t: "Klik op een categorie of typ: 'verjaardagstaart', 'babyshower', of 'Paw Patrol'." },
        ]);
      }
    },
    [scene, transition],
  );

  const submit = useCallback(() => {
    if (!input.trim()) return;
    respond(input.trim());
    setInput("");
  }, [input, respond]);

  const reset = useCallback(() => {
    setLog([]);
    setShowTip(true);
    transition("default");
  }, [transition]);

  return { scene, sceneData, input, setInput, log, show, showTip, submit, respond, reset };
}
