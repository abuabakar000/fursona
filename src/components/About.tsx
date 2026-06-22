"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { Heart, X, Check, Paintbrush, ShieldCheck, Copy, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useAudio } from "@/context/AudioContext";
import { SketchStar, SketchHeart, SketchPaw, SketchTwig, SketchLeaf, OrangeSlice } from "./SketchIcons";

// Cute custom Paw Swatch Vector
const ColorPaw = ({ color }: { color: string }) => (
  <svg className="w-7 h-7 flex-shrink-0 drop-shadow-sm" viewBox="0 0 100 100" fill={color}>
    <path d="M50,83 C61.1,83 69,75.1 69,65 C69,59.5 63.5,56 50,56 C36.5,56 31,59.5 31,65 C31,75.1 38.9,83 50,83 Z" stroke="#2d1606" strokeWidth="5" />
    <circle cx="23" cy="44" r="8.5" stroke="#2d1606" strokeWidth="5" />
    <circle cx="39" cy="28" r="9.5" stroke="#2d1606" strokeWidth="5" />
    <circle cx="61" cy="28" r="9.5" stroke="#2d1606" strokeWidth="5" />
    <circle cx="77" cy="44" r="8.5" stroke="#2d1606" strokeWidth="5" />
  </svg>
);

const boopPhrases = [
  "Squeak! 🦊",
  "*happy tail wags* ✨",
  "Eeee! *ear wiggles*",
  "Stop it! *giggles*",
  "More pats please! 🥺",
  "Purrr~ 🧡",
  "Boop! 🐾",
  "*nuzzles you*",
  "Mwef! 👅",
  "Hey! *boops back*"
];
// --- Doodle Component for Compositor Animations ---
interface DoodleProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  duration?: string;
  y?: string;
  rStart?: string;
  rEnd?: string;
}

