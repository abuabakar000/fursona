"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
}

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  type: "paw" | "star" | "splatter";
  color: string;
}

export default function FloatingPaws() {
  const [clicks, setClicks] = useState<ClickEffect[]>([]);
  const [floaters, setFloaters] = useState<FloatingItem[]>([]);

  // Spawn click effect
  const handleClick = (e: MouseEvent) => {
    const newClick: ClickEffect = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      angle: Math.random() * 40 - 20, // -20 to 20 deg
      scale: Math.random() * 0.4 + 0.8, // 0.8 to 1.2
    };
    
    setClicks((prev) => [...prev.slice(-10), newClick]); // Keep max 10 to prevent overhead
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    
    // Detect mobile touch screen and reduce background floaters count
    const isMobile = 
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    const floaterCount = isMobile ? 3 : 15;
    
    // Create random background floaters
    const initialFloaters: FloatingItem[] = Array.from({ length: floaterCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: isMobile ? Math.random() * 12 + 12 : Math.random() * 20 + 15, // smaller on mobile
      speed: Math.random() * 30 + 30, // seconds to complete loop
      type: i % 3 === 0 ? "paw" : i % 3 === 1 ? "star" : "splatter",
      color: i % 2 === 0 ? "text-amber-200/40" : "text-orange-200/40",
    }));
    setFloaters(initialFloaters);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Background floaters */}
      {floaters.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.color}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
            willChange: "transform",
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: ["0vw", `${Math.sin(item.id) * 5}vw`],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.speed,
            repeat: Infinity,
            ease: "linear",
            delay: -item.speed * Math.random(), // Randomize start position
          }}
        >
          {item.type === "paw" && (
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50,45 C56.6,45 62,39.6 62,33 C62,26.4 56.6,21 50,21 C43.4,21 38,26.4 38,33 C38,39.6 43.4,45 50,45 Z" />
              <path d="M22,53 C27.5,53 32,48.5 32,43 C32,37.5 27.5,33 22,33 C16.5,33 12,37.5 12,43 C12,48.5 16.5,53 22,53 Z" />
              <path d="M78,53 C83.5,53 88,48.5 88,43 C88,37.5 83.5,33 78,33 C72.5,33 68,37.5 68,43 C68,48.5 72.5,53 78,53 Z" />
              <path d="M50,85 C62.1,85 71,76.1 71,65 C71,59 64.5,55 50,55 C35.5,55 29,59 29,65 C29,76.1 37.9,85 50,85 Z" />
            </svg>
          )}
          {item.type === "star" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
          {item.type === "splatter" && (
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50,20 C55,10 65,15 70,25 C75,35 85,38 80,48 C75,58 78,70 68,75 C58,80 50,90 40,82 C30,74 20,72 25,60 C30,48 20,40 28,32 C36,24 45,30 50,20 Z" />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Click-to-spawn paw prints */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="absolute text-orange-400/70"
            style={{
              left: click.x - 20,
              top: click.y - 20,
              width: 40,
              height: 40,
            }}
            initial={{ scale: 0, opacity: 0.9, rotate: click.angle }}
            animate={{ scale: click.scale, opacity: [0.9, 0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              {/* Center Pad */}
              <path d="M50,85 C62.1,85 71,76.1 71,65 C71,59 64.5,55 50,55 C35.5,55 29,59 29,65 C29,76.1 37.9,85 50,85 Z" />
              {/* Toe 1 */}
              <circle cx="22" cy="43" r="10" />
              {/* Toe 2 */}
              <circle cx="38" cy="27" r="11" />
              {/* Toe 3 */}
              <circle cx="62" cy="27" r="11" />
              {/* Toe 4 */}
              <circle cx="78" cy="43" r="10" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
