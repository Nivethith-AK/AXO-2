"use client";

import { useEffect, useState } from "react";
import Oneko from "@/components/oneko";

export default function CatLayer() {
  const [loading, setLoading] = useState(() => {
    if (typeof document === "undefined") return false;
    const overlay = document.getElementById("ls-overlay");
    const isOverlayActive = Boolean(overlay && !overlay.classList.contains("exit"));
    const isBodyMarked = document.body.classList.contains("loading-active");
    return isOverlayActive || isBodyMarked;
  });

  useEffect(() => {
    const checkLoading = () => {
      const overlay = document.getElementById("ls-overlay");
      const isOverlayActive = Boolean(overlay && !overlay.classList.contains("exit"));
      const isBodyMarked = document.body.classList.contains("loading-active");
      setLoading(isOverlayActive || isBodyMarked);
    };

    checkLoading();

    const onDone = () => setLoading(false);
    const onStart = () => setLoading(true);

    window.addEventListener("loading-screen-done", onDone);
    window.addEventListener("loading-screen-start", onStart);

    const observer = new MutationObserver(checkLoading);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "id"],
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("loading-screen-done", onDone);
      window.removeEventListener("loading-screen-start", onStart);
    };
  }, []);

  if (loading) return null;

  return (
    <Oneko
      bubbleScale={0.7}
      skin={"tuxedo"}
      speed={5}
      scale={2}
      idleThreshold={500}
      meow
      volume={0.2}
      bubbleChance={0.05}
      followDistance={60}
      animationSpeed={0.7}
      bubbleText={[
        "Hungy!!",
        "Nya~",
        "Smells like coffee...",
        "Rules are for dogs",
        "Has anyone seen Azrael?",
        "Adoniel is busy again...",
        "Is Azrael a hooman?",
        "I should go on my own adventures",
        "Need scratch-scratch",
        "Upppies?",
        "Boundaries are a social construct",
        "Your furniture is expensive... that's a threat",
      ]}
      freerunChance={0.01}
      freerunDuration={20}
      bubbleDisplayFrames={80}
      bubbleCooldown={300}
      zoneAttractionChance={0.8}
      napWhileTyping
      followFocus
      perchOnHover
      pettable
      seasonal={false}
      grabbable
      treats
      timeOfDay
      affection
    />
  );
}
