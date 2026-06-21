"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

// --- Sketchy Vector Art Icons ---
import { OrangeSlice, SketchStar, SketchHeart, SketchPaw, SketchTwig, SketchLeaf } from "./SketchIcons";

const cutePhrases = [
  "Boop! 🐾",
  "*happy tail wags* ✨",
  "You're cute! 💖",
  "Hewwo! :3",
  "Awoo~! 🐺",
  "*happy ear wiggles*",
  "Purrr~ 🧡",
  "Check my wishlist! 🥺",
  "Rawr! XD",
  "Mwef! 👅",
  "Hug me? 🤗",
  "*nuzzles your screen*"
];

// --- Main Hero Component ---

export default function Hero() {
  const [clickCount, setClickCount] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  
  // Mouse position state to look at cursor
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const { playSound } = useAudio();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized offset from window center (-1 to 1)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;
      
      // Shift mascot slightly towards cursor
      setMouseOffset({ x: dx * 16, y: dy * 12 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMascotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickCount((prev) => prev + 1);
    
    // Play soft poke sound
    playSound("poke");

    // Position clicks
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spawn sparkles
    const newSparkles = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 60 - 30),
      y: y + (Math.random() * 60 - 30),
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);
    
    // Spawn speech bubble
    const phrase = cutePhrases[Math.floor(Math.random() * cutePhrases.length)];
    setSpeechBubble(phrase);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
    }, 1000);

    setTimeout(() => {
      setSpeechBubble((current) => current === phrase ? null : current);
    }, 1500);
  };

  return (
    <section id="home" className="relative w-full px-6 py-6 md:py-10 lg:py-12 bg-amber-50/40 overflow-hidden">
      
      {/* --- Rich Background Glow Blobs --- */}
      <div className="absolute top-[10%] right-[12%] w-[380px] h-[380px] bg-gradient-to-tr from-amber-300/25 to-orange-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-[320px] h-[320px] bg-gradient-to-tr from-orange-200/25 to-amber-250/25 rounded-full blur-3xl pointer-events-none" />

      {/* --- Scattered Mini Arts Framed Closer to Content --- */}
      
      {/* Top Left Area */}
      <motion.div
        className="absolute top-6 left-[8%] text-orange-455/60 pointer-events-none hidden md:block"
        animate={{ y: [0, -3, 0], rotate: [15, 20, 15] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <SketchStar className="w-6 h-6" />
      </motion.div>

      <motion.div
        className="absolute top-16 left-[4%] text-amber-500/50 pointer-events-none hidden md:block"
        animate={{ y: [0, 4, 0], rotate: [-15, -10, -15] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.2 }}
      >
        <OrangeSlice className="w-10 h-10" />
      </motion.div>

      <motion.div
        className="absolute top-8 left-[18%] text-orange-300/40 pointer-events-none hidden sm:block"
        animate={{ scale: [1, 1.05, 1], rotate: [5, 10, 5] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      >
        <SketchPaw className="w-6 h-6" />
      </motion.div>

      {/* Middle Left Area */}
      <motion.div
        className="absolute top-[40%] left-[2%] text-orange-300/45 pointer-events-none hidden md:block"
        animate={{ x: [0, 2, 0], rotate: [25, 20, 25] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
      >
        <SketchPaw className="w-8 h-8" />
      </motion.div>

      <motion.div
        className="absolute top-[32%] left-[20%] text-red-400/40 pointer-events-none hidden md:block"
        animate={{ scale: [0.95, 1.05, 0.95], rotate: [-8, -3, -8] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
      >
        <SketchHeart className="w-5 h-5 fill-red-400/10" />
      </motion.div>

      <motion.div
        className="absolute top-[52%] left-[10%] text-orange-400/35 pointer-events-none hidden md:block"
        animate={{ y: [0, 3, 0], rotate: [10, 5, 10] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.3 }}
      >
        <SketchTwig className="w-7 h-7" />
      </motion.div>

      {/* Bottom Left Area */}
      <motion.div
        className="absolute bottom-10 left-[6%] text-orange-455/50 pointer-events-none hidden md:block"
        animate={{ y: [0, -5, 0], rotate: [35, 30, 35] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
      >
        <OrangeSlice className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute bottom-[24%] left-[14%] text-amber-500/60 pointer-events-none hidden md:block"
        animate={{ scale: [0.9, 1.05, 0.9] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      >
        <SketchStar className="w-5 h-5" />
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-[22%] text-red-455/45 pointer-events-none hidden md:block"
        animate={{ y: [0, -3, 0], rotate: [12, 18, 12] }}
        transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut" }}
      >
        <SketchHeart className="w-6 h-6 fill-red-455/15" />
      </motion.div>

      {/* Top Center & Header Area */}
      <motion.div
        className="absolute top-6 left-[46%] text-orange-400/45 pointer-events-none hidden md:block"
        animate={{ y: [0, 4, 0], rotate: [20, 15, 20] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
      >
        <SketchHeart className="w-7 h-7 fill-orange-400/10" />
      </motion.div>

      <motion.div
        className="absolute top-18 left-[52%] text-orange-300/40 pointer-events-none hidden md:block"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut", delay: 0.4 }}
      >
        <SketchLeaf className="w-6 h-6" />
      </motion.div>

      {/* Top Right Area */}
      <motion.div
        className="absolute top-6 right-[6%] text-orange-455/65 pointer-events-none hidden md:block"
        animate={{ y: [0, -4, 0], rotate: [-25, -20, -25] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.1 }}
      >
        <OrangeSlice className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute top-18 right-[14%] text-amber-500/50 pointer-events-none hidden md:block"
        animate={{ scale: [1, 1.08, 1], rotate: [10, 15, 10] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
      >
        <SketchStar className="w-6 h-6" />
      </motion.div>

      <motion.div
        className="absolute top-[30%] right-[22%] text-orange-400/35 pointer-events-none hidden sm:block"
        animate={{ y: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
      >
        <SketchTwig className="w-6 h-6" />
      </motion.div>

      {/* Middle Right Area */}
      <motion.div
        className="absolute top-[44%] right-[4%] text-orange-355/50 pointer-events-none hidden md:block"
        animate={{ scale: [0.95, 1.05, 0.95], rotate: [-10, -5, -10] }}
        transition={{ repeat: Infinity, duration: 4.1, ease: "easeInOut" }}
      >
        <SketchStar className="w-5 h-5" />
      </motion.div>

      <motion.div
        className="absolute top-[52%] right-[2%] text-red-400/40 pointer-events-none hidden md:block"
        animate={{ x: [0, 2, 0], rotate: [15, 20, 15] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay: 0.8 }}
      >
        <SketchHeart className="w-6 h-6 fill-red-400/10" />
      </motion.div>

      <motion.div
        className="absolute top-[26%] right-[30%] text-orange-300/40 pointer-events-none hidden md:block"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3.9, ease: "easeInOut" }}
      >
        <SketchPaw className="w-5 h-5" />
      </motion.div>

      {/* Bottom Right Area */}
      <motion.div
        className="absolute bottom-10 right-[2%] text-orange-300/45 pointer-events-none hidden md:block"
        animate={{ x: [0, -2, 0], rotate: [-20, -15, -20] }}
        transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut" }}
      >
        <SketchPaw className="w-9 h-9" />
      </motion.div>

      <motion.div
        className="absolute bottom-14 right-[10%] text-amber-500/70 pointer-events-none hidden md:block"
        animate={{ scale: [0.9, 1.05, 0.9] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
      >
        <SketchStar className="w-5 h-5" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-[18%] text-orange-355/45 pointer-events-none hidden md:block"
        animate={{ y: [0, -4, 0], rotate: [8, 14, 8] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut", delay: 0.4 }}
      >
        <SketchLeaf className="w-7 h-7" />
      </motion.div>

      {/* Tight Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        
        {/* Left Text details */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-comic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-orange-950 tracking-tight"
          >
            Welcome to <br className="hidden md:inline" />
            <span className="relative inline-block text-orange-600">
              {siteConfig.name}'s Den
              {/* sketchy underline brush effect */}
              <svg className="absolute left-0 -bottom-1.5 w-full h-3 text-amber-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            🦊
          </motion.h1>
 
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-orange-900/90 text-lg md:text-xl lg:text-2xl font-sans max-w-xl leading-relaxed pt-2"
          >
            A cozy little corner of the internet for my fursona, art collection, and furry friends!
          </motion.p>
 
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-3"
          >
            <a
              href="#gallery"
              onClick={() => playSound("whoosh")}
              className={`inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-orange-500 text-white font-comic text-xl font-bold border-2 border-orange-950 shadow-[4px_5px_0px_#7c2d12] hover:shadow-[1px_2px_0px_#7c2d12] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 ${sketchyBorderStyles.button}`}
            >
              <span>View Gallery</span>
              <span>🐾</span>
            </a>
            
            <a
              href="#contact"
              onClick={() => playSound("whoosh")}
              className={`inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-amber-100 text-orange-950 font-comic text-xl font-bold border-2 border-amber-950 shadow-[4px_5px_0px_#451a03] hover:shadow-[1px_2px_0px_#451a03] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 ${sketchyBorderStyles.button}`}
            >
              <span>Let's Chat</span>
              <span>❤️</span>
            </a>
          </motion.div>
        </div>
 
        {/* Right Mascot (Follows Cursor & Reacts dynamically) */}
        <div className="lg:col-span-6 flex justify-center items-center relative min-h-[320px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-[480px]">
 
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[460px] aspect-square flex justify-center items-center cursor-pointer select-none group z-10"
            onClick={handleMascotClick}
          >
            {/* Mascot Image (looks at & tilts towards user's cursor dynamically!) */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center p-2"
              animate={{
                x: mouseOffset.x,
                y: mouseOffset.y,
                rotate: mouseOffset.x * 0.4,
              }}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 18,
              }}
            >
              {/* Cute Dialog speech bubble floating above mascot */}
              <AnimatePresence>
                {speechBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 15, x: "-50%", rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: "-50%", rotate: Math.random() * 8 - 4 }}
                    exit={{ opacity: 0, scale: 0.7, y: -15, x: "-50%" }}
                    transition={{ type: "spring", damping: 12 }}
                    className={`absolute top-[-30px] sm:top-[-45px] left-1/2 bg-white border-3 border-orange-950 text-orange-950 px-4 py-2 font-comic font-black text-sm sm:text-base shadow-[3px_4px_0px_#451a03] whitespace-nowrap z-30 ${sketchyBorderStyles.badge}`}
                  >
                    {/* speech bubble triangle */}
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-3 border-b-3 border-orange-950 rotate-45" />
                    {speechBubble}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nested div for hardware-accelerated continuous breathing */}
              <motion.div
                className="w-full h-full flex items-center justify-center animate-breathing"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={siteConfig.mascot.imageUrl}
                  alt={siteConfig.mascot.name}
                  width={450}
                  height={450}
                  className="object-contain max-h-[95%] drop-shadow-[8px_12px_0px_rgba(251,146,60,0.15)] group-hover:scale-102 transition-transform duration-300"
                  priority
                />
              </motion.div>
            </motion.div>
 
            {/* Tap prompt */}
            <div className="absolute bottom-0 bg-orange-700 text-white font-comic text-xs font-bold px-3 py-1.5 rounded-full border-2 border-orange-950 shadow-[2px_3px_0px_#451a03] transform -rotate-2 select-none pointer-events-none group-hover:scale-110 transition-transform">
              Poke me! {clickCount > 0 && `x${clickCount}`}
            </div>
 
            {/* Sparkles on Mascot click */}
            {sparkles.map((s) => (
              <motion.span
                key={s.id}
                className="absolute text-2xl z-20 pointer-events-none select-none text-amber-500 font-bold"
                style={{ left: s.x, top: s.y }}
                initial={{ opacity: 1, scale: 0.2 }}
                animate={{ opacity: 0, scale: 1.5, y: -50, x: Math.random() * 40 - 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                ✨
              </motion.span>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
