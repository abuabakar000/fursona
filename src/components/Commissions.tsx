"use client";

import React from "react";
import { sketchyBorderStyles } from "@/utils/sketchy";
import { Heart, Sparkles, Star, Flame, Coffee, ExternalLink, Pencil, Camera } from "lucide-react";
import { motion } from "framer-motion";

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
    accentColor: "text-rose-500 border-rose-200"
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
    accentColor: "text-orange-500 border-orange-200"
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
    accentColor: "text-amber-500 border-amber-200"
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
    accentColor: "text-sky-500 border-sky-200"
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
  }
];

const renderSketchDoodle = (id: string) => {
  if (id === "wish-1") {
    // Steaming ramen bowl with stars
    return (
      <svg className="w-14 h-14 stroke-[#7c2d12]/50 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 100 100">
        <path d="M 38,25 C 38,15 42,15 42,8" />
        <path d="M 50,25 C 50,15 54,15 54,8" />
        <path d="M 62,25 C 62,15 66,15 66,8" />
        <path d="M 25,48 C 25,72 75,72 75,48 Z" />
        <path d="M 20,48 C 30,44 70,44 80,48" />
        <line x1="45" y1="52" x2="80" y2="18" />
        <line x1="52" y1="52" x2="85" y2="23" />
        <path d="M 18,28 L 20,31 L 23,31 L 21,33 L 22,36 L 18,34 L 14,36 L 15,33 L 13,31 L 16,31 Z" className="fill-[#7c2d12]/15 stroke-none" />
        <path d="M 80,45 L 81.5,48 L 84.5,48 L 82,49.5 L 83,52.5 L 80,50.5 L 77,52.5 L 78,49.5 L 75.5,48 L 78.5,48 Z" className="fill-[#7c2d12]/15 stroke-none" />
      </svg>
    );
  }
  if (id === "wish-2") {
    // Chocolate chip cookie with sparkles
    return (
      <svg className="w-14 h-14 stroke-[#7c2d12]/50 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="28" />
        <circle cx="38" cy="40" r="3" className="fill-[#7c2d12]/50 stroke-none" />
        <circle cx="52" cy="36" r="3.5" className="fill-[#7c2d12]/50 stroke-none" />
        <circle cx="44" cy="58" r="3" className="fill-[#7c2d12]/50 stroke-none" />
        <circle cx="62" cy="52" r="3.5" className="fill-[#7c2d12]/50 stroke-none" />
        <circle cx="34" cy="54" r="3" className="fill-[#7c2d12]/50 stroke-none" />
        <path d="M 22,22 Q 24,27 22,32 Q 20,27 22,22 Z" className="fill-[#7c2d12]/20 stroke-none" />
        <path d="M 76,26 Q 78,31 76,36 Q 74,31 76,26 Z" className="fill-[#7c2d12]/20 stroke-none" />
        <path d="M 74,68 Q 76,73 74,78 Q 72,73 74,68 Z" className="fill-[#7c2d12]/20 stroke-none" />
      </svg>
    );
  }
  if (id === "wish-3") {
    // Orange slice with paw prints
    return (
      <svg className="w-14 h-14 stroke-[#7c2d12]/50 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="28" />
        <circle cx="50" cy="50" r="24" />
        <line x1="50" y1="26" x2="50" y2="74" />
        <line x1="26" y1="50" x2="74" y2="50" />
        <line x1="33" y1="33" x2="67" y2="67" />
        <line x1="33" y1="67" x2="67" y2="33" />
        <path d="M 50,20 C 53,12 61,12 65,17 C 65,23 57,25 50,20 Z" />
        <path d="M 18,70 C 21,70 23,68 23,65 C 23,63 21,62 18,62 C 15,62 13,63 13,65 C 13,68 15,70 18,70 Z" className="fill-[#7c2d12]/15 stroke-none" />
        <circle cx="14" cy="59" r="2.2" className="fill-[#7c2d12]/15 stroke-none" />
        <circle cx="18" cy="55" r="2.5" className="fill-[#7c2d12]/15 stroke-none" />
        <circle cx="22" cy="59" r="2.2" className="fill-[#7c2d12]/15 stroke-none" />
        <path d="M 80,30 C 83,30 85,28 85,25 C 85,23 83,22 80,22 C 77,22 75,23 75,25 C 75,28 77,30 80,30 Z" className="fill-[#7c2d12]/15 stroke-none" />
        <circle cx="76" cy="19" r="2.2" className="fill-[#7c2d12]/15 stroke-none" />
        <circle cx="80" cy="15" r="2.5" className="fill-[#7c2d12]/15 stroke-none" />
        <circle cx="84" cy="19" r="2.2" className="fill-[#7c2d12]/15 stroke-none" />
      </svg>
    );
  }
  // Sleeping crescent moon with stars and ZZZs
  return (
    <svg className="w-14 h-14 stroke-[#7c2d12]/50 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 100 100">
      <path d="M 52,25 C 38,25 28,36 28,50 C 28,64 38,74 52,74 C 44,74 37.5,67 37.5,54 C 37.5,41 43.5,30 52,25 Z" />
      <path d="M 18,32 L 20,35 L 24,35 L 21,37 L 22,41 L 18,39 L 14,41 L 15,37 L 12,35 L 16,35 Z" className="fill-[#7c2d12]/15 stroke-none" />
      <path d="M 72,55 L 73.5,58 L 76.5,58 L 74,59.5 L 75,62.5 L 72,60.5 L 69,62.5 L 70,59.5 L 67.5,58 L 70.5,58 Z" className="fill-[#7c2d12]/15 stroke-none" />
      <path d="M 64,22 L 72,22 L 64,30 L 72,30" className="stroke-[2]" />
      <path d="M 74,10 L 80,10 L 74,16 L 80,16" className="stroke-[1.5]" />
    </svg>
  );
};

