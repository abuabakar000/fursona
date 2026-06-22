"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { Sparkles, RefreshCw, Star, Info, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Sticker {
  id: string;
  name: string;
  category: "badge" | "photo" | "stamp";
  description: string;
  defaultRotate: number;
  initialX: number;
  initialY: number;
  // Custom render parameters
  styleType: "con-badge" | "polaroid" | "die-cut" | "holo";
  imageUrl?: string;
  emoji?: string;
  bgColor?: string;
  label?: string;
}

const stickersData: Sticker[] = [
  {
    id: "sticker-pass",
    name: "Citrini VIP Pass",
    category: "badge",
    description: "Official Sona Den VIP Guest Badge! Serial #0001.",
    defaultRotate: -4,
    initialX: 30,
    initialY: 40,
    styleType: "con-badge",
    label: "Citrini"
  },
  {
    id: "sticker-photo-1",
    name: "Zephryn's Leopard Sona",
    category: "photo",
    description: "Cute bleping dark leopard portrait by Zephryn. Tape-pinned!",
    defaultRotate: 5,
    initialX: 230,
    initialY: 30,
    styleType: "polaroid",
    imageUrl: "/images/user_art_1.png"
  },
  {
    id: "sticker-photo-2",
    name: "WJ's Watermelon Lizard",
    category: "photo",
    description: "Happy fluffy green lizard eating watermelon by WJ.",
    defaultRotate: -6,
    initialX: 430,
    initialY: 55,
    styleType: "polaroid",
    imageUrl: "/images/user_art_2.png"
  },
  {
    id: "sticker-photo-3",
    name: "Kitty's Retro Neon Sona",
    category: "photo",
    description: "Retro pastel neon lightning kitty portrait by KittySpark.",
    defaultRotate: 8,
    initialX: 630,
    initialY: 35,
    styleType: "polaroid",
    imageUrl: "/images/user_art_3.png"
  },
  {
    id: "sticker-photo-4",
    name: "CitrusPaws' Minty Fox",
    category: "photo",
    description: "Mint-haired canine with cool streetwear glasses by CitrusPaws.",
    defaultRotate: -3,
    initialX: 810,
    initialY: 60,
    styleType: "polaroid",
    imageUrl: "/images/user_art_4.png"
  },
  {
    id: "sticker-sweater",
    name: "Cozy Sweater",
    category: "stamp",
    description: "Citrini's favourite warm woolly winter sweater. Die-cut outline! 🧥",
    defaultRotate: 12,
    initialX: 130,
    initialY: 260,
    styleType: "die-cut",
    imageUrl: "/images/outfit_sweater.png"
  },
  {
    id: "sticker-pajamas",
    name: "Sleepy Pajamas",
    category: "stamp",
    description: "Starry night slumber pajamas sticker. Super soft and warm! 💤",
    defaultRotate: -15,
    initialX: 320,
    initialY: 250,
    styleType: "die-cut",
    imageUrl: "/images/outfit_pajamas.png"
  },
  {
    id: "sticker-raincoat",
    name: "Puddle Raincoat",
    category: "stamp",
    description: "Bright yellow raincoat sticker for wet autumn weather! 🌧️",
    defaultRotate: 6,
    initialX: 510,
    initialY: 265,
    styleType: "die-cut",
    imageUrl: "/images/outfit_raincoat.png"
  },
  {
    id: "sticker-bandana",
    name: "Sketchy Bandana",
    category: "stamp",
    description: "Hand-painted floral bandana sticker. A classic signature look! 🧣",
    defaultRotate: 10,
    initialX: 680,
    initialY: 260,
    styleType: "die-cut",
    imageUrl: "/images/outfit_bandana.png"
  },
  {
    id: "sticker-holo-mascot",
    name: "Holo Citrini Foil",
    category: "badge",
    description: "Ultra rare holographic mascot print. Shimmers with metallic foil reflections! ✨🦊",
    defaultRotate: -9,
    initialX: 830,
    initialY: 245,
    styleType: "holo",
    imageUrl: "/images/mascot.png"
  },
  {
    id: "sticker-holo-paw",
    name: "Holo Squeak Paw",
    category: "badge",
    description: "Holographic retro fennec paw print. Gives off positive energy! ✨🐾",
    defaultRotate: 15,
    initialX: 950,
    initialY: 230,
    styleType: "holo",
    emoji: "🐾"
  }
];