const Doodle = ({ className, style, children, duration = "5s", y = "-6px", rStart = "0deg", rEnd = "5deg" }: DoodleProps) => {
  return (
    <div
      className={`${className} animate-doodle`}
      style={{
        ...style,
        "--doodle-duration": duration,
        "--doodle-translate-y": y,
        "--doodle-rotate-start": rStart,
        "--doodle-rotate-end": rEnd,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default function About() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [boops, setBoops] = useState(0);
  const [boopToast, setBoopToast] = useState<string | null>(null);
  const { playSound } = useAudio();

  const copyToClipboard = (hex: string, event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    playSound("pop");

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 9,
      spread: 45,
      origin: { x, y },
      colors: [hex, "#ffffff", "#fdba74"],
    });

    setTimeout(() => {
      setCopiedColor((curr) => curr === hex ? null : curr);
    }, 1800);
  };

  const handleBoop = (e: React.MouseEvent<HTMLDivElement>) => {
    setBoops((prev) => prev + 1);
    playSound("boop");
    
    // Confetti pop!
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 7,
      spread: 35,
      origin: { x, y },
      colors: ["#f07828", "#fce8a6", "#fca5a5"]
    });

    const phrase = boopPhrases[Math.floor(Math.random() * boopPhrases.length)];
    setBoopToast(phrase);
    
    setTimeout(() => {
      setBoopToast((curr) => curr === phrase ? null : curr);
    }, 1200);
  };

  const getStatusBadge = (type: "trades" | "gifts" | "rp" | "suit") => {
    if (type === "trades") {
      const val = siteConfig.sonaStatus.artTrades;
      if (val === "open") return { text: "Open! 🎨", style: "bg-green-100 text-green-950 border-green-500" };
      if (val === "mutuals") return { text: "Mutuals Only 🤝", style: "bg-amber-100 text-amber-950 border-amber-500 animate-pulse" };
      return { text: "Closed 🔒", style: "bg-red-100 text-red-950 border-red-500" };
    }
    if (type === "gifts") {
      const val = siteConfig.sonaStatus.giftArt;
      if (val === "welcome") return { text: "Always Welcome! 🎁", style: "bg-green-100 text-green-950 border-green-500" };
      if (val === "ask") return { text: "Ask First 💬", style: "bg-amber-100 text-amber-950 border-amber-500" };
      return { text: "No Thanks ❌", style: "bg-red-100 text-red-950 border-red-500" };
    }
    if (type === "rp") {
      const val = siteConfig.sonaStatus.roleplay;
      if (val === "open") return { text: "Open! 💬", style: "bg-green-100 text-green-950 border-green-500" };
      if (val === "ask") return { text: "Ask First 💬", style: "bg-amber-100 text-amber-950 border-amber-500" };
      return { text: "Closed 🔒", style: "bg-red-100 text-red-950 border-red-500" };
    }
    // Fursuit
    const val = siteConfig.sonaStatus.fursuit;
    if (val === "yes") return { text: `Has Suit! 🦊`, style: "bg-orange-100 text-orange-950 border-orange-500 animate-[bounce_3s_infinite]" };
    if (val === "planning") return { text: "Planning phase 🧵", style: "bg-amber-100 text-amber-950 border-amber-500" };
    return { text: "No ❌", style: "bg-gray-100 text-gray-400 border-gray-300" };
  };

  return (
    <section id="about" className="w-full px-6 py-12 md:py-16 bg-amber-50/20 border-t-2 border-dashed border-amber-200 relative overflow-hidden">
      
      {/* Background doodles */}
      <Doodle
        style={{ right: "5%", top: "8%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="5s"
        y="-6px"
        rStart="0deg"
        rEnd="2deg"
      >
        <SketchPaw className="w-12 h-12" />
      </Doodle>

      <Doodle
        style={{ left: "8%", top: "12%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="4.2s"
        y="5px"
        rStart="12deg"
        rEnd="18deg"
      >
        <OrangeSlice className="w-10 h-10" />
      </Doodle>

      <Doodle
        style={{ left: "4%", top: "45%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="6s"
        y="8px"
        rStart="0deg"
        rEnd="-3deg"
      >
        <SketchHeart className="w-10 h-10 fill-orange-950/2" />
      </Doodle>

      <Doodle
        style={{ right: "12%", top: "52%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="4.8s"
        y="-4px"
        rStart="-10deg"
        rEnd="-5deg"
      >
        <SketchTwig className="w-9 h-9" />
      </Doodle>

      <Doodle
        style={{ right: "8%", bottom: "10%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="5.5s"
        y="-7px"
        rStart="0deg"
        rEnd="4deg"
      >
        <SketchStar className="w-8 h-8" />
      </Doodle>

      <Doodle
        style={{ left: "6%", bottom: "25%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="5.1s"
        y="6px"
        rStart="8deg"
        rEnd="12deg"
      >
        <SketchLeaf className="w-10 h-10" />
      </Doodle>

      {/* Copied Hex Code Toast Dialog */}
      <AnimatePresence>
        {copiedColor && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-950 text-white px-5 py-3 rounded-full font-comic font-black text-sm z-50 shadow-2xl flex items-center space-x-2 border-2 border-orange-400"
          >
            <span className="w-4.5 h-4.5 rounded-full inline-block border border-white" style={{ backgroundColor: copiedColor }} />
            <span>Copied {copiedColor.toUpperCase()} to Clipboard! 🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-6 gap-x-8 lg:gap-x-12 items-center lg:items-start">
        
        {/* Section Heading at the top spanning all columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-12 text-left mb-2"
        >
          <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950 flex flex-wrap items-center justify-start gap-2">
            <span>Meet {siteConfig.name}!</span>
            <span className="animate-spin text-2xl text-amber-500 duration-1000">✨</span>
          </h2>
        </motion.div>

        {/* Left Side: Polaroid Photo of Citrini with interactive Boop Game! */}
        <div className="lg:col-span-5 flex flex-col items-center relative">
          
          {/* Boop speech bubble */}
          <AnimatePresence>
            {boopToast && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 20, x: "-50%", rotate: -6 }}
                animate={{ opacity: 1, scale: 1, y: -50, x: "-50%", rotate: Math.random() * 8 - 4 }}
                exit={{ opacity: 0, scale: 0.7, y: -80, x: "-50%" }}
                transition={{ type: "spring", damping: 10 }}
                className={`absolute left-1/2 bg-orange-50 border-3 border-orange-950 text-orange-950 px-4 py-2 font-comic font-black text-sm shadow-[2px_3px_0px_#451a03] whitespace-nowrap z-25 ${sketchyBorderStyles.badge}`}
              >
                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-50 border-r-3 border-b-3 border-orange-950 rotate-45" />
                {boopToast}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, rotate: -4, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            onClick={handleBoop}
            className={`bg-white border-3 border-orange-950 p-4 pb-6 shadow-[5px_6px_0px_rgba(120,53,4,0.15)] hover:shadow-[7px_9px_0px_rgba(120,53,4,0.15)] max-w-[320px] w-full text-center ${sketchyBorderStyles.card} cursor-pointer select-none group relative`}
          >
            {/* Boop Heart Sticker Indicator */}
            <div className={`absolute -top-3.5 -right-3 bg-red-400 text-white border-2 border-orange-950 p-2 font-bold rounded-full shadow-[2.5px_3.5px_0px_#451a03] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 z-20`}>
              <Heart className="w-5 h-5 fill-white text-orange-950 stroke-[2.5]" />
            </div>

            {/* Tap to Boop banner */}
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 bg-orange-500 text-white font-comic text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border-2 border-orange-950 shadow-[2px_3px_0px_#451a03] opacity-0 group-hover:opacity-100 transition-opacity z-20 scale-95 group-hover:scale-100 pointer-events-none">
              👉 Tap to Boop!
            </div>

            {/* Photo Container */}
            <div className="relative aspect-square w-full bg-amber-50/80 border border-orange-950/20 rounded-md overflow-hidden mb-5">
              <Image
                src="/images/mascot.png"
                alt="Citrini Polaroid Profile"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-102"
                sizes="(max-w-md) 100vw, 50vw"
              />
            </div>
            
            <span className="font-comic text-xl font-black text-orange-950 block tracking-tight">
              {siteConfig.mascot.name} ({siteConfig.species}) 🐾
            </span>
            
            {/* Boop Stats Row */}
            <div className="mt-2.5 flex items-center justify-center space-x-2 bg-orange-50/70 py-1.5 border border-dashed border-orange-950/20 rounded-xl">
              <span className="text-xs font-comic font-black text-orange-950 animate-pulse">Booped: {boops} times!</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: RPG Character Card bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col space-y-6 text-left"
        >
          <p className="text-orange-900/90 font-sans text-base sm:text-lg leading-relaxed text-left">
            {siteConfig.mascot.bio}
          </p>

          {/* Interactive RPG details frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.15 }}
            className={`bg-white border-3 border-orange-950 p-5 md:p-6 shadow-[5px_6px_0px_#451a03] grid grid-cols-1 md:grid-cols-2 gap-6 ${sketchyBorderStyles.card}`}
          >
            
            {/* Left Col: Color Palette with Copy HEX codes */}
            <div className="space-y-3.5">
              <h3 className="font-comic text-lg font-black text-orange-950 border-b-2 border-dashed border-amber-200 pb-1.5 flex flex-wrap items-center gap-1.5">
                <Paintbrush className="w-4.5 h-4.5 text-orange-600" />
                <span>Ref Color Palette</span>
              </h3>
              
              <p className="text-[10px] text-orange-900/50 font-bold uppercase tracking-wider">
                Click paw prints to copy color HEX! 🎨
              </p>

              <div className="flex flex-col space-y-2">
                {siteConfig.colorPalette.map((color) => (
                  <motion.button
                    key={color.hex}
                    onClick={(e) => copyToClipboard(color.hex, e)}
                    className="flex items-center justify-between p-1.5 pr-3 bg-amber-50/50 hover:bg-orange-50 border-2 border-orange-950/20 hover:border-orange-950/60 rounded-xl transition-all w-full text-left cursor-pointer group"
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-2.5">
                      {/* Adorable Swatch Paw Print Vector */}
                      <ColorPaw color={color.hex} />
                      <span className="text-xs font-black text-orange-950 leading-none">
                        {color.name}
                      </span>
                    </div>
                    
                    {/* Copy hex text */}
                    <div className="flex items-center space-x-1 text-orange-900/40 group-hover:text-orange-600 transition-colors">
                      <span className="text-[10px] font-mono font-bold">{color.hex}</span>
                      <Copy className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Col: Interaction Trade status cards & Ref drawing guidelines */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-comic text-lg font-black text-orange-950 border-b-2 border-dashed border-amber-200 pb-1.5 flex flex-wrap items-center gap-1.5">
                  <Star className="w-4.5 h-4.5 text-red-500 fill-red-500/10" />
                  <span>Interaction Status</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-2.5 mt-3">
                  <div className="flex flex-wrap items-center justify-between p-2 bg-amber-50/20 border-2 border-dashed border-orange-950/30 rounded-xl gap-2">
                    <span className="text-xs font-comic font-black text-orange-950">Art Trades:</span>
                    <span className={`px-2.5 py-1 text-xs font-bold border-2 ${getStatusBadge("trades").style} ${sketchyBorderStyles.badge}`}>
                      {getStatusBadge("trades").text}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between p-2 bg-amber-50/20 border-2 border-dashed border-orange-950/30 rounded-xl gap-2">
                    <span className="text-xs font-comic font-black text-orange-950">Gift Art:</span>
                    <span className={`px-2.5 py-1 text-xs font-bold border-2 ${getStatusBadge("gifts").style} ${sketchyBorderStyles.badge}`}>
                      {getStatusBadge("gifts").text}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between p-2 bg-amber-50/20 border-2 border-dashed border-orange-950/30 rounded-xl gap-2">
                    <span className="text-xs font-comic font-black text-orange-950">Fursuit Owns:</span>
                    <span className={`px-2.5 py-1 text-xs font-bold border-2 ${getStatusBadge("suit").style} ${sketchyBorderStyles.badge}`}>
                      {getStatusBadge("suit").text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ref drawing rules for artists drawing the character (Extremely popular in furry community) */}
              <div className="p-3 bg-amber-50/50 border-2 border-dashed border-orange-950/20 rounded-xl text-left space-y-1.5">
                <h4 className="font-comic text-xs font-black text-orange-950 uppercase tracking-wider pb-0.5 border-b border-orange-950/10">
                  ✏️ Drawing Reference Swatches:
                </h4>
                <ul className="text-[11px] text-orange-900/90 font-sans space-y-1 font-semibold">
                  <li>🦊 Large ears are super fluffy inside!</li>
                  <li>🧣 Bandana is optional but highly preferred!</li>
                  <li>👕 Hoodie has white strings & double sleeve stripes.</li>
                </ul>
              </div>
            </div>

          </motion.div>

          {/* SFW Profile rules shield */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center space-x-3 p-3.5 bg-amber-100/40 border border-dashed border-orange-900/40 rounded-lg"
          >
            <ShieldCheck className="w-6 h-6 text-orange-700 flex-shrink-0" />
            <p className="text-xs text-orange-950 leading-relaxed font-medium font-sans">
              <strong>SFW Profile Rules:</strong> This page represents a clean, SFW furry character space. Anyone is welcome to draw Citrini as long as the content stays PG-13!
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