export default function Commissions() {
  return (
    <section id="commissions" className="w-full px-6 py-16 md:py-24 bg-amber-50/40 overflow-hidden relative border-t-2 border-dashed border-amber-200">
      
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
      `}</style>

      <div className="max-w-6xl mx-auto space-y-16 relative">
        
        {/* Section Heading */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`inline-flex items-center space-x-1.5 px-4 py-1.5 bg-orange-100 border-2 border-orange-500 font-comic font-black text-orange-950 text-xs sm:text-sm ${sketchyBorderStyles.badge} shadow-sm`}
          >
            <span>My Art Wishlist 🎨</span>
          </motion.div>
          
          <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-orange-950">
            My Art Wishlist 🎨
          </h2>
          <p className="text-orange-900/80 font-sans max-w-xl mx-auto text-base sm:text-lg">
            Art I dream of getting commissioned someday! Hover over each card to check out my character reference ideas.
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 0.5 : -0.5, scale: 1.01 }}
              className={`relative bg-white border-3 border-orange-950 p-5 flex flex-col justify-between shadow-[4px_5px_0px_#451a03] hover:shadow-[7px_8px_0px_#451a03] transition-all duration-300 ${sketchyBorderStyles.card}`}
            >
              {/* Scrapbook Washi Tape */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 w-16 h-5 bg-orange-200/50 backdrop-blur-[0.5px] border border-dashed border-orange-300/30 shadow-[1px_1px_1px_rgba(0,0,0,0.03)] z-10 ${
                index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
              }`} />

              <div className="space-y-4">
                {/* Sketchpad Placeholder Image Slot */}
                <div className={`relative w-full aspect-[4/3] rounded-xl border-2 border-dashed border-orange-950/20 flex flex-col items-center justify-center overflow-hidden ${item.bgColor} shadow-inner group select-none`}>
                  
                  {/* Grid lines to make it look like sketch paper */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(120,53,4,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,53,4,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                  
                  {/* Rough Sketch Doodle Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:scale-105 transition-transform duration-300">
                    {renderSketchDoodle(item.id)}
                  </div>

                  {/* Floating sketch emoji icon */}
                  <span className="text-4.5xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-transform duration-300 select-none animate-float-slow z-10">
                    {item.emoji}
                  </span>
                  
                  <div className="flex items-center space-x-1 mt-2 text-gray-400 z-10">
                    <Pencil className="w-3 h-3" />
                    <span className="font-comic text-[9px] uppercase font-black tracking-wider">Idea Sketchpad</span>
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
        </div>

        {/* Artists I Adore bottom row */}
        <div className="space-y-8 pt-12 border-t border-dashed border-amber-200">
          <div className="text-center space-y-1">
            <h3 className="font-comic text-2xl md:text-3xl font-black text-orange-950 flex items-center justify-center space-x-1.5">
              <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span>Artists I Adore 💖</span>
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </h3>
            <p className="text-orange-900/70 font-sans text-xs sm:text-sm max-w-md mx-auto">
              Incredible creators whose style I absolutely worship. Click below to view their art pages!
            </p>
          </div>

          {/* Artist Circular Profiles */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
            {adoredArtists.map((artist, idx) => (
              <motion.div
                key={artist.handle}
                whileHover={{ y: -5 }}
                className="bg-white border-3 border-orange-950 p-5 rounded-2xl flex flex-col items-center space-y-4 shadow-[5px_6px_0px_#451a03] max-w-[195px] w-full text-center relative overflow-visible"
              >
                {/* Small customized badge stuck to the top right of card */}
                <div className={`absolute -top-3.5 -right-2 px-2 py-0.5 border border-orange-950 font-comic font-black text-[9px] rotate-[10deg] shadow-sm ${sketchyBorderStyles.badge} ${artist.badgeColor} z-10`}>
                  {artist.badge}
                </div>

                {/* Circular Avatar sketch frame */}
                <div className={`w-18 h-18 rounded-full border-2 border-orange-950 bg-amber-50/60 flex items-center justify-center text-4xl shadow-inner select-none animate-float-slow ${sketchyBorderStyles.avatar}`}
                     style={{ animationDelay: `${idx * 0.5}s` }}>
                  {artist.avatar}
                </div>

                {/* Identity info */}
                <div className="space-y-0.5">
                  <h4 className="font-comic text-sm font-black text-orange-950 truncate max-w-[155px]">
                    {artist.name}
                  </h4>
                  <span className="text-xs text-orange-900/50 block font-bold">
                    {artist.handle}
                  </span>
                </div>

                {/* View Art CTA button */}
                <a
                  href={artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-comic font-black text-xs flex items-center justify-center space-x-1 border border-orange-950 shadow-[1.5px_2px_0px_#451a03] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_#451a03] transition-all duration-150 ${sketchyBorderStyles.button}`}
                >
                  <span>View Art</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

