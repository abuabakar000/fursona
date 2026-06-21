"use client";

import React, { useRef, useState } from "react";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { Heart, Sparkles, Star, Flame, Coffee, ExternalLink, Pencil, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { SketchPaw, SketchTwig, SketchLeaf, SketchStar, SketchHeart, OrangeSlice } from "./SketchIcons";

interface WishlistItem {
  id: string;
  character: string;
  poseDescription: string;
  style: string;
  priority: "Dream Piece 🌟" | "Someday ✨" | "NEED THIS 🔥";
  priorityType: "dream" | "someday" | "need";
  budget: string;
  emoji: string;
  bgColor: string;
  accentColor: string;
  imageUrl: string;
}

const wishlistItems: WishlistItem[] = [
  {
    id: "wish-1",
    character: "Citrini the Fennec Fox",
    poseDescription: "Reading a spellbook in a warm, rainy ramen shop with steam curling up from a hot noodle bowl 🍜✨",
    style: "Detailed Illustration",
    priority: "Dream Piece 🌟",
    priorityType: "dream",
    budget: "$80 - $150",
    emoji: "🍜",
    bgColor: "bg-violet-50/40",
    accentColor: "text-rose-500 border-rose-200",
    imageUrl: "/images/wishlist_ramen.png"
  },
  {
    id: "wish-2",
    character: "Citrini the Fennec",
    poseDescription: "Snatching warm chocolate chip cookies from a high shelf, looking guilty but cute with crumbs on nose 🍪🦊",
    style: "Chibi Emote / Sticker",
    priority: "NEED THIS 🔥",
    priorityType: "need",
    budget: "$35 - $60",
    emoji: "🍪",
    bgColor: "bg-sky-50/40",
    accentColor: "text-orange-500 border-orange-200",
    imageUrl: "/images/wishlist_cookies.png"
  },
  {
    id: "wish-3",
    character: "Citrini (Fursuit Version)",
    poseDescription: "Dressed up as a huge orange slice, waving happily with giant squeaky padded paws! 🐾🍊",
    style: "Flat Color Full-Body",
    priority: "NEED THIS 🔥",
    priorityType: "need",
    budget: "$70 - $100",
    emoji: "🍊",
    bgColor: "bg-indigo-50/40",
    accentColor: "text-amber-500 border-amber-200",
    imageUrl: "/images/wishlist_orange.png"
  },
  {
    id: "wish-4",
    character: "Citrini & Friends",
    poseDescription: "A massive, soft slumber party sleeping in a pile of starry plushies, cushions, and warm blankets 🌌💤",
    style: "Scenic Illustration",
    priority: "Someday ✨",
    priorityType: "someday",
    budget: "$130 - $220",
    emoji: "💤",
    bgColor: "bg-sky-50/50",
    accentColor: "text-sky-500 border-sky-200",
    imageUrl: "/images/wishlist_slumber.png"
  }
];

interface AdoredArtist {
  name: string;
  handle: string;
  avatar: string;
  url: string;
  badge: string;
  badgeColor: string;
}

const adoredArtists: AdoredArtist[] = [
  {
    name: "FennecIllustrates",
    handle: "@FennecIllustrates",
    avatar: "🦊",
    url: "https://twitter.com/fennecillustrates",
    badge: "Fav Style 💖",
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200"
  },
  {
    name: "CelestialArts",
    handle: "@CelestialArts",
    avatar: "🐺",
    url: "https://twitter.com/celestialarts",
    badge: "Dream Artist ✨",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200"
  },
  {
    name: "NoodleDraws",
    handle: "@NoodleDraws",
    avatar: "🐼",
    url: "https://twitter.com/noodledraws",
    badge: "Cozy Master ☕",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200"
  },
  {
    name: "CitrusPaws",
    handle: "@CitrusPaws",
    avatar: "🐯",
    url: "https://twitter.com/citruspaws",
    badge: "Inspirational 🌟",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200"
  },
  {
    name: "MarshmallowPaws",
    handle: "@MarshmallowPaws",
    avatar: "🐻",
    url: "https://twitter.com/marshmallowpaws",
    badge: "Super Cute 🌸",
    badgeColor: "bg-teal-100 text-teal-700 border-teal-200"
  },
  {
    name: "SpookyBunny",
    handle: "@SpookyBunny",
    avatar: "🐰",
    url: "https://twitter.com/spookybunny",
    badge: "Spooky Vibes 🎃",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200"
  }
];



export default function Commissions() {
  const wishlistScrollRef = useRef<HTMLDivElement>(null);
  const [wishlistActiveIndex, setWishlistActiveIndex] = useState(0);

  const handleWishlistScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 640) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth <= 0) return;
    const pct = scrollLeft / scrollWidth;
    const index = Math.min(
      wishlistItems.length - 1,
      Math.max(0, Math.round(pct * (wishlistItems.length - 1)))
    );
    setWishlistActiveIndex(index);
  };

  const artistsScrollRef = useRef<HTMLDivElement>(null);
  const [artistsActiveIndex, setArtistsActiveIndex] = useState(0);

  const handleArtistsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 640) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth <= 0) return;
    const pct = scrollLeft / scrollWidth;
    const index = Math.min(
      adoredArtists.length - 1,
      Math.max(0, Math.round(pct * (adoredArtists.length - 1)))
    );
    setArtistsActiveIndex(index);
  };

  return (
    <section id="commissions" className="w-full px-6 py-16 md:py-24 bg-amber-50/40 overflow-hidden relative border-t-2 border-dashed border-amber-200">
      
      {/* Background doodles */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "5%", top: "10%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <SketchPaw className="w-12 h-12" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: "8%", top: "25%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <SketchHeart className="w-10 h-10 fill-orange-950/2" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -4, 0], rotate: [12, 18, 12] }}
        transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: "12%", top: "45%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <SketchLeaf className="w-10 h-10" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "4%", bottom: "35%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <SketchStar className="w-9 h-9" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0], rotate: [-10, -5, -10] }}
        transition={{ duration: 4.9, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "10%", top: "65%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <SketchPaw className="w-10 h-10" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 9, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: "5%", bottom: "15%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <OrangeSlice className="w-11 h-11" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -7, 0], rotate: [15, 25, 15] }}
        transition={{ duration: 5.9, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: "15%", bottom: "60%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <SketchHeart className="w-9 h-9 fill-orange-950/2" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "8%", bottom: "10%" }}
        className="absolute text-orange-950/5 pointer-events-none hidden md:block"
      >
        <SketchTwig className="w-10 h-10" />
      </motion.div>

      {/* Background watercolor glows */}
      <div className="absolute top-10 right-[-5%] w-48 h-48 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-60 h-60 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Embedded keyframe animations for wiggle effects */}
      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        .animate-float-slow {
          animation: subtle-float 4s ease-in-out infinite;
        }
        @keyframes card-wiggle {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        .animate-card-wiggle {
          animation: card-wiggle 5s ease-in-out infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-16 relative">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-4"
        >

          
          <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950 text-left">
            My Art Wishlist 🎨
          </h2>
          <p className="text-orange-900/80 font-sans max-w-xl text-base sm:text-lg">
            Art I dream of getting commissioned someday! Hover over each card to check out my character reference ideas.
          </p>
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div
          ref={wishlistScrollRef}
          onScroll={handleWishlistScroll}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-8 px-4 -mx-4 sm:px-0 sm:mx-0"
        >
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 0.5 : -0.5, scale: 1.01 }}
              className={`relative bg-white border-3 border-orange-950 p-5 flex flex-col justify-between shadow-[4px_5px_0px_#451a03] hover:shadow-[7px_8px_0px_#451a03] transition-all duration-300 flex-shrink-0 w-[82vw] max-w-[290px] sm:w-auto sm:max-w-none snap-center snap-always ${sketchyBorderStyles.card}`}
            >
              {/* Scrapbook Washi Tape */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 w-16 h-5 bg-orange-200/50 backdrop-blur-[0.5px] border border-dashed border-orange-300/30 shadow-[1px_1px_1px_rgba(0,0,0,0.03)] z-10 ${
                index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
              }`} />

              <div className="space-y-4">
                 {/* Sketchpad Placeholder Image Slot */}
                <div className={`relative w-full aspect-[4/3] rounded-xl border-2 border-dashed border-orange-950/20 flex flex-col items-center justify-center overflow-hidden ${item.bgColor} shadow-inner group select-none`}>
                  
                  {/* Cozy Concept Illustration Image */}
                  <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                    <img 
                      src={item.imageUrl} 
                      alt={item.character} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>

                  {/* Grid lines to make it look like sketch paper */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(120,53,4,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,53,4,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-10" />

                  {/* Emoji Sticker Badge on top right of sketchpad */}
                  <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 border-2 border-orange-950 flex items-center justify-center text-lg shadow-[2px_2.5px_0px_rgba(120,53,4,0.15)] z-20 rotate-6 group-hover:rotate-12 group-hover:scale-105 transition-all duration-300 select-none">
                    {item.emoji}
                  </div>
                  
                  {/* Bottom Pencil Label */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center space-x-1 text-[9px] font-comic font-bold text-orange-950/40 bg-white/80 px-2 py-0.5 rounded-full border border-orange-950/10 z-20">
                    <Pencil className="w-2.5 h-2.5 text-orange-950/30" />
                    <span>Idea Sketchpad</span>
                  </div>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 text-[9px] font-comic font-black border-2 border-orange-950 bg-amber-100 text-orange-950 ${sketchyBorderStyles.badge}`}>
                    {item.style}
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] font-comic font-black border-2 border-orange-950 ${
                    item.priorityType === "dream" ? "bg-pink-400 text-white" :
                    item.priorityType === "need" ? "bg-orange-500 text-white" :
                    "bg-sky-400 text-white"
                  } ${sketchyBorderStyles.badge}`}>
                    {item.priority}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-left">
                  <h4 className="font-comic text-base sm:text-lg font-black text-orange-950 leading-snug">
                    {item.character}
                  </h4>
                  <p className="text-xs sm:text-sm text-orange-900/90 font-medium font-sans leading-relaxed min-h-[55px]">
                    {item.poseDescription}
                  </p>
                </div>
              </div>

              {/* Budget Estimation Row */}
              <div className="border-t border-dashed border-amber-100 pt-3 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-comic font-black text-orange-950/50 uppercase tracking-wider">Target Budget</span>
                <span className="font-comic text-base font-black text-orange-600">
                  {item.budget}
                </span>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Sketchy dots for mobile wishlist slider */}
        <div className="flex sm:hidden justify-center items-center space-x-2.5 pt-1 pb-4 select-none">
          {wishlistItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const container = wishlistScrollRef.current;
                if (container) {
                  const cardWidth = container.scrollWidth / wishlistItems.length;
                  container.scrollTo({
                    left: cardWidth * idx,
                    behavior: "smooth"
                  });
                }
              }}
              className={`w-3.5 h-3.5 border-2 border-orange-950 transition-all duration-300 ${
                wishlistActiveIndex === idx
                  ? "bg-orange-500 scale-110 rotate-[6deg] rounded-[40%_60%_40%_60%/60%_40%_60%_40%]"
                  : "bg-amber-100 rounded-full"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Artists I Adore bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8 pt-12 border-t border-dashed border-amber-200"
        >
          <div className="text-left space-y-4">
            <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950 flex flex-wrap items-center justify-start gap-2.5">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-orange-500 fill-orange-500" />
              <span>Artists I Adore 💖</span>
            </h2>
            <p className="text-orange-900/80 font-sans max-w-xl text-base sm:text-lg">
              Incredible creators whose style I absolutely worship. Click below to view their art pages!
            </p>
          </div>

          {/* Artist Washi Tape Name Tag Strips */}
          <div 
            ref={artistsScrollRef}
            onScroll={handleArtistsScroll}
            className="flex overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-6 px-4 -mx-4 sm:px-0 sm:mx-0 sm:flex-wrap md:grid md:grid-cols-3 sm:justify-center gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {adoredArtists.map((artist, idx) => (
              <motion.div
                key={artist.handle}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  clipPath: "polygon(2% 0%, 0% 25%, 2% 50%, 0% 75%, 2% 100%, 98% 100%, 100% 75%, 98% 50%, 100% 25%, 98% 0%)",
                  rotate: idx % 2 === 0 ? "-1.5deg" : "1.5deg"
                }}
                className={`border-y-2 border-dashed border-orange-950/30 p-4 px-6 flex flex-row items-center space-x-4 shadow-[4px_4px_0px_rgba(69,26,3,0.15)] w-[75vw] max-w-[280px] flex-shrink-0 snap-center snap-always sm:w-auto sm:max-w-xs md:w-full md:max-w-none relative overflow-visible ${
                  idx >= 4 ? "hidden md:flex" : ""
                } ${
                  idx % 4 === 0 ? "bg-amber-100/90" :
                  idx % 4 === 1 ? "bg-rose-100/90" :
                  idx % 4 === 2 ? "bg-sky-100/90" :
                  "bg-green-100/90"
                }`}
              >
                {/* Circular sticker avatar */}
                <div className="w-11 h-11 rounded-full bg-white/80 border border-orange-950/20 flex items-center justify-center text-2xl shadow-sm flex-shrink-0 select-none">
                  {artist.avatar}
                </div>

                {/* Identity info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center text-left">
                  <div className="flex items-center space-x-1.5 flex-wrap">
                    <h4 className="font-comic text-xs sm:text-sm font-black text-orange-950 truncate max-w-[120px]">
                      {artist.name}
                    </h4>
                    {/* Tiny badge */}
                    <span className={`text-[8px] font-comic font-black px-1.5 py-0.5 rounded border border-orange-950/15 ${artist.badgeColor} scale-90 origin-left`}>
                      {artist.badge.replace(/ 💖| ✨| ☕| 🌟/, "")}
                    </span>
                  </div>
                  <span className="text-[10px] text-orange-900/60 block font-bold font-mono truncate">
                    {artist.handle}
                  </span>
                </div>

                {/* View Art button */}
                <a
                  href={artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white hover:bg-orange-50 text-orange-950 border border-orange-950/30 rounded-full shadow-[1.5px_2px_0px_#451a03] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#451a03] transition-all flex-shrink-0 flex items-center justify-center"
                  aria-label={`View ${artist.name}'s profile`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Sketchy dots for mobile artists slider (only shows for mobile-visible artists) */}
          <div className="flex sm:hidden justify-center items-center space-x-2.5 pt-1 pb-4 select-none">
            {adoredArtists.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = artistsScrollRef.current;
                  if (container) {
                    const cardWidth = container.scrollWidth / 4;
                    container.scrollTo({
                      left: cardWidth * idx,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`w-3.5 h-3.5 border-2 border-orange-950 transition-all duration-300 ${
                  artistsActiveIndex === idx
                    ? "bg-orange-500 scale-110 rotate-[6deg] rounded-[40%_60%_40%_60%/60%_40%_60%_40%]"
                    : "bg-amber-100 rounded-full"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

