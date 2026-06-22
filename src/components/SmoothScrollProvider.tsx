"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

/**
 * SmoothScrollProvider
 * Wraps the app with Lenis smooth scroll, synced to framer-motion's RAF loop.
 * 
 * Tuned for the cozy furry art vibe:
 * - Gentle easing (easeOutQuart-like) for that "flipping paper pages" feel
 * - Slightly slower lerp so the scroll feels like gliding through a sketchbook
 * - Wheel multiplier kept natural so it doesn't feel sluggish
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if it is a touch device or mobile screen
    const isTouchDevice = 
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    if (isTouchDevice) {
      // Do not initialize Lenis on touch devices to ensure 100% native mobile scroll performance
      return;
    }

    const lenis = new Lenis({
      // Let Lenis manage its own animation frame loop
      autoRaf: true,
      // Snappy and organic linear interpolation (lerp) instead of slow duration curves
      lerp: 0.08,
      // Natural wheel multiplier
      wheelMultiplier: 0.9,
      // Sync direction
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Expose lenis globally so anchor links can trigger smooth scroll
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      (window as unknown as Record<string, unknown>).__lenis = undefined;
    };
  }, []);

  // On route change, scroll back to top smoothly if Lenis is active
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
