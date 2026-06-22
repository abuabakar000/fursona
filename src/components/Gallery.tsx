"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig, GalleryItem } from "@/config/site";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Heart, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import confetti from "canvas-confetti";
import { SketchPaw, SketchTwig, SketchLeaf, SketchStar, SketchHeart, OrangeSlice } from "./SketchIcons";
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

export default function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);

  const handleGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 640) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth <= 0) return;
    const pct = scrollLeft / scrollWidth;
    const index = Math.min(
      filteredGallery.length - 1,
      Math.max(0, Math.round(pct * (filteredGallery.length - 1)))
    );
    setGalleryActiveIndex((prev) => {
      if (prev === index) return prev;
      return index;
    });
  };

  useEffect(() => {
    setGalleryActiveIndex(0);
    if (galleryScrollRef.current) {
      galleryScrollRef.current.scrollLeft = 0;
    }
  }, [filter]);

  // Prevent background body scroll and hide header when gallery item modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [selectedItem]);
  
  // Shared audio context
  const { playSound } = useAudio();

  // Likes states
  const [likes, setLikes] = useState<Record<string, number>>({
    "gal-1": 48,
    "gal-2": 112,
    "gal-3": 76,
    "gal-4": 154,
  });
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  // Mascot dynamic speech inside the modal
  const [mascotSpeech, setMascotSpeech] = useState<string>("Oh! You like this one? 🥺");

  // Zoom state and click timeout ref
  const [isZoomed, setIsZoomed] = useState(false);
  const clickTimeoutRef = useRef<any>(null);

  // Floating emojis state
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; x: number; y: number; char: string }[]>([]);

  // Melt stats based on likes only
  const totalLikes = Object.values(likes).reduce((a, b) => a + b, 0);
  const currentPoints = totalLikes;
  const maxPoints = 392; // Default is 390
  const meltPercentage = Math.min(100, Math.round((currentPoints / maxPoints) * 100));

  const [hasCelebratedMelt, setHasCelebratedMelt] = useState(false);

  const categories = [
    { label: "All Sheets", id: "all", icon: "🐾" },
    { label: "Canines 🦊", id: "canine", icon: "🐺" },
    { label: "Other Species 🐼", id: "other", icon: "🐾" },
  ];

  const filteredGallery = filter === "all"
    ? siteConfig.gallery
    : siteConfig.gallery.filter((item) => item.category === filter);

  const spawnFloatingEmojis = (x: number, y: number) => {
    const chars = ["💖", "🐾", "🥺", "✨", "🍊"];
    const newEmojis = Array.from({ length: 5 }).map((_, idx) => {
      const offsetX = (Math.random() - 0.5) * 50;
      const offsetY = (Math.random() - 0.5) * 50;
      return {
        id: Date.now() + Math.random() + idx,
        x: x + offsetX,
        y: y + offsetY,
        char: chars[Math.floor(Math.random() * chars.length)]
      };
    });
    setFloatingEmojis((prev) => [...prev, ...newEmojis]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => !newEmojis.some(ne => ne.id === item.id)));
    }, 900);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop opening lightbox
    
    const isAlreadyLiked = likedItems[id];
    setLikedItems((prev) => ({ ...prev, [id]: !isAlreadyLiked }));
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] + (isAlreadyLiked ? -1 : 1)
    }));

    if (!isAlreadyLiked) {
      playSound("like");
      // Short delay for the pitch sweep fill sound to feel layered
      setTimeout(() => playSound("fill"), 80);
      
      // Spawn floating emojis relative to the section
      const parentRect = e.currentTarget.closest("#gallery")?.getBoundingClientRect();
      if (parentRect) {
        spawnFloatingEmojis(e.clientX - parentRect.left, e.clientY - parentRect.top);
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // Burst of cute orange/amber hearts!
      confetti({
        particleCount: 8,
        spread: 35,
        origin: { x, y },
        colors: ["#fdba74", "#f97316", "#ea580c", "#ffffff"]
      });
    } else {
      playSound("pop");
    }
  };

  const handleImageClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.detail === 1) {
      clickTimeoutRef.current = setTimeout(() => {
        setIsZoomed(true);
        playSound("pop");
      }, 220);
    } else if (e.detail === 2) {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
      const isAlreadyLiked = likedItems[id];
      if (!isAlreadyLiked) {
        setLikedItems((prev) => ({ ...prev, [id]: true }));
        setLikes((prev) => ({ ...prev, [id]: likes[id] + 1 }));

        playSound("like");
        setTimeout(() => playSound("fill"), 80);

        const parentRect = e.currentTarget.closest("#gallery")?.getBoundingClientRect();
        if (parentRect) {
          spawnFloatingEmojis(e.clientX - parentRect.left, e.clientY - parentRect.top);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 12,
          spread: 50,
          origin: { x, y },
          colors: ["#fdba74", "#f97316", "#ea580c", "#ffffff"]
        });

        setMascotSpeech("Aaa, my heart is melting! *blushes* 🥺💖");
      }
    }
  };

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsZoomed(false);
    setMascotSpeech(`Oh! You like "${item.title}"? 🥺`);
    playSound("pop");
    setTimeout(() => playSound("whoosh"), 80);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsZoomed(false);
    playSound("whoosh");
  };

  const handlePrevItem = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedItem) return;
    setIsZoomed(false);
    const currentIndex = filteredGallery.findIndex((item) => item.id === selectedItem.id);
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
      setSelectedItem(filteredGallery[prevIndex]);
      setMascotSpeech(`Here is "${filteredGallery[prevIndex].title}"! 🥺`);
      playSound("pop");
    }
  };

  const handleNextItem = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedItem) return;
    setIsZoomed(false);
    const currentIndex = filteredGallery.findIndex((item) => item.id === selectedItem.id);
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % filteredGallery.length;
      setSelectedItem(filteredGallery[nextIndex]);
      setMascotSpeech(`Here is "${filteredGallery[nextIndex].title}"! 🥺`);
      playSound("pop");
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "ArrowLeft") {
        handlePrevItem();
      } else if (e.key === "ArrowRight") {
        handleNextItem();
      } else if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, filteredGallery]);



  // Trigger grand melt celebration at 100%
  useEffect(() => {
    if (meltPercentage === 100 && !hasCelebratedMelt) {
      setHasCelebratedMelt(true);
      playSound("melt");

      // Shoot continuous fireworks/confetti for 3 seconds
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#fdba74", "#f97316", "#ea580c", "#fed7aa"]
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#fdba74", "#f97316", "#ea580c", "#fed7aa"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
    // Reset celebration state if points go below 100%
    if (meltPercentage < 100 && hasCelebratedMelt) {
      setHasCelebratedMelt(false);
    }
  }, [meltPercentage, hasCelebratedMelt]);

  return (
    <section id="gallery" className="relative w-full px-6 py-16 md:py-24 bg-amber-50/20 border-t-2 border-dashed border-amber-200 overflow-hidden">
      
      {/* Background doodles */}
      <Doodle
        style={{ left: "3%", top: "15%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="5.2s"
        y="-6px"
        rStart="0deg"
        rEnd="2deg"
      >
        <SketchTwig className="w-10 h-10" />
      </Doodle>

      <Doodle
        style={{ right: "10%", top: "10%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="4.5s"
        y="5px"
        rStart="15deg"
        rEnd="20deg"
      >
        <SketchPaw className="w-12 h-12" />
      </Doodle>

      <Doodle
        style={{ right: "4%", top: "35%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="6.4s"
        y="8px"
        rStart="0deg"
        rEnd="-3deg"
      >
        <SketchStar className="w-9 h-9" />
      </Doodle>

      <Doodle
        style={{ left: "8%", top: "50%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="5.0s"
        y="7px"
        rStart="-5deg"
        rEnd="-15deg"
      >
        <SketchHeart className="w-10 h-10 fill-orange-950/2" />
      </Doodle>

      <Doodle
        style={{ left: "4%", bottom: "20%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="5.8s"
        y="-7px"
        rStart="0deg"
        rEnd="4deg"
      >
        <OrangeSlice className="w-12 h-12" />
      </Doodle>

      <Doodle
        style={{ right: "12%", bottom: "55%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="5.4s"
        y="-6px"
        rStart="20deg"
        rEnd="10deg"
      >
        <SketchStar className="w-8 h-8" />
      </Doodle>

      <Doodle
        style={{ right: "6%", bottom: "10%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
        duration="4.8s"
        y="6px"
        rStart="0deg"
        rEnd="-2deg"
      >
        <SketchLeaf className="w-11 h-11" />
      </Doodle>

      {/* Floating animations styling helper */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-90px) scale(1.3) rotate(15deg); opacity: 0; }
        }
        .animate-float-emoji {
          animation: float-up 0.9s ease-out forwards;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        @keyframes meter-shimmer {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        .animate-shimmer {
          background-size: 20px 20px;
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          animation: meter-shimmer 1.5s linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Render local clicked/double-tapped emojis */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {floatingEmojis.map((emoji) => (
          <span
            key={emoji.id}
            style={{ left: emoji.x, top: emoji.y }}
            className="absolute text-2xl pointer-events-none animate-float-emoji select-none"
          >
            {emoji.char}
          </span>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-4 animate-heading"
        >
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950">
              Art Gallery & Refsheets 🐾
            </h2>
          </div>
          
          <p className="text-orange-900/80 font-sans max-w-xl text-base sm:text-lg">
            Browse through my favorite drawings and character reference pages! Give them a double tap or heart to show love.
          </p>
        </motion.div>



        {/* Filter Tags styled like stickers */}
        <div className="flex flex-wrap justify-center gap-3.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                playSound("pop");
              }}
              className={`px-5 py-2.5 font-comic font-black text-sm sm:text-base border-2 border-orange-950 transition-all duration-150 shadow-[2.5px_3.5px_0px_#451a03] hover:-translate-y-0.5 flex items-center space-x-1.5 ${
                filter === cat.id
                  ? "bg-orange-500 text-white translate-x-[1px] translate-y-[1px] shadow-[1px_1px_0px_#451a03]"
                  : "bg-amber-100 hover:bg-amber-200 text-orange-950"
              } ${sketchyBorderStyles.badge}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid: Polaroid Scrapbook Layout */}
        <motion.div 
          ref={galleryScrollRef}
          onScroll={handleGalleryScroll}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 pt-4 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-8 px-4 -mx-4 sm:px-0 sm:mx-0"
        >
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.02, zIndex: 10 }}
              onClick={() => handleOpenModal(item)}
              style={{ rotate: index % 2 === 0 ? "-1.5deg" : "1.5deg" }}
              className="group cursor-pointer bg-white border-3 border-orange-950 p-4 pb-8 shadow-[5px_6px_0px_rgba(69,26,3,0.18)] flex flex-col h-full rounded-sm relative select-none transition-shadow hover:shadow-[9px_10px_0px_rgba(69,26,3,0.15)] flex-shrink-0 w-[82vw] max-w-[290px] sm:w-auto sm:max-w-none snap-center snap-always"
            >
                {/* Translucent Washi Tape at the top of Polaroid */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-16 h-5 backdrop-blur-[0.5px] border border-dashed shadow-[1px_1.5px_2px_rgba(0,0,0,0.06)] z-20 ${
                  index % 4 === 0 ? "bg-orange-200/70 border-orange-300/40 rotate-[-3deg]" :
                  index % 4 === 1 ? "bg-sky-200/70 border-sky-300/40 rotate-[2deg]" :
                  index % 4 === 2 ? "bg-rose-200/70 border-rose-300/40 rotate-[-1.5deg]" :
                  "bg-green-200/70 border-green-300/40 rotate-[3deg]"
                }`} />

                {/* Decorative Sticker Placements */}
                {index === 0 && <span className="absolute -top-3 -right-2 text-2xl select-none z-20 animate-wiggle">🍊</span>}
                {index === 1 && <span className="absolute -bottom-3 -left-3 text-2xl select-none z-20 animate-wiggle">✨</span>}
                {index === 2 && <span className="absolute -top-3 -left-2 text-2.5xl select-none z-20 rotate-[-45deg] opacity-90">🩹</span>}
                {index === 3 && <span className="absolute -bottom-2 -right-3 text-2xl select-none z-20 rotate-[15deg]">🐾</span>}

                {/* Image Wrapper */}
                <div className="relative aspect-square w-full bg-amber-50/50 rounded-xs overflow-hidden border border-orange-950/20 mb-4 shadow-sm">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-w-7xl) 25vw, 50vw"
                  />
                  {/* Hover magnifying glass overlay */}
                  <div className="absolute inset-0 bg-orange-950/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 bg-white/95 rounded-full border-2 border-orange-950 text-orange-950 shadow-md">
                      <Search className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Polaroid Text & Credits */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-comic font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200 inline-block">
                      {item.category === "canine" ? "canine ref sheet" : item.category === "other" ? "ref sheet" : item.category}
                    </span>
                    <h3 className="font-comic text-base sm:text-lg font-black text-orange-950 leading-snug">
                      {item.title}
                    </h3>
                    {item.artistName && (
                      <span className="text-[10px] text-orange-900/50 block font-bold">
                        by @{item.artistName}
                      </span>
                    )}
                  </div>
                  
                  {/* Hearts / Likes Bar */}
                  <div className="flex items-center justify-between border-t border-dashed border-amber-100 pt-3 mt-4">
                    <span className="text-[11px] font-sans font-bold text-orange-900/60">
                      {likes[item.id] || 0} boops
                    </span>
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className={`p-1.5 border-2 rounded-full transition-all duration-150 ${
                        likedItems[item.id]
                          ? "bg-orange-100 text-orange-600 border-orange-500 shadow-none scale-95"
                          : "bg-amber-50 hover:bg-orange-55 text-orange-950/60 hover:text-orange-600 border-orange-950/20 hover:border-orange-400 shadow-[1px_1.5px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedItems[item.id] ? "fill-orange-500 stroke-[2.5]" : "stroke-[2.5]"}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Sketchy dots for mobile slider */}
        <div className="flex sm:hidden justify-center items-center space-x-2.5 pt-2 pb-4 select-none">
          {filteredGallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const container = galleryScrollRef.current;
                if (container) {
                  const cardWidth = container.scrollWidth / filteredGallery.length;
                  container.scrollTo({
                    left: cardWidth * idx,
                    behavior: "smooth"
                  });
                }
              }}
              className={`w-3.5 h-3.5 border-2 border-orange-950 transition-all duration-300 ${
                galleryActiveIndex === idx
                  ? "bg-orange-500 scale-110 rotate-[6deg] rounded-[40%_60%_40%_60%/60%_40%_60%_40%]"
                  : "bg-amber-100 rounded-full"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Lightbox Modal with interactive comment form & mascot */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-4 bg-orange-950/65 backdrop-blur-sm overflow-hidden">
                <motion.div 
                  className="absolute inset-0" 
                  onClick={handleCloseModal} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                {/* Close button - Fixed at top-right of screen for mobile/desktop, very easy to tap! */}
                <button
                  onClick={handleCloseModal}
                  className="fixed top-4 right-4 md:absolute md:top-4 md:right-4 p-2 bg-white hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#451a03] transition-all z-50"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Modal Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className={`relative bg-amber-50 border-4 border-orange-950 p-4 sm:p-6 max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 ${sketchyBorderStyles.card}`}
                >
                  {/* Space holder for floating button on mobile close */}
                              {/* Left Side: Modal Image with Navigation, Zoom and Double-tap Love */}
                 <div 
                   className="flex-shrink-0 md:flex-1 relative aspect-square w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] md:max-h-[calc(90vh-5rem)] mx-auto bg-white border-3 border-orange-950 rounded-2xl overflow-hidden p-2 select-none group shadow-inner"
                 >
                   <div 
                     onClick={(e) => handleImageClick(selectedItem.id, e)}
                     className="relative w-full h-full rounded-xl overflow-hidden bg-amber-50/20 cursor-zoom-in"
                   >
                     <Image
                       src={selectedItem.imageUrl}
                       alt={selectedItem.title}
                       fill
                       className="object-contain"
                       sizes="(max-w-4xl) 50vw, 100vw"
                     />
                   </div>
                   
                   {/* Navigation Arrows overlaying the image */}
                   <button
                     onClick={handlePrevItem}
                     className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-white/95 hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[-1px] hover:translate-y-[-48%] active:translate-y-[-50%] transition-all cursor-pointer"
                     aria-label="Previous image"
                   >
                     <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                   </button>
                   <button
                     onClick={handleNextItem}
                     className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-white/95 hover:bg-orange-100 text-orange-950 border-2 border-orange-950 rounded-full shadow-[2px_2px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[-48%] active:translate-y-[-50%] transition-all cursor-pointer"
                     aria-label="Next image"
                   >
                     <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                   </button>
                   
                   {/* Floating click cue bubble */}
                   <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-orange-950/85 text-white font-comic text-[9px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wider text-center w-[85%]">
                     🔍 Click to Zoom • 💖 Double Click to Love
                   </div>
                 </div>

                {/* Right Side: Artwork Info, Dynamic Mascot & Guestbook Comments */}
                <div className="flex-1 flex flex-col justify-between py-1 text-left space-y-4 md:max-h-[calc(90vh-5rem)] md:overflow-y-auto pr-1">
                  
                  {/* Title & Metadata */}
                  <div className="space-y-3 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-comic font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-0.5 rounded-full border border-orange-200">
                        {selectedItem.category === "canine" ? "canine ref sheet" : selectedItem.category === "other" ? "ref sheet" : selectedItem.category}
                      </span>
                      <button
                        onClick={(e) => {
                          handleLike(selectedItem.id, e);
                          setMascotSpeech("Aaa, my heart is melting! *blushes* 🥺💖");
                        }}
                        className="text-xs font-sans font-bold text-orange-900/75 flex items-center space-x-1 hover:text-orange-600 transition-colors"
                      >
                        <Heart className={`w-4 h-4 text-orange-500 ${likedItems[selectedItem.id] ? "fill-orange-500" : ""}`} />
                        <span>{likes[selectedItem.id] || 0} loves</span>
                      </button>
                    </div>
                    
                    <h3 className="font-comic text-2xl md:text-3xl font-black text-orange-950 leading-tight">
                      {selectedItem.title}
                    </h3>
                    
                    <p className="text-orange-900 font-sans text-sm leading-relaxed">
                      {selectedItem.description}
                    </p>

                    {selectedItem.artistName && (
                      <div className="text-xs text-orange-950 font-sans pt-1">
                        🎨 <strong>Artist Credit:</strong>{" "}
                        {selectedItem.artistUrl ? (
                          <a
                            href={selectedItem.artistUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-orange-700 hover:text-orange-500 font-bold inline-flex items-center space-x-0.5"
                          >
                            <span>@{selectedItem.artistName}</span>
                            <ExternalLink className="w-3 h-3 inline-block -mt-0.5 ml-0.5" />
                          </a>
                        ) : (
                          <span>@{selectedItem.artistName}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Love This Art Button */}
                  <div className="pt-4 border-t border-dashed border-amber-200 pr-2">
                    <button
                      onClick={(e) => {
                        handleLike(selectedItem.id, e);
                        setMascotSpeech("Aaa, my heart is melting! *blushes* 🥺💖");
                      }}
                      className={`w-full py-3 bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-950 font-comic font-black text-sm flex items-center justify-center space-x-2 shadow-[2px_3px_0px_#451a03] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1.5px_0px_#451a03] transition-all duration-150 ${sketchyBorderStyles.button} cursor-pointer`}
                    >
                      <Heart className={`w-4 h-4 fill-white text-white ${likedItems[selectedItem.id] ? "animate-pulse" : ""}`} />
                      <span>{likedItems[selectedItem.id] ? "You Loved This! 💖" : "Give some Love!"} ({likes[selectedItem.id] || 0})</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
            )}
          </AnimatePresence>

          {/* Fullscreen Zoom Overlay */}
          <AnimatePresence>
            {isZoomed && selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsZoomed(false)}
                className="fixed inset-0 z-[200000] bg-orange-950/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out select-none"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="max-w-full max-h-full object-contain rounded-md shadow-2xl transition-transform duration-300 border-2 border-orange-950/10"
                  />
                  {/* Floating escape/close cue */}
                  <div className="absolute top-4 right-4 bg-orange-950/80 text-white font-comic text-xs font-bold px-4 py-2 rounded-full border border-orange-750/30 backdrop-blur-sm pointer-events-none">
                    Click anywhere to exit zoom 🔍
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  }
