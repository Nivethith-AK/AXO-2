"use client";

import Oneko from "@/components/oneko";

export default function CatLayer() {
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