export default function StickerBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "badge" | "photo" | "stamp">("all");
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  
  // Track reset state to force positions back
  const [resetKey, setResetKey] = useState(0);
  
  // Track double clicks for "flips"
  const [flippedStickers, setFlippedStickers] = useState<Record<string, boolean>>({});

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    setFlippedStickers({});
  };

  const handleDoubleClick = (id: string) => {
    setFlippedStickers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter stickers based on active category
  const filteredStickers = activeCategory === "all"
    ? stickersData
    : stickersData.filter((s) => s.category === activeCategory);

  return (
    <section id="stickers" className="relative w-full px-4 sm:px-6 py-12 md:py-16 bg-amber-50/20 overflow-hidden">
      
      {/* Decorative background paw glows */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-amber-250/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8 w-full max-w-2xl">
          <div className="inline-flex items-center space-x-1 bg-orange-100 border-2 border-orange-950 px-3 py-1 rounded-full text-orange-950 font-comic font-black text-xs sm:text-sm shadow-[1.5px_2px_0px_#451a03]">
            <span>🏷️ CITRINI'S ALBUM</span>
          </div>
          
          <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950">
            Interactive Sticker Board
          </h2>
          
          <p className="text-orange-900/80 font-sans text-sm sm:text-base leading-relaxed">
            Drag the stickers around the corkboard to decorate it! Double-tap/double-click a sticker to flip it over, or tap any sticker to read its description.
          </p>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mb-6 z-20">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-amber-100/50 border-2 border-orange-950 rounded-xl shadow-[3px_3px_0px_#451a03]">
            {[
              { id: "all", label: "All Items", emoji: "📂" },
              { id: "badge", label: "Badges", emoji: "🏷️" },
              { id: "photo", label: "Polaroids", emoji: "📸" },
              { id: "stamp", label: "Stamps & Treats", emoji: "🍊" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 border-2 font-comic font-black text-xs sm:text-sm flex items-center space-x-1.5 transition-all duration-150 rounded-lg ${
                  activeCategory === tab.id
                    ? "bg-orange-500 text-white border-orange-950 shadow-[1.5px_2px_0px_#451a03]"
                    : "bg-transparent text-orange-950 hover:bg-amber-100 border-transparent"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-5 py-2.5 bg-amber-100 hover:bg-amber-200 border-2 border-orange-950 font-comic font-black text-xs sm:text-sm text-orange-950 shadow-[3px_3px_0px_#451a03] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#451a03] transition-all duration-150 rounded-[10px_30px_10px_35px/35px_10px_40px_10px]"
          >
            <RefreshCw className="w-4 h-4 text-orange-950" />
            <span>Tidy Corkboard</span>
          </button>
        </div>

        {/* Main Board Container */}
        <div 
          ref={containerRef}
          className="relative w-full min-h-[460px] md:min-h-[520px] bg-[#eedbc5] border-4 border-amber-950 rounded-[15px_120px_15px_110px/110px_15px_120px_15px] shadow-[8px_10px_0px_#451a03] p-4 select-none overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#cfbca2 1px, transparent 1px)",
            backgroundSize: "8px 8px"
          }}
        >
          {/* Corkboard Pins / Memo Notes */}
          <div className="absolute top-4 left-4 max-w-[190px] bg-yellow-50 border-2 border-orange-950 p-2.5 shadow-[3px_3px_0px_#451a03] rounded-md rotate-[-4deg] opacity-90 hidden sm:block z-0">
            <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-inner border border-red-800" />
            <span className="font-comic font-black text-xs text-orange-950/70 block border-b border-orange-950/20 pb-0.5 mb-1.5">📌 NOTICE</span>
            <p className="font-sans text-[11px] leading-tight text-orange-900 font-medium">
              Stickers can be moved anywhere on this corkboard! Try double clicking them.
            </p>
          </div>

          <div className="absolute bottom-4 right-4 max-w-[180px] bg-orange-100 border-2 border-orange-950 p-2.5 shadow-[3px_3px_0px_#451a03] rounded-md rotate-[3deg] opacity-90 hidden md:block z-0">
            <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full shadow-inner border border-amber-700" />
            <span className="font-comic font-black text-xs text-orange-950/70 block border-b border-orange-950/20 pb-0.5 mb-1.5">🎨 ART CREDITS</span>
            <p className="font-sans text-[10px] leading-tight text-orange-900 font-medium">
              Gallery polaroids feature hand-drawn art pieces by Zephryn, WJ, KittySpark, and CitrusPaws!
            </p>
          </div>

          {/* Draggable Stickers */}
          <AnimatePresence>
            {filteredStickers.map((sticker) => {
              const isFlipped = flippedStickers[sticker.id] || false;
              
              return (
                <motion.div
                  key={`${sticker.id}-${resetKey}`}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.05}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  initial={{ 
                    x: sticker.initialX, 
                    y: sticker.initialY, 
                    rotate: sticker.defaultRotate 
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    zIndex: 40,
                    boxShadow: "5px 8px 12px rgba(69, 26, 3, 0.2)"
                  }}
                  whileDrag={{ 
                    scale: 1.15, 
                    rotate: sticker.defaultRotate + 5,
                    zIndex: 50,
                    boxShadow: "10px 18px 24px rgba(69, 26, 3, 0.25)",
                    cursor: "grabbing"
                  }}
                  onClick={() => setSelectedSticker(sticker)}
                  onDoubleClick={() => handleDoubleClick(sticker.id)}
                  className="absolute cursor-grab select-none z-10 touch-none"
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative"
                  >
                    
                    {/* Front side of sticker */}
                    <div style={{ backfaceVisibility: "hidden" }} className="w-full h-full">
                      {sticker.styleType === "con-badge" && (
                        <div className="w-[115px] sm:w-[130px] aspect-[1/1.4] bg-white border-[3px] border-orange-950 p-2 shadow-[2px_3px_0px_rgba(69,26,3,0.15)] flex flex-col justify-between items-center rounded-lg">
                          {/* badge clip clip-on */}
                          <div className="absolute top-[-8px] w-8 h-4 bg-orange-200 border-2 border-orange-950 rounded-md flex justify-center items-center">
                            <div className="w-2 h-2 bg-white rounded-full border border-orange-950" />
                          </div>
                          
                          <div className="w-full flex items-center justify-between border-b-2 border-orange-950/20 pb-1 mt-1">
                            <div className="w-2.5 h-2.5 bg-orange-600 rounded-full" />
                            <span className="font-comic font-black text-[9px] text-orange-950 tracking-widest uppercase">CON-PASS</span>
                            <div className="w-2.5 h-2.5 bg-orange-600 rounded-full" />
                          </div>
                          
                          <div className="w-full flex-1 relative flex items-center justify-center p-1.5">
                            <div className="w-full h-full relative rounded-md border-2 border-orange-950 overflow-hidden bg-amber-50">
                              <Image 
                                src="/images/mascot.png" 
                                alt="Mascot Portrait" 
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                          
                          <div className="w-full text-center bg-orange-950 text-white py-1 rounded-[4px_12px_4px_10px] font-comic font-black text-[10px] uppercase border border-orange-950">
                            {sticker.label}
                          </div>
                        </div>
                      )}

                      {sticker.styleType === "polaroid" && (
                        <div className="w-[100px] sm:w-[115px] bg-white border-[3.5px] border-orange-950 p-2 pb-5 shadow-[3px_4px_0px_rgba(69,26,3,0.15)] rounded-sm">
                          {/* Cute washi tape at the top */}
                          <div className="absolute top-[-10px] left-[15%] right-[15%] h-5 bg-orange-400/50 border border-orange-950/30 rounded-sm rotate-[-2deg]" 
                            style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 8px)" }}
                          />
                          
                          <div className="aspect-square relative w-full bg-slate-100 border-2 border-orange-950 overflow-hidden rounded-sm">
                            {sticker.imageUrl && (
                              <Image 
                                src={sticker.imageUrl} 
                                alt={sticker.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="w-full text-center mt-2.5">
                            <span className="font-comic font-black text-[9px] sm:text-[10px] text-orange-950 tracking-tight block truncate">
                              ★ {sticker.name}
                            </span>
                          </div>
                        </div>
                      )}

                      {sticker.styleType === "die-cut" && (
                        <div className="relative w-16 sm:w-20 aspect-square flex items-center justify-center filter drop-shadow-[3px_4px_6px_rgba(69,26,3,0.25)]">
                          {sticker.imageUrl ? (
                            <div 
                              className="w-full h-full relative"
                              style={{
                                filter: "drop-shadow(2px 2px 0px #fff) drop-shadow(-2px -2px 0px #fff) drop-shadow(-2px 2px 0px #fff) drop-shadow(2px -2px 0px #fff)"
                              }}
                            >
                              <Image 
                                src={sticker.imageUrl} 
                                alt={sticker.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center p-3.5 bg-white border-[3px] border-orange-950 shadow-[3px_3.5px_0px_rgba(69,26,3,0.15)] hover:bg-orange-50 transition-colors rounded-full aspect-square w-full">
                              <span className="text-3xl sm:text-4xl select-none filter drop-shadow-[1.5px_1.5px_0px_#451a03]">{sticker.emoji}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {sticker.styleType === "holo" && (
                        <div className="relative w-16 sm:w-20 aspect-square flex items-center justify-center filter drop-shadow-[3px_4px_6px_rgba(69,26,3,0.25)]">
                          {sticker.imageUrl ? (
                            <div 
                              className="w-full h-full relative"
                              style={{
                                filter: "drop-shadow(2px 2px 0px #fff) drop-shadow(-2px -2px 0px #fff) drop-shadow(-2px 2px 0px #fff) drop-shadow(2px -2px 0px #fff)"
                              }}
                            >
                              {/* Shifting holographic overlay blend */}
                              <div 
                                className="absolute inset-0 z-10 opacity-75"
                                style={{
                                  backgroundImage: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 30%, #fbc2eb 70%, #a1c4fd 100%)",
                                  backgroundSize: "200% 200%",
                                  animation: "gradientShift 3.5s ease infinite",
                                  mixBlendMode: "color-dodge",
                                  mask: `url(${sticker.imageUrl}) no-repeat center / contain`,
                                  WebkitMask: `url(${sticker.imageUrl}) no-repeat center / contain`
                                }}
                              />
                              <Image 
                                src={sticker.imageUrl} 
                                alt={sticker.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div 
                              className="flex items-center justify-center p-3.5 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 border-[3.5px] border-white shadow-[3px_4px_0px_rgba(69,26,3,0.15)] outline outline-3 outline-orange-950 rounded-full aspect-square w-full"
                              style={{
                                backgroundImage: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 50%, #fbc2eb 100%)",
                                backgroundSize: "200% 200%",
                                animation: "gradientShift 4s ease infinite"
                              }}
                            >
                              <span className="text-3xl sm:text-4xl select-none filter drop-shadow-[2px_2.5px_0px_rgba(255,255,255,0.7)]">{sticker.emoji}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Back side of sticker (revealed on flip) */}
                    <div 
                      style={{ 
                        backfaceVisibility: "hidden", 
                        transform: "rotateY(180deg)",
                      }} 
                      className="absolute inset-0 w-full h-full bg-[#ffeed6] border-3 border-dashed border-orange-950 p-2.5 flex flex-col justify-center items-center text-center rounded-lg shadow-[2px_3px_0px_rgba(69,26,3,0.15)]"
                    >
                      <Info className="w-5 h-5 text-orange-950/70 mb-1" />
                      <span className="font-comic font-black text-[9px] text-orange-950/60 uppercase">Sticker Back</span>
                      <p className="font-comic font-black text-[8px] sm:text-[9px] text-orange-950 leading-tight mt-1 max-w-[100px]">
                        "{sticker.description}"
                      </p>
                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty board guide overlay */}
          <div className="absolute inset-0 border border-orange-950/5 pointer-events-none rounded-[15px_120px_15px_110px/110px_15px_120px_15px]" />
        </div>

        {/* Sticker Inspector Detail Panel */}
        <div className="w-full mt-6 bg-amber-100/50 border-2 border-orange-950 p-4 shadow-[4px_4px_0px_#451a03] rounded-[15px_10px_15px_10px] min-h-[90px] flex items-center justify-center relative">
          <div className="absolute top-[-10px] left-8 bg-orange-700 text-white font-comic text-xs font-bold px-3 py-1 rounded-full border-2 border-orange-950 shadow-[1.5px_2.5px_0px_#451a03]">
            🔎 STICKER INSPECTOR
          </div>
          
          <div className="w-full text-center">
            {selectedSticker ? (
              <motion.div 
                key={selectedSticker.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <h4 className="font-comic font-black text-base sm:text-lg text-orange-950 flex items-center justify-center space-x-1">
                  <span>{selectedSticker.name}</span>
                  <span className="text-sm bg-orange-100 border border-orange-950 px-2 py-0.5 rounded-full text-orange-950 font-normal">
                    {selectedSticker.category === "badge" ? "Badge" : selectedSticker.category === "photo" ? "Polaroid" : "Stamp"}
                  </span>
                </h4>
                <p className="font-sans text-xs sm:text-sm text-orange-900/90 font-medium">
                  {selectedSticker.description}
                </p>
              </motion.div>
            ) : (
              <p className="font-comic font-black text-sm text-orange-950/60 py-2 flex items-center justify-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>Tap any sticker above to inspect its details!</span>
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Embedded style tag for gradientShift animation */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </section>
  );
}
