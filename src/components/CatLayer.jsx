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
      skin={"tuxedo"}
      speed={20}
      idleThreshold={2500}
      meow
      followDistance={15}
      animationSpeed={1.4}
      bubbleText={"purr patrol"}
      freerunChance={0.15}
      freerunDuration={80}
    />
  );
}
