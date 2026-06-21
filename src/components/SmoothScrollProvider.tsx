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
    const lenis = new Lenis({
      // How smooth the scroll feels — lower = silkier/lazier, higher = snappier
      duration: 1.35,
      // Organic easing curve: slow start, gentle glide, soft stop
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      // Allow touch on mobile — keep natural touch momentum
      touchMultiplier: 1.8,
      // Wheel feels natural, not too fast or slow
      wheelMultiplier: 1.0,
      // Sync direction for consistent feel
      orientation: "vertical",
      gestureOrientation: "vertical",
      // Smooth scroll on anchor clicks too
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Expose lenis globally so anchor links can trigger smooth scroll
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // RAF loop — keeps scroll in sync with framer-motion
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On route change, scroll back to top smoothly
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
